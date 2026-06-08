import ReactMarkdown from 'react-markdown'
import styles from '../styles/AIChat.module.css'
import { useChat } from '../hooks/useChat'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'
import { useTranslation } from '../hooks/useTranslation'

function makeMdComponents(s) {
  return {
    p: ({ children }) => <p className={s.mdP}>{children}</p>,
    strong: ({ children }) => <strong className={s.mdStrong}>{children}</strong>,
    em: ({ children }) => <em className={s.mdEm}>{children}</em>,
    ul: ({ children }) => <ul className={s.mdUl}>{children}</ul>,
    ol: ({ children }) => <ol className={s.mdOl}>{children}</ol>,
    li: ({ children }) => <li className={s.mdLi}>{children}</li>,
    h1: ({ children }) => <h1 className={s.mdH1}>{children}</h1>,
    h2: ({ children }) => <h2 className={s.mdH2}>{children}</h2>,
    h3: ({ children }) => <h3 className={s.mdH3}>{children}</h3>,
    code: ({ children }) => <code className={s.mdCode}>{children}</code>,
    blockquote: ({ children }) => <blockquote className={s.mdBlockquote}>{children}</blockquote>,
    hr: () => <hr className={s.mdHr} />,
  }
}

export default function AIChat() {
  const { t } = useTranslation()
  const { messages, input, setInput, loading, showSugg, messagesRef, send } = useChat()
  const mdComponents = makeMdComponents(styles)

  const SUGGESTIONS = [
    t('chat.suggestion.0'),
    t('chat.suggestion.1'),
    t('chat.suggestion.2'),
    t('chat.suggestion.3'),
  ]

  const FAQ = [
    { q: t('chat.faq.0.q'), a: t('chat.faq.0.a') },
    { q: t('chat.faq.1.q'), a: t('chat.faq.1.a') },
    { q: t('chat.faq.2.q'), a: t('chat.faq.2.a') },
    { q: t('chat.faq.3.q'), a: t('chat.faq.3.a') },
  ]

  return (
    <section id="ai-chat" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>{t('chat.label')}</div>
        <h2 className={styles.h2}>{t('chat.heading')}</h2>
        <p className={styles.sub}>{t('chat.sub')}</p>

        {/* FAQ statique indexable par Google — visuellement masquée */}
        <div style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }} aria-hidden="false">
          {FAQ.map((item, i) => (
            <div key={i} itemScope itemType="https://schema.org/Question">
              <h3 itemProp="name">{item.q}</h3>
              <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                <p itemProp="text">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          className={styles.wrapper}
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Header */}
          <div className={styles.header}>
            <div className={styles.avatar}>AI</div>
            <div>
              <div className={styles.aiName}>{t('chat.aiName')}</div>
              <div className={styles.aiSub}>{t('chat.aiStatus')}</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={styles.msgRow}>
                <div className={`${styles.ava} ${m.role === 'ai' ? styles.avaAI : styles.avaUser}`}>
                  {m.role === 'ai' ? 'AI' : t('chat.you')}
                </div>
                <div className={`${styles.bubble}${m.role === 'user' ? ` ${styles.bubbleUser}` : ''}`}>
                  {m.role === 'ai' ? (
                    <ReactMarkdown components={mdComponents}>{m.text}</ReactMarkdown>
                  ) : m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className={styles.msgRow}>
                <div className={`${styles.ava} ${styles.avaAI}`}>AI</div>
                <div className={`${styles.bubble} ${styles.bubbleLoading}`}>
                  <div className={styles.dots}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span key={i} className={styles.dotAnim} style={{ animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {showSugg && (
            <div className={styles.sugg}>
              {SUGGESTIONS.map(q => (
                <button key={q} className={`sugg-btn ${styles.suggBtn}`} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className={styles.inputArea}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={t('chat.placeholder')}
              className={styles.input}
            />
            <button
              onClick={() => send()}
              disabled={loading}
              className={`${styles.sendBtn}${loading ? ` ${styles.sendDisabled}` : ''}`}
            >
              {t('chat.send')}
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
