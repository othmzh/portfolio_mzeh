import styles from '../styles/Footer.module.css'

const NAV = [
  { href: '#competences', label: 'Skills' },
  { href: '#experience', label: 'Expérience' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#ai-chat', label: 'AI Assistant' },
  { href: '#contact', label: 'Contact' },
]

const SOCIAL = [
  { href: 'mailto:oth.mzh@gmail.com', label: 'Email' },
  { href: 'https://linkedin.com/in/othmen-mzeh-64740961', label: 'LinkedIn', external: true },
  { href: 'tel:+21653795988', label: '+216 53 795 988' },
]

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <a href="#" className={styles.brandName}>othmen.mzeh</a>
          <p className={styles.brandDesc}>Engineering Manager & AI-Driven Leader</p>
          <p className={styles.brandLoc}>📍 Tunisie — Disponible à distance</p>
        </div>

        {/* Nav */}
        <div className={styles.col}>
          <div className={styles.colTitle}>// navigation</div>
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
          <div className={styles.colTitle}>// contact</div>
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
        <span>© {new Date().getFullYear()} Othmen Mzeh — Tous droits réservés</span>
        <span className={styles.built}>Built with Next.js & Claude Code ✦</span>
      </div>
    </footer>
  )
}
