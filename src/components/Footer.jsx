import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Instagram, Facebook, ChevronUp } from 'lucide-react'
import { socialLinks } from '../data/socialLinks'
import { Reveal } from './Reveal'

const iconMap = { Github, Linkedin, Instagram, Facebook }

function Footer() {
  const currentYear = new Date().getFullYear()
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <footer className="relative border-t border-border-faint px-6 py-10 lg:px-10">
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            type="button"
            aria-label="Retour en haut"
            className="absolute -top-5 left-1/2 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-border-subtle bg-bg-secondary text-text-muted shadow-glow-purple"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
          >
            <ChevronUp size={18} />
          </motion.button>
        )}
      </AnimatePresence>

      <Reveal y={10}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-text-muted">
            <span className="font-semibold text-text-primary">RTF</span> &copy; {currentYear}{' '}
            <span className="text-gradient-brand">FullStack.dev</span>
          </p>

          <ul className="flex gap-3" id="footer-social-links">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <li key={social.id}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/60 hover:text-text-primary hover:shadow-glow-purple"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Icon size={15} />
                  </motion.a>
                </li>
              )
            })}
          </ul>
        </div>
      </Reveal>
    </footer>
  )
}

export default Footer
