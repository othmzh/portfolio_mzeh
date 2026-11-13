import { useTranslation } from '../hooks/useTranslation'
import { useChatWidget } from '../hooks/useChatWidget'
import styles from '../styles/WhatsAppButton.module.css'

const WA_NUMBER = '21653795988'
const LINKEDIN_PROFILE = 'https://linkedin.com/in/othmen-mzeh'

const MESSAGE = {
  fr: "Bonjour Othmen, j'ai visité votre portfolio et je souhaite vous contacter.",
  en: "Hello Othmen, I visited your portfolio and would like to get in touch.",
}

export default function WhatsAppButton() {
  const { locale, t } = useTranslation()
  const { openChat } = useChatWidget()
  const text = encodeURIComponent(MESSAGE[locale] ?? MESSAGE.fr)
  const href = `https://wa.me/${WA_NUMBER}?text=${text}`

  return (
    <div className={styles.actions}>
      {t('chat.open') !== 'chat.open' && <button id="chatbot-launcher" type="button" className={`${styles.actionButton} ${styles.chatButton}`} onClick={openChat} aria-label={t('chat.open')} aria-haspopup="dialog" aria-controls="portfolio-chatbot">
        <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-8 8H5l-3 2v-10a9 9 0 0 1 18 0Z"/><path d="M7 10h8M7 14h5"/></svg>
        <span>{t('chat.launcher')}</span>
      </button>}
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
      <a className={styles.actionButton} href={LINKEDIN_PROFILE} target="_blank" rel="noreferrer" aria-label={locale === 'en' ? 'View my LinkedIn profile' : 'Voir mon profil LinkedIn'}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 2H3.55C2.69 2 2 2.68 2 3.52v16.96c0 .84.69 1.52 1.55 1.52h16.9c.86 0 1.55-.68 1.55-1.52V3.52c0-.84-.69-1.52-1.55-1.52ZM7.93 18.75H4.98V9.2h2.95v9.55ZM6.46 7.9a1.71 1.71 0 1 1 0-3.42 1.71 1.71 0 0 1 0 3.42Zm12.29 10.85H15.8V14.1c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.73H9.51V9.2h2.83v1.3h.04c.39-.74 1.36-1.53 2.8-1.53 3 0 3.57 1.97 3.57 4.53v5.25Z" />
        </svg>
        <span>LinkedIn</span>
      </a>
    </div>
  )
}
