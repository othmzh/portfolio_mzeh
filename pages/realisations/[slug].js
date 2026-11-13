import Link from 'next/link'
import Nav from '../../components/Nav'
import Footer from '../../components/Footer'
import PageSeo from '../../components/PageSeo'
import { useTranslation } from '../../hooks/useTranslation'
import { loadContentCollection, loadPublicProps } from '../../lib/public-content.mjs'
import { CONTENT_UPDATED_AT, localizedPath, SITE_URL } from '../../lib/site.mjs'
import styles from '../../styles/Realisation.module.css'

export async function getStaticPaths({ locales = ['fr', 'en'] }) {
  const localizedCases = await Promise.all(locales.map(async locale => {
    const cases = await loadContentCollection('case-studies', locale)
    return cases.map(item => ({ params: { slug: item.slug }, locale }))
  }))
  return { paths: localizedCases.flat(), fallback: false }
}

export async function getStaticProps({ params, locale }) {
  if (typeof params?.slug !== 'string') return { notFound: true }
  const cases = await loadContentCollection('case-studies', locale)
  const study = cases.find(item => item.slug === params.slug)
  if (!study) return { notFound: true }

  const [publicProps, contact] = await Promise.all([
    loadPublicProps(locale),
    loadContentCollection('contact', locale),
  ])
  const cvHref = contact.links.find(link => link.href?.endsWith('.pdf'))?.href ?? null
  return { props: { ...publicProps, study, cvHref } }
}

export default function Realisation({ study, cvHref }) {
  const { t, locale } = useTranslation()
  const path = `/realisations/${study.slug}`
  const home = localizedPath('/', locale)
  const canonicalUrl = `${SITE_URL}${localizedPath(path, locale)}`
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: study.title,
    description: study.summary,
    image: `${SITE_URL}/api/og${locale === 'en' ? '?locale=en' : ''}`,
    inLanguage: locale === 'en' ? 'en-US' : 'fr-FR',
    dateModified: CONTENT_UPDATED_AT,
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
    author: {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Othmen Mzeh',
      url: SITE_URL,
    },
  }

  return (
    <>
      <PageSeo
        title={`${study.title} | Othmen Mzeh`}
        description={study.summary}
        path={path}
        locale={locale}
        type="article"
        jsonLd={[article]}
      />
      <a className={styles.skipLink} href="#main-content">{t('cases.skip')}</a>
      <Nav />
      <main id="main-content" tabIndex={-1} className={styles.page}>
        <article className={styles.article}>
          <Link href={`${home}#case-studies`} className={styles.back}>
            <span aria-hidden="true">←</span> {t('cases.back')}
          </Link>
          <header className={styles.header}>
            <div className={styles.category}>{study.category}</div>
            <h1 className={styles.title}>{study.title}</h1>
            <p className={styles.intro}>{study.summary}</p>
          </header>

          <div className={styles.overview}>
            <section className={styles.overviewItem} aria-labelledby="case-context">
              <h2 id="case-context">{t('cases.context')}</h2>
              <p>{study.context}</p>
            </section>
            <section className={styles.overviewItem} aria-labelledby="case-action">
              <h2 id="case-action">{t('cases.action')}</h2>
              <p>{study.action}</p>
            </section>
            <section className={styles.result} aria-labelledby="case-result">
              <h2 id="case-result">{t('cases.result')}</h2>
              <p>{study.result}</p>
            </section>
          </div>

          {study.details?.length > 0 && (
            <section className={styles.details} aria-labelledby="case-details">
              <h2 id="case-details" className={styles.sectionHeading}>{t('cases.details')}</h2>
              {study.details.map(detail => (
                <div key={detail.title} className={styles.detail}>
                  <h3>{detail.title}</h3>
                  <p>{detail.body}</p>
                </div>
              ))}
            </section>
          )}

          {study.takeaways?.length > 0 && (
            <section className={styles.takeaways} aria-labelledby="case-takeaways">
              <h2 id="case-takeaways" className={styles.sectionHeading}>{t('cases.takeaways')}</h2>
              <ul>
                {study.takeaways.map(takeaway => <li key={takeaway}>{takeaway}</li>)}
              </ul>
            </section>
          )}

          {(study.evidenceNote || study.url) && (
            <aside className={styles.evidence} aria-labelledby="case-evidence">
              <h2 id="case-evidence">{t('cases.evidence')}</h2>
              {study.evidenceNote && <p>{study.evidenceNote}</p>}
              {study.url && (
                <a href={study.url} target="_blank" rel="noreferrer" className={styles.reference}>
                  {study.linkLabel || t('cases.evidence')}
                </a>
              )}
            </aside>
          )}

          <div className={styles.actions}>
            <Link href={`${home}#contact`} className={styles.contactLink}>
              {t('cases.contact')}
            </Link>
            {cvHref && <a href={cvHref} download className={styles.cvLink}>{t('cases.cv')} <span aria-hidden="true">↓</span></a>}
          </div>
        </article>
      </main>
      <Footer />
    </>
  )
}
