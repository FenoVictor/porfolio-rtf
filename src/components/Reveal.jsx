import { motion } from 'framer-motion'

const defaultVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
}

function Reveal({ children, className, delay = 0, duration = 0.5, y = 40, once = true }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { delay, duration, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}

function RevealStagger({ children, className, staggerDelay = 0.1, childDuration = 0.4, childDelay = 0 }) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay, delayChildren: childDelay } },
      }}
    >
      {children}
    </motion.div>
  )
}

function RevealItem({ children, className, y = 30 }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
      }}
    >
      {children}
    </motion.div>
  )
}

export { Reveal, RevealStagger, RevealItem }
