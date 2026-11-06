import test from 'node:test'
import assert from 'node:assert/strict'
import net from 'node:net'
import { once } from 'node:events'
import { createClient } from '@redis/client'
import { createRedisCounter } from '../lib/redis-counter.mjs'
import { createChatAdmission } from '../lib/chat-admission.mjs'

// A local RESP fixture exercises the actual Redis client, including its
// authentication, transactions, concurrent requests and socket lifecycle.
function parseCommand(buffer) {
  const end = buffer.indexOf('\r\n')
  if (end < 0) return
  assert.equal(buffer[0], 42)
  const count = Number(buffer.subarray(1, end).toString())
  let offset = end + 2
  const args = []
  for (let i = 0; i < count; i++) {
    const lineEnd = buffer.indexOf('\r\n', offset)
    if (lineEnd < 0) return
    assert.equal(buffer[offset], 36)
    const size = Number(buffer.subarray(offset + 1, lineEnd).toString())
    offset = lineEnd + 2
    if (buffer.length < offset + size + 2) return
    args.push(buffer.subarray(offset, offset + size).toString())
    offset += size + 2
  }
  return { args, offset }
}

async function redisFixture(t) {
  const state = { connections: 0, commands: [], values: new Map(), failWrites: false, hang: false }
  const sockets = new Set()
  const server = net.createServer(socket => {
    state.connections++
    sockets.add(socket)
    socket.on('error', () => {})
    socket.on('close', () => sockets.delete(socket))
    let buffer = Buffer.alloc(0)
    let transaction
    const execute = ([command, key, ttl, mode]) => {
      if (state.failWrites) return '-OOM command not allowed\r\n'
      if (command === 'INCR') {
        const value = (state.values.get(key) || 0) + 1
        state.values.set(key, value)
        return `:${value}\r\n`
      }
      assert.equal(command, 'EXPIRE')
      assert.ok(Number(ttl) > 0)
      assert.equal(mode, 'NX')
      return ':1\r\n'
    }
    socket.on('data', data => {
      buffer = Buffer.concat([buffer, data])
      let parsed
      while ((parsed = parseCommand(buffer))) {
        const { args } = parsed
        buffer = buffer.subarray(parsed.offset)
        state.commands.push(args)
        if (state.hang) continue
        const [command] = args
        if (command === 'HELLO') {
          assert.deepEqual(args, ['HELLO', '3', 'AUTH', 'default', 'test-only-password'])
          socket.write('%1\r\n+proto\r\n:3\r\n')
        } else if (command === 'AUTH') {
          assert.deepEqual(args, ['AUTH', 'default', 'test-only-password'])
          socket.write('+OK\r\n')
        } else if (command === 'CLIENT' || command === 'SELECT') {
          socket.write('+OK\r\n')
        } else if (command === 'MULTI') {
          transaction = []
          socket.write('+OK\r\n')
        } else if (command === 'EXEC') {
          socket.write(`*${transaction.length}\r\n${transaction.map(execute).join('')}`)
          transaction = undefined
        } else if (transaction) {
          transaction.push(args)
          socket.write('+QUEUED\r\n')
        } else {
          socket.write('-ERR unsupported command\r\n')
        }
      }
    })
  })
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(async () => {
    for (const socket of sockets) socket.destroy()
    await new Promise(resolve => server.close(resolve))
  })
  state.url = `redis://default:test-only-password@127.0.0.1:${server.address().port}/0`
  return state
}

test('REDIS_URL alone shares quotas across clients and bounds per-address keys', async t => {
  const server = await redisFixture(t)
  const counters = [createRedisCounter(), createRedisCounter()]
  t.after(() => counters.forEach(counter => counter.close()))
  const instances = counters.map(redisCounter => createChatAdmission({
    env: { NODE_ENV: 'production', REDIS_URL: server.url }, redisCounter, now: () => 0,
    fetcher: () => { throw new Error('REST must not be called') },
  }))
  const results = await Promise.all(Array.from({ length: 40 }, (_, i) => instances[i % 2]({ headers: {}, socket: { remoteAddress: `192.0.2.${i}` } })))
  assert.equal(results.filter(result => result.allowed).length, 4)
  assert.equal(server.connections, 2)
  assert.equal(server.values.size, 6) // One burst key, four client keys, one daily key.
  assert.equal(server.commands.filter(([command]) => command === 'HELLO').length, 2)
  assert.ok(results.filter(result => !result.allowed).every(result => result.retryAfter > 0))
})

test('Redis errors fail closed without REST/local fallback, then a later request can reconnect', async t => {
  const server = await redisFixture(t)
  const redisCounter = createRedisCounter()
  t.after(() => redisCounter.close())
  const admit = createChatAdmission({ env: { REDIS_URL: server.url, KV_REST_API_URL: 'https://unused.test', KV_REST_API_TOKEN: 'unused' }, redisCounter,
    fetcher: () => { throw new Error('Unexpected REST fallback') },
  })
  const request = { headers: {}, socket: { remoteAddress: '127.0.0.1' } }
  server.failWrites = true
  await assert.rejects(admit(request), /Quota store unavailable/)
  server.failWrites = false
  assert.equal((await admit(request)).allowed, true)
  assert.equal(server.connections, 2)
})

test('stalled Redis authentication and commands time out and close the connection', async t => {
  const server = await redisFixture(t)
  const clients = []
  const redisCounter = createRedisCounter({ timeoutMs: 100, clientFactory(options) {
    const client = createClient(options)
    clients.push(client)
    return client
  } })
  t.after(() => redisCounter.close())
  server.hang = true
  await assert.rejects(redisCounter.increment(server.url, 'test:first', 30), /Quota store unavailable/)
  assert.equal(clients[0].isOpen, false)
  server.hang = false
  assert.equal(await redisCounter.increment(server.url, 'test:second', 30), 1)
  server.hang = true
  await assert.rejects(redisCounter.increment(server.url, 'test:third', 30), /Quota store unavailable/)
  assert.equal(clients[1].isOpen, false)
})

test('invalid REDIS_URL is rejected without connecting', async () => {
  const redisCounter = createRedisCounter({ clientFactory() { throw new Error('Must not create client') } })
  for (const url of ['https://redis.example.test', 'invalid']) {
    await assert.rejects(redisCounter.increment(url, 'test:key', 30))
  }
})
