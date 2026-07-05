import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Code2, Eye, Github, Linkedin, Instagram, Facebook, Terminal } from 'lucide-react'
import victorProfile from '../assets/victor-profile.webp'
import cvFile from '../assets/cv-victor-feno.pdf?url'
import { skills } from '../data/skills'
import { socialLinks } from '../data/socialLinks'
import { useLanguage } from '../context/LanguageContext'
import SkillBadge from './SkillBadge'

const iconMap = { Github, Linkedin, Instagram, Facebook }
const featuredSkills = skills.filter((skill) => skill.featured)

const bioStyleClasses = {
  muted: '',
  accent: 'font-semibold text-accent-purple',
  primary: 'text-text-primary',
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
}

const typewriterLines = [
  { cmd: 'whoami', output: 'Victor Feno — FullStack Developer' },
  { cmd: 'skills --list', output: 'React, PHP, MySQL, Tailwind, Node.js' },
  { cmd: 'status', output: '🟢 Disponible pour missions' },
]

function Typewriter() {
  const [step, setStep] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorTimer = setInterval(() => setShowCursor((c) => !c), 530)
    return () => clearInterval(cursorTimer)
  }, [])

  useEffect(() => {
    if (step >= typewriterLines.length) return
    const line = typewriterLines[step]
    const fullText = `$ ${line.cmd}\n${line.output}`

    if (charIndex < fullText.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullText.slice(0, charIndex + 1))
        setCharIndex((i) => i + 1)
      }, 30 + Math.random() * 25)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => {
      setStep((s) => s + 1)
      setCharIndex(0)
      setDisplayText('')
    }, 1200)
    return () => clearTimeout(timer)
  }, [step, charIndex])

  if (step >= typewriterLines.length) return null

  return (
    <div className="overflow-hidden rounded-xl border border-border-subtle bg-bg-secondary/80 p-4 font-mono text-xs leading-relaxed shadow-glow-purple/20 sm:text-sm">
      <div className="flex items-center gap-1.5 border-b border-border-faint pb-2 mb-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
        <span className="ml-2 text-text-muted">terminal</span>
      </div>
      <pre className="whitespace-pre-wrap text-text-muted">
        {displayText}
        <motion.span
          className="inline-block h-4 w-2 bg-accent-purple align-middle ml-0.5"
          animate={{ opacity: showCursor ? 1 : 0 }}
          transition={{ duration: 0.1 }}
        />
      </pre>
    </div>
  )
}

function Orb({ index }) {
  const positions = [
    { top: '10%', right: '5%', size: 180, color: 'rgba(139,92,246,' },
    { top: '50%', right: '20%', size: 120, color: 'rgba(59,130,246,' },
    { top: '70%', right: '0%', size: 100, color: 'rgba(139,92,246,' },
    { top: '20%', right: '30%', size: 80, color: 'rgba(59,130,246,' },
    { top: '80%', right: '15%', size: 140, color: 'rgba(139,92,246,' },
  ]
  const p = positions[index % positions.length]

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute rounded-full"
      style={{
        top: p.top,
        right: p.right,
        width: p.size,
        height: p.size,
        background: `${p.color}0.12)`,
        filter: 'blur(60px)',
      }}
      animate={{
        y: [0, -20, 10, 0],
        x: [0, 10, -10, 0],
        scale: [1, 1.1, 0.95, 1],
      }}
      transition={{
        duration: 8 + index * 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: index * 1.5,
      }}
    />
  )
}

function Hero() {
  const { t, language } = useLanguage()
  const headline = t('hero.headline')
  const bio = t('hero.bio')

  return (
    <section id="accueil" className="relative min-h-screen overflow-hidden px-6 py-20 lg:px-10 lg:py-28">
      {Array.from({ length: 5 }).map((_, i) => (
        <Orb key={i} index={i} />
      ))}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-16 h-[300px] w-[300px] -translate-x-1/2 opacity-[0.32] sm:h-[380px] sm:w-[380px] lg:hidden"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-radial-glow" />
        <div className="absolute inset-4 overflow-hidden rounded-full">
          <img src={victorProfile} alt="" className="h-full w-full object-cover" />
        </div>
      </div>

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.h1
            className="text-3xl font-bold leading-tight tracking-tight text-text-primary sm:text-4xl lg:text-[2.5rem]"
            variants={itemVariants}
          >
            {headline.map((segment, index) => (
              <span key={index} className={segment.highlight ? 'text-gradient-brand' : undefined}>
                {segment.text}
              </span>
            ))}
          </motion.h1>

          <motion.div className="mt-6 h-1 w-24 rounded-full bg-gradient-brand" variants={itemVariants} />

          <motion.p className="mt-8 font-mono text-xl font-bold text-accent-purple sm:text-2xl" variants={itemVariants}>
            <span className="text-text-muted">// </span>
            {t('hero.eyebrow')}
          </motion.p>

          <motion.p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg" variants={itemVariants}>
            {bio.map((segment, index) => (
              <span key={index} className={bioStyleClasses[segment.style]}>
                {segment.text}
              </span>
            ))}
          </motion.p>

          <motion.div className="mt-10 flex flex-wrap gap-4" variants={itemVariants}>
            <a
              href="#projets"
              id="cta-view-projects"
              className="group relative flex items-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-purple transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue"
            >
              <Code2 size={18} />
              {t('hero.ctaProjects')}
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
            <a
              href={cvFile}
              id="cta-view-cv"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-xl border border-accent-purple/60 px-6 py-3 text-sm font-semibold text-text-primary transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple hover:bg-accent-purple/10 hover:shadow-glow-purple"
            >
              <Eye size={18} />
              {t('hero.ctaCvView')}
            </a>
          </motion.div>

          <motion.div className="mt-10 max-w-sm" variants={itemVariants}>
            <div className="mb-3 flex items-center gap-2">
              <Terminal size={14} className="text-accent-purple" />
              <span className="font-mono text-xs text-text-muted">developer@victor:~$</span>
            </div>
            <Typewriter />
          </motion.div>

          <motion.p className="mt-8 font-mono text-sm text-text-muted" variants={itemVariants}>
            <span className="text-accent-purple">// </span>
            {t('hero.socialLabel')}
          </motion.p>

          <motion.ul className="mt-3 flex gap-3" id="hero-social-links" variants={itemVariants}>
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <li key={social.id}>
                  <motion.a
                    href={social.href}
                    aria-label={social.label}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-border-subtle text-text-muted transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/60 hover:text-text-primary hover:shadow-glow-purple"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Icon size={18} />
                  </motion.a>
                </li>
              )
            })}
          </motion.ul>
        </motion.div>

        <motion.div
          className="relative mx-auto hidden h-[420px] w-[420px] max-w-full items-center justify-center lg:flex lg:h-[480px] lg:w-[480px]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-radial-glow" />
          <div className="absolute inset-6 animate-spin-slow rounded-full border-2 border-transparent [background:conic-gradient(from_0deg,#8b5cf6,transparent_60%,#3b82f6)] [mask:radial-gradient(farthest-side,transparent_calc(100%-3px),#000_calc(100%-3px))]" />
          <div className="relative h-[85%] w-[85%] overflow-hidden rounded-full border-4 border-bg-primary shadow-glow-purple">
            <img
              src={victorProfile}
              alt={t('hero.imageAlt')}
              className="h-full w-full object-cover"
            />
          </div>

          {featuredSkills.map((skill, index) => (
            <SkillBadge key={skill.id} skill={skill} language={language} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
