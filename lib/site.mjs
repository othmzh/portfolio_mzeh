export const SITE_URL = 'https://omzeh.tn'
export const CONTENT_UPDATED_AT = '2026-11-13'

export function localizedPath(path = '/', locale = 'fr') {
  const suffix = path === '/' ? '' : path
  return locale === 'en' ? `/en${suffix}` : suffix || '/'
}

export function serializeJsonLd(value) {
  return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, character =>
    `\\u${character.charCodeAt(0).toString(16).padStart(4, '0')}`
  )
}

export function createSitemap(paths) {
  const entries = paths.flatMap(path => {
    const fr = `${SITE_URL}${localizedPath(path, 'fr')}`
    const en = `${SITE_URL}${localizedPath(path, 'en')}`
    return [fr, en].map(url => `  <url>
    <loc>${url}</loc>
    <lastmod>${CONTENT_UPDATED_AT}</lastmod>
${path === '/' ? '    <changefreq>monthly</changefreq>\n    <priority>1.0</priority>\n' : ''}    <xhtml:link rel="alternate" hreflang="fr" href="${fr}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${en}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${fr}"/>
  </url>`)
  })
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>\n`
}
