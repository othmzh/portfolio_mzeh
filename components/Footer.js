import { useState } from 'react'
import styles from '../styles/Footer.module.css'
import { useTranslation } from '../hooks/useTranslation'
import contactFr from '../data/fr/contact.fr.json'
import contactEn from '../data/en/contact.en.json'

const contactByLocale = { fr: contactFr, en: contactEn }

export default function Footer() {
  const { t, locale } = useTranslation()
  const [copied, setCopied] = useState(false)
  const copyrightYear = new Date().getFullYear()
  const contactLinks = (contactByLocale[locale] ?? contactByLocale.fr).links
  const email = contactLinks.find(link => link.label === 'Email')
  const resume = contactLinks.find(link => link.href?.endsWith('.pdf'))
  const article = contactLinks.find(link => link.href?.includes('approche-ia-management'))
  const linkedin = contactLinks.find(link => link.href?.includes('linkedin.com'))
  const phone = contactLinks.find(link => link.copyValue?.startsWith('+'))
  const whatsapp = phone && {
    label: t('footer.whatsapp'),
    href: `https://wa.me/${phone.copyValue.replace(/\D/g, '')}`,
    external: true,
  }
  const footerContacts = [email, resume, article, whatsapp, linkedin].filter(Boolean)

  const NAV = [
    { href: '#hero', label: t('nav.links.home') },
    { href: '#case-studies', label: t('nav.links.caseStudies') },
    { href: '#contact', label: t('nav.links.contact') },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <a href="#hero" className={styles.brandName}>othmen.mzeh</a>
          <p className={styles.brandDesc}>Engineering Manager & AI-Driven Leader</p>
          <p className={styles.brandLoc}>📍 {t('footer.location')}</p>
          <p className={styles.availability}><span className={styles.availabilityDot} />{t('footer.available')}</p>
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
          <ul className={`${styles.list} ${styles.contactList}`}>
            {footerContacts.map(link => (
              <li key={link.label}>
                {link.copyValue ? (
                  <button
                    type="button"
                    className={`${styles.link} ${styles.copyLink}`}
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(link.copyValue)
                        setCopied(true)
                        window.setTimeout(() => setCopied(false), 1800)
                      } catch {
                        setCopied(false)
                      }
                    }}
                  >
                    {link.label} · {copied ? t('contact.copied') : t('contact.copy')}
                  </button>
                ) : (
                  <a
                    href={link.href === '/approche-ia-management' && locale === 'en' ? `/en${link.href}` : link.href}
                    className={styles.link}
                    target={link.external || link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.external || link.href.startsWith('http') ? 'noreferrer' : undefined}
                    download={link.href.endsWith('.pdf') ? true : undefined}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <span>© <time dateTime={String(copyrightYear)}>{copyrightYear}</time> Othmen Mzeh — {t('footer.copyright')}</span>
        <span className={styles.built}>{t('footer.built')}</span>
        <a className={styles.backToTop} href="#hero">{t('footer.backToTop')}</a>
      </div>
    </footer>
  )
}
