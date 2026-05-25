const EXPERIENCES = [
  {
    period: "Sept. 2021 — Aujourd'hui", company: 'Witik', loc: 'Tunisie',
    title: 'Engineering Manager & Technical Delivery Lead',
    bullets: [
      "Pilotage d'une équipe de 6 ingénieurs en environnement agile",
      "Organisation des releases et suivi des développements via Azure DevOps",
      "Coordination entre équipes métier et techniques",
      "Revue de code assistée par IA avec Claude / Claude Code",
      "Structuration de workflows augmentés par IA : prompts, checklists qualité",
      "Recrutements techniques et amélioration continue des pratiques d'équipe",
    ],
    ai: true,
  },
  {
    period: 'Jan. 2019 — Août 2021', company: 'Sofia Holding', loc: 'Tunisie',
    title: 'Team Leader Web',
    bullets: [
      "Pilotage des projets web selon le système de management qualité",
      "Architecture technique, découpage des tâches et estimation des charges",
      "Participation aux appels d'offres, analyses d'impact et chiffrage",
      "Supervision des tests d'intégration, TNR et livraisons",
    ],
  },
  {
    period: 'Mai 2017 — Déc. 2018', company: 'Sofia Holding', loc: 'Tunisie',
    title: 'Développeur Web Senior',
    bullets: [
      "Conception et développement d'applications métiers avec Symfony et Angular",
      "Développement de plateformes e-Achat et SRM",
      "Création de plateformes collaboratives avec GED et workflows",
    ],
  },
  {
    period: 'Fév. 2013 — Avr. 2017', company: 'DTCad Engineering', loc: 'Tunisie',
    title: 'Développeur Web & Spécialiste E-learning',
    bullets: [
      "Développement d'applications métiers sous Symfony (CRM, mini-ERP)",
      "Administration et évolution de plateformes Moodle et Claroline",
      "Développement de modules et personnalisations LMS",
    ],
  },
  {
    period: 'Avr. 2011 — Jan. 2013', company: 'SIT Elearning', loc: 'Tunisie',
    title: 'Développeur Web',
    bullets: [
      "Développement de solutions e-learning basées sur Moodle",
      "Conception d'une application de gestion des compétences",
    ],
  },
]

export default function Experience() {
  return (
    <section id="experience" style={s.section}>
      <div style={s.container}>
        <div style={s.label}>// parcours professionnel</div>
        <h2 style={s.h2}>Expérience</h2>
        <div>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="exp-item">
              <div>
                <div style={s.period}>{exp.period}</div>
                <div style={s.company}>{exp.company}</div>
                <div style={s.loc}>{exp.loc}</div>
              </div>
              <div>
                <div style={s.title}>{exp.title}</div>
                <ul style={s.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} style={s.bullet}><span style={s.bulletMark}>//</span>{b}</li>
                  ))}
                </ul>
                {exp.ai && <span style={s.badge}>✦ AI-Augmented Engineering Practices</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: { padding: '100px 5vw', position: 'relative', zIndex: 1, background: 'var(--bg)' },
  container: { maxWidth: 1100, margin: '0 auto' },
  label: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' },
  h2: { fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '3rem', color: 'var(--text)' },
  period: { fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)', marginBottom: '0.35rem' },
  company: { fontFamily: 'var(--mono)', fontSize: 13, fontWeight: 700, color: 'var(--accent2)' },
  loc: { fontSize: 12, color: 'var(--text3)', marginTop: 4 },
  title: { fontSize: 'clamp(16px,2.5vw,19px)', fontWeight: 700, color: 'var(--text)', marginBottom: '1rem', letterSpacing: '-0.01em' },
  bullets: { listStyle: 'none' },
  bullet: { fontSize: 13, color: 'var(--text2)', lineHeight: 1.7, padding: '0.25rem 0', paddingLeft: '1.4rem', position: 'relative' },
  bulletMark: { position: 'absolute', left: 0, color: 'var(--accent)', fontFamily: 'var(--mono)', fontSize: 10, top: 6 },
  badge: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--mono)', fontSize: 11,
    background: 'var(--ai-badge-bg)', color: 'var(--ai-badge-color)',
    border: '1px solid var(--ai-badge-border)',
    padding: '4px 10px', borderRadius: 4, marginTop: 10,
  },
}
