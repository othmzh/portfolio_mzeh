import test from 'node:test'
import assert from 'node:assert/strict'
import { EventEmitter } from 'node:events'
import { mock } from 'node:test'

const envBefore = { ...process.env }
process.env.NODE_ENV = 'production'
process.env.GROQ_API_KEY = 'test-only-key'
delete process.env.REDIS_URL
delete process.env.KV_REST_API_URL
delete process.env.KV_REST_API_TOKEN
delete process.env.UPSTASH_REDIS_REST_URL
delete process.env.UPSTASH_REDIS_REST_TOKEN
const fetchMock = mock.method(globalThis, 'fetch', async () => { throw new Error('unexpected network request') })
const { default: chat } = await import('../pages/api/chat.js')
const { default: auth } = await import('../pages/api/admin-auth.js')
const { default: save } = await import('../pages/api/admin-save.js')
const { default: upload } = await import('../pages/api/admin-upload.js')

function response() {
  const res = new EventEmitter()
  res.headers = {}
  res.setHeader = (key, value) => { res.headers[key] = value }
  res.status = code => { res.code = code; return res }
  res.json = body => { res.body = body; res.writableEnded = true; return res }
  return res
}
const req = body => ({ method: 'POST', body, headers: {}, socket: { remoteAddress: '127.0.0.1' } })

test('invalid messages and unavailable production quota never reach Groq', async () => {
  for (const body of [null, [], { message: {} }, { message: 5 }, { message: ' ' }, { message: 'é'.repeat(2001) }, { message: '🙂'.repeat(1001) }]) {
    const res = response()
    await chat(req(body), res)
    assert.equal(res.code, 400)
  }
  const res = response()
  await chat(req({ message: 'Bonjour' }), res)
  assert.equal(res.code, 503)
  assert.equal(fetchMock.mock.callCount(), 0)
})

test('all production admin operations are rejected before sessions or writes', async () => {
  for (const handler of [auth, save, upload]) {
    const res = response()
    await handler(req({ password: 'anything', file: 'hero', locale: 'fr', base64: 'abc' }), res)
    assert.equal(res.code, 403)
  }
})

test('valid FR and EN messages retain the reply contract and provider errors stay private', async () => {
  process.env.NODE_ENV = 'development'
  for (const locale of ['fr', 'en']) {
    fetchMock.mock.mockImplementation(async (url, options) => {
      assert.equal(url, 'https://api.groq.com/openai/v1/chat/completions')
      assert.ok(options.signal instanceof AbortSignal)
      const body = JSON.parse(options.body)
      assert.equal(body.messages[1].content, 'Tell me about Othmen')
      assert.ok(body.messages[0].content.includes(locale === 'en' ? 'Always respond in English' : 'Réponds toujours en français'))
      return { ok: true, json: async () => ({ choices: [{ message: { content: 'A valid reply' } }] }) }
    })
    const res = response()
    await chat(req({ message: 'Tell me about Othmen', locale }), res)
    assert.equal(res.code, 200)
    assert.equal(res.body.reply, 'A valid reply')
    assert.equal(res.listenerCount('close'), 0)
  }
  fetchMock.mock.mockImplementation(async () => ({ ok: false, json: async () => ({ error: { message: 'private diagnostic' } }) }))
  const res = response()
  await chat(req({ message: 'Bonjour' }), res)
  assert.equal(res.code, 502)
  assert.ok(!JSON.stringify(res.body).includes('private diagnostic'))
})

test('quota rejection never calls Groq and the server deadline aborts accepted requests', async t => {
  process.env.NODE_ENV = 'production'
  process.env.KV_REST_API_URL = 'https://redis.example.test'
  process.env.KV_REST_API_TOKEN = 'test-only-token'
  let providerCalls = 0
  fetchMock.mock.mockImplementation(async url => {
    if (url.endsWith('/pipeline')) return { ok: true, json: async () => [{ result: 6 }, { result: 1 }] }
    providerCalls++
    throw new Error('Unexpected provider call')
  })
  const denied = response()
  await chat(req({ message: 'Bonjour' }), denied)
  assert.equal(denied.code, 429)
  assert.equal(providerCalls, 0)
  assert.ok(Number(denied.headers['Retry-After']) > 0)

  t.mock.timers.enable({ apis: ['setTimeout'] })
  let notifyProvider
  const reachedProvider = new Promise(resolve => { notifyProvider = resolve })
  fetchMock.mock.mockImplementation(async (url, options) => {
    if (url.endsWith('/pipeline')) return { ok: true, json: async () => [{ result: 1 }, { result: 1 }] }
    return new Promise((resolve, reject) => {
      options.signal.addEventListener('abort', () => reject(new Error('aborted')), { once: true })
      notifyProvider()
    })
  })
  const timed = response()
  const pending = chat(req({ message: 'Bonjour' }), timed)
  await reachedProvider
  t.mock.timers.tick(10001)
  await pending
  assert.equal(timed.code, 504)
  assert.equal(timed.listenerCount('close'), 0)
})

test.after(() => {
  fetchMock.mock.restore()
  for (const key of Object.keys(process.env)) if (!(key in envBefore)) delete process.env[key]
  Object.assign(process.env, envBefore)
})
