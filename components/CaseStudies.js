import Link from 'next/link'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/CaseStudies.module.css'

export default function CaseStudies() {
  const { t, locale, content } = useTranslation()
  const cases = content['case-studies']

  return (
    <section id="case-studies" className={styles.section} aria-labelledby="cases-heading">
      <div className={styles.container}>
        <div className={styles.label}>{t('cases.label')}</div>
        <div className={styles.headingRow}>
          <h2 id="cases-heading" className={styles.heading}>{t('cases.heading')}</h2>
          <p className={styles.intro}>{t('cases.intro')}</p>
        </div>
        <div className={styles.grid}>
          {cases.map(item => (
            <article key={item.slug} className={styles.card}>
              <div className={styles.category}>{item.category}</div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.summary}>{item.summary}</p>
              <div className={styles.result}>
                <span className={styles.resultLabel}>{t('cases.result')}</span>
                <p>{item.result}</p>
              </div>
              <Link href={`/realisations/${item.slug}`} locale={locale} className={styles.readLink}>
                {t('cases.read')}
                <span className={styles.srOnly}> : {item.title}</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
