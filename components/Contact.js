import styles from '../styles/Contact.module.css'
import { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'


export default function Contact() {
  const { t, locale, content } = useTranslation()
  const [copied, setCopied] = useState('')
  const contactData = content['contact']
  const { intro, introSecond, links: LINKS } = contactData

  return (
    <section id="contact" className={styles.section}>
      <div className="contact-grid">
        <div
        >
          <div className={styles.label}>{t('contact.label')}</div>
          <h2 className={styles.h2}>{t('contact.heading').split('\n').map((line, i, arr) => (
            <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
          ))}</h2>
          <p className={styles.intro}>{intro}</p>
          <p className={styles.introSecond}>{introSecond}</p>
        </div>
        <div
          className={styles.links}
        >
          {LINKS.map(l => l.copyValue ? (
            <div key={l.label} className={`contact-link ${styles.link}`}>
              <div className={styles.icon}>{l.icon}</div>
              <div className={styles.linkBody}>
                <div className={styles.linkLabel}>{l.label}</div>
                <a className={styles.directLink} href={l.copyValue.includes('@') ? `mailto:${l.copyValue}` : `tel:${l.copyValue.replace(/\s/g, '')}`}>
                  {l.copyValue.includes('@') ? t('contact.emailAction') : t('contact.phoneAction')}
                </a>
              </div>
              <button type="button" className={styles.copyLink} onClick={async () => {
                try {
                  await navigator.clipboard.writeText(l.copyValue)
                  setCopied(l.label)
                  window.setTimeout(() => setCopied(''), 1800)
                } catch {
                  setCopied('')
                }
              }} aria-label={`${l.label}: ${copied === l.label ? t('contact.copied') : t('contact.copy')}`}>
                <span aria-live="polite">{copied === l.label ? t('contact.copied') : t('contact.copy')}</span>
              </button>
            </div>
          ) : (
            <a key={l.label} href={l.href === '/approche-ia-management' && locale === 'en' ? `/en${l.href}` : l.href} download={l.href.endsWith('.pdf') ? true : undefined} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className={`contact-link ${styles.link}`}>
              <div className={styles.icon}>{l.icon}</div>
              <div>
                <div className={styles.linkLabel}>{l.label}</div>
                <div className={styles.linkSub}>{l.sub}</div>
              </div>
              <div className={styles.arr}>→</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
