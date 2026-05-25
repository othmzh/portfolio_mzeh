import { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'

const SUGGESTIONS = [
  "Quelles sont ses compétences IA ?",
  "Quel est son rôle actuel ?",
  "Comment utilise-t-il Claude Code ?",
  "Ses certifications ?",
]

export default function AIChat() {
  const [messages, setMessages] = useState([
    { role: 'ai', text: "Bonjour ! Je suis l'assistant IA d'Othmen Mzeh. Je connais son parcours, ses compétences et son expérience en détail. Que voulez-vous savoir ?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSugg, setShowSugg] = useState(true)
  const messagesRef = useRef(null)

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [messages, loading])

  const send = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return
    setInput('')
    setShowSugg(false)
    setLoading(true)
    setMessages(prev => [...prev, { role: 'user', text: msg }])
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      })
      const data = await res.json()
      const reply = data.reply || data.error || "Désolé, je n'ai pas pu répondre."
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch {
      setMessages(prev => [...prev, { role: 'ai', text: "Une erreur s'est produite. Veuillez réessayer." }])
    }
    setLoading(false)
  }

  return (
    <section id="ai-chat" style={s.section}>
      <div style={s.container}>
        <div style={s.label}>// intelligence artificielle</div>
        <h2 style={s.h2}>Poser une question sur mon profil</h2>
        <p style={s.sub}>Un assistant IA entraîné sur mon parcours répond en temps réel.</p>

        <div style={s.wrapper}>
          {/* Header */}
          <div style={s.header}>
            <div style={s.avatar}>AI</div>
            <div>
              <div style={s.aiName}>Assistant Othmen</div>
              <div style={s.aiSub}>● En ligne — Powered by Claude</div>
            </div>
          </div>

          {/* Messages */}
          <div ref={messagesRef} style={s.messages}>
            {messages.map((m, i) => (
              <div key={i} style={s.msgRow}>
                <div style={{ ...s.ava, ...(m.role === 'ai' ? s.avaAI : s.avaUser) }}>
                  {m.role === 'ai' ? 'AI' : 'Vous'}
                </div>
                <div style={{ ...s.bubble, ...(m.role === 'user' ? s.bubbleUser : {}) }}>
                  {m.role === 'ai' ? (
                    <ReactMarkdown components={mdComponents}>{m.text}</ReactMarkdown>
                  ) : m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={s.msgRow}>
                <div style={{ ...s.ava, ...s.avaAI }}>AI</div>
                <div style={{ ...s.bubble, padding: '14px 18px' }}>
                  <div style={s.dots}>
                    {[0, 0.2, 0.4].map((d, i) => (
                      <span key={i} style={{ ...s.dotAnim, animationDelay: `${d}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {showSugg && (
            <div style={s.sugg}>
              {SUGGESTIONS.map(q => (
                <button key={q} style={s.suggBtn} onClick={() => send(q)}>{q}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={s.inputArea}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send()}
              placeholder="Posez votre question..."
              style={s.input}
            />
            <button onClick={() => send()} disabled={loading} style={{ ...s.sendBtn, ...(loading ? s.sendDisabled : {}) }}>
              Envoyer ↗
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

const mdComponents = {
  p: ({ children }) => <p style={{ margin: '0 0 8px', lineHeight: 1.65 }}>{children}</p>,
  strong: ({ children }) => <strong style={{ color: 'var(--text)', fontWeight: 700 }}>{children}</strong>,
  em: ({ children }) => <em style={{ color: 'var(--accent)', fontStyle: 'italic' }}>{children}</em>,
  ul: ({ children }) => <ul style={{ margin: '6px 0 8px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ul>,
  ol: ({ children }) => <ol style={{ margin: '6px 0 8px', paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 4 }}>{children}</ol>,
  li: ({ children }) => <li style={{ lineHeight: 1.6 }}>{children}</li>,
  h1: ({ children }) => <h1 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text)', margin: '10px 0 6px', letterSpacing: '-0.01em' }}>{children}</h1>,
  h2: ({ children }) => <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text)', margin: '10px 0 6px', letterSpacing: '-0.01em' }}>{children}</h2>,
  h3: ({ children }) => <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--accent)', margin: '8px 0 4px' }}>{children}</h3>,
  code: ({ children }) => <code style={{ fontFamily: 'var(--mono)', fontSize: 12, background: 'var(--tag-bg)', color: 'var(--accent)', padding: '1px 6px', borderRadius: 4, border: '1px solid var(--tag-border)' }}>{children}</code>,
  blockquote: ({ children }) => <blockquote style={{ borderLeft: '3px solid var(--accent)', margin: '6px 0', paddingLeft: 12, color: 'var(--text2)', fontStyle: 'italic' }}>{children}</blockquote>,
  hr: () => <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '10px 0' }} />,
}

const s = {
  section: { padding: '100px 5vw', borderTop: '1px solid var(--border)', position: 'relative', zIndex: 1 },
  container: { maxWidth: 1100, margin: '0 auto' },
  label: { fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '0.75rem' },
  h2: { fontSize: 'clamp(22px,3.5vw,40px)', fontWeight: 700, letterSpacing: '-0.025em', marginBottom: '1rem', color: 'var(--text)' },
  sub: { fontSize: 'clamp(13px,2vw,15px)', color: 'var(--text2)', marginBottom: '2rem', maxWidth: 600 },
  wrapper: { maxWidth: 760, margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border2)', borderRadius: 12, overflow: 'hidden' },
  header: { background: 'var(--surface2)', padding: '16px 20px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: 12 },
  avatar: { width: 36, height: 36, borderRadius: 8, background: 'rgba(0,212,170,0.12)', border: '1px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: 12, fontWeight: 700, color: 'var(--accent)', flexShrink: 0 },
  aiName: { fontSize: 14, fontWeight: 600, color: 'var(--text)' },
  aiSub: { fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--accent)', marginTop: 1 },
  messages: { padding: 20, maxHeight: 380, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 16 },
  msgRow: { display: 'flex', gap: 10, alignItems: 'flex-start' },
  ava: { width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, fontFamily: 'var(--mono)' },
  avaAI: { background: 'var(--tag-bg)', color: 'var(--accent)', border: '1px solid var(--tag-border)' },
  avaUser: { background: 'rgba(0,151,255,0.12)', color: 'var(--accent2)', border: '1px solid rgba(0,151,255,0.2)' },
  bubble: { fontSize: 14, lineHeight: 1.65, color: 'var(--text2)', background: 'var(--surface2)', border: '1px solid var(--border)', borderRadius: 8, padding: '12px 14px', maxWidth: '85%', wordBreak: 'break-word' },
  bubbleUser: { background: 'rgba(0,151,255,0.06)', borderColor: 'rgba(0,151,255,0.15)', color: 'var(--text)' },
  dots: { display: 'flex', gap: 4, alignItems: 'center' },
  dotAnim: { width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', animation: 'dotbounce 1.2s infinite' },
  sugg: { padding: '0 20px 12px', display: 'flex', flexWrap: 'wrap', gap: 8 },
  suggBtn: { fontSize: 12, color: 'var(--text2)', background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 4, padding: '6px 12px', cursor: 'pointer', fontFamily: 'var(--mono)' },
  inputArea: { borderTop: '1px solid var(--border)', padding: '16px 20px', display: 'flex', gap: 10, alignItems: 'center' },
  input: { flex: 1, background: 'var(--surface2)', border: '1px solid var(--border2)', borderRadius: 6, padding: '10px 14px', fontSize: 14, color: 'var(--text)', fontFamily: 'var(--sans)', outline: 'none', minWidth: 0 },
  sendBtn: { background: 'var(--accent)', color: 'var(--btn-primary-text)', border: 'none', borderRadius: 6, padding: '10px 18px', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'var(--sans)', whiteSpace: 'nowrap', flexShrink: 0 },
  sendDisabled: { background: 'var(--border2)', color: 'var(--text3)', cursor: 'not-allowed' },
}
