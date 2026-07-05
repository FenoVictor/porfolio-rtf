import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const KONAMI_SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
]

const terminalLines = [
  { prompt: true, text: 'whoami' },
  {
    prompt: false,
    text: 'RANDRIATSITOHAINA Tsimamandro Feno — développeur full stack en deuxième année à l’ENI Toliara',
  },
  { prompt: true, text: 'cat secret.txt' },
  { prompt: false, text: 'Bravo, tu as trouvé l’easter egg. 🎉' },
  { prompt: false, text: 'Si tu es arrivé jusqu’ici, tu es exactement le genre de curieux que je cherche à devenir.' },
  { prompt: true, text: 'echo $WHY_CHOOSE_ME' },
  {
    prompt: false,
    text: 'Très peu d’étudiants en ont une. Voici ce que j’apporte concrètement à une équipe :',
  },
  { prompt: false, bullet: true, text: 'Apprentissage rapide' },
  { prompt: false, bullet: true, text: 'Passionné, curieux, autonome' },
  { prompt: false, bullet: true, text: 'Coordination avec des équipes pluridisciplinaires' },
  { prompt: false, bullet: true, text: 'Travail dans des équipes multigénérationnelles' },
  { prompt: false, bullet: true, text: 'Code propre' },
  { prompt: false, text: 'Merci de tester mes compétences en pratique 👏.' },
]

// Easter egg façon développeur : le code Konami (↑ ↑ ↓ ↓ ← → ← → B A) ou le
// raccourci Ctrl+Shift+D ouvrent un terminal caché avec un message secret.
// Un indice discret est aussi laissé dans la console du navigateur, seul
// endroit où un visiteur curieux (recruteur technique, dev...) est
// susceptible de le trouver.
function EasterEgg() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    console.log(
      '%c👀 Toujours en train de fouiller ?',
      'font-size:16px;font-weight:bold;color:#8b5cf6;'
    )
    console.log(
      '%cEssaie le code Konami (↑ ↑ ↓ ↓ ← → ← → B A) ou Ctrl+Shift+D quelque part sur ce site...',
      'font-size:12px;color:#9ca3af;'
    )
  }, [])

  useEffect(() => {
    let progress = 0

    function handleKeyDown(event) {
      if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === 'd') {
        event.preventDefault()
        setIsOpen(true)
        return
      }

      const expectedKey = KONAMI_SEQUENCE[progress]
      const pressedKey = event.key.length === 1 ? event.key.toLowerCase() : event.key

      if (pressedKey === expectedKey) {
        progress += 1
        if (progress === KONAMI_SEQUENCE.length) {
          setIsOpen(true)
          progress = 0
        }
      } else {
        progress = pressedKey === KONAMI_SEQUENCE[0] ? 1 : 0
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!isOpen) return undefined
    function handleEscape(event) {
      if (event.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', handleEscape)
    return () => window.removeEventListener('keydown', handleEscape)
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-accent-purple/40 bg-bg-secondary shadow-glow-purple"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-border-faint px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-2 font-mono text-xs text-text-muted">secret-terminal.sh</span>
          </div>
          <button
            type="button"
            aria-label="Fermer"
            onClick={() => setIsOpen(false)}
            className="text-text-muted hover:text-text-primary"
          >
            <X size={16} />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6 font-mono text-sm leading-relaxed">
          {terminalLines.map((line, index) => {
            if (line.prompt) {
              return (
                <p key={index} className="mt-3 text-accent-purple first:mt-0">
                  <span className="text-text-muted">$ </span>
                  {line.text}
                </p>
              )
            }
            if (line.bullet) {
              return (
                <p key={index} className="pl-4 text-text-muted">
                  <span className="text-accent-purple">• </span>
                  {line.text}
                </p>
              )
            }
            return (
              <p key={index} className="text-text-muted">
                {line.text}
              </p>
            )
          })}
          <p className="mt-4 text-emerald-400">
            <span className="animate-pulse">▍</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default EasterEgg
