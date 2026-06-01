import { useState, useEffect } from 'react'
import Head from 'next/head'
import skillsData from '../data/skills.json'
import experienceData from '../data/experience.json'
import certificationsData from '../data/certifications.json'
import contactData from '../data/contact.json'
import heroData from '../data/hero.json'

// ─── helpers ──────────────────────────────────────────────────────────────────

async function save(file, data) {
  const res = await fetch('/api/admin-save', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ file, data }),
  })
  if (!res.ok) throw new Error((await res.json()).error)
}

function useDraft(initial) {
  const [draft, setDraft] = useState(JSON.parse(JSON.stringify(initial)))
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState(null)
  return { draft, setDraft, saved, setSaved, error, setError }
}

// ─── shared UI ────────────────────────────────────────────────────────────────

function SaveBtn({ onClick }) {
  return (
    <button onClick={onClick} style={s.saveBtn}>
      Enregistrer
    </button>
  )
}

function Toast({ saved, error }) {
  if (!saved && !error) return null
  return (
    <div style={{ ...s.toast, background: error ? '#ff4444' : '#00d4aa' }}>
      {error ? `Erreur : ${error}` : 'Sauvegardé ✓'}
    </div>
  )
}

function SectionWrap({ title, children }) {
  return (
    <div style={s.section}>
      <h2 style={s.sectionTitle}>{title}</h2>
      {children}
    </div>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────

function PhotoUploader() {
  const [preview, setPreview] = useState('/othmen.png')
  const [uploading, setUploading] = useState(false)
  const [msg, setMsg] = useState(null)

  const handleFile = e => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setPreview(ev.target.result)
    reader.readAsDataURL(file)
  }

  const handleUpload = async () => {
    if (!preview.startsWith('data:')) return
    setUploading(true); setMsg(null)
    try {
      const filename = 'othmen.png'
      const res = await fetch('/api/admin-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ filename, base64: preview }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setMsg({ ok: true, text: 'Photo mise à jour ✓' })
      setTimeout(() => setMsg(null), 3000)
    } catch (e) {
      setMsg({ ok: false, text: `Erreur : ${e.message}` })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div style={{ marginBottom: 24 }}>
      <h3 style={s.sub}>Photo de profil</h3>
      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
        <img
          src={preview}
          alt="Aperçu"
          style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '2px solid #30363d' }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <input
            id="photo-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif"
            onChange={handleFile}
            style={{ display: 'none' }}
          />
          <label htmlFor="photo-upload" style={{ ...s.addBtn, cursor: 'pointer', marginBottom: 0, textAlign: 'center' }}>
            Choisir une image
          </label>
          <button
            onClick={handleUpload}
            disabled={!preview.startsWith('data:') || uploading}
            style={{ ...s.saveBtn, opacity: (!preview.startsWith('data:') || uploading) ? 0.4 : 1 }}
          >
            {uploading ? 'Upload...' : 'Enregistrer la photo'}
          </button>
          {msg && <span style={{ fontSize: 12, color: msg.ok ? '#00d4aa' : '#f85149' }}>{msg.text}</span>}
        </div>
      </div>
    </div>
  )
}

function HeroEditor() {
  const { draft, setDraft, saved, setSaved, error, setError } = useDraft(heroData)

  const setField = (key, val) => setDraft(d => ({ ...d, [key]: val }))
  const setStat = (i, key, val) => setDraft(d => {
    const stats = d.stats.map((s, j) => j === i ? { ...s, [key]: val } : s)
    return { ...d, stats }
  })
  const setTermField = (key, val) => setDraft(d => ({ ...d, terminal: { ...d.terminal, [key]: val } }))
  const setTermArr = (key, val) => setDraft(d => ({
    ...d, terminal: { ...d.terminal, [key]: val.split(',').map(x => x.trim()).filter(Boolean) }
  }))

  const handleSave = async () => {
    try {
      await save('hero', draft)
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setError(e.message) }
  }

  return (
    <SectionWrap title="// Hero">
      <Toast saved={saved} error={error} />
      <PhotoUploader />
      <div style={s.grid2}>
        <label style={s.label}>Nom
          <input style={s.input} value={draft.name} onChange={e => setField('name', e.target.value)} />
        </label>
        <label style={s.label}>Rôle
          <input style={s.input} value={draft.role} onChange={e => setField('role', e.target.value)} />
        </label>
        <label style={s.label}>Localisation
          <input style={s.input} value={draft.location} onChange={e => setField('location', e.target.value)} />
        </label>
        <label style={s.label}>Flag emoji
          <input style={s.input} value={draft.flag} onChange={e => setField('flag', e.target.value)} />
        </label>
        <label style={s.label}>Eyebrow
          <input style={s.input} value={draft.eyebrow} onChange={e => setField('eyebrow', e.target.value)} />
        </label>
        <label style={s.label}>LinkedIn URL
          <input style={s.input} value={draft.linkedinUrl} onChange={e => setField('linkedinUrl', e.target.value)} />
        </label>
      </div>
      <label style={s.label}>Description
        <textarea style={s.textarea} value={draft.description} onChange={e => setField('description', e.target.value)} rows={3} />
      </label>
      <h3 style={s.sub}>Stats</h3>
      {draft.stats.map((st, i) => (
        <div key={i} style={s.row}>
          <input style={{ ...s.input, width: 80 }} value={st.num} onChange={e => setStat(i, 'num', e.target.value)} placeholder="Valeur" />
          <input style={s.input} value={st.label} onChange={e => setStat(i, 'label', e.target.value)} placeholder="Label" />
        </div>
      ))}
      <h3 style={s.sub}>Terminal</h3>
      <div style={s.grid2}>
        {['name','role','location','status'].map(k => (
          <label key={k} style={s.label}>{k}
            <input style={s.input} value={draft.terminal[k]} onChange={e => setTermField(k, e.target.value)} />
          </label>
        ))}
        <label style={s.label}>experience
          <input style={s.input} type="number" value={draft.terminal.experience} onChange={e => setTermField('experience', +e.target.value)} />
        </label>
        <label style={s.label}>team_size
          <input style={s.input} type="number" value={draft.terminal.team_size} onChange={e => setTermField('team_size', +e.target.value)} />
        </label>
      </div>
      {['management','ai_skills','tech'].map(k => (
        <label key={k} style={s.label}>{k} (virgule-séparé)
          <input style={s.input} value={draft.terminal[k].join(', ')} onChange={e => setTermArr(k, e.target.value)} />
        </label>
      ))}
      <SaveBtn onClick={handleSave} />
    </SectionWrap>
  )
}

// ─── SKILLS ───────────────────────────────────────────────────────────────────

function SkillsEditor() {
  const { draft, setDraft, saved, setSaved, error, setError } = useDraft(skillsData)

  const setField = (i, key, val) => setDraft(d => d.map((sk, j) => j === i ? { ...sk, [key]: val } : sk))
  const setTags = (i, val) => setDraft(d => d.map((sk, j) => j === i
    ? { ...sk, tags: val.split(',').map(t => t.trim()).filter(Boolean) } : sk))
  const addSkill = () => setDraft(d => [...d, { icon: '✦', title: '', desc: '', tags: [] }])
  const removeSkill = i => setDraft(d => d.filter((_, j) => j !== i))

  const handleSave = async () => {
    try {
      await save('skills', draft)
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setError(e.message) }
  }

  return (
    <SectionWrap title="// Compétences">
      <Toast saved={saved} error={error} />
      {draft.map((sk, i) => (
        <div key={i} style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardIdx}>0{i + 1}</span>
            <button onClick={() => removeSkill(i)} style={s.removeBtn}>✕</button>
          </div>
          <div style={s.grid2}>
            <label style={s.label}>Icône
              <input style={s.input} value={sk.icon} onChange={e => setField(i, 'icon', e.target.value)} />
            </label>
            <label style={s.label}>Titre
              <input style={s.input} value={sk.title} onChange={e => setField(i, 'title', e.target.value)} />
            </label>
          </div>
          <label style={s.label}>Description
            <textarea style={s.textarea} value={sk.desc} onChange={e => setField(i, 'desc', e.target.value)} rows={2} />
          </label>
          <label style={s.label}>Tags (virgule-séparé)
            <input style={s.input} value={sk.tags.join(', ')} onChange={e => setTags(i, e.target.value)} />
          </label>
        </div>
      ))}
      <button onClick={addSkill} style={s.addBtn}>+ Ajouter une compétence</button>
      <SaveBtn onClick={handleSave} />
    </SectionWrap>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────

function ExperienceEditor() {
  const { draft, setDraft, saved, setSaved, error, setError } = useDraft(experienceData)

  const setField = (i, key, val) => setDraft(d => d.map((e, j) => j === i ? { ...e, [key]: val } : e))
  const setBullet = (i, bi, val) => setDraft(d => d.map((e, j) => {
    if (j !== i) return e
    const bullets = e.bullets.map((b, k) => k === bi ? val : b)
    return { ...e, bullets }
  }))
  const addBullet = i => setDraft(d => d.map((e, j) => j === i ? { ...e, bullets: [...e.bullets, ''] } : e))
  const removeBullet = (i, bi) => setDraft(d => d.map((e, j) => j === i
    ? { ...e, bullets: e.bullets.filter((_, k) => k !== bi) } : e))
  const addExp = () => setDraft(d => [...d, { period: '', company: '', loc: '', title: '', bullets: [], ai: false }])
  const removeExp = i => setDraft(d => d.filter((_, j) => j !== i))

  const handleSave = async () => {
    try {
      await save('experience', draft)
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setError(e.message) }
  }

  return (
    <SectionWrap title="// Expérience">
      <Toast saved={saved} error={error} />
      {draft.map((exp, i) => (
        <div key={i} style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardIdx}>0{i + 1}</span>
            <button onClick={() => removeExp(i)} style={s.removeBtn}>✕</button>
          </div>
          <div style={s.grid2}>
            <label style={s.label}>Période
              <input style={s.input} value={exp.period} onChange={e => setField(i, 'period', e.target.value)} />
            </label>
            <label style={s.label}>Entreprise
              <input style={s.input} value={exp.company} onChange={e => setField(i, 'company', e.target.value)} />
            </label>
            <label style={s.label}>Lieu
              <input style={s.input} value={exp.loc} onChange={e => setField(i, 'loc', e.target.value)} />
            </label>
            <label style={s.label}>Titre
              <input style={s.input} value={exp.title} onChange={e => setField(i, 'title', e.target.value)} />
            </label>
          </div>
          <label style={s.label}>
            <input type="checkbox" checked={!!exp.ai} onChange={e => setField(i, 'ai', e.target.checked)} style={{ marginRight: 8 }} />
            Badge AI-Augmented
          </label>
          <div style={{ marginTop: 8 }}>
            <div style={s.sub}>Bullets</div>
            {exp.bullets.map((b, bi) => (
              <div key={bi} style={s.row}>
                <textarea style={{ ...s.textarea, flex: 1 }} value={b} onChange={e => setBullet(i, bi, e.target.value)} rows={2} />
                <button onClick={() => removeBullet(i, bi)} style={s.removeBtn}>✕</button>
              </div>
            ))}
            <button onClick={() => addBullet(i)} style={s.addBtn}>+ Bullet</button>
          </div>
        </div>
      ))}
      <button onClick={addExp} style={s.addBtn}>+ Ajouter un poste</button>
      <SaveBtn onClick={handleSave} />
    </SectionWrap>
  )
}

// ─── CERTIFICATIONS ───────────────────────────────────────────────────────────

function CertificationsEditor() {
  const { draft, setDraft, saved, setSaved, error, setError } = useDraft(certificationsData)

  const setCert = (i, val) => setDraft(d => d.map((c, j) => j === i ? val : c))
  const addCert = () => setDraft(d => [...d, ''])
  const removeCert = i => setDraft(d => d.filter((_, j) => j !== i))

  const handleSave = async () => {
    try {
      await save('certifications', draft)
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setError(e.message) }
  }

  return (
    <SectionWrap title="// Certifications">
      <Toast saved={saved} error={error} />
      {draft.map((cert, i) => (
        <div key={i} style={s.row}>
          <span style={{ ...s.cardIdx, minWidth: 32 }}>{String(i + 1).padStart(2, '0')}</span>
          <input style={s.input} value={cert} onChange={e => setCert(i, e.target.value)} />
          <button onClick={() => removeCert(i)} style={s.removeBtn}>✕</button>
        </div>
      ))}
      <button onClick={addCert} style={s.addBtn}>+ Ajouter une certification</button>
      <SaveBtn onClick={handleSave} />
    </SectionWrap>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────

function ContactEditor() {
  const { draft, setDraft, saved, setSaved, error, setError } = useDraft(contactData)

  const setField = (i, key, val) => setDraft(d => ({
    ...d, links: d.links.map((l, j) => j === i ? { ...l, [key]: val } : l)
  }))
  const addLink = () => setDraft(d => ({ ...d, links: [...d.links, { icon: '', label: '', sub: '', href: '' }] }))
  const removeLink = i => setDraft(d => ({ ...d, links: d.links.filter((_, j) => j !== i) }))

  const handleSave = async () => {
    try {
      await save('contact', draft)
      setSaved(true); setError(null)
      setTimeout(() => setSaved(false), 2500)
    } catch (e) { setError(e.message) }
  }

  return (
    <SectionWrap title="// Contact">
      <Toast saved={saved} error={error} />
      <label style={s.label}>Intro
        <textarea style={s.textarea} value={draft.intro} onChange={e => setDraft(d => ({ ...d, intro: e.target.value }))} rows={2} />
      </label>
      <label style={s.label}>Intro (2ème ligne)
        <textarea style={s.textarea} value={draft.introSecond} onChange={e => setDraft(d => ({ ...d, introSecond: e.target.value }))} rows={2} />
      </label>
      <h3 style={s.sub}>Liens</h3>
      {draft.links.map((l, i) => (
        <div key={i} style={s.card}>
          <div style={s.cardHeader}>
            <span style={s.cardIdx}>{l.label || `Lien ${i + 1}`}</span>
            <button onClick={() => removeLink(i)} style={s.removeBtn}>✕</button>
          </div>
          <div style={s.grid2}>
            <label style={s.label}>Icône
              <input style={s.input} value={l.icon} onChange={e => setField(i, 'icon', e.target.value)} />
            </label>
            <label style={s.label}>Label
              <input style={s.input} value={l.label} onChange={e => setField(i, 'label', e.target.value)} />
            </label>
            <label style={s.label}>Sous-titre
              <input style={s.input} value={l.sub} onChange={e => setField(i, 'sub', e.target.value)} />
            </label>
            <label style={s.label}>URL / href
              <input style={s.input} value={l.href} onChange={e => setField(i, 'href', e.target.value)} />
            </label>
          </div>
        </div>
      ))}
      <button onClick={addLink} style={s.addBtn}>+ Ajouter un lien</button>
      <SaveBtn onClick={handleSave} />
    </SectionWrap>
  )
}

// ─── STYLES ───────────────────────────────────────────────────────────────────

const s = {
  page: {
    minHeight: '100vh',
    background: '#0d1117',
    color: '#e6edf3',
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
  },
  header: {
    borderBottom: '1px solid #21262d',
    padding: '16px 32px',
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    background: '#161b22',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 700,
    color: '#0097ff',
    margin: 0,
  },
  headerSub: {
    color: '#8b949e',
    fontSize: 11,
    margin: 0,
  },
  tabs: {
    display: 'flex',
    gap: 4,
    padding: '12px 32px',
    borderBottom: '1px solid #21262d',
    background: '#161b22',
    overflowX: 'auto',
  },
  tab: active => ({
    padding: '6px 14px',
    borderRadius: 4,
    border: 'none',
    cursor: 'pointer',
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    fontWeight: active ? 700 : 400,
    background: active ? '#0097ff22' : 'transparent',
    color: active ? '#0097ff' : '#8b949e',
    borderBottom: active ? '2px solid #0097ff' : '2px solid transparent',
  }),
  content: {
    maxWidth: 800,
    margin: '0 auto',
    padding: '32px 24px',
  },
  section: {
    marginBottom: 48,
  },
  sectionTitle: {
    color: '#0097ff',
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 20,
    borderBottom: '1px solid #21262d',
    paddingBottom: 8,
  },
  card: {
    background: '#161b22',
    border: '1px solid #21262d',
    borderRadius: 6,
    padding: 16,
    marginBottom: 12,
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIdx: {
    color: '#8b949e',
    fontSize: 11,
  },
  grid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 12,
    marginBottom: 12,
  },
  label: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    color: '#8b949e',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: 12,
  },
  input: {
    background: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: 4,
    color: '#e6edf3',
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    padding: '6px 10px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  textarea: {
    background: '#0d1117',
    border: '1px solid #30363d',
    borderRadius: 4,
    color: '#e6edf3',
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    padding: '6px 10px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    resize: 'vertical',
  },
  row: {
    display: 'flex',
    gap: 8,
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  sub: {
    color: '#58a6ff',
    fontSize: 12,
    margin: '12px 0 8px',
  },
  removeBtn: {
    background: 'transparent',
    border: '1px solid #30363d',
    borderRadius: 4,
    color: '#f85149',
    cursor: 'pointer',
    fontSize: 12,
    padding: '4px 8px',
    flexShrink: 0,
  },
  addBtn: {
    background: 'transparent',
    border: '1px dashed #30363d',
    borderRadius: 4,
    color: '#8b949e',
    cursor: 'pointer',
    fontFamily: "'Space Mono', monospace",
    fontSize: 12,
    padding: '6px 12px',
    marginBottom: 16,
    display: 'block',
  },
  saveBtn: {
    background: '#0097ff',
    border: 'none',
    borderRadius: 4,
    color: '#fff',
    cursor: 'pointer',
    fontFamily: "'Space Mono', monospace",
    fontSize: 13,
    fontWeight: 700,
    padding: '8px 20px',
    marginTop: 8,
  },
  toast: {
    borderRadius: 4,
    color: '#fff',
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 12,
    padding: '8px 14px',
  },
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────

const TABS = [
  { key: 'hero', label: 'Hero' },
  { key: 'skills', label: 'Compétences' },
  { key: 'experience', label: 'Expérience' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'contact', label: 'Contact' },
]

function LoginGate({ onAuth }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async e => {
    e.preventDefault()
    setLoading(true)
    setErr(null)
    try {
      const res = await fetch('/api/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pw }),
      })
      if (res.ok) {
        onAuth()
      } else {
        const data = await res.json()
        setErr(data.error || 'Erreur')
        setPw('')
      }
    } catch {
      setErr('Erreur réseau')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ ...s.page, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <form onSubmit={submit} style={{ background: '#161b22', border: '1px solid #21262d', borderRadius: 8, padding: 32, width: 320 }}>
        <p style={{ color: '#0097ff', fontWeight: 700, fontSize: 14, margin: '0 0 4px' }}>// admin.portfolio</p>
        <p style={{ color: '#8b949e', fontSize: 11, margin: '0 0 24px' }}>Accès restreint</p>
        <label style={s.label}>Mot de passe
          <input
            style={{ ...s.input, marginTop: 4 }}
            type="password"
            value={pw}
            onChange={e => { setPw(e.target.value); setErr(null) }}
            autoFocus
          />
        </label>
        {err && <p style={{ color: '#f85149', fontSize: 12, margin: '4px 0 12px' }}>{err}</p>}
        <button type="submit" disabled={loading} style={{ ...s.saveBtn, width: '100%', marginTop: 8, opacity: loading ? 0.6 : 1 }}>
          {loading ? '...' : 'Entrer'}
        </button>
      </form>
    </div>
  )
}

export default function Admin() {
  const [tab, setTab] = useState('hero')
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    fetch('/api/admin-auth')
      .then(r => { if (r.ok) setAuthed(true) })
      .catch(() => {})
  }, [])

  const logout = async () => {
    await fetch('/api/admin-auth', { method: 'DELETE' })
    setAuthed(false)
  }

  if (!authed) return <LoginGate onAuth={() => setAuthed(true)} />

  return (
    <>
      <Head>
        <title>Admin — Portfolio</title>
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <div style={s.page}>
        <div style={s.header}>
          <div>
            <p style={s.headerTitle}>// admin.portfolio</p>
            <p style={s.headerSub}>Gestion du contenu — local uniquement</p>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', gap: 16, alignItems: 'center' }}>
            <a href="/" target="_blank" rel="noreferrer" style={{ color: '#58a6ff', fontSize: 12 }}>
              Voir le portfolio →
            </a>
            <button onClick={logout} style={{ background: 'transparent', border: '1px solid #30363d', borderRadius: 4, color: '#8b949e', cursor: 'pointer', fontFamily: "'Space Mono', monospace", fontSize: 11, padding: '4px 10px' }}>
              Déconnexion
            </button>
          </div>
        </div>
        <div style={s.tabs}>
          {TABS.map(t => (
            <button key={t.key} style={s.tab(tab === t.key)} onClick={() => setTab(t.key)}>
              {t.label}
            </button>
          ))}
        </div>
        <div style={s.content}>
          {tab === 'hero' && <HeroEditor />}
          {tab === 'skills' && <SkillsEditor />}
          {tab === 'experience' && <ExperienceEditor />}
          {tab === 'certifications' && <CertificationsEditor />}
          {tab === 'contact' && <ContactEditor />}
        </div>
      </div>
    </>
  )
}
