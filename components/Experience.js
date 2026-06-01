import styles from '../styles/Experience.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import EXPERIENCES from '../data/experience.json'

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>// parcours professionnel</div>
        <h2 className={styles.h2}>Expérience</h2>
        <div>
          {EXPERIENCES.map((exp, i) => (
            <motion.div
              key={i}
              className="exp-item"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.15 }}
            >
              <div>
                <div className={styles.period}>{exp.period}</div>
                <div className={styles.company}>{exp.company}</div>
                <div className={styles.loc}>{exp.loc}</div>
              </div>
              <div>
                <div className={styles.title}>{exp.title}</div>
                <ul className={styles.bullets}>
                  {exp.bullets.map((b, j) => (
                    <li key={j} className={styles.bullet}><span className={styles.bulletMark}>//</span>{b}</li>
                  ))}
                </ul>
                {exp.ai && <span className={styles.badge}>✦ AI-Augmented Engineering Practices</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
