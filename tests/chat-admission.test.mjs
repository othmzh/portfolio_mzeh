import test from 'node:test'
import assert from 'node:assert/strict'
import { createChatAdmission } from '../lib/chat-admission.mjs'

const request = ip => ({ headers: {}, socket: { remoteAddress: ip } })
const production = { NODE_ENV: 'production', KV_REST_API_URL: 'https://redis.example.test', KV_REST_API_TOKEN: 'test-only-token' }

// Shared fake transport models the Redis command contract, not the limiter.
function redisTransport() {
  const values = new Map()
  return async (url, options) => {
    assert.equal(url, 'https://redis.example.test/pipeline')
    const commands = JSON.parse(options.body)
    const results = commands.map(([operation, key, ttl, mode]) => {
      if (operation === 'INCR') {
        const value = (values.get(key) || 0) + 1
        values.set(key, value)
        return { result: value }
      }
      assert.equal(operation, 'EXPIRE')
      assert.equal(mode, 'NX')
      assert.ok(ttl > 0)
      return { result: 1 }
    })
    return { ok: true, json: async () => results }
  }
}

test('independent production instances share the burst budget under concurrency', async () => {
  const fetcher = redisTransport()
  const instances = [createChatAdmission({ env: production, fetcher, now: () => 0 }), createChatAdmission({ env: production, fetcher, now: () => 0 })]
  const results = await Promise.all(Array.from({ length: 20 }, (_, i) => instances[i % 2](request(`192.0.2.${i}`))))
  assert.equal(results.filter(r => r.allowed).length, 4)
  assert.ok(results.filter(r => !r.allowed).every(r => r.retryAfter > 0))
})

test('daily budget survives IP rotation and changing short windows; next UTC day resets it', async () => {
  let clock = 0
  const admit = createChatAdmission({ env: production, fetcher: redisTransport(), now: () => clock })
  for (let i = 0; i < 200; i++) {
    clock = i * 16000
    assert.equal((await admit(request(`client-${i}`))).allowed, true)
  }
  clock += 16000
  assert.equal((await admit(request('another-client'))).allowed, false)
  clock = 86400000
  assert.equal((await admit(request('another-client'))).allowed, true)
})

test('client limit cannot be bypassed with X-Forwarded-For on direct Node', async () => {
  let clock = 0
  const admit = createChatAdmission({ env: {}, now: () => clock })
  for (let i = 0; i < 5; i++) {
    clock = i * 8000
    assert.equal((await admit({ ...request('127.0.0.1'), headers: { 'x-forwarded-for': `192.0.2.${i}` } })).allowed, true)
  }
  clock = 45000
  assert.equal((await admit(request('127.0.0.1'))).allowed, false)
  clock = 60000
  assert.equal((await admit(request('127.0.0.1'))).allowed, true)
})

test('production fails closed without Redis, with partial config, errors or malformed replies', async () => {
  for (const env of [{ NODE_ENV: 'production' }, { NODE_ENV: 'production', KV_REST_API_URL: production.KV_REST_API_URL }]) {
    await assert.rejects(createChatAdmission({ env })(request('127.0.0.1')))
  }
  for (const fetcher of [async () => { throw new Error('offline') }, async () => ({ ok: false }), async () => ({ ok: true, json: async () => [{ result: '1' }, { result: 1 }] })]) {
    await assert.rejects(createChatAdmission({ env: production, fetcher })(request('127.0.0.1')))
  }
})
