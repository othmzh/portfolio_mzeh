import Image from 'next/image'
import { QRCodeSVG } from 'qrcode.react'
import styles from '../styles/Hero.module.css'
import { LINES, Line, TerminalSEOText } from './TerminalCard'
import { motion } from 'framer-motion'
import heroData from '../data/hero.json'

const fadeIn = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

export default function Hero() {
  return (
    <section id="hero" className={styles.section}>
      <div className={styles.wrapper}>
        <div className="hero-grid">
          {/* LEFT */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }} className={styles.photoWrap}>
              <Image src="/othmen.png" alt={heroData.name} width={68} height={68} className={styles.photo} priority />
              <div style={{ flex: 1 }}>
                <div className={styles.photoName}>{heroData.name}</div>
                <div className={styles.photoRole}>{heroData.role} · {heroData.location} {heroData.flag}</div>
              </div>
              <div className={styles.qrWrap}>
                <QRCodeSVG
                  value={heroData.linkedinUrl}
                  size={48}
                  bgColor="transparent"
                  fgColor="var(--accent)"
                  level="M"
                  aria-label="QR code vers le profil LinkedIn d'Othmen Mzeh"
                  role="img"
                />
                <div className={styles.qrLabel}>LinkedIn</div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }} className={styles.eyebrow}>
              {heroData.eyebrow}
            </motion.div>

            <motion.h1 variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }} className={styles.h1}>
              <span className={styles.dim}>{heroData.name.split(' ')[0]}</span>
              <span className={styles.accent}>{heroData.name.split(' ')[1]}</span>
              <span className={styles.h1Suffix}>{heroData.stats[0].num} ans d'impact</span>
            </motion.h1>

            <motion.p variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }} className={styles.desc}>
              {heroData.description}
            </motion.p>

            <motion.div variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }} className={styles.cta}>
              <a href="#experience" className={`btn-primary ${styles.btnPrimary}`}>Voir le parcours →</a>
              <a href="#ai-chat" className={`btn-ghost ${styles.btnGhost}`}>Parler à l'IA ✦</a>
            </motion.div>

            <motion.div variants={fadeIn} transition={{ duration: 0.5, ease: 'easeOut' }}>
              {/* stats rendered below in stats-bar */}
            </motion.div>
          </motion.div>

          {/* RIGHT — terminal (hidden on mobile via CSS) */}
          <div className={`terminal-card ${styles.terminal}`} style={{ position: 'relative' }}>
            <TerminalSEOText />
            <div className={styles.termBar}>
              {['#ff5f57', '#febc2e', '#28c840'].map(bg => (
                <span key={bg} className={styles.dot} style={{ background: bg }} />
              ))}
              <span className={styles.termTitle}>profile.json</span>
            </div>
            <div className={styles.termBody}>
              {LINES.map((l, i) => <Line key={i} l={l} />)}
            </div>
          </div>
        </div>

        {/* STATS */}
        <motion.div
          className="stats-bar"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.7 }}
        >
          {heroData.stats.map(({ num, label }) => (
            <div key={label} className={styles.statCell}>
              <div className={styles.statNum}>{num}</div>
              <div className={styles.statLbl}>{label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
