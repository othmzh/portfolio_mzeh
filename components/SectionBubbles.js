import { useEffect, useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/SectionBubbles.module.css'

export default function SectionBubbles() {
  const { t } = useTranslation()
  const sections = [
    { id: 'hero', label: t('nav.links.home') },
    { id: 'competences', label: t('nav.links.skills') },
    { id: 'experience', label: t('nav.links.experience') },
    { id: 'case-studies', label: t('nav.links.caseStudies') },
    { id: 'certifications', label: t('nav.links.certifications') },
    { id: 'testimonials', label: t('nav.links.testimonials') },
    { id: 'ai-chat', label: t('nav.links.chat') },
    { id: 'contact', label: t('nav.links.contact') },
  ]
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const nodes = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean)
    if (!('IntersectionObserver' in window) || !nodes.length) return

    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
      if (visible[0]) setActive(visible[0].target.id)
    }, { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.15, 0.4, 0.7] })

    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])

  return (
    <nav className={styles.nav} aria-label={t('nav.sectionNavigation')}>
      {sections.map(({ id, label }) => (
        <a
          key={id}
          href={`#${id}`}
          className={`${styles.link}${active === id ? ` ${styles.active}` : ''}`}
          aria-label={label}
          aria-current={active === id ? 'location' : undefined}
        >
          <span className={styles.dot} />
          <span className={styles.label}>{label}</span>
        </a>
      ))}
    </nav>
  )
}
