import { useState, useEffect } from 'react'

const NAV_LINKS = [
  { href: '#competences', label: 'Skills' },
  { href: '#experience',  label: 'Expérience' },
  { href: '#certifications', label: 'Certs' },
  { href: '#ai-chat',    label: 'AI Assistant' },
  { href: '#contact',    label: 'Contact' },
]

export default function Nav() {
  const [theme, setTheme] = useState('dark')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav style={s.nav}>
        <a href="#" style={s.brand}>othmen.mzeh</a>

        {/* Desktop links */}
        <ul style={s.links} className="desktop-only">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}><a href={href} style={s.link}>{label}</a></li>
          ))}
        </ul>

        <div style={s.right}>
          {/* Status — desktop only */}
          <div style={s.status} className="desktop-only">
            <span style={s.dot} />
            Disponible
          </div>

          {/* Theme toggle — always visible */}
          <button onClick={toggleTheme} style={s.toggle} title="Changer le thème">
            <span style={{ ...s.opt, ...(theme === 'dark' ? s.optActive : {}) }}>🌙</span>
            <span style={{ ...s.opt, ...(theme === 'light' ? s.optActive : {}) }}>☀️</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="mobile-menu">
          {NAV_LINKS.map(({ href, label }) => (
            <a key={href} href={href} onClick={closeMenu}>{label}</a>
          ))}
          <div style={{ ...s.status, marginTop: 8 }}>
            <span style={s.dot} /> Disponible
          </div>
        </div>
      )}
    </>
  )
}

const s = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
    background: 'var(--nav-bg)', backdropFilter: 'blur(16px)',
    borderBottom: '1px solid var(--border)',
    padding: '0 5vw', height: 64,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  },
  brand: {
    fontFamily: 'var(--mono)', fontSize: 14, fontWeight: 700,
    color: 'var(--accent)', textDecoration: 'none', letterSpacing: '0.05em',
  },
  links: { display: 'flex', gap: '2rem', listStyle: 'none' },
  link: {
    fontSize: 12, fontWeight: 500, color: 'var(--text2)',
    textDecoration: 'none', letterSpacing: '0.08em', textTransform: 'uppercase',
  },
  right: { display: 'flex', alignItems: 'center', gap: '0.75rem' },
  status: {
    display: 'flex', alignItems: 'center', gap: 6,
    fontSize: 11, color: 'var(--accent)', fontFamily: 'var(--mono)',
  },
  dot: {
    width: 6, height: 6, borderRadius: '50%',
    background: 'var(--accent)', display: 'inline-block',
    animation: 'pulse 2s infinite',
  },
  toggle: {
    background: 'var(--surface2)', border: '1px solid var(--border2)',
    borderRadius: 20, padding: 4, display: 'flex', alignItems: 'center',
    gap: 2, cursor: 'pointer', flexShrink: 0,
  },
  opt: {
    width: 28, height: 28, borderRadius: 16,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 14, userSelect: 'none',
  },
  optActive: { background: 'var(--accent)' },
}
