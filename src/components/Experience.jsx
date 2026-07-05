import { motion } from 'framer-motion'
import { GraduationCap, Code2 } from 'lucide-react'
import { experiences } from '../data/experiences'
import { useLanguage } from '../context/LanguageContext'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const typeIcon = {
  formation: GraduationCap,
  stage: Code2,
  'projet-academique': Code2,
}

function Experience() {
  const { t, language } = useLanguage()
  const typeLabels = t('experience.typeLabels')

  return (
    <section id="experiences" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-4xl">
        <Reveal y={20}>
          <p className="font-mono text-sm text-accent-purple">{t('experience.eyebrow')}</p>
        </Reveal>
        <Reveal delay={0.1} y={20}>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('experience.titlePrefix')}
            <span className="text-gradient-animated">{t('experience.titleHighlight')}</span>
          </h2>
        </Reveal>

        <RevealStagger className="mt-12 space-y-8 border-l border-border-subtle pl-8" id="experience-timeline" staggerDelay={0.15}>
          {experiences.map((experience) => {
            const Icon = typeIcon[experience.type] ?? Code2
            return (
              <RevealItem key={experience.id}>
                <motion.li
                  className="relative transition-all duration-300 hover:-translate-y-0.5"
                  whileHover={{ x: 4 }}
                >
                  <span className="absolute -left-[2.55rem] flex h-8 w-8 items-center justify-center rounded-full bg-gradient-brand shadow-glow-purple animate-pulse-glow">
                    <Icon size={14} />
                  </span>

                  <p className="font-mono text-xs uppercase tracking-wide text-accent-purple">
                    {typeLabels[experience.type]} · {experience.period}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold text-text-primary">
                    {experience.title[language]}
                  </h3>
                  <p className="text-sm text-text-muted">{experience.organization}</p>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-muted">
                    {experience.description[language]}
                  </p>
                </motion.li>
              </RevealItem>
            )
          })}
        </RevealStagger>
      </div>
    </section>
  )
}

export default Experience
