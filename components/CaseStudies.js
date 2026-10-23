import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/CaseStudies.module.css'
import casesFr from '../data/fr/case-studies.fr.json'
import casesEn from '../data/en/case-studies.en.json'

const casesByLocale = { fr: casesFr, en: casesEn }
const labels = {
  fr: { section: 'Études de cas', context: 'Contexte', action: 'Action', result: 'Résultat' },
  en: { section: 'Case studies', context: 'Context', action: 'Action', result: 'Result' },
}

export default function CaseStudies() {
  const { locale } = useTranslation()
  const copy = labels[locale] ?? labels.fr
  const cases = casesByLocale[locale] ?? casesByLocale.fr

  return (
    <section id="case-studies" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{copy.section}</div>
        <div className={styles.grid}>
          {cases.map((item, index) => (
            <motion.article
              key={item.title}
              className={styles.card}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.1 }}
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
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
