import styles from '../styles/Footer.module.css'
import { useTranslation } from '../hooks/useTranslation'

const SOCIAL = [
  { href: 'https://linkedin.com/in/othmen-mzeh', label: 'LinkedIn', external: true },
]

export default function Footer() {
  const { t } = useTranslation()

  const NAV = [
    { href: '#competences', label: t('nav.links.skills') },
    { href: '#experience', label: t('nav.links.experience') },
    { href: '#case-studies', label: t('nav.links.caseStudies') },
    { href: '#certifications', label: t('nav.links.certifications') },
    { href: '#testimonials', label: t('nav.links.testimonials') },
    { href: '#ai-chat', label: t('nav.links.chat') },
    { href: '#contact', label: t('nav.links.contact') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <a href="#" className={styles.brandName}>othmen.mzeh</a>
          <p className={styles.brandDesc}>Engineering Manager & AI-Driven Leader</p>
          <p className={styles.brandLoc}>📍 Tunisia — {t('footer.available')}</p>
        </div>

        {/* Nav */}
        <nav className={`${styles.col} ${styles.navCol}`} aria-label={t('footer.nav.label')}>
          <h2 className={styles.colTitle}>{t('footer.nav.label')}</h2>
          <ul className={`${styles.list} ${styles.navList}`}>
            {NAV.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact */}
        <div className={`${styles.col} ${styles.contactCol}`}>
          <h2 className={styles.colTitle}>{t('footer.contact.label')}</h2>
          <ul className={styles.list}>
            {SOCIAL.map(l => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className={styles.link}
                  target={l.external ? '_blank' : undefined}
                  rel={l.external ? 'noreferrer' : undefined}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© {new Date().getFullYear()} Othmen Mzeh — {t('footer.copyright')}</span>
        <span className={styles.built}>{t('footer.built')}</span>
      </div>
    </footer>
  )
}
