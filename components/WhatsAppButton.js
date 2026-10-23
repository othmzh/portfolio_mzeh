import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/WhatsAppButton.module.css'

const WA_NUMBER = '21653795988'

const MESSAGE = {
  fr: "Bonjour Othmen, j'ai visité votre portfolio et je souhaite vous contacter.",
  en: "Hello Othmen, I visited your portfolio and would like to get in touch.",
}

export default function WhatsAppButton() {
  const { locale, t } = useTranslation()
  const text = encodeURIComponent(MESSAGE[locale] ?? MESSAGE.fr)
  const href = `https://wa.me/${WA_NUMBER}?text=${text}`

  return (
    <div className={styles.actions}>
      <a className={styles.actionButton} href="#hero">
        <span aria-hidden="true">↑</span> {t('footer.backToTop')}
      </a>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={locale === 'en' ? 'Chat on WhatsApp' : 'Contacter sur WhatsApp'}
        className={styles.actionButton}
      >
        <svg width="20" height="20" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M16 2C8.268 2 2 8.268 2 16c0 2.492.676 4.826 1.854 6.83L2 30l7.374-1.832A13.94 13.94 0 0016 30c7.732 0 14-6.268 14-14S23.732 2 16 2z" fill="white"/>
          <path d="M22.003 19.394c-.32-.16-1.894-.934-2.188-1.04-.294-.107-.508-.16-.722.16-.214.32-.828 1.04-1.015 1.254-.187.213-.374.24-.694.08-.32-.16-1.352-.499-2.576-1.59-.952-.849-1.594-1.898-1.781-2.218-.187-.32-.02-.493.14-.652.144-.143.32-.373.48-.56.16-.186.213-.32.32-.533.107-.213.053-.4-.027-.56-.08-.16-.722-1.739-.989-2.38-.26-.625-.524-.54-.722-.55-.187-.008-.4-.01-.614-.01-.213 0-.56.08-.853.4-.294.32-1.12 1.094-1.12 2.667 0 1.573 1.147 3.093 1.307 3.306.16.214 2.257 3.447 5.47 4.834.764.33 1.36.527 1.824.674.767.244 1.465.21 2.017.127.615-.092 1.894-.774 2.16-1.521.267-.747.267-1.387.187-1.52-.08-.134-.293-.214-.613-.374z" fill="#25D366"/>
        </svg>
        <span>WhatsApp</span>
      </a>
    </div>
  )
}
