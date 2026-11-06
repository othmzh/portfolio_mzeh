import { createHash, randomBytes } from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'

export const SESSION_SECONDS = 8 * 60 * 60
export const SESSION_COOKIE = 'admin_session'

// Independent files avoid read/modify/write races between login and logout.
// Legacy .sessions.json tokens are deliberately invalidated on migration.
export function createSessionStore(directory, now = Date.now) {
  function filename(token) {
    if (typeof token !== 'string' || !/^[0-9a-f]{64}$/.test(token)) return null
    return path.join(directory, `${createHash('sha256').update(token).digest('hex')}.json`)
  }
  return {
    create() {
      const token = randomBytes(32).toString('hex')
      fs.mkdirSync(directory, { recursive: true, mode: 0o700 })
      fs.writeFileSync(filename(token), JSON.stringify({ expiresAt: now() + SESSION_SECONDS * 1000 }), { flag: 'wx', mode: 0o600 })
      return token
    },
    has(token) {
      const file = filename(token)
      if (!file) return false
      try {
        const { expiresAt } = JSON.parse(fs.readFileSync(file, 'utf8'))
        return Number.isSafeInteger(expiresAt) && expiresAt > now()
      } catch { return false }
    },
    revoke(token) {
      const file = filename(token)
      if (file) fs.rmSync(file, { force: true })
    },
  }
}

export function readSessionToken(req) {
  return (req.headers.cookie || '').split(';').map(part => part.trim())
    .find(part => part.startsWith(`${SESSION_COOKIE}=`))?.slice(SESSION_COOKIE.length + 1)
}

export const adminSessions = createSessionStore(path.join(process.cwd(), '.admin-sessions'))
