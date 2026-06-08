import { useRouter } from 'next/router'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/Nav.module.css'

export default function LangSwitcher() {
  const router = useRouter()
  const { locale, t } = useTranslation()

  const toggle = () => {
    const next = locale === 'fr' ? 'en' : 'fr'
    router.push({ pathname: router.pathname, query: router.query }, router.asPath, { locale: next, scroll: false })
  }

  return (
    <button
      onClick={toggle}
      className={styles.langBtn}
      aria-label={t('nav.lang.switch')}
      title={t('nav.lang.switch')}
    >
      {locale === 'fr' ? 'EN' : 'FR'}
    </button>
  )
}
