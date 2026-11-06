import styles from '../styles/Certifications.module.css'
import { useTranslation } from '../hooks/useTranslation'

const CERT_GROUPS = ['professional', 'preparation', 'cloud', 'ai']

export default function Certifications() {
  const { t, locale, content } = useTranslation()
  const CERTS = content['certifications']

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
              <div
                className={`${styles.group} ${group === 'preparation' ? styles.preparation : ''}`}
                key={group}
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
              </div>
            )
          })}
        </div>
        <p className={styles.footer}>{t('certifications.footer')}</p>
      </div>
    </section>
  )
}
