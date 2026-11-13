import Head from 'next/head'
import { SITE_URL, localizedPath, serializeJsonLd } from '../lib/site.mjs'

export default function PageSeo({ title, description, path = '/', locale = 'fr', type = 'website', jsonLd = [] }) {
  const canonical = `${SITE_URL}${localizedPath(path, locale)}`
  const image = `${SITE_URL}/api/og${locale === 'en' ? '?locale=en' : ''}`

  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <meta name="author" content="Othmen Mzeh" />
    <meta name="robots" content="index, follow" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="alternate icon" href="/favicon.ico" />
    <link rel="canonical" href={canonical} />
    <link rel="alternate" hrefLang="fr" href={`${SITE_URL}${localizedPath(path, 'fr')}`} />
    <link rel="alternate" hrefLang="en" href={`${SITE_URL}${localizedPath(path, 'en')}`} />
    <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}${localizedPath(path, 'fr')}`} />
    <meta property="og:type" content={type} />
    <meta property="og:url" content={canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:image" content={image} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:type" content="image/png" />
    <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'fr_FR'} />
    <meta property="og:site_name" content="Othmen Mzeh" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    {jsonLd.map((value, index) => <script key={`schema-${index}`} type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(value) }} />)}
  </Head>
}
