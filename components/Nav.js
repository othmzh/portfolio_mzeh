import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import { localizedPath } from '../lib/site.mjs'
import styles from '../styles/Nav.module.css'
import { useTheme } from '../hooks/useTheme'
import { useTranslation } from '../hooks/useTranslation'
import LangSwitcher from './LangSwitcher'

const NAV_LINKS = [
  { id: 'case-studies', label: 'nav.links.caseStudies' },
  { id: 'experience', label: 'nav.links.experience' },
  { id: 'competences', label: 'nav.links.skills' },
  { id: 'testimonials', label: 'nav.links.testimonials' },
  { id: 'contact', label: 'nav.links.contact' },
]

export default function Nav() {
  const { theme, toggleTheme } = useTheme()
  const { t, locale } = useTranslation()
  const router = useRouter()
  const home = router.pathname === '/' ? '' : localizedPath('/', locale)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const toggleRef = useRef(null)
  const themeLabel = theme === 'dark' ? t('nav.theme.toLight') : t('nav.theme.toDark')

  useEffect(() => {
    const close = () => setMenuOpen(false)
    const desktop = window.matchMedia('(min-width: 1061px)')
    const onResize = event => { if (event.matches) close() }
    desktop.addEventListener('change', onResize)
    router.events.on('routeChangeStart', close)
    router.events.on('hashChangeStart', close)
    return () => {
      desktop.removeEventListener('change', onResize)
      router.events.off('routeChangeStart', close)
      router.events.off('hashChangeStart', close)
    }
  }, [router.events])

  useEffect(() => {
    if (!menuOpen) return
    navRef.current?.querySelector('#primary-navigation a')?.focus()
    const onKeyDown = event => {
      if (event.key === 'Escape') {
        setMenuOpen(false)
        toggleRef.current?.focus()
      }
    }
    const onOutside = event => {
      if (!navRef.current?.contains(event.target)) setMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onOutside)
    document.addEventListener('focusin', onOutside)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onOutside)
      document.removeEventListener('focusin', onOutside)
    }
  }, [menuOpen])

  return (
    <nav ref={navRef} className={styles.nav} aria-label={t('nav.mainNavigation')}>
      <div className={styles.bar}>
        <a href={home + '#hero'} className={styles.brand} onClick={() => setMenuOpen(false)}>othmen.mzeh</a>
        <ul id="primary-navigation" className={styles.links + (menuOpen ? ' ' + styles.menuOpen : '')}>
          {NAV_LINKS.map(({ id, label }) => <li key={id}>
            <a href={home + '#' + id} className={id === 'contact' ? styles.contactLink : styles.link} onClick={() => setMenuOpen(false)} aria-current={router.pathname.startsWith('/realisations/') && id === 'case-studies' ? 'location' : undefined}>
              {t(label)}
            </a>
          </li>)}
        </ul>
        <div className={styles.right}>
          <LangSwitcher />
          <button type="button" onClick={toggleTheme} className={styles.themeToggle} title={themeLabel} aria-label={themeLabel}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {theme === 'dark' ? <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></> : <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />}
            </svg>
          </button>
          <button type="button" ref={toggleRef} className={styles.menuToggle} onClick={() => setMenuOpen(open => !open)} aria-label={menuOpen ? t('nav.menu.close') : t('nav.menu.open')} aria-expanded={menuOpen} aria-controls="primary-navigation">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d={menuOpen ? 'm6 6 12 12M6 18 18 6' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}
