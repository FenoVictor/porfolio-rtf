import { motion } from 'framer-motion'
import SkillIcon from './SkillIcon'

const positionClasses = {
  'top-right': 'right-0 top-6 sm:right-4',
  left: 'left-0 top-1/2 -translate-y-1/2 sm:-left-4',
  'bottom-right': 'bottom-6 right-0 sm:right-2',
}

function SkillBadge({ skill, language, index = 0 }) {
  return (
    <motion.div
      className={`absolute z-20 flex animate-float items-center gap-3 rounded-2xl border border-border-subtle bg-bg-secondary/90 px-4 py-3 shadow-xl backdrop-blur-sm ${positionClasses[skill.position]}`}
      style={{ animationDelay: `${skill.id.length * 0.4}s` }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 + index * 0.15, ease: 'easeOut' }}
      whileHover={{ scale: 1.05 }}
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-border-faint">
        <SkillIcon skillId={skill.id} size={20} />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-semibold text-text-primary">{skill.name}</span>
        <span className="block text-xs text-text-muted">{skill.description[language]}</span>
      </span>
    </motion.div>
  )
}

export default SkillBadge
