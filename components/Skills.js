import styles from '../styles/Skills.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'

const SKILLS = [
  {
    icon: '⚡', title: 'Management & Delivery',
    desc: "Pilotage d'équipes agiles, coordination métier/technique, release management et gestion des priorités avec Azure DevOps.",
    tags: ['Agile/Scrum', 'Azure DevOps', 'Release Mgmt', 'Leadership'],
  },
  {
    icon: '🤖', title: 'IA Générative & Engineering',
    desc: "Intégration de Claude / Claude Code dans les workflows : revue de code assistée, prompts structurés, documentation augmentée.",
    tags: ['Claude Code', 'AI-Driven Dev', 'Prompt Eng.', 'QA IA'],
  },
  {
    icon: '🛠', title: 'Stack Technique',
    desc: "Développement full-stack orienté backend, architectures métier complexes, plateformes LMS/GED/SRM et intégrations webservices.",
    tags: ['Symfony', 'Angular', 'PHP', 'JavaScript', 'Moodle'],
  },
]

export default function Skills() {
  return (
    <section id="competences" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>// domaines d'expertise</div>
        <h2 className={styles.h2}>Compétences clés</h2>
        <div className="skills-grid">
          {SKILLS.map((sk, i) => (
            <motion.div
              key={sk.title}
              className={`skill-card ${styles.card}`}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.1 }}
            >
              <div className={styles.header}>
                <div className={styles.icon}>{sk.icon}</div>
                <h3 className={styles.h3}>{sk.title}</h3>
              </div>
              <p className={styles.desc}>{sk.desc}</p>
              <div className={styles.tags}>
                {sk.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
