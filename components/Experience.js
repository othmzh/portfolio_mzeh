import styles from '../styles/Experience.module.css'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'

const EXPERIENCES = [
  {
    period: "Sept. 2021 — Aujourd'hui", company: 'Witik', loc: 'Tunisie',
    title: 'Engineering Manager & Technical Delivery Lead',
    bullets: [
      "Management d'une équipe de 6 ingénieurs full-stack en Agile/Scrum — vélocité, qualité et cohésion d'équipe",
      "Ownership du delivery end-to-end : releases, roadmap technique, gestion des risques et coordination métier/tech",
      "Introduction et adoption de l'IA générative dans les workflows d'équipe : revues de code avec Claude Code, prompts structurés, checklists qualité automatisées — réduction des cycles de review et amélioration mesurable de la qualité des livrables",
      "Recrutements techniques, onboarding et montée en compétences des ingénieurs",
      "Mise en place de pratiques d'amélioration continue : retrospectives actionnables, standards de code, documentation vivante",
    ],
    ai: true,
  },
  {
    period: 'Jan. 2019 — Août 2021', company: 'Sofia Holding', loc: 'Tunisie',
    title: 'Team Leader Web',
    bullets: [
      "Leadership d'une équipe de développeurs web sur des projets critiques multi-clients",
      "Architecture technique, découpage des tâches, estimation des charges et pilotage des plannings",
      "Participation aux appels d'offres, analyses d'impact et chiffrage technique",
      "Supervision des cycles de tests (intégration, TNR) et validation des livraisons",
    ],
  },
  {
    period: 'Mai 2017 — Déc. 2018', company: 'Sofia Holding', loc: 'Tunisie',
    title: 'Développeur Web Senior',
    bullets: [
      "Conception et développement d'applications métiers complexes avec Symfony et Angular",
      "Développement de plateformes e-Achat, SRM et outils de gestion des fournisseurs",
      "Création de plateformes collaboratives intégrant GED et workflows de validation",
    ],
  },
  {
    period: 'Fév. 2013 — Avr. 2017', company: 'DTCad Engineering', loc: 'Tunisie',
    title: 'Développeur Web & Spécialiste E-learning',
    bullets: [
      "Développement d'applications métiers sous Symfony (CRM, mini-ERP)",
      "Administration et évolution de plateformes Moodle et Claroline",
      "Développement de modules et personnalisations LMS",
    ],
  },
  {
    period: 'Avr. 2011 — Jan. 2013', company: 'SIT Elearning', loc: 'Tunisie',
    title: 'Développeur Web',
    bullets: [
      "Développement de solutions e-learning basées sur Moodle",
      "Conception d'une application de gestion des compétences",
    ],
  },
]

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
