import { timingSafeEqual } from 'node:crypto'
import { adminSessions, readSessionToken, SESSION_COOKIE, SESSION_SECONDS } from '../../lib/admin-sessions.mjs'

export const config = { api: { bodyParser: { sizeLimit: '4kb' } } }
const loginAttempts = new Map()

function setCookie(res, value, maxAge) {
  res.setHeader('Set-Cookie', `${SESSION_COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}`)
}

export function isAuthedToken(token) {
  return process.env.NODE_ENV !== 'production' && adminSessions.has(token)
}

export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow')
  if (process.env.NODE_ENV === 'production') return res.status(403).json({ error: 'Admin non disponible en production' })

  if (req.method === 'POST') {
    const now = Date.now()
    for (const [key, entry] of loginAttempts) if (entry.expiresAt <= now) loginAttempts.delete(key)
    const ip = req.socket?.remoteAddress || 'unknown'
    const entry = loginAttempts.get(ip) || { count: 0, expiresAt: now + 15 * 60 * 1000 }
    if (entry.count >= 5) return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' })
    const { password } = req.body || {}
    const expected = process.env.ADMIN_PASSWORD
    if (typeof password !== 'string' || !expected || Buffer.byteLength(password) !== Buffer.byteLength(expected) ||
        !timingSafeEqual(Buffer.from(password), Buffer.from(expected))) {
      entry.count += 1
      loginAttempts.set(ip, entry)
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }
    try {
      const token = adminSessions.create()
      setCookie(res, token, SESSION_SECONDS)
      return res.status(200).json({ ok: true })
    } catch { return res.status(503).json({ error: 'Connexion temporairement indisponible' }) }
  }

  if (req.method === 'DELETE') {
    try { adminSessions.revoke(readSessionToken(req)) }
    catch { return res.status(503).json({ error: 'Déconnexion temporairement indisponible' }) }
    setCookie(res, '', 0)
    return res.status(200).json({ ok: true })
  }
  if (req.method === 'GET') {
    const authed = isAuthedToken(readSessionToken(req))
    return res.status(authed ? 200 : 401).json({ authed })
  }
  res.setHeader('Allow', 'GET, POST, DELETE')
  return res.status(405).json({ error: 'Method not allowed' })
}
