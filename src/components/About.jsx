import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, Target, Sparkles, Code2, Monitor, Database } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

const highlightIcons = { GraduationCap, Target, Sparkles }
const competencyIcons = { Code2, Monitor, Database }

function Counter({ to, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let start = 0
    const duration = 1500
    const step = Math.ceil(to / (duration / 16))
    const timer = setInterval(() => {
      start += step
      if (start >= to) {
        setCount(to)
        clearInterval(timer)
      } else {
        setCount(start)
      }
    }, 16)
    return () => clearInterval(timer)
  }, [isInView, to])

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  )
}

function About() {
  const { t } = useLanguage()
  const paragraphs = t('about.paragraphs')
  const competencies = t('about.competencies')
  const highlights = t('about.highlights')
  const journey = t('about.journey')

  return (
    <section id="a-propos" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-12">
          <div className="relative border-l border-border-subtle pl-10" id="about-competencies">
            <motion.div
              className="absolute left-0 top-0 w-px bg-gradient-brand"
              initial={{ height: 0 }}
              whileInView={{ height: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              style={{ transform: 'translateX(-0.5px)' }}
            />
            {competencies.map((item, i) => {
              const Icon = competencyIcons[item.icon]
              return (
                <motion.div
                  key={item.id}
                  className="relative pb-12 last:pb-0"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.15, ease: 'easeOut' }}
                >
                  <motion.span
                    className="absolute -left-[3.05rem] top-1 h-3 w-3 rounded-full bg-gradient-brand shadow-glow-purple"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15, delay: i * 0.15 + 0.2 }}
                  />
                  <span className="flex h-14 w-14 items-center justify-center rounded-xl border border-accent-purple/30 bg-bg-secondary text-accent-purple shadow-glow-purple">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-text-muted">
                    {item.text}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div>
            <Reveal y={20}>
              <p className="font-mono text-sm text-accent-purple">{t('about.eyebrow')}</p>
            </Reveal>
            <Reveal delay={0.1} y={20}>
              <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
                {t('about.titlePrefix')}
                <span className="text-gradient-animated">{t('about.titleHighlight')}</span>
              </h2>
            </Reveal>

            <Reveal delay={0.2} y={20}>
              <div className="mt-6 space-y-4">
                {paragraphs.map((paragraph, index) => (
                  <p key={index} className="max-w-2xl text-base leading-relaxed text-text-muted sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <RevealStagger className="mt-10 grid gap-5 sm:grid-cols-3" id="about-highlights" staggerDelay={0.12}>
              {highlights.map((item) => {
                const Icon = highlightIcons[item.icon]
                const statMatch = item.statValue.match(/^(\d+)(.*)$/)
                return (
                  <RevealItem key={item.id} y={20}>
                    <div className="group relative min-h-[260px] overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/60 transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/40 hover:shadow-glow-purple">
                      <div className="absolute inset-0 flex flex-col p-6 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-brand">
                          <Icon size={20} />
                        </span>
                        <h3 className="mt-4 text-lg font-semibold text-text-primary">{item.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.text}</p>
                      </div>

                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                        <p className="text-3xl font-extrabold text-gradient-brand">
                          {statMatch ? (
                            <><Counter to={parseInt(statMatch[1])} />{statMatch[2]}</>
                          ) : (
                            item.statValue
                          )}
                        </p>
                        <p className="mt-2 text-sm text-text-muted">{item.statLabel}</p>
                      </div>
                    </div>
                  </RevealItem>
                )
              })}
            </RevealStagger>
          </div>
        </div>

        <Reveal className="mt-20" id="about-journey" y={20}>
          <p className="font-mono text-sm text-accent-purple">// {t('about.journeyTitle')}</p>

          <RevealStagger className="relative mt-8 grid gap-8 sm:grid-cols-3" staggerDelay={0.15}>
            <motion.div
              className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-brand/40 sm:block"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              style={{ transformOrigin: 'left' }}
            />
            {journey.map((step) => (
              <RevealItem key={step.year} y={20}>
                <div className="relative rounded-2xl border border-border-subtle bg-bg-secondary/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent-purple/40 hover:shadow-glow-purple">
                  <p className="text-2xl font-extrabold text-gradient-brand">{step.year}</p>
                  <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </Reveal>
      </div>
    </section>
  )
}

export default About
