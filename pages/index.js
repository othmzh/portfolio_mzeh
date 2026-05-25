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
        <title>Othmen Mzeh — Engineering Manager</title>
        <meta name="description" content="Engineering Manager & AI-Driven Leader. 15+ ans d'expérience en pilotage d'équipes techniques et intégration de l'IA générative." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
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
