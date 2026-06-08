import heroFr from '../data/fr/hero.fr.json'
import heroEn from '../data/en/hero.en.json'

const heroData = { fr: heroFr, en: heroEn }

// Texte extrait du terminal, lisible par les crawlers (visuellement masqué)
export function TerminalSEOText({ locale = 'fr', translations = {} }) {
  const d = heroData[locale] ?? heroData.fr
  const term = d.terminal
  const t = (key) => translations[key] ?? key

  return (
    <div aria-hidden="false" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
      <p>{term.name} — {term.role}. {term.experience} {t('terminal.seo.intro')}. {t('terminal.seo.team')} {term.team_size} {t('terminal.seo.engineers')}. {t('terminal.seo.location')} : {term.location}. {t('terminal.seo.status')} : {term.status}.</p>
      <p>{t('terminal.seo.management')} : {term.management.join(', ')}.</p>
      <p>{t('terminal.seo.aiSkills')} : {term.ai_skills.join(', ')}.</p>
      <p>{t('terminal.seo.tech')} : {term.tech.join(', ')}.</p>
    </div>
  )
}

const c = {
  comment: '#8496a6', key: '#0097ff', str: '#00d4aa',
  num: '#f97316', bool: '#a78bfa', bracket: '#8896a6',
}

function chunk(arr, size) {
  const out = []
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size))
  return out
}

export function makeLines(terminalData, translations = {}) {
  const term = terminalData
  const t = (key) => translations[key] ?? key

  return [
    { t: 'comment', text: `// ${term.name} — profile` },
    { t: 'bracket', text: '{' },
    { t: 'kv', key: '"name"',       val: `"${term.name}"`,   vt: 'str' },
    { t: 'kv', key: '"role"',       val: `"${term.role}"`,   vt: 'str' },
    { t: 'kv', key: '"experience"', val: String(term.experience), vt: 'num' },
    { t: 'kv', key: '"team_size"',  val: String(term.team_size),  vt: 'num' },
    { t: 'kv', key: '"ai_powered"', val: String(term.ai_powered), vt: 'bool' },
    { t: 'kv', key: '"location"',   val: `"${term.location}"`,    vt: 'str' },
    { t: 'kv', key: '"status"',     val: `"${term.status}"`,      vt: 'str', comma: false },
    { t: 'blank' },
    { t: 'comment', text: t('terminal.comment.management') },
    { t: 'arrOpen', key: '"management"' },
    ...chunk(term.management, 2).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
    { t: 'arrClose', last: false },
    { t: 'blank' },
    { t: 'comment', text: t('terminal.comment.ai') },
    { t: 'arrOpen', key: '"ai_skills"' },
    ...chunk(term.ai_skills, 2).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
    { t: 'arrClose', last: false },
    { t: 'blank' },
    { t: 'comment', text: t('terminal.comment.tech') },
    { t: 'arrOpen', key: '"tech"' },
    ...chunk(term.tech, 3).map(items => ({ t: 'items', items: items.map(s => `"${s}"`) })),
    { t: 'arrClose', last: true },
    { t: 'end' },
  ]
}

// Keep LINES export for backward compatibility — will use FR by default
export const LINES = makeLines(heroFr.terminal)

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
