import styles from '../styles/Experience.module.css'
import { useTranslation } from '../hooks/useTranslation'


export default function Experience() {
  const { t, locale, content } = useTranslation()
  const EXPERIENCES = content['experience']

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('experience.label')}</div>
        <h2 className={styles.h2}>{t('experience.heading')}</h2>
        <div>
          {EXPERIENCES.map((exp, i) => (
            <div
              key={i}
              className="exp-item"
            >
              <div>
                <div className={styles.period}>{exp.period}</div>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.loc}>{exp.loc}</div>
              </div>
              <div>
                <div className={styles.title}>{exp.title}</div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}><span className={styles.bulletMark}>//</span>{b}</li>
                  ))}
                </ul>
                {exp.ai && <span className={styles.badge}>{t('experience.ai.badge')}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
