import fs from 'fs'
import path from 'path'
import { isAuthedToken } from './admin-auth'

function isAuthed(req) {
  const cookie = req.headers.cookie || ''
  const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_session='))?.split('=')[1]
  return isAuthedToken(token)
}

export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Upload non disponible en production' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  const { filename, base64 } = req.body

  if (!filename || !base64) {
    return res.status(400).json({ error: 'filename et base64 requis' })
  }

  const ext = path.extname(filename).toLowerCase()
  const allowed = ['.png', '.jpg', '.jpeg', '.webp', '.avif']
  if (!allowed.includes(ext)) {
    return res.status(400).json({ error: 'Format non autorisé (png, jpg, webp, avif)' })
  }

  const data = base64.replace(/^data:image\/\w+;base64,/, '')
  const buffer = Buffer.from(data, 'base64')

  const destPath = path.join(process.cwd(), 'public', 'othmen' + ext)
  try {
    fs.writeFileSync(destPath, buffer)
    res.status(200).json({ ok: true, path: '/othmen' + ext })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
