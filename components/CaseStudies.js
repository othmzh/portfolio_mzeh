import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/CaseStudies.module.css'

const labels = {
  fr: { section: 'Études de cas', context: 'Contexte', action: 'Action', result: 'Résultat', link: 'Voir le projet ↗' },
  en: { section: 'Case studies', context: 'Context', action: 'Action', result: 'Result', link: 'View project ↗' },
}

export default function CaseStudies() {
  const { locale, content } = useTranslation()
  const copy = labels[locale] ?? labels.fr
  const cases = content['case-studies']

  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.label}>{copy.section}</h2>
        <div className={styles.grid}>
          {cases.map((item, index) => (
            <article
              key={item.title}
              className={styles.card}
            >
              <h3 className={styles.title}>{item.title}</h3>
              <div className={styles.item}>
                <span className={styles.itemLabel}>{copy.context}</span>
                <p>{item.context}</p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemLabel}>{copy.action}</span>
                <p>{item.action}</p>
              </div>
              <div className={styles.item}>
                <span className={styles.itemLabel}>{copy.result}</span>
                <p>{item.result}</p>
              </div>
              {item.url && (
                <a href={item.url} target="_blank" rel="noreferrer" className={styles.projectLink}>
                  {item.linkLabel || copy.link}
                </a>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
