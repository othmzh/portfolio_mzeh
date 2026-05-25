import Image from 'next/image'

const c = {
  comment: '#4a5568', key: '#0097ff', str: '#00d4aa',
  num: '#f97316', bool: '#a78bfa', bracket: '#8896a6',
}

const LINES = [
  { t: 'comment', text: '// Othmen Mzeh — profile' },
  { t: 'bracket', text: '{' },
  { t: 'kv', key: '"name"',       val: '"Othmen Mzeh"',        vt: 'str' },
  { t: 'kv', key: '"role"',       val: '"Engineering Manager"', vt: 'str' },
  { t: 'kv', key: '"experience"', val: '15',                    vt: 'num' },
  { t: 'kv', key: '"team_size"',  val: '6',                     vt: 'num' },
  { t: 'kv', key: '"ai_powered"', val: 'true',                  vt: 'bool' },
  { t: 'kv', key: '"location"',   val: '"Tunisie 🇹🇳"',        vt: 'str' },
  { t: 'kv', key: '"status"',     val: '"available"',           vt: 'str', comma: false },
  { t: 'blank' },
  { t: 'comment', text: '// Management & Delivery' },
  { t: 'arrOpen', key: '"management"' },
  { t: 'items', items: ['"Agile/Scrum"', '"Azure DevOps"'] },
  { t: 'items', items: ['"Release Mgmt"', '"Leadership"'] },
  { t: 'arrClose', last: false },
  { t: 'blank' },
  { t: 'comment', text: '// IA Générative' },
  { t: 'arrOpen', key: '"ai_skills"' },
  { t: 'items', items: ['"Claude Code"', '"Prompt Eng."'] },
  { t: 'items', items: ['"AI Code Review"', '"QA IA"'] },
  { t: 'arrClose', last: false },
  { t: 'blank' },
  { t: 'comment', text: '// Stack Technique' },
  { t: 'arrOpen', key: '"tech"' },
  { t: 'items', items: ['"Symfony"', '"Angular"', '"PHP"'] },
  { t: 'items', items: ['"JavaScript"', '"Moodle"'] },
  { t: 'arrClose', last: true },
  { t: 'end' },
]

function Line({ l }) {
  if (l.t === 'blank') return <br />
  if (l.t === 'comment') return <div><span style={{ color: c.comment }}>{l.text}</span></div>
  if (l.t === 'bracket') return <div><span style={{ color: c.bracket }}>{l.text}</span></div>
  if (l.t === 'end') return (
    <div>
      <span style={{ color: c.bracket }}>{'}'}</span>
      <span style={{ display:'inline-block', width:8, height:14, background:'var(--accent)', verticalAlign:'middle', animation:'blink 1s infinite' }} />
    </div>
  )
  if (l.t === 'kv') return (
    <div>
      &nbsp;&nbsp;<span style={{ color: c.key }}>{l.key}</span>
      <span style={{ color: c.bracket }}>: </span>
      <span style={{ color: c[l.vt] }}>{l.val}</span>
      {l.comma !== false && <span style={{ color: c.bracket }}>,</span>}
    </div>
  )
  if (l.t === 'arrOpen') return (
    <div>&nbsp;&nbsp;<span style={{ color: c.key }}>{l.key}</span><span style={{ color: c.bracket }}>: [</span></div>
  )
  if (l.t === 'items') return (
    <div>
      &nbsp;&nbsp;&nbsp;&nbsp;
      {l.items.map((item, i) => (
        <span key={i}>
          <span style={{ color: c.str }}>{item}</span>
          {i < l.items.length - 1 && <span style={{ color: c.bracket }}>, </span>}
        </span>
      ))}
    </div>
  )
  if (l.t === 'arrClose') return <div>&nbsp;&nbsp;<span style={{ color: c.bracket }}>{l.last ? ']' : '],'}</span></div>
  return null
}

export default function Hero() {
  return (
    <section id="hero" style={s.section}>
      <div style={s.wrapper}>
        <div className="hero-grid">
          {/* LEFT */}
          <div>
            <div style={s.photoWrap}>
              <Image src="/othmen.png" alt="Othmen Mzeh" width={68} height={68} style={s.photo} />
              <div>
                <div style={s.photoName}>Othmen Mzeh</div>
                <div style={s.photoRole}>Engineering Manager · Tunisie 🇹🇳</div>
              </div>
            </div>

            <div style={s.eyebrow}>// Engineering Manager × AI-Driven Leader</div>

            <h1 style={s.h1}>
              <span style={s.dim}>Othmen</span>
              <span style={s.accent}>Mzeh</span>
              <span style={{ ...s.dim, fontSize: '0.58em', letterSpacing: '-0.01em' }}>15+ ans d'impact</span>
            </h1>

            <p style={s.desc}>
              Pilotage d'équipes techniques, delivery logiciel de qualité et intégration de l'IA générative dans les pratiques engineering.
            </p>

            <div style={s.cta}>
              <a href="#experience" style={s.btnPrimary}>Voir le parcours →</a>
              <a href="#ai-chat" style={s.btnGhost}>Parler à l'IA ✦</a>
            </div>
          </div>

          {/* RIGHT — terminal (hidden on mobile via CSS) */}
          <div className="terminal-card" style={s.terminal}>
            <div style={s.termBar}>
              {['#ff5f57','#febc2e','#28c840'].map(bg => (
                <span key={bg} style={{ ...s.dot, background: bg }} />
              ))}
              <span style={s.termTitle}>profile.json</span>
            </div>
            <div style={s.termBody}>
              {LINES.map((l, i) => <Line key={i} l={l} />)}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="stats-bar">
          {[['15+', "Années d'expérience"], ['6', 'Ingénieurs managés'], ['5', 'Certifications']].map(([num, lbl]) => (
            <div key={lbl} style={s.statCell}>
              <div style={s.statNum}>{num}</div>
              <div style={s.statLbl}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const s = {
  section: { minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 5vw 0', position: 'relative', zIndex: 1 },
  wrapper: { maxWidth: 1100, width: '100%', margin: '0 auto' },
  photoWrap: { display: 'flex', alignItems: 'center', gap: 14, marginBottom: '2rem', flexWrap: 'wrap' },
  photo: { borderRadius: '50%', border: '2px solid var(--accent)', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0 },
  photoName: { fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--text)' },
  photoRole: { fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--accent)', marginTop: 2 },
  eyebrow: {
    display: 'inline-flex', alignItems: 'center', gap: 8,
    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em',
    color: 'var(--accent2)', background: 'rgba(0,151,255,0.08)',
    border: '1px solid rgba(0,151,255,0.2)',
    padding: '6px 14px', borderRadius: 4, marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  h1: { fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'var(--text)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', fontSize: 'clamp(36px,6vw,68px)' },
  dim: { color: 'var(--text2)', fontWeight: 300 },
  accent: { color: 'var(--accent)' },
  desc: { fontSize: 'clamp(14px,2vw,17px)', fontWeight: 300, color: 'var(--text2)', maxWidth: 500, marginBottom: '2.5rem', lineHeight: 1.75 },
  cta: { display: 'flex', gap: '1rem', flexWrap: 'wrap' },
  btnPrimary: { display: 'inline-flex', alignItems: 'center', padding: '13px 26px', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: 'var(--accent)', color: 'var(--btn-primary-text)', fontFamily: 'var(--sans)' },
  btnGhost: { display: 'inline-flex', alignItems: 'center', padding: '13px 26px', borderRadius: 6, fontSize: 13, fontWeight: 600, textDecoration: 'none', background: 'transparent', color: 'var(--text2)', border: '1px solid var(--border2)', fontFamily: 'var(--sans)' },
  terminal: { background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 10, overflow: 'hidden' },
  termBar: { background: 'var(--surface2)', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid var(--border)' },
  dot: { width: 10, height: 10, borderRadius: '50%', display: 'inline-block' },
  termTitle: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', marginLeft: 'auto', marginRight: 'auto' },
  termBody: { padding: 20, fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.85, overflowX: 'auto' },
  statCell: { background: 'var(--bg2)', padding: '1.5rem 2rem', textAlign: 'center' },
  statNum: { fontFamily: 'var(--mono)', fontSize: 'clamp(24px,4vw,32px)', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 },
  statLbl: { fontSize: 12, color: 'var(--text2)', marginTop: 4, letterSpacing: '0.05em' },
}
