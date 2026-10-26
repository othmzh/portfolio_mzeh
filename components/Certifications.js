import styles from '../styles/Certifications.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'
import certsFr from '../data/fr/certifications.fr.json'
import certsEn from '../data/en/certifications.en.json'

const certsByLocale = { fr: certsFr, en: certsEn }
const CERT_GROUPS = ['professional', 'preparation', 'cloud', 'ai']

export default function Certifications() {
  const { t, locale } = useTranslation()
  const CERTS = certsByLocale[locale] ?? certsByLocale.fr

  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('certifications.label')}</div>
        <h2 className={styles.h2}>{t('certifications.heading')}</h2>
        <div className={styles.list}>
          {CERT_GROUPS.map(group => {
            const groupCerts = CERTS.filter(cert => cert.group === group)
            if (!groupCerts.length) return null

            return (
              <motion.div
                className={`${styles.group} ${group === 'preparation' ? styles.preparation : ''}`}
                key={group}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <h3 className={styles.groupHeading}>
                  {t(`certifications.group.${group}`)}
                  {group === 'preparation' && <span className={styles.status}>{t('certifications.pmpStatus')}</span>}
                </h3>
                <div className={styles.items}>
                  {groupCerts.map(cert => (
                    <div className={styles.item} key={cert.name}>
                      <span className={styles.name}>{cert.name}</span>
                      <span className={styles.issuer}>{cert.issuer}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
        <p className={styles.footer}>{t('certifications.footer')}</p>
      </div>
    </section>
  )
}
