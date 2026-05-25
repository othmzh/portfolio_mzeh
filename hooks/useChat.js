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

  return { messages, input, setInput, loading, showSugg, messagesRef, send }
}
