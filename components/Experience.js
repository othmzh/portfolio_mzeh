import styles from '../styles/Experience.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'
import experienceFr from '../data/fr/experience.fr.json'
import experienceEn from '../data/en/experience.en.json'

const experienceByLocale = { fr: experienceFr, en: experienceEn }

export default function Experience() {
  const { t, locale } = useTranslation()
  const EXPERIENCES = experienceByLocale[locale] ?? experienceByLocale.fr

  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('experience.label')}</div>
        <h2 className={styles.h2}>{t('experience.heading')}</h2>
        <div>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-item"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.15 }}
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
