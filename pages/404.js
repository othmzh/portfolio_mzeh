import Head from 'next/head'
import Link from 'next/link'

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 — Page introuvable · Othmen Mzeh</title>
      </Head>
      <div style={s.page}>
        <div style={s.terminal}>
          <div style={s.termBar}>
            {['#ff5f57', '#febc2e', '#28c840'].map(bg => (
              <span key={bg} style={{ ...s.dot, background: bg }} />
            ))}
            <span style={s.termTitle}>error.log</span>
          </div>
          <div style={s.termBody}>
            <div style={s.comment}>// 404 — Page introuvable</div>
            <br />
            <div><span style={s.key}>"status"</span><span style={s.bracket}>: </span><span style={s.num}>404</span></div>
            <div><span style={s.key}>"message"</span><span style={s.bracket}>: </span><span style={s.str}>"Cette page n'existe pas"</span></div>
            <div><span style={s.key}>"suggestion"</span><span style={s.bracket}>: </span><span style={s.str}>"Retournez à l'accueil"</span></div>
            <br />
            <div style={s.comment}>// Redirecting...</div>
          </div>
        </div>

        <h1 style={s.code}>404</h1>
        <p style={s.msg}>Cette page n'existe pas ou a été déplacée.</p>

        <Link href="/" style={s.btn}>← Retour à l'accueil</Link>
      </div>
    </>
  )
}

const c = {
  comment: '#4a5568', key: '#0097ff', str: '#00d4aa',
  num: '#f97316', bracket: '#8896a6',
}

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '2rem',
    padding: '5vw',
    background: 'var(--bg)',
    fontFamily: 'var(--sans)',
  },
  terminal: {
    background: 'var(--surface)',
    border: '1px solid var(--border2)',
    borderRadius: 10,
    overflow: 'hidden',
    width: '100%',
    maxWidth: 420,
  },
  termBar: {
    background: 'var(--surface2)',
    padding: '10px 16px',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    borderBottom: '1px solid var(--border)',
  },
  dot: { width: 10, height: 10, borderRadius: '50%', display: 'inline-block' },
  termTitle: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--text3)', marginLeft: 'auto', marginRight: 'auto' },
  termBody: { padding: 20, fontFamily: 'var(--mono)', fontSize: 12, lineHeight: 1.85 },
  comment: { color: c.comment },
  key: { color: c.key },
  str: { color: c.str },
  num: { color: c.num },
  bracket: { color: c.bracket },
  code: {
    fontFamily: 'var(--sans)',
    fontSize: 'clamp(72px, 15vw, 120px)',
    fontWeight: 700,
    color: 'var(--accent)',
    letterSpacing: '-0.04em',
    lineHeight: 1,
  },
  msg: {
    fontSize: 'clamp(14px, 2vw, 16px)',
    color: 'var(--text2)',
    textAlign: 'center',
  },
  btn: {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 24px',
    borderRadius: 6,
    fontSize: 13,
    fontWeight: 600,
    textDecoration: 'none',
    background: 'var(--accent)',
    color: 'var(--btn-primary-text)',
    fontFamily: 'var(--sans)',
  },
}
