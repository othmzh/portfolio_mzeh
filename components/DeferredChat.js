import { useEffect, useRef, useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import styles from '../styles/AIChat.module.css'

export default function DeferredChat() {
  const { t } = useTranslation()
  const root = useRef(null)
  const pending = useRef(false)
  const [Chat, setChat] = useState(null)
  const [failed, setFailed] = useState(false)

  const load = async () => {
    if (pending.current) return
    pending.current = true
    setFailed(false)
    try {
      const module = await import('./AIChat')
      setChat(() => module.default)
    } catch {
      pending.current = false
      setFailed(true)
    }
  }

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect()
        load()
      }
    }, { rootMargin: '300px' })
    observer.observe(root.current)
    return () => observer.disconnect()
  }, [])

  return <section ref={root} id="ai-chat" className={styles.section}>
    <div className={styles.container}>
      <div className={styles.label}>{t('chat.label')}</div>
      <h2 className={styles.h2}>{t('chat.heading')}</h2>
      <p className={styles.sub}>{t('chat.sub')}</p>
      <div className={styles.deferred}>
        {Chat ? <Chat /> : <div className={styles.placeholder}>
          <p>{t('chat.welcome')}</p>
          <button className={styles.sendBtn} onClick={load}>{failed ? t('chat.retry') : t('chat.open')}</button>
          <noscript>{t('chat.requiresJs')}</noscript>
        </div>}
      </div>
    </div>
  </section>
}
