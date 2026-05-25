import styles from '../styles/Certifications.module.css'

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
            <div key={i} className={`cert-card ${styles.card}`}>
              <div className={styles.idx}>{String(i + 1).padStart(2, '0')} —</div>
              <div className={styles.name}>{cert}</div>
            </div>
          ))}
        </div>
        <p className={styles.footer}>// Formation — Maîtrise en Informatique Appliquée</p>
      </div>
    </section>
  )
}
