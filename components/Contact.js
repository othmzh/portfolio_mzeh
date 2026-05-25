import styles from '../styles/Contact.module.css'
import { motion } from 'framer-motion'

const LINKS = [
  { icon: '✉️', label: 'Email',     sub: 'oth.mzh@gmail.com',          href: 'mailto:oth.mzh@gmail.com' },
  { icon: '📞', label: 'Téléphone', sub: '+216 53 795 988',             href: 'tel:+21653795988' },
  { icon: '💼', label: 'LinkedIn',  sub: 'linkedin.com/in/othmen-mzeh', href: 'https://linkedin.com/in/othmen-mzeh-64740961' },
]

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className="contact-grid">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <div className={styles.label}>// entrer en contact</div>
          <h2 className={styles.h2}>Travaillons<br />ensemble</h2>
          <p className={styles.intro}>
            Engineering Manager avec une approche hybride : management humain, expertise technique et intégration de l'IA dans les pratiques engineering.
          </p>
          <p className={styles.introSecond}>
            Ouvert à de nouvelles opportunités en Tunisie ou à distance.
          </p>
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
