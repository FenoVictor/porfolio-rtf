import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, MapPin, Phone } from 'lucide-react'
import { SiWhatsapp } from 'react-icons/si'
import { useLanguage } from '../context/LanguageContext'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

function Contact() {
  const { t } = useLanguage()
  const form = t('contact.form')
  const [formValues, setFormValues] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(event) {
    const { name, value } = event.target
    setFormValues((previousValues) => ({ ...previousValues, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <div>
          <Reveal y={20}>
            <p className="font-mono text-sm text-accent-purple">{t('contact.eyebrow')}</p>
          </Reveal>
          <Reveal delay={0.1} y={20}>
            <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
              {t('contact.titlePrefix')}
              <span className="text-gradient-animated">{t('contact.titleHighlight')}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2} y={20}>
            <p className="mt-6 max-w-md text-base leading-relaxed text-text-muted">
              {t('contact.intro')}
            </p>
          </Reveal>
          <Reveal delay={0.25} y={20}>
            <p className="mt-2 max-w-md text-sm text-accent-purple">{t('contact.wink')}</p>
          </Reveal>

          <Reveal delay={0.3} y={20}>
            <ul className="mt-8 space-y-4">
              {[
                { icon: Mail, href: 'mailto:victortsimamandro@gmail.com', text: 'victortsimamandro@gmail.com' },
                { icon: Phone, href: 'tel:+261376647477', text: '+261 37 66 474 77' },
                { icon: SiWhatsapp, href: 'https://wa.me/261325620408', text: '+261 32 56 204 08', isExternal: true },
                { icon: MapPin, text: t('contact.locationLabel') },
              ].map((item, i) => {
                const Icon = item.icon
                return (
                  <motion.li
                    key={i}
                    className="group flex items-center gap-3 rounded-xl border border-border-subtle bg-bg-secondary/40 p-4 text-sm text-text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-purple/40 hover:shadow-glow-purple"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.35 + i * 0.1, ease: 'easeOut' }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-border-faint text-accent-purple transition-all duration-300 group-hover:bg-accent-purple/20">
                      <Icon size={18} />
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="transition-all duration-300 hover:text-text-primary"
                        {...(item.isExternal ? { target: '_blank', rel: 'noreferrer' } : {})}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <span>{item.text}</span>
                    )}
                  </motion.li>
                )
              })}
            </ul>
          </Reveal>
        </div>

        <Reveal y={20} delay={0.3}>
          <motion.form
            id="contact-form"
            onSubmit={handleSubmit}
            className="space-y-5"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
            }}
          >
            {[
              { id: 'contact-name', name: 'name', type: 'text', label: form.name, placeholder: form.namePlaceholder },
              { id: 'contact-email', name: 'email', type: 'email', label: form.email, placeholder: form.emailPlaceholder },
              { id: 'contact-message', name: 'message', type: 'textarea', label: form.message, placeholder: form.messagePlaceholder },
            ].map((field) => (
              <motion.div
                key={field.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
                }}
              >
                <label htmlFor={field.id} className="mb-2 block text-sm font-medium text-text-primary">
                  {field.label}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.name}
                    rows={5}
                    required
                    value={formValues[field.name]}
                    onChange={handleChange}
                    className="w-full resize-none rounded-xl border border-border-subtle bg-bg-secondary/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent-purple focus:shadow-glow-purple"
                    placeholder={field.placeholder}
                  />
                ) : (
                  <input
                    id={field.id}
                    name={field.name}
                    type={field.type}
                    required
                    value={formValues[field.name]}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-border-subtle bg-bg-secondary/60 px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-300 focus:border-accent-purple focus:shadow-glow-purple"
                    placeholder={field.placeholder}
                  />
                )}
              </motion.div>
            ))}

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
              }}
            >
              <motion.button
                type="submit"
                id="contact-submit-btn"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-brand px-6 py-3 text-sm font-semibold text-white shadow-glow-purple transition-all duration-300 hover:-translate-y-1 hover:shadow-glow-blue"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Send size={16} />
                {form.submit}
              </motion.button>

              {isSubmitted && (
                <motion.p
                  role="status"
                  className="mt-3 text-sm text-accent-purple"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {form.confirmation}
                </motion.p>
              )}
            </motion.div>
          </motion.form>
        </Reveal>
      </div>
    </section>
  )
}

export default Contact
