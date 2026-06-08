import styles from '../styles/Skills.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'
import skillsFr from '../data/fr/skills.fr.json'
import skillsEn from '../data/en/skills.en.json'

const skillsByLocale = { fr: skillsFr, en: skillsEn }

export default function Skills() {
  const { t, locale } = useTranslation()
  const SKILLS = skillsByLocale[locale] ?? skillsByLocale.fr

  return (
    <section id="competences" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('skills.label')}</div>
        <h2 className={styles.h2}>{t('skills.heading')}</h2>
        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <motion.div
              key={sk.title}
              className={`skill-card ${styles.card}`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className={styles.header}>
                <div className={styles.icon}>{sk.icon}</div>
                <h3 className={styles.h3}>{sk.title}</h3>
              </div>
              <p className={styles.desc}>{sk.desc}</p>
              <div className={styles.tags}>
                {sk.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
