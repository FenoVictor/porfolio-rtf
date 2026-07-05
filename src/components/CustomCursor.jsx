import { useEffect, useRef } from 'react'

// Curseur personnalisé : un point qui suit le pointeur instantanément, et un
// anneau qui suit avec un léger retard (effet ressort). Fonctionne à la
// souris (déplacement continu) comme au doigt sur tactile (suit le doigt
// pendant qu'il touche/glisse sur l'écran, se cache quand il se lève).
function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pointerPosition = useRef({ x: 0, y: 0 })
  const ringPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    let animationFrameId
    let isVisible = false

    function showCursorAt(x, y) {
      pointerPosition.current = { x, y }

      if (!isVisible) {
        isVisible = true
        dotRef.current?.style.setProperty('opacity', '1')
        ringRef.current?.style.setProperty('opacity', '1')
        ringPosition.current = { x, y }
      }

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
    }

    function hideCursor() {
      isVisible = false
      dotRef.current?.style.setProperty('opacity', '0')
      ringRef.current?.style.setProperty('opacity', '0')
    }

    function handlePointerMove(event) {
      showCursorAt(event.clientX, event.clientY)
    }

    function handlePointerUp() {
      // Sur tactile, le curseur disparaît quand le doigt se lève (pas de
      // position "au repos" possible sans contact avec l'écran).
      if (window.matchMedia('(pointer: coarse)').matches) {
        hideCursor()
      }
    }

    function handleMouseLeaveWindow() {
      hideCursor()
    }

    function animateRing() {
      const dx = pointerPosition.current.x - ringPosition.current.x
      const dy = pointerPosition.current.y - ringPosition.current.y
      ringPosition.current.x += dx * 0.12
      ringPosition.current.y += dy * 0.12

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosition.current.x}px, ${ringPosition.current.y}px, 0) translate(-50%, -50%)`
        const dist = Math.sqrt(dx * dx + dy * dy)
        const scale = Math.min(1.6, 1 + dist * 0.003)
        const borderOpacity = Math.min(0.9, 0.4 + dist * 0.005)
        ringRef.current.style.borderColor = `rgba(139, 92, 246, ${borderOpacity})`
        ringRef.current.style.transform += ` scale(${scale})`
      }

      animationFrameId = requestAnimationFrame(animateRing)
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerup', handlePointerUp, { passive: true })
    window.addEventListener('pointercancel', handlePointerUp, { passive: true })
    document.documentElement.addEventListener('mouseleave', handleMouseLeaveWindow)
    animationFrameId = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      document.documentElement.removeEventListener('mouseleave', handleMouseLeaveWindow)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[999]">
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-9 w-9 rounded-full border border-accent-purple/60 opacity-0 transition-opacity duration-300"
      />
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-2 w-2 rounded-full bg-gradient-brand opacity-0 shadow-glow-purple transition-opacity duration-300"
      />
    </div>
  )
}

export default CustomCursor
