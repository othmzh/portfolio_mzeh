import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { loadContentCollection } from '../lib/public-content.mjs'
import { createSitemap } from '../lib/site.mjs'

const cases = await loadContentCollection('case-studies', 'fr')
const paths = ['/', '/approche-ia-management', ...cases.map(item => `/realisations/${item.slug}`)]
await writeFile(path.join(process.cwd(), 'public', 'sitemap.xml'), createSitemap(paths), 'utf8')
