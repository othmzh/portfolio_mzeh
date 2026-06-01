import heroData from '../data/hero.json'

// Texte extrait du terminal, lisible par les crawlers (visuellement masqué)
export function TerminalSEOText() {
  const t = heroData.terminal
  return (
    <div aria-hidden="false" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
      <p>{t.name} — {t.role}. {t.experience} ans d'expérience. Équipe de {t.team_size} ingénieurs. Localisation : {t.location}. Statut : {t.status}.</p>
      <p>Management : {t.management.join(', ')}.</p>
      <p>Compétences IA : {t.ai_skills.join(', ')}.</p>
      <p>Stack technique : {t.tech.join(', ')}.</p>
    </div>
  )
}

const c = {
  comment: '#8496a6', key: '#0097ff', str: '#00d4aa',
  num: '#f97316', bool: '#a78bfa', bracket: '#8896a6',
}

const t = heroData.terminal

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export const LINES = [
  { t: 'comment', text: `// ${t.name} — profile` },
  { t: 'bracket', text: '{' },
  { t: 'kv', key: '"name"',       val: `"${t.name}"`,   vt: 'str' },
  { t: 'kv', key: '"role"',       val: `"${t.role}"`,   vt: 'str' },
  { t: 'kv', key: '"experience"', val: String(t.experience), vt: 'num' },
  { t: 'kv', key: '"team_size"',  val: String(t.team_size),  vt: 'num' },
  { t: 'kv', key: '"ai_powered"', val: String(t.ai_powered), vt: 'bool' },
  { t: 'kv', key: '"location"',   val: `"${t.location}"`,    vt: 'str' },
  { t: 'kv', key: '"status"',     val: `"${t.status}"`,      vt: 'str', comma: false },
  { t: 'blank' },
  { t: 'comment', text: '// Management & Delivery' },
  { t: 'arrOpen', key: '"management"' },
  ...chunk(t.management, 2).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
  { t: 'arrClose', last: false },
  { t: 'blank' },
  { t: 'comment', text: '// IA Générative' },
  { t: 'arrOpen', key: '"ai_skills"' },
  ...chunk(t.ai_skills, 2).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
  { t: 'arrClose', last: false },
  { t: 'blank' },
  { t: 'comment', text: '// Stack Technique' },
  { t: 'arrOpen', key: '"tech"' },
  ...chunk(t.tech, 3).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
  { t: 'arrClose', last: true },
  { t: 'end' },
]

export function Line({ l }) {
  if (l.t === 'blank') return <br />
  if (l.t === 'comment') return <div><span style={{ color: c.comment }}>{l.text}</span></div>
  if (l.t === 'bracket') return <div><span style={{ color: c.bracket }}>{l.text}</span></div>
  if (l.t === 'end') return (
    <div>
      <span style={{ color: c.bracket }}>{'}'}</span>
      <span style={{ display: 'inline-block', width: 8, height: 14, background: 'var(--accent)', verticalAlign: 'middle', animation: 'blink 1s infinite' }} />
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
