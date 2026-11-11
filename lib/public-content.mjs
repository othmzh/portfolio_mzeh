import { readFile } from 'node:fs/promises'
import path from 'node:path'

export async function loadPortfolioContent(locale = 'fr') {
  const language = locale === 'en' ? 'en' : 'fr'
  const content = {}
  await Promise.all(['hero', 'skills', 'experience', 'case-studies', 'certifications', 'testimonials', 'contact'].map(async name => {
    content[name] = JSON.parse(await readFile(path.join(process.cwd(), `data/${language}/${name}.${language}.json`), 'utf8'))
  }))
  return content
}

export async function loadPublicProps(locale = 'fr', withContent = false) {
  const language = locale === 'en' ? 'en' : 'fr'
  const read = async relative => JSON.parse(await readFile(path.join(process.cwd(), relative), 'utf8'))
  const dictionary = await read(`locales/${language}.json`)
  const content = withContent ? await loadPortfolioContent(language) : {}
  return { dictionary, content }
}
