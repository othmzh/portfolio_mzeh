import { useState } from 'react'
import styles from '../styles/Nav.module.css'
import { NAV_LINKS, useTheme } from '../hooks/useTheme'

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <nav className={styles.nav}>
        <a href="#" className={styles.brand}>othmen.mzeh</a>

        {/* Desktop links */}
        <ul className={`${styles.links} desktop-only`}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}><a href={href} className={`nav-link ${styles.link}`}>{label}</a></li>
          ))}
        </ul>

        <div className={styles.right}>
          {/* Status — desktop only */}
          <div className={`${styles.status} desktop-only`}>
            <span className={styles.dot} />
            Disponible
          </div>

          {/* Theme toggle — always visible */}
          <button onClick={toggleTheme} className={styles.toggle} title="Changer le thème">
            <span className={`${styles.opt}${theme === 'dark' ? ` ${styles.optActive}` : ''}`}>🌙</span>
            <span className={`${styles.opt}${theme === 'light' ? ` ${styles.optActive}` : ''}`}>☀️</span>
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
          <div className={styles.statusMobile}>
            <span className={styles.dot} /> Disponible
          </div>
        </div>
      )}
    </>
  )
}
