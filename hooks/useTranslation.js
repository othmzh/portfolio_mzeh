import { useRouter } from 'next/router'
import fr from '../locales/fr.json'
import en from '../locales/en.json'

const dictionaries = { fr, en }

export function useTranslation() {
  const { locale } = useRouter()
  const dict = dictionaries[locale] ?? dictionaries.fr

  function t(key) {
    return dict[key] ?? fr[key] ?? key
  }

  return { t, locale }
}
