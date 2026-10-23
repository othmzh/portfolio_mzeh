import styles from '../styles/Testimonials.module.css'
import { useTranslation } from '../hooks/useTranslation'
import testimonialsFr from '../data/fr/testimonials.fr.json'
import testimonialsEn from '../data/en/testimonials.en.json'

const testimonialsByLocale = { fr: testimonialsFr, en: testimonialsEn }

export default function Testimonials() {
  const { t, locale } = useTranslation()
  const testimonials = testimonialsByLocale[locale] ?? testimonialsByLocale.fr

  return (
    <section className={styles.section} aria-labelledby="testimonials-heading">
      <div className={styles.container}>
        <div className={styles.label}>{t('testimonials.label')}</div>
        <h2 id="testimonials-heading" className={styles.heading}>{t('testimonials.heading')}</h2>
        <div className={styles.grid}>
          {testimonials.map(item => (
            <figure key={item.name} className={styles.card}>
              <blockquote className={styles.quote}>{item.quote}</blockquote>
              <figcaption className={styles.person}>
                <a href={item.source} target="_blank" rel="noreferrer" className={styles.name}>{item.name}</a>
                <span className={styles.role}>{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
