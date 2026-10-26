import { useEffect, useState } from 'react'
import styles from '../styles/Testimonials.module.css'
import { useTranslation } from '../hooks/useTranslation'
import testimonialsFr from '../data/fr/testimonials.fr.json'
import testimonialsEn from '../data/en/testimonials.en.json'

const testimonialsByLocale = { fr: testimonialsFr, en: testimonialsEn }

export default function Testimonials() {
  const { t, locale } = useTranslation()
  const testimonials = testimonialsByLocale[locale] ?? testimonialsByLocale.fr
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const activeTestimonial = testimonials[activeIndex % testimonials.length]
  const goTo = index => setActiveIndex((index + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (isPaused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const timer = window.setTimeout(() => {
      setActiveIndex(index => (index + 1) % testimonials.length)
    }, 7000)
    return () => window.clearTimeout(timer)
  }, [activeIndex, isPaused, testimonials.length])

  return (
    <section id="testimonials" className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <div className={styles.label}>{t('testimonials.label')}</div>
        <h2 id="testimonials-heading" className={styles.heading}>{t('testimonials.heading')}</h2>
        <div
          className={styles.carousel}
          role="region"
          aria-label={t('testimonials.heading')}
          aria-roledescription={locale === 'en' ? 'carousel' : 'carrousel'}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocusCapture={() => setIsPaused(true)}
          onBlurCapture={event => {
            if (!event.currentTarget.contains(event.relatedTarget)) setIsPaused(false)
          }}
        >
          <figure className={styles.card} aria-live={isPaused ? 'polite' : 'off'} aria-atomic="true">
            <blockquote className={styles.quote} key={activeTestimonial.name}>{activeTestimonial.quote}</blockquote>
            <figcaption className={styles.person}>
              {activeTestimonial.source ? (
                <a href={activeTestimonial.source} target="_blank" rel="noreferrer" className={styles.name}>{activeTestimonial.name}</a>
              ) : (
                <span className={styles.name}>{activeTestimonial.name}</span>
              )}
              <span className={styles.role}>{activeTestimonial.role}</span>
            </figcaption>
          </figure>
          <div className={styles.controls}>
            <button className={styles.arrow} type="button" onClick={() => goTo(activeIndex - 1)} aria-label={t('testimonials.previous')}>
              <span aria-hidden="true">←</span>
            </button>
            <div className={styles.indicators} role="group" aria-label={t('testimonials.navigation')}>
              {testimonials.map((item, index) => (
                <button
                  key={item.name}
                  className={`${styles.indicator} ${index === activeIndex ? styles.activeIndicator : ''}`}
                  type="button"
                  onClick={() => goTo(index)}
                  aria-label={`${t('testimonials.goTo')} ${index + 1}`}
                  aria-current={index === activeIndex ? 'true' : undefined}
                />
              ))}
            </div>
            <button className={styles.arrow} type="button" onClick={() => goTo(activeIndex + 1)} aria-label={t('testimonials.next')}>
              <span aria-hidden="true">→</span>
            </button>
            <span className={styles.counter}>{activeIndex + 1} / {testimonials.length}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
