import test from 'node:test'
import assert from 'node:assert/strict'
import { SITE_URL, CONTENT_UPDATED_AT, localizedPath, serializeJsonLd, createSitemap } from '../lib/site.mjs'
import { loadContentCollection } from '../lib/public-content.mjs'

test('public URLs keep home and case-study links in the requested language', () => {
  assert.equal(new URL(SITE_URL).protocol, 'https:')
  assert.equal(localizedPath('/', 'fr'), '/')
  assert.equal(localizedPath('/', 'en'), '/en')
  for (const route of ['/approche-ia-management', '/realisations/delivery-witik']) {
    assert.equal(localizedPath(route, 'fr'), route)
    assert.equal(localizedPath(route, 'en'), `/en${route}`)
    assert.equal(new URL(localizedPath(route, 'en'), SITE_URL).origin, SITE_URL)
  }
})

test('structured data cannot close its script element and retains the original values', () => {
  const document = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: '</script><script>alert("injected")</script>',
    description: 'A < B & B > C — français العربية 🙂',
    author: { name: 'A\u2028B\u2029C' },
    keywords: ['<img src=x onerror=alert(1)>', '"quoted"'],
  }
  const encoded = serializeJsonLd(document)
  assert.ok(!encoded.includes('<'), 'Raw markup must never appear in a JSON-LD script')
  assert.deepEqual(JSON.parse(encoded), document)
})

test('sitemap URLs expose reciprocal language alternates and the editorial date', () => {
  const routes = ['/', '/realisations/delivery-witik']
  const sitemap = createSitemap(routes)
  const entries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(match => match[1])
  assert.equal(entries.length, routes.length * 2)
  const expectedLocations = routes.flatMap(route => ['fr', 'en'].map(locale => `${SITE_URL}${localizedPath(route, locale)}`))
  const locations = entries.map(entry => /<loc>([^<]+)<\/loc>/.exec(entry)?.[1])
  assert.deepEqual(new Set(locations), new Set(expectedLocations))
  for (const route of routes) {
    const french = `${SITE_URL}${localizedPath(route, 'fr')}`
    const english = `${SITE_URL}${localizedPath(route, 'en')}`
    const routeEntries = entries.filter(entry => entry.includes(`<loc>${french}</loc>`) || entry.includes(`<loc>${english}</loc>`))
    assert.equal(routeEntries.length, 2)
    for (const entry of routeEntries) {
      const alternates = [...entry.matchAll(/<xhtml:link\b[^>]*>/g)].map(match => Object.fromEntries(
        [...match[0].matchAll(/([a-z-]+)="([^"]*)"/g)].map(attribute => [attribute[1], attribute[2]])
      ))
      const translations = Object.fromEntries(alternates.filter(link => link.rel === 'alternate').map(link => [link.hreflang, link.href]))
      assert.deepEqual(translations, { fr: french, en: english, 'x-default': french })
      assert.ok(entry.includes(`<lastmod>${CONTENT_UPDATED_AT}</lastmod>`))
    }
  }
})

test('public content reads reject unknown collections and use French for unsupported locales', async () => {
  for (const name of ['../hero', '../../.env', 'constructor', 'toString', 'hero.fr.json', '', null]) {
    await assert.rejects(() => loadContentCollection(name, 'fr'))
  }
  const french = await loadContentCollection('case-studies', 'fr')
  assert.deepEqual(await loadContentCollection('case-studies', 'unsupported'), french)
  assert.deepEqual(await loadContentCollection('case-studies'), french)
})

test('every case study has a unique route, matching translations and reviewable content', async () => {
  const collections = await Promise.all(['fr', 'en'].map(locale => loadContentCollection('case-studies', locale)))
  const sets = collections.map(cases => {
    assert.ok(cases.length > 0)
    const slugs = new Set()
    for (const item of cases) {
      assert.match(item.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      assert.ok(!slugs.has(item.slug), `Duplicate route: ${item.slug}`)
      slugs.add(item.slug)
      for (const field of ['title', 'summary', 'category', 'context', 'action', 'result', 'evidenceNote']) {
        assert.ok(typeof item[field] === 'string' && item[field].trim(), `${item.slug} must contain ${field}`)
      }
      assert.ok(Array.isArray(item.details) && item.details.length > 0)
      for (const section of item.details) {
        assert.ok(typeof section.title === 'string' && section.title.trim())
        assert.ok(typeof section.body === 'string' && section.body.trim())
      }
      assert.ok(Array.isArray(item.takeaways) && item.takeaways.length > 0)
      assert.ok(item.takeaways.every(value => typeof value === 'string' && value.trim()))
      if (item.url) assert.equal(new URL(item.url).protocol, 'https:')
    }
    return slugs
  })
  assert.deepEqual(sets[0], sets[1], 'Language switching must lead to a translated case study')
})
