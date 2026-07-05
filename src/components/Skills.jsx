import { motion } from 'framer-motion'
import { skills } from '../data/skills'
import { useLanguage } from '../context/LanguageContext'
import SkillIcon from './SkillIcon'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const categoryOrder = ['Frontend', 'Backend', 'Langages', 'Base de données', 'Outils']

const categoryGradients = {
  Frontend: 'from-purple-500/20 to-blue-500/10',
  Backend: 'from-blue-500/20 to-cyan-500/10',
  Langages: 'from-violet-500/20 to-pink-500/10',
  'Base de données': 'from-emerald-500/20 to-teal-500/10',
  Outils: 'from-orange-500/20 to-yellow-500/10',
}

const categoryBorderGradients = {
  Frontend: 'hover:border-purple-500/50',
  Backend: 'hover:border-blue-500/50',
  Langages: 'hover:border-violet-500/50',
  'Base de données': 'hover:border-emerald-500/50',
  Outils: 'hover:border-orange-500/50',
}

function Skills() {
  const { t, language } = useLanguage()
  const categoryLabels = t('skills.categories')

  return (
    <section id="competences" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <Reveal y={20}>
          <p className="font-mono text-sm text-accent-purple">{t('skills.eyebrow')}</p>
        </Reveal>
        <Reveal delay={0.1} y={20}>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('skills.titlePrefix')}
            <span className="text-gradient-animated">{t('skills.titleHighlight')}</span>
          </h2>
        </Reveal>

        <div className="mt-12 space-y-10" id="skills-grid">
          {categoryOrder.map((category) => {
            const categorySkills = skills.filter((skill) => skill.category === category)
            if (categorySkills.length === 0) return null

            const categoryGradient = categoryGradients[category] || ''
            const borderGradient = categoryBorderGradients[category] || 'hover:border-accent-purple/40'
            return (
              <div key={category}>
                <Reveal y={10}>
                  <p className="mb-4 font-mono text-xs uppercase tracking-wide text-text-muted">
                    {categoryLabels[category]}
                  </p>
                </Reveal>
                <RevealStagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" staggerDelay={0.06}>
                  {categorySkills.map((skill) => (
                    <RevealItem key={skill.id} y={15}>
                      <motion.div
                        className={`rounded-2xl border border-border-subtle bg-gradient-to-br ${categoryGradient} bg-bg-secondary/60 p-5 transition-all duration-300 hover:-translate-y-1 ${borderGradient} hover:shadow-glow-purple`}
                        whileHover={{ scale: 1.02 }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-border-faint">
                            <SkillIcon skillId={skill.id} size={20} />
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-text-primary">{skill.name}</p>
                            <p className="text-xs text-text-muted">{categoryLabels[skill.category]}</p>
                          </div>
                        </div>

                        <p className="mt-3 text-xs text-text-muted">{skill.description[language]}</p>

                        <div className="mt-4 h-1.5 w-full rounded-full bg-border-faint">
                          <motion.div
                            className="h-1.5 rounded-full bg-gradient-brand"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                          />
                        </div>
                      </motion.div>
                    </RevealItem>
                  ))}
                </RevealStagger>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
