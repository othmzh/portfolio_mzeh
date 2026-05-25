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
    <section id="certifications" style={s.section}>
      <div style={s.container}>
        <div style={s.label}>// formations & accréditations</div>
        <h2 style={s.h2}>Certifications</h2>
        <div className="cert-grid">
          {CERTS.map((cert, i) => (
            <div key={i} style={s.card}>
              <div style={s.idx}>{String(i + 1).padStart(2, '0')} —</div>
              <div style={s.name}>{cert}</div>
            </div>
          ))}
        </div>
        <p style={s.footer}>// Formation — Maîtrise en Informatique Appliquée</p>
      </div>
    </section>
  )
}

const s = {
  section: { background: '#1a3a2a', borderTop: '1px solid #253447', borderBottom: '1px solid #253447', padding: '100px 5vw', position: 'relative', zIndex: 1 },
  container: { maxWidth: 1100, margin: '0 auto' },
  label: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: '0.75rem' },
  h2: { fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '3rem', color: '#fff' },
  card: { background: 'rgba(255,255,255,0.04)', padding: '1.75rem' },
  idx: { fontFamily: 'var(--mono)', fontSize: 11, color: '#4a7c5e', marginBottom: '0.75rem' },
  name: { fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 },
  footer: { fontFamily: 'var(--mono)', fontSize: 12, color: 'rgba(255,255,255,0.4)', marginTop: '2rem' },
}
