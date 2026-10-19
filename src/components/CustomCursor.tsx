import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)
  // En pantallas táctiles no hay ratón: no se dibuja el cursor personalizado
  const coarse = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return

    const xDot = gsap.quickTo(dot.current, 'x', { duration: 0.15, ease: 'power3' })
    const yDot = gsap.quickTo(dot.current, 'y', { duration: 0.15, ease: 'power3' })
    const xRing = gsap.quickTo(ring.current, 'x', { duration: 0.5, ease: 'power3' })
    const yRing = gsap.quickTo(ring.current, 'y', { duration: 0.5, ease: 'power3' })

    const onMove = (e: MouseEvent) => {
      xDot(e.clientX)
      yDot(e.clientY)
      xRing(e.clientX)
      yRing(e.clientY)
    }

    const onEnterInteractive = () => {
      gsap.to(ring.current, { scale: 1.8, borderColor: '#C8102E', duration: 0.25 })
    }
    const onLeaveInteractive = () => {
      gsap.to(ring.current, { scale: 1, borderColor: 'rgba(255,255,255,0.4)', duration: 0.25 })
    }

    window.addEventListener('mousemove', onMove)

    // Delegación en el documento: funciona también con lo que aparece después (banner, menú, páginas nuevas)
    const SELECTOR = 'a, button, [role="button"], input, textarea, select, label, summary, .cursor-hover'
    let hovering = false
    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.(SELECTOR)
      if (el && !hovering) {
        hovering = true
        onEnterInteractive()
      } else if (!el && hovering) {
        hovering = false
        onLeaveInteractive()
      }
    }
    document.addEventListener('mouseover', onOver)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [])

  if (coarse) return null

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden md:block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
    </>
  )
}
