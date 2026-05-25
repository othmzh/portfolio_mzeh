import ReactMarkdown from 'react-markdown'
import styles from '../styles/AIChat.module.css'
import { useChat } from '../hooks/useChat'
import { motion } from 'framer-motion'
import { fadeInUp } from '../hooks/useFadeInUp'

const SUGGESTIONS = [
  "Quelles sont ses compétences IA ?",
  "Quel est son rôle actuel ?",
  "Comment utilise-t-il Claude Code ?",
  "Ses certifications ?",
]

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
  const { messages, input, setInput, loading, showSugg, messagesRef, send } = useChat()
  const mdComponents = makeMdComponents(styles)

  return (
    <section id="ai-chat" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.label}>// intelligence artificielle</div>
        <h2 className={styles.h2}>Poser une question sur mon profil</h2>
        <p className={styles.sub}>Un assistant IA entraîné sur mon parcours répond en temps réel.</p>

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
              <div className={styles.aiName}>Assistant Othmen</div>
              <div className={styles.aiSub}>● En ligne — Powered by Claude</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} className={styles.messages}>
            {messages.map((m, i) => (
              <div key={i} className={styles.msgRow}>
                <div className={`${styles.ava} ${m.role === 'ai' ? styles.avaAI : styles.avaUser}`}>
                  {m.role === 'ai' ? 'AI' : 'Vous'}
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
              placeholder="Posez votre question..."
              className={styles.input}
            />
            <button
              onClick={() => send()}
              disabled={loading}
              className={`${styles.sendBtn}${loading ? ` ${styles.sendDisabled}` : ''}`}
            >
              Envoyer ↗
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
