import styles from '../styles/Footer.module.css'
import { useTranslation } from '../hooks/useTranslation'

export default function Footer() {
  const { t } = useTranslation()
  const copyrightYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.copyright}>
        <span>© <time dateTime={String(copyrightYear)}>{copyrightYear}</time> Othmen Mzeh — {t('footer.copyright')}</span>
      </div>
    </footer>
  )
}
