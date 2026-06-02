import crypto from 'crypto'

const COOKIE = 'admin_session'

function generateToken() {
  return crypto.randomBytes(32).toString('hex')
}

function setCookie(res, value, maxAge) {
  const secure = process.env.NODE_ENV === 'production' ? 'Secure; ' : ''
  res.setHeader('Set-Cookie', `${COOKIE}=${value}; ${secure}HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}`)
}

function isValidToken(token) {
  if (!token || token.length !== 64) return false
  // Only hex chars
  return /^[0-9a-f]{64}$/.test(token)
}

// Simple in-memory store for rate limiting
const loginAttempts = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const window = 15 * 60 * 1000 // 15 minutes
  const maxAttempts = 5

  const attempts = loginAttempts.get(ip) || []
  const recent = attempts.filter(t => now - t < window)
  loginAttempts.set(ip, recent)

  if (recent.length >= maxAttempts) return true
  return false
}

function recordAttempt(ip) {
  const attempts = loginAttempts.get(ip) || []
  attempts.push(Date.now())
  loginAttempts.set(ip, attempts)
}

// In-memory session store (resets on server restart — acceptable for local admin only)
const sessions = new Set()

export function isAuthedToken(token) {
  return isValidToken(token) && sessions.has(token)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'

    if (isRateLimited(ip)) {
      return res.status(429).json({ error: 'Trop de tentatives. Réessayez dans 15 minutes.' })
    }

    const { password } = req.body
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      recordAttempt(ip)
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }

    const token = generateToken()
    sessions.add(token)
    setCookie(res, token, 60 * 60 * 8) // 8h
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    const cookie = req.headers.cookie || ''
    const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith(`${COOKIE}=`))?.split('=')[1]
    if (token) sessions.delete(token)
    setCookie(res, '', 0)
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'GET') {
    const cookie = req.headers.cookie || ''
    const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith(`${COOKIE}=`))?.split('=')[1]
    const authed = isAuthedToken(token)
    return res.status(authed ? 200 : 401).json({ authed })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
