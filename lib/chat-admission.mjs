import { createHash } from 'node:crypto'
import { isIP } from 'node:net'
import { sharedRedisCounter } from './redis-counter.mjs'

export const MAX_MESSAGE_LENGTH = 2000
export const UPSTREAM_TIMEOUT_MS = 10000

// INCR is atomic across instances. Bucket keys expire only for cleanup.
export function createChatAdmission({ env = process.env, fetcher = fetch, now = Date.now, redisCounter = sharedRedisCounter } = {}) {
  const local = new Map()
  async function increment(key, ttl) {
    // REDIS_URL is the native Redis connection string used by Redis Cloud.
    // A configured but failing store must never fall back to local counters.
    if (env.REDIS_URL) return redisCounter.increment(env.REDIS_URL, key, ttl)
    const url = env.UPSTASH_REDIS_REST_URL || env.KV_REST_API_URL
    const token = env.UPSTASH_REDIS_REST_TOKEN || env.KV_REST_API_TOKEN
    if (url || token) {
      if (!url || !token || new URL(url).protocol !== 'https:') throw new Error('Invalid quota configuration')
      const response = await fetcher(`${url.replace(/\/$/, '')}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
        body: JSON.stringify([['INCR', key], ['EXPIRE', key, ttl, 'NX']]),
        signal: AbortSignal.timeout(2000),
        cache: 'no-store',
      })
      if (!response.ok) throw new Error('Quota store unavailable')
      const results = await response.json()
      if (!Array.isArray(results) || results.length !== 2 || results.some(item => !item || item.error) ||
          !Number.isSafeInteger(results[0].result) || results[0].result < 1 ||
          ![0, 1].includes(results[1].result)) throw new Error('Invalid quota response')
      return results[0].result
    }
    if (env.NODE_ENV === 'production') throw new Error('Shared quota store required')
    const timestamp = now()
    for (const [id, entry] of local) if (entry.expiresAt <= timestamp) local.delete(id)
    const entry = local.get(key) || { count: 0, expiresAt: timestamp + ttl * 1000 }
    entry.count += 1
    local.set(key, entry)
    return entry.count
  }
  return async function admit(req) {
    // Vercel supplies this header. Direct Node deployments use the socket;
    // global budgets also cover IP rotation and untrusted forwarding headers.
    const forwarded = env.VERCEL === '1' ? req.headers['x-vercel-forwarded-for'] : null
    const ip = typeof forwarded === 'string' && isIP(forwarded) ? forwarded : req.socket?.remoteAddress || 'unknown'
    const identity = createHash('sha256').update(ip).digest('hex')
    const timestamp = now()
    const windows = [
      { name: 'burst', seconds: 15, limit: 4 },
      // Check the shared budget before creating a key for a new client.
      { name: `client:${identity}`, seconds: 60, limit: 5 },
      { name: 'daily', seconds: 86400, limit: 200 },
    ]
    for (const window of windows) {
      const bucket = Math.floor(timestamp / (window.seconds * 1000))
      const key = `portfolio-chat:v1:${window.name}:${bucket}`
      const count = await increment(key, window.seconds * 2)
      if (count > window.limit) return { allowed: false, retryAfter: Math.max(1, Math.ceil(((bucket + 1) * window.seconds * 1000 - timestamp) / 1000)) }
    }
    return { allowed: true }
  }
}

export const admitChat = createChatAdmission()
