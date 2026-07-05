import { useEffect, useRef } from 'react'

const PARTICLE_COUNT = 26
const PARTICLE_COLOR = '139, 92, 246' // accent-purple en RGB, réutilisé avec une faible opacité

function createParticle(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: 1 + Math.random() * 1.6,
    speedX: (Math.random() - 0.5) * 0.12,
    speedY: (Math.random() - 0.5) * 0.12,
    opacity: 0.15 + Math.random() * 0.25,
  }
}

// Quelques particules qui dérivent lentement en arrière-plan, façon
// vercel.com : discret, non-interactif, jamais au premier plan du contenu.
function ParticlesBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return undefined

    const context = canvas.getContext('2d')
    let particles = []
    let animationFrameId
    let width = 0
    let height = 0

    function resize() {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width
      canvas.height = height
      particles = Array.from({ length: PARTICLE_COUNT }, () => createParticle(width, height))
    }

    function step() {
      context.clearRect(0, 0, width, height)

      for (const particle of particles) {
        particle.x += particle.speedX
        particle.y += particle.speedY

        if (particle.x < 0) particle.x = width
        if (particle.x > width) particle.x = 0
        if (particle.y < 0) particle.y = height
        if (particle.y > height) particle.y = 0

        context.beginPath()
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        context.fillStyle = `rgba(${PARTICLE_COLOR}, ${particle.opacity})`
        context.fill()
      }

      animationFrameId = requestAnimationFrame(step)
    }

    resize()
    step()
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  )
}

export default ParticlesBackground
