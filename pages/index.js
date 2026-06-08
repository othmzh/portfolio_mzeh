import Head from 'next/head'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Certifications from '../components/Certifications'
import AIChat from '../components/AIChat'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import { useTranslation } from '../hooks/useTranslation'

export default function Home() {
  const { t, locale } = useTranslation()

  const canonicalBase = 'https://omzeh.tn'
  const canonicalUrl = locale === 'fr' ? canonicalBase : `${canonicalBase}/${locale}`

  return (
    <>
      <Head>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
        <meta name="keywords" content="Engineering Manager, Technical Delivery Manager, AI, Claude Code, Agile, Scrum, Tunisia, Remote, Symfony, Angular, Azure DevOps" />
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
        <meta property="og:image" content="https://omzeh.tn/api/og" />
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
        <meta name="twitter:image" content="https://omzeh.tn/api/og" />

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
            "email": "oth.mzh@gmail.com",
            "telephone": "+21653795988",
            "nationality": { "@type": "Country", "name": locale === 'en' ? "Tunisia" : "Tunisie" },
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "TN",
              "addressLocality": locale === 'en' ? "Tunisia" : "Tunisie"
            },
            "alumniOf": {
              "@type": "EducationalOrganization",
              "name": locale === 'en' ? "Master's in Applied Computer Science" : "Maîtrise en Informatique Appliquée"
            },
            "hasOccupation": {
              "@type": "Occupation",
              "name": "Engineering Manager",
              "occupationLocation": { "@type": "Country", "name": locale === 'en' ? "Tunisia" : "Tunisie" },
              "description": t('meta.description'),
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
