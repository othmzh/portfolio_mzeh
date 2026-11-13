import { readFile } from 'node:fs/promises'
import path from 'node:path'

const CONTENT_COLLECTIONS = new Set(['hero', 'skills', 'experience', 'case-studies', 'certifications', 'testimonials', 'contact'])
const languageFor = locale => locale === 'en' ? 'en' : 'fr'
const readJson = async relative => JSON.parse(await readFile(path.join(process.cwd(), relative), 'utf8'))

export async function loadContentCollection(name, locale = 'fr') {
  if (!CONTENT_COLLECTIONS.has(name)) throw new Error('Unknown public content collection')
  const language = languageFor(locale)
  return readJson(`data/${language}/${name}.${language}.json`)
}

export async function loadPortfolioContent(locale = 'fr') {
  const content = {}
  await Promise.all([...CONTENT_COLLECTIONS].map(async name => {
    content[name] = await loadContentCollection(name, locale)
  }))
  return content
}

export async function loadPublicProps(locale = 'fr', withContent = false) {
  const language = languageFor(locale)
  const dictionary = await readJson(`locales/${language}.json`)
  const content = withContent ? await loadPortfolioContent(language) : {}
  return { dictionary, content }
}
