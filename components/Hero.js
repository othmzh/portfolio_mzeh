import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Hero.module.css'
import { makeLines, Line } from './TerminalCard'
import { useTranslation } from '../hooks/useTranslation'


export default function Hero() {
  const { t, content, locale } = useTranslation()
  const heroData = content['hero']
  const cvLink = content.contact.links.find(link => link.href?.endsWith('.pdf'))
  const lines = makeLines(heroData.terminal, Object.fromEntries(
    ['terminal.comment.management', 'terminal.comment.ai', 'terminal.comment.tech'].map(k => [k, t(k)])
  ))

  return (
    <section id="hero" className={styles.section}>
      <div className={styles.wrapper}>
        <div className="hero-grid">
          {/* LEFT */}
          <div className={styles.mainContent}>
            <div className={styles.photoWrap}>
              <Image src="/othmen.png" alt={heroData.name} width={68} height={68} className={styles.photo} priority />
              <div style={{ flex: 1 }}>
                <div className={styles.photoName}>{heroData.name}</div>
                <div className={styles.photoRole}>{heroData.role} · {heroData.location} {heroData.flag}</div>
              </div>
            </div>

            <div className={styles.eyebrow}>
              {heroData.eyebrow}
            </div>

            <h1 className={styles.h1}>
              <span className={styles.dim}>{heroData.name.split(' ')[0]}</span>
              <span className={styles.accent}>{heroData.name.split(' ')[1]}</span>
              <span className={styles.h1Suffix}>{heroData.role}</span>
            </h1>

            <p className={styles.desc}>
              {heroData.description}
            </p>

            <div className={styles.cta}>
              <a href="#experience" className={`btn-primary ${styles.btnPrimary}`}>{t('hero.cta.journey')}</a>
              <Link href="/approche-ia-management" locale={locale} className={`btn-ghost ${styles.btnGhost}`}>{t('hero.cta.chat')}</Link>
              {cvLink && <a href={cvLink.href} download className={`btn-ghost ${styles.btnGhost}`}>{t('hero.cta.cv')}</a>}
            </div>
            <p className={styles.availability}>{content.contact.introSecond}</p>

          </div>

          {/* RIGHT — terminal (hidden on mobile via CSS) */}
          <div className={`terminal-card ${styles.terminal}`} style={{ position: 'relative' }}>

            <div className={styles.termBar}>
              {['#ff5f57', '#febc2e', '#28c840'].map(bg => (
                <span key={bg} className={styles.dot} style={{ background: bg }} />
              ))}
              <span className={styles.termTitle}>profile.json</span>
            </div>
            <div className={styles.termBody}>
              {lines.map((l, i) => <Line key={i} l={l} />)}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className={`stats-bar ${styles.statsGrid}`}>
          {heroData.stats.map(({ num, label }) => (
            <div key={label} className={styles.statCell}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLbl}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
