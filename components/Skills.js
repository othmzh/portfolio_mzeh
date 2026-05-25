const SKILLS = [
  {
    icon: '⚡', title: 'Management & Delivery',
    desc: "Pilotage d'équipes agiles, coordination métier/technique, release management et gestion des priorités avec Azure DevOps.",
    tags: ['Agile/Scrum', 'Azure DevOps', 'Release Mgmt', 'Leadership'],
  },
  {
    icon: '🤖', title: 'IA Générative & Engineering',
    desc: "Intégration de Claude / Claude Code dans les workflows : revue de code assistée, prompts structurés, documentation augmentée.",
    tags: ['Claude Code', 'AI-Driven Dev', 'Prompt Eng.', 'QA IA'],
  },
  {
    icon: '🛠', title: 'Stack Technique',
    desc: "Développement full-stack orienté backend, architectures métier complexes, plateformes LMS/GED/SRM et intégrations webservices.",
    tags: ['Symfony', 'Angular', 'PHP', 'JavaScript', 'Moodle'],
  },
]

export default function Skills() {
  return (
    <section id="competences" style={s.section}>
      <div style={s.container}>
        <div style={s.label}>// domaines d'expertise</div>
        <h2 style={s.h2}>Compétences clés</h2>
        <div className="skills-grid">
          {SKILLS.map(sk => (
            <div key={sk.title} style={s.card}>
              <div style={s.header}>
                <div style={s.icon}>{sk.icon}</div>
                <h3 style={s.h3}>{sk.title}</h3>
              </div>
              <p style={s.desc}>{sk.desc}</p>
              <div style={s.tags}>
                {sk.tags.map(tag => <span key={tag} style={s.tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: { background: 'var(--bg2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '100px 5vw', position: 'relative', zIndex: 1 },
  container: { maxWidth: 1100, margin: '0 auto' },
  label: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' },
  h2: { fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '3rem', color: 'var(--text)' },
  card: { background: 'var(--bg2)', padding: '2rem' },
  header: { display: 'flex', alignItems: 'center', gap: 12, marginBottom: '1rem' },
  icon: { width: 40, height: 40, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0 },
  h3: { fontSize: 15, fontWeight: 600, color: 'var(--text)' },
  desc: { fontSize: 13, color: 'var(--text2)', lineHeight: 1.65, marginBottom: '1rem' },
  tags: { display: 'flex', flexWrap: 'wrap', gap: 6 },
  tag: { fontFamily: 'var(--mono)', fontSize: 11, padding: '3px 9px', borderRadius: 4, background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--tag-border)' },
}
