import styles from '../styles/Certifications.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'

const CERTS = [
  'Scrum Foundation Professional Certificate (SFPC)',
  'Cloud Concepts 101 – Deployments Essentials',
  'Fondamentaux de la gestion de projet Agile',
  'Claude Code in Action',
  'Introduction to Agent Skills',
  'Formation PMP — Project Management Professional (en cours)',
  'Formation Lean Six Sigma (en cours)',
]

export default function Certifications() {
  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>// formations & accréditations</div>
        <h2 className={styles.h2}>Certifications</h2>
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
        <p className={styles.footer}>// Formation — Maîtrise en Informatique Appliquée</p>
      </div>
    </section>
  )
}
