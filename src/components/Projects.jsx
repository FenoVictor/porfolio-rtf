import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { projects } from '../data/projects'
import { useLanguage } from '../context/LanguageContext'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const projectImages = import.meta.glob('../assets/*.{png,webp,jpg,jpeg,svg}', {
  eager: true,
  import: 'default',
})

function getProjectImage(filename) {
  const match = Object.entries(projectImages).find(([path]) => path.endsWith(filename))
  return match ? match[1] : undefined
}

function TiltCard({ children, className }) {
  const ref = useRef(null)

  function handleMouseMove(e) {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -8
    const rotateY = ((x - centerX) / centerX) * 8
    ref.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
  }

  function handleMouseLeave() {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.2s ease-out', transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

function Projects() {
  const { t, language } = useLanguage()

  return (
    <section id="projets" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal y={20}>
          <p className="font-mono text-sm text-accent-purple">{t('projects.eyebrow')}</p>
        </Reveal>
        <Reveal delay={0.1} y={20}>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('projects.titlePrefix')}
            <span className="text-gradient-animated">{t('projects.titleHighlight')}</span>
          </h2>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-8 sm:grid-cols-2" id="projects-grid" staggerDelay={0.12}>
          {projects.map((project) => (
            <RevealItem key={project.id} y={30}>
              <TiltCard className="group overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/60 transition-all duration-300 hover:border-accent-purple/40 hover:shadow-glow-purple">
                <div className="aspect-video overflow-hidden" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(20px)' }}>
                  <motion.img
                    src={getProjectImage(project.image)}
                    alt={`${project.title[language]}`}
                    className="h-full w-full object-cover"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                  />
                </div>

                <div className="p-6" style={{ transformStyle: 'preserve-3d', transform: 'translateZ(30px)' }}>
                  <h3 className="text-lg font-semibold text-text-primary">
                    {project.title[language]}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">
                    {project.description[language]}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2" aria-label={t('projects.techLabel')}>
                    {project.stack.map((tech) => (
                      <motion.li
                        key={tech}
                        className="rounded-full border border-border-subtle px-3 py-1 text-xs text-text-muted transition-all duration-200 hover:border-accent-purple/40 hover:text-accent-purple hover:scale-105"
                        whileHover={{ scale: 1.08 }}
                      >
                        {tech}
                      </motion.li>
                    ))}
                  </ul>

                  <div className="mt-5 flex gap-4">
                    <a
                      href={project.link}
                      className="flex items-center gap-1.5 text-sm font-medium text-accent-purple transition-all duration-300 hover:-translate-y-0.5 hover:text-text-primary"
                    >
                      <ExternalLink size={15} />
                      {t('projects.demoLabel')}
                    </a>
                    <a
                      href={project.repo}
                      className="flex items-center gap-1.5 text-sm font-medium text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:text-text-primary"
                    >
                      <Github size={15} />
                      {t('projects.codeLabel')}
                    </a>
                  </div>
                </div>
              </TiltCard>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  )
}

export default Projects
