import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

// Ordre de préférence pour la valeur initiale : choix déjà enregistré par le
// visiteur > thème du système > sombre par défaut (identité visuelle du site).
function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'

  const savedTheme = window.localStorage.getItem('portfolio-theme')
  if (savedTheme === 'dark' || savedTheme === 'light') return savedTheme

  const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches
  return prefersLight ? 'light' : 'dark'
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === 'dark' ? 'light' : 'dark'))
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme doit être utilisé à l’intérieur de <ThemeProvider>')
  }
  return context
}
