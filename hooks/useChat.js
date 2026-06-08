import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/router'

const WELCOME = {
  fr: "Bonjour ! Je suis l'assistant IA d'Othmen Mzeh. Je connais son parcours, ses compétences et son expérience en détail. Que voulez-vous savoir ?",
  en: "Hello! I'm Othmen Mzeh's AI assistant. I know his career, skills and experience in detail. What would you like to know?",
}

const ERROR_TIMEOUT = {
  fr: "La réponse a pris trop de temps. Veuillez réessayer.",
  en: "The response took too long. Please try again.",
}

const ERROR_GENERIC = {
  fr: "Une erreur s'est produite. Veuillez réessayer.",
  en: "An error occurred. Please try again.",
}

const ERROR_FALLBACK = {
  fr: "Désolé, je n'ai pas pu répondre.",
  en: "Sorry, I couldn't respond.",
}

export function useChat() {
  const { locale } = useRouter()
  const lang = locale === 'en' ? 'en' : 'fr'

  const [messages, setMessages] = useState([
    { role: 'ai', text: WELCOME[lang] }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSugg, setShowSugg] = useState(true)
  const messagesRef = useRef(null)

  useEffect(() => {
    setMessages([{ role: 'ai', text: WELCOME[lang] }])
    setShowSugg(true)
    setInput('')
  }, [lang])

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
        body: JSON.stringify({ message: msg, locale: lang }),
        signal: controller.signal,
      })
      const data = await res.json()
      const reply = data.reply || data.error || ERROR_FALLBACK[lang]
      setMessages(prev => [...prev, { role: 'ai', text: reply }])
    } catch (err) {
      const text = err.name === 'AbortError'
        ? ERROR_TIMEOUT[lang]
        : ERROR_GENERIC[lang]
      setMessages(prev => [...prev, { role: 'ai', text }])
    } finally {
      clearTimeout(timeoutId)
    }
    setLoading(false)
  }

  return { messages, input, setInput, loading, showSugg, messagesRef, send }
}
