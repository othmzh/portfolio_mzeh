import styles from '../styles/Skills.module.css'
import { useTranslation } from '../hooks/useTranslation'


export default function Skills() {
  const { t, locale, content } = useTranslation()
  const SKILLS = content['skills']

  return (
    <section id="competences" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('skills.label')}</div>
        <h2 className={styles.h2}>{t('skills.heading')}</h2>
        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <div
              key={sk.title}
              className={`skill-card ${styles.card}`}
            >
              <div className={styles.header}>
                <div className={styles.icon}>{sk.icon}</div>
                <h3 className={styles.h3}>{sk.title}</h3>
              </div>
              <p className={styles.desc}>{sk.desc}</p>
              <div className={styles.tags}>
                {sk.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
