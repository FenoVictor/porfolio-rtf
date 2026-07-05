import { createContext, useContext, useEffect, useState } from 'react'
import { translations } from '../data/translations'

const LanguageContext = createContext(null)

function getInitialLanguage() {
  if (typeof window === 'undefined') return 'fr'

  const savedLanguage = window.localStorage.getItem('portfolio-language')
  if (savedLanguage === 'fr' || savedLanguage === 'en') return savedLanguage

  const browserLanguage = window.navigator.language?.slice(0, 2)
  return browserLanguage === 'en' ? 'en' : 'fr'
}

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage)

  useEffect(() => {
    document.documentElement.lang = language
    window.localStorage.setItem('portfolio-language', language)
  }, [language])

  function toggleLanguage() {
    setLanguage((previousLanguage) => (previousLanguage === 'fr' ? 'en' : 'fr'))
  }

  // Accède à une clé imbriquée des traductions, ex. t('nav.accueil').
  function t(key) {
    const value = key
      .split('.')
      .reduce((accumulator, part) => accumulator?.[part], translations[language])
    return value ?? key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage doit être utilisé à l’intérieur de <LanguageProvider>')
  }
  return context
}
