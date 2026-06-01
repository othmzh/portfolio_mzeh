const COOKIE = 'admin_session'
const TOKEN = 'ok'

function setCookie(res, value, maxAge) {
  res.setHeader('Set-Cookie', `${COOKIE}=${value}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${maxAge}`)
}

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body
    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ error: 'Mot de passe incorrect' })
    }
    setCookie(res, TOKEN, 60 * 60 * 8) // 8h
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'DELETE') {
    setCookie(res, '', 0)
    return res.status(200).json({ ok: true })
  }

  if (req.method === 'GET') {
    const cookie = req.headers.cookie || ''
    const authed = cookie.split(';').some(c => c.trim() === 'admin_session=ok')
    return res.status(authed ? 200 : 401).json({ authed })
  }

  return res.status(405).json({ error: 'Method not allowed' })
}
