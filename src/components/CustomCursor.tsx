import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

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

    const interactive = document.querySelectorAll('a, button, [role="button"], input, textarea, select, .cursor-hover')
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    return () => {
      window.removeEventListener('mousemove', onMove)
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40 mix-blend-difference"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white mix-blend-difference"
      />
    </>
  )
}
