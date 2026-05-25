import { useState, useEffect } from 'react'

export const NAV_LINKS = [
  { href: '#competences', label: 'Skills' },
  { href: '#experience',  label: 'Expérience' },
  { href: '#certifications', label: 'Certs' },
  { href: '#ai-chat',    label: 'AI Assistant' },
  { href: '#contact',    label: 'Contact' },
]

export function useTheme() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark'
    setTheme(saved)
    document.documentElement.setAttribute('data-theme', saved)
  }, [])

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    localStorage.setItem('theme', next)
    document.documentElement.setAttribute('data-theme', next)
  }

  return { theme, toggleTheme }
}
