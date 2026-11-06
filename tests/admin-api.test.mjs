import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createHash } from 'node:crypto'
import { pathToFileURL } from 'node:url'

test('local login, save, expiry across all consumers and logout preserve their contracts', async () => {
  const repo = process.cwd()
  const directory = fs.mkdtempSync(path.join(process.env.PORTFOLIO_TEST_TMP_DIR || os.tmpdir(), 'portfolio-admin-api-'))
  process.chdir(directory)
  process.env.NODE_ENV = 'development'
  process.env.ADMIN_PASSWORD = 'test-only-password'
  const auth = (await import(pathToFileURL(path.join(repo, 'pages/api/admin-auth.js')))).default
  const save = (await import(pathToFileURL(path.join(repo, 'pages/api/admin-save.js')))).default
  const upload = (await import(pathToFileURL(path.join(repo, 'pages/api/admin-upload.js')))).default
  const response = () => ({ headers: {}, setHeader(k, v) { this.headers[k] = v }, status(code) { this.code = code; return this }, json(body) { this.body = body; return this } })
  const request = (method, body, cookie = '') => ({ method, body, headers: { cookie }, socket: { remoteAddress: '127.0.0.1' } })
  const login = response()
  auth(request('POST', { password: process.env.ADMIN_PASSWORD }), login)
  assert.equal(login.code, 200)
  const cookie = login.headers['Set-Cookie'].split(';')[0]
  assert.match(login.headers['Set-Cookie'], /HttpOnly; SameSite=Strict/)
  const token = cookie.split('=')[1]
  const file = path.join(directory, '.admin-sessions', `${createHash('sha256').update(token).digest('hex')}.json`)
  fs.mkdirSync(path.join(directory, 'data/fr'), { recursive: true })
  const saved = response()
  save(request('POST', { file: 'hero', locale: 'fr', data: { name: 'Test' } }, cookie), saved)
  assert.equal(saved.code, 200)
  assert.equal(JSON.parse(fs.readFileSync(path.join(directory, 'data/fr/hero.fr.json'))).name, 'Test')
  fs.writeFileSync(file, JSON.stringify({ expiresAt: 0 }))
  for (const handler of [auth, save, upload]) {
    const res = response()
    handler(request(handler === auth ? 'GET' : 'POST', {}, cookie), res)
    assert.equal(res.code, 401)
  }
  const logout = response()
  auth(request('DELETE', {}, cookie), logout)
  assert.equal(logout.code, 200)
  assert.equal(fs.existsSync(file), false)
  process.chdir(repo)
  // Every path is inside the fresh test-owned directory.
  fs.rmSync(directory, { recursive: true, force: true })
})
