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
    ...chunk(term.management, 2).map((items, i, chunks) => ({ t: 'items', items: items.map(s => `"${s}"`), comma: i < chunks.length - 1 })),
    { t: 'arrClose', last: false },
    { t: 'blank' },
    { t: 'comment', text: t('terminal.comment.ai') },
    { t: 'arrOpen', key: '"ai_skills"' },
    ...chunk(term.ai_skills, 2).map((items, i, chunks) => ({ t: 'items', items: items.map(s => `"${s}"`), comma: i < chunks.length - 1 })),
    { t: 'arrClose', last: false },
    { t: 'blank' },
    { t: 'comment', text: t('terminal.comment.tech') },
    { t: 'arrOpen', key: '"tech"' },
    ...chunk(term.tech, 3).map((items, i, chunks) => ({ t: 'items', items: items.map(s => `"${s}"`), comma: i < chunks.length - 1 })),
    { t: 'arrClose', last: true },
    { t: 'end' },
  ]
}


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
      {l.comma && <span style={{ color: c.bracket }}>,</span>}
    </div>
  )
  if (l.t === 'arrClose') return <div>&nbsp;&nbsp;<span style={{ color: c.bracket }}>{l.last ? ']' : '],'}</span></div>
  return null
}
