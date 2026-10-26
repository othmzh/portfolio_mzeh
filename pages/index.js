import Head from 'next/head'
import Nav from '../components/Nav'
import SectionBubbles from '../components/SectionBubbles'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import CaseStudies from '../components/CaseStudies'
import Certifications from '../components/Certifications'
import Testimonials from '../components/Testimonials'
import AIChat from '../components/AIChat'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useTranslation } from '../hooks/useTranslation'

export default function Home() {
  const { t, locale } = useTranslation()

  const canonicalBase = 'https://omzeh.tn'
  const canonicalUrl = locale === 'fr' ? canonicalBase : `${canonicalBase}/${locale}`
  const socialImageUrl = locale === 'en' ? `${canonicalBase}/api/og?locale=en` : `${canonicalBase}/api/og`

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="author" content="Othmen Mzeh" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="fr" href={canonicalBase} />
        <link rel="alternate" hrefLang="en" href={`${canonicalBase}/en`} />
        <link rel="alternate" hrefLang="x-default" href={canonicalBase} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:title" content={t('meta.title')} />
        <meta property="og:description" content={t('meta.description')} />
        <meta property="og:image" content={socialImageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:locale" content={t('meta.ogLocale')} />
        <meta property="og:site_name" content="Othmen Mzeh" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@othmen_mzeh" />
        <meta name="twitter:creator" content="@othmen_mzeh" />
        <meta name="twitter:title" content={t('meta.title')} />
        <meta name="twitter:description" content={t('meta.twitterDescription')} />
        <meta name="twitter:image" content={socialImageUrl} />

        {/* Author & performance hints */}
        <link rel="author" href="https://omzeh.tn" />
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
            "description": t('meta.description'),
            "nationality": { "@type": "Country", "name": locale === 'en' ? "Tunisia" : "Tunisie" },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TN",
              "addressLocality": locale === 'en' ? "Tunisia" : "Tunisie"
            },
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Engineering Manager",
              "occupationLocation": { "@type": "Country", "name": locale === 'en' ? "Tunisia" : "Tunisie" },
              "description": t('meta.description'),
              "skills": "Engineering Management, Technical Delivery, Agile, Scrum, Azure DevOps, Claude Code, AI-assisted code review, JavaScript, Node.js, Next.js"
            },
            "knowsLanguage": [
              { "@type": "Language", "name": "Français" },
              { "@type": "Language", "name": "Anglais" },
              { "@type": "Language", "name": "Arabe" }
            ],
            "knowsAbout": [
              "Engineering Management", "Technical Delivery", "Agile", "Scrum",
              "Azure DevOps", "Release Management", "Claude Code", "AI-assisted Software Engineering",
              "Prompt Engineering", "Code Review", "JavaScript", "Node.js", "Next.js"
            ],
            "sameAs": [
              "https://linkedin.com/in/othmen-mzeh"
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
              "description": t('meta.description')
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
            "description": t('meta.description'),
            "inLanguage": locale === 'en' ? "en-US" : "fr-FR",
            "author": {
              "@type": "Person",
              "name": "Othmen Mzeh"
            },
          })}}
        />
      </Head>

      <Nav />
      <SectionBubbles />
      <main>
        <Hero />
        <Skills />
        <Experience />
        <CaseStudies />
        <Certifications />
        <Testimonials />
        <AIChat />
        <Contact />
      </main>

      <Footer />
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {},
    revalidate: 60,
  }
}
