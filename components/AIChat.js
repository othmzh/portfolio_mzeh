import ReactMarkdown from 'react-markdown'
import styles from '../styles/AIChat.module.css'
import { useChat } from '../hooks/useChat'
import { useTranslation } from '../hooks/useTranslation'

function makeMdComponents(s) {
  return {
    p: ({ children }) => <p className={s.mdP}>{children}</p>,
    strong: ({ children }) => <strong className={s.mdStrong}>{children}</strong>,
    em: ({ children }) => <em className={s.mdEm}>{children}</em>,
    ul: ({ children }) => <ul className={s.mdUl}>{children}</ul>,
    ol: ({ children }) => <ol className={s.mdOl}>{children}</ol>,
    li: ({ children }) => <li className={s.mdLi}>{children}</li>,
    h1: ({ children }) => <h3 className={s.mdH1}>{children}</h3>,
    h2: ({ children }) => <h3 className={s.mdH2}>{children}</h3>,
    h3: ({ children }) => <h3 className={s.mdH3}>{children}</h3>,
    code: ({ children }) => <code className={s.mdCode}>{children}</code>,
    pre: ({ children }) => <pre className={s.mdPre}>{children}</pre>,
    a: ({ children, href }) => <a className={s.mdLink} href={href} target="_blank" rel="noreferrer">{children}</a>,
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

  return (
    <div className={styles.wrapper}>
          {/* Messages */}
          <div ref={messagesRef} className={styles.messages} role="log" aria-live="polite" aria-relevant="additions text" aria-label={t('chat.messages')}>
            {messages.map((m, i) => (
              <div key={i} className={`${styles.msgRow}${m.role === 'user' ? ` ${styles.msgRowUser}` : ''}`}>
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
                  <span className={styles.srOnly}>{t('chat.typing')}</span>
                  <div className={styles.dots} aria-hidden="true">
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
                <button type="button" key={q} className={`sugg-btn ${styles.suggBtn}`} disabled={loading} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <form className={styles.inputArea} onSubmit={event => { event.preventDefault(); send() }}>
            <input
              aria-label={t('chat.placeholder')}
              maxLength={2000}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={event => { if (event.key === 'Enter' && event.nativeEvent.isComposing) event.preventDefault() }}
              placeholder={t('chat.placeholder')}
              className={styles.input}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className={`${styles.sendBtn}${loading ? ` ${styles.sendDisabled}` : ''}`}
            >
              {t('chat.send')}
            </button>
          </form>
    </div>
  )
}
