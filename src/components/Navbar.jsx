import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Home, User, Code2, Briefcase, Rocket, Mail, Globe, Sun, Moon, Menu, X } from 'lucide-react'
import { navLinks } from '../data/navLinks'
import rtfLogo from '../assets/rtf-logo.webp'
import { useTheme } from '../context/ThemeContext'
import { useLanguage } from '../context/LanguageContext'

// Correspondance entre le nom d'icône (string, stocké dans data/) et le
// composant lucide-react réel. On évite d'importer dynamiquement par string.
const iconMap = { Home, User, Code2, Briefcase, Rocket, Mail }

function Navbar() {
  const [activeSection, setActiveSection] = useState('accueil')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((link) => link.id)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-40% 0px -50% 0px' }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  function scrollToSection(sectionId) {
    setIsMenuOpen(false)
    const el = document.getElementById(sectionId)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        isScrolled
          ? 'border-border-subtle bg-bg-primary/90 backdrop-blur-xl shadow-glow-purple/10'
          : 'border-border-faint bg-bg-primary/60 backdrop-blur-md'
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={mounted ? { y: 0, opacity: 1 } : {}}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        {/* Logo */}
        <button
          type="button"
          onClick={() => scrollToSection('accueil')}
          className="flex items-center gap-3"
          id="nav-logo"
        >
          <img
            src={rtfLogo}
            alt="Logo RTF"
            className="h-11 w-11 rounded-full object-cover shadow-glow-purple"
          />
          <span className="hidden text-lg font-semibold tracking-wide text-text-primary sm:inline">
            PORTFOLIO<span className="text-gradient-brand">.DEV</span>
          </span>
        </button>

        {/* Liens desktop */}
        <ul className="hidden items-center gap-8 lg:flex" id="nav-links">
          {navLinks.map((link) => {
            const Icon = iconMap[link.icon]
            const isActive = activeSection === link.id
            return (
              <li key={link.id} className="relative">
                <button
                  type="button"
                  onClick={() => scrollToSection(link.id)}
                  className={`flex items-center gap-2 pb-1 text-sm font-medium transition-colors ${
                    isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-primary'
                  }`}
                >
                  <Icon size={16} />
                  {t(`nav.${link.labelKey}`)}
                </button>
                {isActive && (
                  <motion.div
                    className="absolute -bottom-px left-0 right-0 h-0.5 rounded-full bg-gradient-brand"
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            )
          })}
        </ul>

        {/* Actions à droite */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            id="lang-switch-btn"
            aria-label={t('navbar.languageToggleLabel')}
            onClick={toggleLanguage}
            className="flex items-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm text-text-muted transition-colors hover:border-accent-purple/60 hover:text-text-primary"
          >
            <Globe size={16} />
            {language.toUpperCase()}
          </button>
          <button
            type="button"
            id="settings-btn"
            aria-label={t('navbar.themeToggleLabel')}
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-colors hover:border-accent-purple/60 hover:text-text-primary"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Bouton burger mobile */}
        <button
          type="button"
          id="mobile-menu-toggle"
          aria-label="Ouvrir le menu"
          className="text-text-primary lg:hidden"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Menu mobile */}
      <motion.div
        id="mobile-menu"
        className="overflow-hidden border-t border-border-faint lg:hidden"
        animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <div className="px-6 py-4">
          <ul className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const Icon = iconMap[link.icon]
              return (
                <motion.li
                  key={link.id}
                  initial={false}
                  animate={isMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, delay: isMenuOpen ? i * 0.05 : 0 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(link.id)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-text-muted transition-all duration-200 hover:bg-border-faint hover:text-text-primary"
                  >
                    <Icon size={16} />
                    {t(`nav.${link.labelKey}`)}
                  </button>
                </motion.li>
              )
            })}
          </ul>

          <motion.div
            className="mt-3 flex items-center gap-3 border-t border-border-faint pt-3"
            initial={false}
            animate={isMenuOpen ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.2, delay: isMenuOpen ? 0.2 : 0 }}
          >
            <button
              type="button"
              aria-label={t('navbar.languageToggleLabel')}
              onClick={toggleLanguage}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border-subtle px-4 py-2 text-sm text-text-muted transition-all duration-200 hover:border-accent-purple/60 hover:text-text-primary"
            >
              <Globe size={16} />
              {language.toUpperCase()}
            </button>
            <button
              type="button"
              aria-label={t('navbar.themeToggleLabel')}
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-all duration-200 hover:border-accent-purple/60 hover:text-text-primary"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.header>
  )
}

export default Navbar
