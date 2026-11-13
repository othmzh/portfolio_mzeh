import styles from '../styles/Experience.module.css'
import { useTranslation } from '../hooks/useTranslation'

function ExperienceBullets({ bullets }) {
  return (
    <ul className={styles.bullets}>
      {bullets.map((bullet, index) => (
        <li key={index} className={styles.bullet}><span className={styles.bulletMark} aria-hidden="true">//</span>{bullet}</li>
      ))}
    </ul>
  )
}

function ExperienceItem({ exp, t, compact = false }) {
  const responsibilities = exp.responsibilities || []
  const summarize = compact || responsibilities.length > 0
  const visibleBullets = summarize ? exp.bullets.slice(0, 3) : exp.bullets
  const remainingBullets = summarize ? exp.bullets.slice(3) : []

  return (
    <article className="exp-item">
      <div>
        <div className={styles.period}>{exp.period}</div>
        <div className={styles.company}>{exp.company}</div>
        <div className={styles.loc}>{exp.loc}</div>
      </div>
      <div>
        <h3 className={styles.title}>{exp.title}</h3>
        <ExperienceBullets bullets={visibleBullets} />
        {(remainingBullets.length > 0 || responsibilities.length > 0) && (
          <details className={styles.more}>
            <summary className={styles.summary}>{t('experience.more')}</summary>
            {responsibilities.length > 0 ? <div className={styles.responsibilities}>
              {responsibilities.map(responsibility => <div key={responsibility.title} className={styles.responsibility}>
                <h4>{responsibility.title}</h4>
                <p>{responsibility.body}</p>
              </div>)}
            </div> : <ExperienceBullets bullets={remainingBullets} />}
          </details>
        )}
        {exp.ai && <span className={styles.badge}>{t('experience.ai.badge')}</span>}
      </div>
    </article>
  )
}

export default function Experience() {
  const { t, content } = useTranslation()
  const experiences = content.experience

  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-heading">
      <div className={styles.container}>
        <div className={styles.label}>{t('experience.label')}</div>
        <h2 id="experience-heading" className={styles.h2}>{t('experience.heading')}</h2>
        <div>
          {experiences.slice(0, 2).map((exp, index) => (
            <ExperienceItem key={`${exp.company}-${exp.period}`} exp={exp} t={t} compact={index === 0} />
          ))}
        </div>
        {experiences.length > 2 && (
          <details className={styles.earlier}>
            <summary className={styles.summary}>{t('experience.earlier')}</summary>
            <div>
              {experiences.slice(2).map(exp => <ExperienceItem key={`${exp.company}-${exp.period}`} exp={exp} t={t} />)}
            </div>
          </details>
        )}
      </div>
    </section>
  )
}
