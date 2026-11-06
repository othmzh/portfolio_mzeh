import { useRouter } from 'next/router'
import { createContext, useContext } from 'react'

export const TranslationContext = createContext({ dictionary: {}, content: {} })
// Next's default 500 page has no static page props. Keep global navigation
// readable without shipping full dictionaries to every route.
const globalLabels = { fr: { 'footer.backToTop': 'Haut de page' }, en: { 'footer.backToTop': 'Back to top' } }

export function useTranslation() {
  const { locale } = useRouter()
  const { dictionary, content } = useContext(TranslationContext)

  function t(key) {
    return dictionary[key] ?? globalLabels[locale === 'en' ? 'en' : 'fr'][key] ?? key
  }

  return { t, locale: locale ?? 'fr', content }
}
