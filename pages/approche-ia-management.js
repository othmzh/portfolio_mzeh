import Head from 'next/head'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/Approach.module.css'

const COPY = {
  fr: {
    title: "IA et management d'ingénierie : une approche ancrée dans le travail d'équipe",
    seoTitle: "IA et management d’ingénierie | Othmen Mzeh",
    seoDescription: "Mon approche de l’IA en ingénierie : pratiques d’équipe, revues de code, qualité logicielle et accompagnement des développeurs.",
    intro: "L'IA générative a de la valeur lorsqu'elle aide une équipe à mieux livrer. Mon approche part des pratiques d'ingénierie et garde le jugement, la qualité et la progression des personnes au centre.",
    sections: [
      ["Partir du workflow réel", "Je commence par les étapes où l'équipe perd du temps ou rencontre des frictions : revue de code, documentation, tâches répétitives de contrôle qualité. L'outil vient ensuite; le besoin et le contexte de l'équipe guident son usage."],
      ["Installer des pratiques partagées", "Chez Witik, j'ai introduit Claude Code pour assister les revues de code, des prompts structurés pour rendre les demandes plus cohérentes et des checklists qualité automatisées. L'objectif est de rendre ces pratiques utiles à l'équipe, pas de multiplier les outils individuels."],
      ["Garder la responsabilité côté équipe", "L'IA prépare et accélère certaines tâches; l'équipe reste responsable des décisions techniques et des livrables. Le rôle du manager est de cadrer les usages, d'accompagner la montée en compétence et de préserver la qualité pendant le delivery."],
      ["Améliorer avec des retours concrets", "Nous observons l'effet sur les cycles de revue et la qualité des livrables, puis ajustons les pratiques. Dans mon expérience, l'adoption de ces workflows a réduit les cycles de review et amélioré la qualité des livrables."],
    ],
    back: "Retour au portfolio",
    eyebrow: "PRATIQUES D'INGÉNIERIE",
  },
  en: {
    title: "AI and engineering management: grounded in how teams work",
    seoTitle: "AI & Engineering Management | Othmen Mzeh",
    seoDescription: "My approach to AI in engineering: team practices, code reviews, software quality and developer growth.",
    intro: "Generative AI is valuable when it helps a team deliver better. My approach starts with engineering practices and keeps human judgment, quality and people development at the center.",
    sections: [
      ["Start with the real workflow", "I begin with the steps where the team loses time or faces friction: code review, documentation and repetitive quality checks. The tool comes second; the team's needs and context guide how it is used."],
      ["Establish shared practices", "At Witik, I introduced Claude Code to assist code reviews, structured prompts to make requests more consistent, and automated quality checklists. The goal is to make these practices useful to the team, not to multiply individual tools."],
      ["Keep responsibility with the team", "AI can prepare and accelerate parts of the work; the team remains responsible for technical decisions and deliverables. The manager frames usage, supports skill development and protects quality throughout delivery."],
      ["Improve through concrete feedback", "We look at the effect on review cycles and deliverable quality, then adjust our practices. In my experience, adopting these workflows reduced review cycles and improved deliverable quality."],
    ],
    back: "Back to portfolio",
    eyebrow: "ENGINEERING PRACTICES",
  },
}

export default function AIManagementApproach() {
  const { locale } = useTranslation()
  const copy = COPY[locale] ?? COPY.fr
  const home = locale === 'en' ? '/en' : '/'
  const canonicalUrl = `https://omzeh.tn${locale === 'en' ? '/en' : ''}/approche-ia-management`
  const alternateFr = 'https://omzeh.tn/approche-ia-management'
  const alternateEn = 'https://omzeh.tn/en/approche-ia-management'

  return (
    <>
      <Head>
        <title>{copy.seoTitle}</title>
        <meta name="description" content={copy.seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="fr" href={alternateFr} />
        <link rel="alternate" hrefLang="en" href={alternateEn} />
        <link rel="alternate" hrefLang="x-default" href={alternateFr} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={copy.seoTitle} />
        <meta property="og:description" content={copy.seoDescription} />
        <meta property="og:image" content="https://omzeh.tn/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content={locale === 'en' ? 'en_US' : 'fr_FR'} />
        <meta property="og:site_name" content="Othmen Mzeh" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={copy.seoTitle} />
        <meta name="twitter:description" content={copy.seoDescription} />
        <meta name="twitter:image" content="https://omzeh.tn/api/og" />
      </Head>
      <main className={styles.page}>
        <article className={styles.article}>
          <a className={styles.brand} href={home}>othmen.mzeh</a>
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h1 className={styles.title}>{copy.title}</h1>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.sections}>
            {copy.sections.map(([heading, body]) => (
              <section key={heading} className={styles.section}>
                <h2>{heading}</h2>
                <p>{body}</p>
              </section>
            ))}
          </div>
          <a className={styles.back} href={home}>← {copy.back}</a>
        </article>
      </main>
    </>
  )
}
