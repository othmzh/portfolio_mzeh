import test from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { createHash } from 'node:crypto'
import { createSessionStore, SESSION_SECONDS } from '../lib/admin-sessions.mjs'

test('expiry is enforced without reload, with independent token lifetimes and cross-instance revocation', () => {
  const directory = fs.mkdtempSync(path.join(process.env.PORTFOLIO_TEST_TMP_DIR || os.tmpdir(), 'portfolio-sessions-'))
  let clock = 1000
  const first = createSessionStore(directory, () => clock)
  const second = createSessionStore(directory, () => clock)
  const a = first.create()
  clock += 3600000
  const b = second.create()
  assert.equal(second.has(a), true)
  clock = 1000 + SESSION_SECONDS * 1000 - 1
  assert.equal(first.has(a), true)
  clock += 1
  assert.equal(first.has(a), false)
  assert.equal(second.has(a), false)
  assert.equal(first.has(b), true)
  second.revoke(b)
  assert.equal(first.has(b), false)
  first.revoke(a)
  fs.rmdirSync(directory)
})

test('unknown, legacy, malformed and non-numeric sessions fail closed', () => {
  const directory = fs.mkdtempSync(path.join(process.env.PORTFOLIO_TEST_TMP_DIR || os.tmpdir(), 'portfolio-sessions-'))
  const store = createSessionStore(directory)
  for (const token of [undefined, {}, '../../outside', 'a'.repeat(64)]) assert.equal(store.has(token), false)
  const token = store.create()
  const file = path.join(directory, `${createHash('sha256').update(token).digest('hex')}.json`)
  for (const contents of ['{', JSON.stringify({ expiresAt: String(Date.now() + 100000) }), JSON.stringify({ tokens: [token] })]) {
    fs.writeFileSync(file, contents)
    assert.equal(store.has(token), false)
  }
  store.revoke(token)
  fs.rmdirSync(directory)
})
