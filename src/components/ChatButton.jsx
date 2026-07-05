import { useState, useRef, useEffect } from 'react'
import { useChat } from '@ai-sdk/react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

function ChatMessage({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${
          isUser
            ? 'border-accent-purple/40 bg-accent-purple/10 text-accent-purple'
            : 'border-accent-blue/40 bg-accent-blue/10 text-accent-blue'
        }`}
      >
        {isUser ? <User size={12} /> : <Bot size={12} />}
      </div>
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
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

function ChatModal({ onClose }) {
  const { t, language } = useLanguage()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  const { messages, sendMessage, status, error } = useChat({
    api: '/api/chat',
  })

  const isLoading = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
    setInput('')
    sendMessage({ text: suggestion })
  }

  function onSubmit(e) {
    e.preventDefault()
    if (!input.trim() || isLoading) return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <motion.div
      className="flex h-full flex-col"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      <div className="flex items-center justify-between border-b border-border-subtle px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-accent-purple/10">
            <Bot size={14} className="text-accent-purple" />
          </div>
          <span className="text-sm font-medium text-text-primary">AI Chat</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-7 w-7 items-center justify-center rounded-full text-text-muted transition-colors hover:bg-border-faint hover:text-text-primary"
        >
          <X size={15} />
        </button>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-purple/10">
              <Sparkles size={20} className="text-accent-purple" />
            </div>
            <p className="text-xs text-text-muted">{t('chat.placeholder')}</p>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => handleSuggestionClick(s)}
                  className="rounded-full border border-border-subtle px-2.5 py-1.5 text-[11px] text-text-muted transition-all duration-200 hover:border-accent-purple/40 hover:text-accent-purple"
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
          <div className="flex gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-accent-blue/40 bg-accent-blue/10 text-accent-blue">
              <Bot size={12} />
            </div>
            <div className="flex items-center gap-1 rounded-2xl rounded-tl-sm bg-bg-secondary/80 px-3.5 py-2.5">
              <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0 }} />
              <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.2 }} />
              <motion.span className="inline-block h-1.5 w-1.5 rounded-full bg-text-muted" animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity, delay: 0.4 }} />
            </div>
          </div>
        )}
        {error && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/5 px-3 py-2 text-[11px] text-red-400">
            {t('chat.error')}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border-subtle p-3">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={t('chat.inputPlaceholder')}
          className="flex-1 rounded-xl border border-border-subtle bg-bg-primary/60 px-3.5 py-2 text-xs text-text-primary placeholder-text-muted outline-none transition-all duration-200 focus:border-accent-purple/40 focus:ring-1 focus:ring-accent-purple/20"
        />
        <motion.button
          type="submit"
          disabled={isLoading || !input.trim()}
          className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent-purple text-white transition-all duration-200 hover:bg-accent-purple/80 disabled:opacity-40"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Send size={14} />
        </motion.button>
      </form>
    </motion.div>
  )
}

function ChatButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent-purple text-white shadow-lg shadow-accent-purple/30 transition-all duration-200 hover:bg-accent-purple/90 hover:shadow-glow-purple"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', stiffness: 300, damping: 20 }}
      >
        <MessageCircle size={22} />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <div className="fixed inset-4 z-50 mx-auto flex sm:inset-auto sm:bottom-24 sm:right-6 sm:top-auto sm:h-[520px] sm:w-[380px]">
              <motion.div
                className="flex w-full flex-col overflow-hidden rounded-2xl border border-border-subtle bg-bg-primary shadow-2xl"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <ChatModal onClose={() => setIsOpen(false)} />
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default ChatButton
