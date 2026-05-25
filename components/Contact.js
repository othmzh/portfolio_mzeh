const LINKS = [
  { icon: '✉️', label: 'Email',     sub: 'oth.mzh@gmail.com',          href: 'mailto:oth.mzh@gmail.com' },
  { icon: '📞', label: 'Téléphone', sub: '+216 53 795 988',             href: 'tel:+21653795988' },
  { icon: '💼', label: 'LinkedIn',  sub: 'linkedin.com/in/othmen-mzeh', href: 'https://linkedin.com/in/othmen-mzeh-64740961' },
]

export default function Contact() {
  return (
    <section id="contact" style={s.section}>
      <div className="contact-grid">
        <div>
          <div style={s.label}>// entrer en contact</div>
          <h2 style={s.h2}>Travaillons<br />ensemble</h2>
          <p style={s.intro}>
            Engineering Manager avec une approche hybride : management humain, expertise technique et intégration de l'IA dans les pratiques engineering.
          </p>
          <p style={{ ...s.intro, marginTop: '1rem' }}>
            Ouvert à de nouvelles opportunités en Tunisie ou à distance.
          </p>
        </div>
        <div style={s.links}>
          {LINKS.map(l => (
            <a key={l.label} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" style={s.link}>
              <div style={s.icon}>{l.icon}</div>
              <div>
                <div style={s.linkLabel}>{l.label}</div>
                <div style={s.linkSub}>{l.sub}</div>
              </div>
              <div style={s.arr}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: { background: 'var(--bg2)', borderTop: '1px solid var(--border)', padding: '100px 5vw', position: 'relative', zIndex: 1 },
  label: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' },
  h2: { fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '1.5rem', lineHeight: 1.2, color: 'var(--text)' },
  intro: { fontSize: 'clamp(14px,2vw,17px)', fontWeight: 300, color: 'var(--text2)', lineHeight: 1.8 },
  links: { display: 'flex', flexDirection: 'column', gap: 10, marginTop: '2rem' },
  link: { display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', border: '1px solid var(--border)', borderRadius: 8, textDecoration: 'none', color: 'var(--text)', background: 'var(--surface)' },
  icon: { width: 38, height: 38, borderRadius: 7, background: 'var(--surface2)', border: '1px solid var(--border2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flexShrink: 0 },
  linkLabel: { fontSize: 14, fontWeight: 500 },
  linkSub: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', marginTop: 2 },
  arr: { marginLeft: 'auto', color: 'var(--text3)', fontFamily: 'var(--mono)', fontSize: 14 },
}
