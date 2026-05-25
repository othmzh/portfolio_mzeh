import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import AIChat from '../components/AIChat'
import Contact from '../components/Contact'

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
        <link rel="icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://omzeh.tn" />
        <meta property="og:title" content="Othmen Mzeh — Engineering Manager & AI-Driven Leader" />
        <meta property="og:description" content="Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative. Basé en Tunisie, disponible à distance." />
        <meta property="og:image" content="https://omzeh.tn/othmen.png" />
        <meta property="og:locale" content="fr_FR" />
        <meta property="og:site_name" content="Othmen Mzeh" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Othmen Mzeh — Engineering Manager & AI-Driven Leader" />
        <meta name="twitter:description" content="Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative." />
        <meta name="twitter:image" content="https://omzeh.tn/othmen.png" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Othmen Mzeh",
            "url": "https://omzeh.tn",
            "image": "https://omzeh.tn/othmen.png",
            "jobTitle": "Engineering Manager",
            "description": "Engineering Manager avec 15+ ans d'expérience en pilotage d'équipes techniques, delivery agile et intégration de l'IA générative.",
            "email": "oth.mzh@gmail.com",
            "telephone": "+21653795988",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TN"
            },
            "sameAs": [
              "https://linkedin.com/in/othmen-mzeh-64740961"
            ],
            "knowsAbout": ["Engineering Management", "Agile", "Scrum", "Azure DevOps", "Claude Code", "AI", "Symfony", "Angular", "PHP", "JavaScript"]
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

      <footer style={styles.footer}>
        // othmen.mzeh — engineering manager &amp; ai-driven leader — tunisie 2025
      </footer>

      <style>{`
        .exp-bullet::before {
          content: '//';
          position: absolute;
          left: 0;
          color: var(--accent);
          font-family: var(--mono);
          font-size: 10px;
          top: 6px;
        }
      `}</style>
    </>
  )
}

const styles = {
  footer: {
    textAlign: 'center', padding: '2rem 5vw',
    fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--text3)',
    borderTop: '1px solid var(--border)', background: 'var(--bg)',
    position: 'relative', zIndex: 1,
  },
}
