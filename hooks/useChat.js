import { useState, useRef, useEffect } from 'react'

export function useChat() {
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
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
        signal: controller.signal,
      })
      const data = await res.json()
      const reply = data.reply || data.error || "Désolé, je n'ai pas pu répondre."
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch (err) {
      const text = err.name === 'AbortError'
        ? "La réponse a pris trop de temps. Veuillez réessayer."
        : "Une erreur s'est produite. Veuillez réessayer."
      setMessages(prev => [...prev, { role: 'ai', text }])
    } finally {
      clearTimeout(timeoutId)
    }
    setLoading(false)
  }

  return { messages, input, setInput, loading, showSugg, messagesRef, send }
}
