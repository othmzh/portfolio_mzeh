import fs from 'fs'
import path from 'path'
import { isAuthedToken } from './admin-auth'

const ALLOWED_FILES = ['skills', 'experience', 'certifications', 'contact', 'hero']

function isAuthed(req) {
  const cookie = req.headers.cookie || ''
  const token = cookie.split(';').map(c => c.trim()).find(c => c.startsWith('admin_session='))?.split('=')[1]
  return isAuthedToken(token)
}

export default function handler(req, res) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(403).json({ error: 'Admin non disponible en production' })
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  if (!isAuthed(req)) {
    return res.status(401).json({ error: 'Non autorisé' })
  }

  const { file, data } = req.body
  if (!file || !ALLOWED_FILES.includes(file)) {
    return res.status(400).json({ error: 'Invalid file name' })
  }

  const filePath = path.join(process.cwd(), 'data', `${file}.json`)
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8')
    res.status(200).json({ ok: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
