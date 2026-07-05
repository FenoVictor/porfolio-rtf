import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const scriptLines = [
  { text: 'Loading...', className: 'text-text-muted' },
  { text: 'const Victor = {', className: 'text-text-primary' },
  { text: '  skills: [', className: 'text-text-primary' },
  { text: "    'React',", className: 'text-accent-blue' },
  { text: "    'PHP',", className: 'text-accent-blue' },
  { text: "    'MySQL',", className: 'text-accent-blue' },
  { text: "    'Tailwind',", className: 'text-accent-blue' },
  { text: '  ],', className: 'text-text-primary' },
  { text: '}', className: 'text-text-primary' },
]

const LINE_DELAY_MS = 220
const DONE_DELAY_MS = 300
const HOLD_AFTER_DONE_MS = 650

function LoadingScreen({ onFinish }) {
  const [visibleCount, setVisibleCount] = useState(0)
  const [showDone, setShowDone] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)

  useEffect(() => {
    if (visibleCount < scriptLines.length) {
      const timer = setTimeout(() => setVisibleCount((c) => c + 1), LINE_DELAY_MS)
      return () => clearTimeout(timer)
    }
    if (!showDone) {
      const timer = setTimeout(() => setShowDone(true), DONE_DELAY_MS)
      return () => clearTimeout(timer)
    }
    const timer = setTimeout(() => setIsLeaving(true), HOLD_AFTER_DONE_MS)
    return () => clearTimeout(timer)
  }, [visibleCount, showDone])

  useEffect(() => {
    if (!isLeaving) return
    const timer = setTimeout(onFinish, 500)
    return () => clearTimeout(timer)
  }, [isLeaving, onFinish])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-primary px-6"
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <motion.div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-border-subtle bg-bg-secondary shadow-glow-purple"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div className="flex items-center gap-2 border-b border-border-faint px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
          <span className="ml-2 font-mono text-xs text-text-muted">victor.dev — portfolio.js</span>
        </div>

        <div className="min-h-[220px] p-6 font-mono text-sm leading-relaxed sm:text-base">
          {scriptLines.slice(0, visibleCount).map((line, index) => (
            <motion.p
              key={index}
              className={line.className}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              {line.text}
            </motion.p>
          ))}

          {showDone ? (
            <motion.p
              className="mt-3 flex items-center gap-2 font-semibold text-emerald-400"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              Done <span aria-hidden="true">✓</span>
            </motion.p>
          ) : (
            visibleCount >= scriptLines.length && (
              <motion.span
                className="mt-1 inline-block h-4 w-2 bg-accent-purple align-middle"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            )
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default LoadingScreen
