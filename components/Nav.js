import { useState } from 'react'
import styles from '../styles/Nav.module.css'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from '../hooks/useTranslation'
import LangSwitcher from './LangSwitcher'

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)

  const closeMenu = () => setMenuOpen(false)

  const NAV_LINKS = [
    { href: '#competences', label: t('nav.links.skills') },
    { href: '#experience',  label: t('nav.links.experience') },
    { href: '#certifications', label: t('nav.links.certifications') },
    { href: '#ai-chat',    label: t('nav.links.chat') },
    { href: '#contact',    label: t('nav.links.contact') },
  ]

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
            {t('nav.available')}
          </div>

          {/* Lang switcher — always visible */}
          <LangSwitcher />

          {/* Theme toggle — always visible */}
          <button
            onClick={toggleTheme}
            className={styles.toggle}
            title={theme === 'dark' ? t('nav.theme.toLight') : t('nav.theme.toDark')}
            aria-label={theme === 'dark' ? t('nav.theme.toLight') : t('nav.theme.toDark')}
          >
            <span className={`${styles.opt}${theme === 'dark' ? ` ${styles.optActive}` : ''}`}>🌙</span>
            <span className={`${styles.opt}${theme === 'light' ? ` ${styles.optActive}` : ''}`}>☀️</span>
          </button>

          {/* Hamburger — mobile only */}
          <button
            className={`hamburger${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(o => !o)}
            aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')}
            aria-expanded={menuOpen}
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
            <span className={styles.dot} /> {t('nav.available')}
          </div>
        </div>
      )}
    </>
  )
}
