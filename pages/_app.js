import '../styles/globals.css'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Space_Grotesk, Space_Mono } from 'next/font/google'
import ErrorBoundary from '../components/ErrorBoundary'
import WhatsAppButton from '../components/WhatsAppButton'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono',
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <style>{`
        :root {
          --font-sans: ${spaceGrotesk.style.fontFamily};
          --font-mono: ${spaceMono.style.fontFamily};
        }
      `}</style>
      <ErrorBoundary><Component {...pageProps} /></ErrorBoundary>
      <WhatsAppButton />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
