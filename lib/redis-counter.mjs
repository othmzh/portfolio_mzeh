import { createClient } from '@redis/client'

// One reusable connection per warm server instance, opened only on demand.
export function createRedisCounter({ clientFactory = createClient, timeoutMs = 2000 } = {}) {
  let current

  function discard(connection) {
    if (current === connection) current = undefined
    if (connection?.client.isOpen) connection.client.destroy()
  }

  return {
    async increment(url, key, ttl) {
      if (!['redis:', 'rediss:'].includes(new URL(url).protocol)) throw new Error('Invalid quota configuration')
      if (!current || current.url !== url || !current.client.isOpen) {
        discard(current)
        const client = clientFactory({
          url,
          socket: { connectTimeout: timeoutMs, reconnectStrategy: false },
          disableOfflineQueue: true,
          commandsQueueMaxLength: 128,
        })
        // Command/connect promises handle failures; never log credential URLs.
        client.on('error', () => {})
        current = { client, url, ready: client.connect() }
      }
      const connection = current
      let timer
      try {
        // Includes connection/authentication and command execution. Destroying
        // on timeout also rejects queued work instead of replaying it later.
        return await Promise.race([
          (async () => {
            await connection.ready
            const results = await connection.client.multi().incr(key).expire(key, ttl, 'NX').exec()
            if (!Array.isArray(results) || results.length !== 2 ||
                !Number.isSafeInteger(results[0]) || results[0] < 1 ||
                ![0, 1].includes(results[1])) throw new Error('Invalid quota response')
            return results[0]
          })(),
          new Promise((_, reject) => {
            timer = setTimeout(() => reject(new Error('Quota store timeout')), timeoutMs)
          }),
        ])
      } catch {
        discard(connection)
        throw new Error('Quota store unavailable')
      } finally {
        clearTimeout(timer)
      }
    },
    close() { discard(current) },
  }
}

export const sharedRedisCounter = createRedisCounter()
