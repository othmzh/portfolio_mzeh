import styles from '../styles/Certifications.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'
import certsFr from '../data/fr/certifications.fr.json'
import certsEn from '../data/en/certifications.en.json'

const certsByLocale = { fr: certsFr, en: certsEn }

export default function Certifications() {
  const { t, locale } = useTranslation()
  const CERTS = certsByLocale[locale] ?? certsByLocale.fr

  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('certifications.label')}</div>
        <h2 className={styles.h2}>{t('certifications.heading')}</h2>
        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <motion.div
              key={i}
              className={`cert-card ${styles.card}`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.08 }}
            >
              <div className={styles.idx}>{String(i + 1).padStart(2, '0')} —</div>
              <div className={styles.name}>{cert}</div>
            </motion.div>
          ))}
        </div>
        <p className={styles.footer}>{t('certifications.footer')}</p>
      </div>
    </section>
  )
}
