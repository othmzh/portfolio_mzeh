import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import AIChat from '../components/AIChat'
import Contact from '../components/Contact'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Othmen Mzeh — Engineering Manager & AI-Driven Leader</title>
        <meta name="description" content="Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative. Basé en Tunisie, disponible à distance." />
        <meta name="keywords" content="Engineering Manager, Technical Delivery Manager, AI, Claude Code, Agile, Scrum, Tunisie, Remote, Symfony, Angular, Azure DevOps" />
        <meta name="author" content="Othmen Mzeh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://omzeh.tn" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omzeh.tn" />
        <meta property="og:title" content="Othmen Mzeh — Engineering Manager & AI-Driven Leader" />
        <meta property="og:description" content="Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative. Basé en Tunisie, disponible à distance." />
        <meta property="og:image" content="https://omzeh.tn/api/og" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Othmen Mzeh" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@othmen_mzeh" />
        <meta name="twitter:creator" content="@othmen_mzeh" />
        <meta name="twitter:title" content="Othmen Mzeh — Engineering Manager & AI-Driven Leader" />
        <meta name="twitter:description" content="Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative." />
        <meta name="twitter:image" content="https://omzeh.tn/api/og" />

        {/* Author & performance hints */}
        <link rel="author" href="https://omzeh.tn" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://api.groq.com" />
        <link rel="dns-prefetch" href="https://vercel-insights.com" />

        {/* JSON-LD — Person */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Othmen Mzeh",
            "url": "https://omzeh.tn",
            "image": "https://omzeh.tn/othmen.png",
            "jobTitle": "Engineering Manager",
            "description": "Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative. Spécialiste Claude Code et IA appliquée au Software Engineering.",
            "email": "oth.mzh@gmail.com",
            "telephone": "+21653795988",
            "nationality": { "@type": "Country", "name": "Tunisie" },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TN",
              "addressLocality": "Tunisie"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": "Maîtrise en Informatique Appliquée"
            },
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Engineering Manager",
              "occupationLocation": { "@type": "Country", "name": "Tunisie" },
              "description": "Pilotage d'équipes techniques, delivery agile, intégration de l'IA générative dans les workflows engineering.",
              "skills": "Agile, Scrum, Azure DevOps, Claude Code, Symfony, Angular, PHP, JavaScript"
            },
            "knowsLanguage": [
              { "@type": "Language", "name": "Français" },
              { "@type": "Language", "name": "Anglais" },
              { "@type": "Language", "name": "Arabe" }
            ],
            "knowsAbout": [
              "Engineering Management", "Technical Delivery", "Agile", "Scrum",
              "Azure DevOps", "Release Management", "Claude Code", "AI-Driven Development",
              "Prompt Engineering", "Symfony", "Angular", "PHP", "JavaScript", "Moodle"
            ],
            "sameAs": [
              "https://linkedin.com/in/othmen-mzeh-64740961"
            ]
          })}}
        />
        {/* JSON-LD — ProfilePage */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfilePage",
            "dateCreated": "2024-01-01",
            "dateModified": new Date().toISOString().split('T')[0],
            "mainEntity": {
              "@type": "Person",
              "name": "Othmen Mzeh",
              "identifier": "othmen-mzeh",
              "jobTitle": "Engineering Manager",
              "description": "Engineering Manager Tunisie — 15 ans d'expérience, expert IA générative et delivery agile, disponible à distance."
            }
          })}}
        />
        {/* JSON-LD — WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Othmen Mzeh",
            "url": "https://omzeh.tn",
            "description": "Portfolio d'Othmen Mzeh, Engineering Manager & AI-Driven Leader basé en Tunisie.",
            "inLanguage": "fr-FR",
            "author": {
              "@type": "Person",
              "name": "Othmen Mzeh"
            },
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://omzeh.tn/?q={search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          })}}
        />
        {/* JSON-LD — FAQ */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Qui est Othmen Mzeh ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Othmen Mzeh est un Engineering Manager basé en Tunisie avec plus de 15 ans d'expérience dans le pilotage d'équipes techniques, le delivery agile et l'intégration de l'IA générative dans les workflows engineering." }
              },
              {
                "@type": "Question",
                "name": "Quelles sont les compétences d'Othmen Mzeh ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Ses compétences clés incluent : Management & Delivery (Agile/Scrum, Azure DevOps, Release Management, Leadership), IA Générative (Claude Code, Prompt Engineering, AI-Driven Development, QA IA) et Stack Technique (Symfony, Angular, PHP, JavaScript, Moodle)." }
              },
              {
                "@type": "Question",
                "name": "Est-ce qu'Othmen Mzeh est disponible pour des missions à distance ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Oui, Othmen Mzeh est ouvert à de nouvelles opportunités en Tunisie ou à distance. Vous pouvez le contacter via LinkedIn ou par email à oth.mzh@gmail.com." }
              },
              {
                "@type": "Question",
                "name": "Comment Othmen Mzeh utilise-t-il l'IA dans son travail ?",
                "acceptedAnswer": { "@type": "Answer", "text": "Othmen Mzeh intègre concrètement l'IA générative dans les pratiques engineering : revues de code assistées avec Claude Code, prompts structurés, checklists qualité automatisées, réduisant les cycles de review et améliorant la qualité des livrables." }
              }
            ]
          })}}
        />
      </Head>

      <Nav />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <Certifications />
        <AIChat />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

