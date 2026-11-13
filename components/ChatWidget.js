import { useCallback, useEffect, useRef, useState } from 'react'
import { ChatWidgetContext } from '../hooks/useChatWidget'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/ChatWidget.module.css'

export default function ChatWidget({ children }) {
  const { t, locale } = useTranslation()
  const dialogRef = useRef(null)
  const triggerRef = useRef(null)
  const [isOpen, setIsOpen] = useState(false)
  const [Chat, setChat] = useState(null)
  const [failed, setFailed] = useState(false)
  const [attempt, setAttempt] = useState(0)

  const openChat = useCallback(event => {
    event?.preventDefault()
    triggerRef.current = event?.currentTarget || document.activeElement
    setIsOpen(true)
  }, [])

  const closeChat = () => {
    dialogRef.current?.close()
    setIsOpen(false)
  }

  useEffect(() => {
    if (!isOpen) return
    const dialog = dialogRef.current
    if (!dialog.open) dialog.showModal()
    const messages = dialog.querySelector('[role="log"]')
    if (messages) messages.scrollTop = messages.scrollHeight
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen || Chat) return
    let active = true
    setFailed(false)
    import('./AIChat').then(module => {
      if (active) setChat(() => module.default)
    }).catch(() => {
      if (active) setFailed(true)
    })
    return () => { active = false }
  }, [isOpen, Chat, attempt])

  return <ChatWidgetContext.Provider value={{ openChat }}>
    {children}
    <dialog id="portfolio-chatbot" ref={dialogRef} className={styles.dialog} aria-labelledby="chatbot-title"
      onCancel={closeChat}
      onClose={() => {
        setIsOpen(false)
        const trigger = triggerRef.current?.isConnected ? triggerRef.current : document.getElementById('chatbot-launcher')
        trigger?.focus()
      }}
      onClick={event => {
        if (event.target !== event.currentTarget) return
        const rect = event.currentTarget.getBoundingClientRect()
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeChat()
      }}>
      <div className={styles.header}>
        <div className={styles.avatar} aria-hidden="true">{locale === 'en' ? 'AI' : 'IA'}</div>
        <div>
          <h2 id="chatbot-title" className={styles.title}>{t('chat.aiName')}</h2>
          <p className={styles.subtitle}>{t('chat.widget.subtitle')}</p>
        </div>
        <button type="button" className={styles.close} onClick={closeChat} aria-label={t('chat.close')} autoFocus>×</button>
      </div>
      <div className={styles.body}>
        {Chat ? <Chat key={locale} /> : <div className={styles.loading} role="status">
          <p>{failed ? t('chat.loadError') : t('chat.loading')}</p>
          {failed && <button type="button" onClick={() => setAttempt(value => value + 1)}>{t('chat.retry')}</button>}
        </div>}
      </div>
      <p className={styles.privacy}>{t('chat.privacy')}</p>
    </dialog>
  </ChatWidgetContext.Provider>
}
