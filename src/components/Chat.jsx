import { useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { motion } from 'framer-motion'
import { Send, Bot, User, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { Reveal, RevealStagger, RevealItem } from './Reveal'

function ChatMessage({ role, content }) {
  const isUser = role === 'user'

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
          isUser
            ? 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple'
            : 'border-accent-blue/40 bg-accent-blue/10 text-accent-blue'
        }`}
      >
        {isUser ? <User size={14} /> : <Bot size={14} />}
      </div>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-tr-sm bg-accent-purple/10 text-text-primary'
            : 'rounded-tl-sm bg-bg-secondary/80 text-text-primary'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

function Chat() {
  const { t, language } = useLanguage()
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } =
    useChat({
      api: '/api/chat',
    })

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const suggestions = [
    language === 'fr'
      ? 'Quels sont tes projets ?'
      : 'What projects have you built?',
    language === 'fr'
      ? 'Quelles sont tes compétences ?'
      : 'What are your skills?',
    language === 'fr'
      ? 'Dis-moi en plus sur toi'
      : 'Tell me more about yourself',
  ]

  function handleSuggestionClick(suggestion) {
    handleInputChange({ target: { value: suggestion } })
    setTimeout(() => {
      inputRef.current?.focus()
    }, 0)
  }

  function onSubmit(e) {
    e.preventDefault()
    handleSubmit(e)
  }

  return (
    <section id="chat" className="border-t border-border-faint px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-3xl">
        <Reveal y={20}>
          <p className="font-mono text-sm text-accent-purple">{t('chat.eyebrow')}</p>
        </Reveal>
        <Reveal delay={0.1} y={20}>
          <h2 className="mt-3 text-3xl font-bold text-text-primary sm:text-4xl">
            {t('chat.titlePrefix')}
            <span className="text-gradient-animated">{t('chat.titleHighlight')}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15} y={20}>
          <p className="mt-2 text-sm text-text-muted">{t('chat.subtitle')}</p>
        </Reveal>

        <Reveal delay={0.2} y={20}>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary/40 backdrop-blur-sm">
            <div className="flex h-[400px] flex-col">
              <div className="flex-1 space-y-4 overflow-y-auto p-4">
                {messages.length === 0 && (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-purple/10">
                      <Sparkles size={24} className="text-accent-purple" />
                    </div>
                    <p className="text-sm text-text-muted">
                      {t('chat.placeholder')}
                    </p>
                    <div className="mt-6 flex flex-wrap justify-center gap-2">
                      {suggestions.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => handleSuggestionClick(s)}
                          className="rounded-full border border-border-subtle px-3 py-1.5 text-xs text-text-muted transition-all duration-200 hover:border-accent-purple/40 hover:text-accent-purple hover:scale-105"
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {messages.map((m) => (
                  <ChatMessage key={m.id} role={m.role} content={m.content} />
                ))}
                {isLoading && (
                  <div className="flex gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 bg-accent-blue/10 text-accent-blue">
                      <Bot size={14} />
                    </div>
                    <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-bg-secondary/80 px-4 py-2.5">
                      <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0 }}
                      />
                      <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.span
                        className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                )}
                {error && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-xs text-red-400">
                    {t('chat.error')}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border-subtle p-3">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={handleInputChange}
                  placeholder={t('chat.inputPlaceholder')}
                  className="flex-1 rounded-xl border border-border-subtle bg-bg-primary/60 px-4 py-2.5 text-sm text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/20"
                />
                <motion.button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent-purple text-white transition-all duration-200 hover:bg-accent-purple/80 disabled:opacity-40"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send size={16} />
                </motion.button>
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Chat
