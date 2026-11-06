import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/Nav.module.css'

export default function LangSwitcher() {
  const router = useRouter()
  const { locale, t } = useTranslation()
  const next = locale === 'fr' ? 'en' : 'fr'
  return <Link href={router.asPath} locale={next} scroll={false}
    className={styles.langBtn} aria-label={t('nav.lang.switch')} title={t('nav.lang.switch')} hrefLang={next}>
    {next.toUpperCase()}
  </Link>
}
