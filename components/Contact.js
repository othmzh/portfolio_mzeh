import styles from '../styles/Contact.module.css'
import { motion } from 'framer-motion'
import { useTranslation } from '../hooks/useTranslation'
import contactFr from '../data/fr/contact.fr.json'
import contactEn from '../data/en/contact.en.json'

const contactByLocale = { fr: contactFr, en: contactEn }

export default function Contact() {
  const { t, locale } = useTranslation()
  const contactData = contactByLocale[locale] ?? contactByLocale.fr
  const { intro, introSecond, links: LINKS } = contactData

  return (
    <section id="contact" className={styles.section}>
      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.label}>{t('contact.label')}</div>
          <h2 className={styles.h2}>{t('contact.heading').split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}</h2>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.introSecond}>{introSecond}</p>
        </motion.div>
        <motion.div
          className={styles.links}
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
        >
          {LINKS.map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`contact-link ${styles.link}`}>
              <div className={styles.icon}>{l.icon}</div>
              <div>
                <div className={styles.linkLabel}>{l.label}</div>
                <div className={styles.linkSub}>{l.sub}</div>
              </div>
              <div className={styles.arr}>→</div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
