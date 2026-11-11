import test from 'node:test'
import assert from 'node:assert/strict'
import { mkdtemp, cp, readFile, writeFile, rm } from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { buildChatProfile, getChatProfile } from '../lib/chat-profile.mjs'
import { loadPortfolioContent } from '../lib/public-content.mjs'

const facts = prompt => JSON.parse(prompt.split('--- DONNÉES DU PROFIL ---\n')[1])

test('assistant facts cover the verified career and distinguish preparations from attained credentials', async () => {
  const prompt = await getChatProfile('fr')
  const knowledge = facts(prompt)
  assert.deepEqual(knowledge.careerGoals.priorityMissions, ['Pilotage de projets IT', 'Pilotage du delivery technique'])
  assert.match(knowledge.availability, /CDI.*freelance/)
  assert.match(JSON.stringify(knowledge.experience), /autoévaluation.*écarts.*automatique/)
  assert.match(JSON.stringify(knowledge.experience), /Excel.*webservices/)
  assert.match(JSON.stringify(knowledge.skills), /PHP.*Symfony.*Angular.*JavaScript/)
  assert.ok(knowledge.certificationsAndAttestations.some(item => item.name.includes('Claude 101')))
  assert.ok(!knowledge.certificationsAndAttestations.some(item => /PMP/.test(item.name)))
  assert.ok(knowledge.preparations.some(item => /PMP/.test(item.name)))
  assert.equal(knowledge.education[0].period, '2004–2008')
  assert.match(prompt, /Aucun avant\/après chiffré fiable/)
  assert.match(await getChatProfile('en'), /Always respond in English/)
})

test('the provider receives project facts without employer/client identifiers or reference URLs', async () => {
  const content = await loadPortfolioContent('fr')
  const briefing = JSON.parse(await readFile('data/assistant-profile.json', 'utf8'))
  // Future source content can carry identifiers outside the company field.
  content['case-studies'].push({
    title: 'Projet de OneTech',
    context: 'ONEtech et Witik : https://client.example.test/private-reference.pdf',
    action: 'Coordination produit/QA/développement',
    result: 'Livraison fonctionnelle sans gain chiffré',
    url: 'https://client.example.test/identifier',
  })
  const prompt = buildChatProfile(content, briefing)
  for (const identifier of [...content.experience.map(item => item.company), ...briefing.clientNamesToAnonymize, 'sofia-technologies.com', 'client.example.test']) {
    assert.ok(!prompt.toLowerCase().includes(identifier.toLowerCase()), identifier)
  }
  const knowledge = facts(prompt)
  assert.ok(!('testimonials' in knowledge))
  assert.ok(knowledge.projects.every(item => !('url' in item)))
  assert.match(JSON.stringify(knowledge.projects), /Coordination produit\/QA\/développement/)
  assert.equal(knowledge.identity.portfolioUrl, 'https://omzeh.tn')
  assert.match(knowledge.identity.linkedinUrl, /othmen-mzeh/)
  assert.ok(knowledge.certificationsAndAttestations.some(item => item.issuer === 'Anthropic'))
})

test('changes to portfolio JSON are reflected by the next assistant request', async () => {
  const initialDirectory = process.cwd()
  const temporaryDirectory = await mkdtemp(path.join(os.tmpdir(), 'portfolio-chat-profile-'))
  try {
    await cp(path.join(initialDirectory, 'data'), path.join(temporaryDirectory, 'data'), { recursive: true })
    process.chdir(temporaryDirectory)
    const initial = await getChatProfile()
    const skillsPath = path.join(temporaryDirectory, 'data/fr/skills.fr.json')
    const skills = JSON.parse(await readFile(skillsPath, 'utf8'))
    skills[0].desc = 'Coordination d’un programme de migration IT documenté dans le portfolio.'
    await writeFile(skillsPath, JSON.stringify(skills))
    const refreshed = await getChatProfile()
    assert.ok(!initial.includes('programme de migration IT documenté'))
    assert.ok(refreshed.includes('programme de migration IT documenté'))
  } finally {
    process.chdir(initialDirectory)
    assert.equal(path.dirname(temporaryDirectory), path.resolve(os.tmpdir()))
    await rm(temporaryDirectory, { recursive: true, force: true })
  }
})
