import styles from '../styles/Footer.module.css'
import { useTranslation } from '../hooks/useTranslation'

const SOCIAL = [
  { href: 'mailto:oth.mzh@gmail.com', label: 'Email' },
  { href: 'https://linkedin.com/in/othmen-mzeh-64740961', label: 'LinkedIn', external: true },
  { href: 'tel:+21653795988', label: '+216 53 795 988' },
]

export default function Footer() {
  const { t } = useTranslation()

  const NAV = [
    { href: '#competences', label: t('nav.links.skills') },
    { href: '#experience', label: t('nav.links.experience') },
    { href: '#certifications', label: t('nav.links.certifications') },
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
        <div className={styles.col}>
          <div className={styles.colTitle}>{t('footer.nav.label')}</div>
          <ul className={styles.list}>
            {NAV.map(l => (
              <li key={l.href}>
                <a href={l.href} className={styles.link}>{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <div className={styles.colTitle}>{t('footer.contact.label')}</div>
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
