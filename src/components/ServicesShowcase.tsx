import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../data/services'
import type { Service } from '../data/services'

const lang: 'fr' | 'en' = 'fr'

export default function ServicesShowcase() {
  const container = useRef<HTMLDivElement>(null)
  const pinTarget = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const [isDesktop, setIsDesktop] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth >= 1024 : true
  )

  // Track viewport size to switch between pinned (desktop) and stacked (mobile) modes
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const onChange = () => setIsDesktop(mq.matches)
    onChange()
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  // Pin & progress only on desktop
  useEffect(() => {
    if (!isDesktop) return
    const ctx = gsap.context(() => {
      const total = SERVICES.length
      const trigger = ScrollTrigger.create({
        trigger: container.current!,
        start: 'top top',
        end: `+=${total * 800}`,
        pin: pinTarget.current!,
        pinSpacing: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const idx = Math.min(
            total - 1,
            Math.floor(self.progress * total * 0.999)
          )
          if (idx !== activeRef.current) {
            activeRef.current = idx
            setActive(idx)
          }
        },
      })
      return () => {
        trigger.kill()
      }
    }, container)
    return () => ctx.revert()
  }, [isDesktop])

  // Background morph only on desktop
  useEffect(() => {
    if (!isDesktop || !bgRef.current) return
    const s = SERVICES[active]
    gsap.to(bgRef.current, {
      background: `radial-gradient(ellipse at 30% 40%, ${s.bg.via} 0%, ${s.bg.from} 45%, ${s.bg.to} 100%)`,
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }, [active, isDesktop])

  // === MOBILE / TABLET: stacked cards, no pin ===
  if (!isDesktop) {
    return (
      <section
        id="services"
        ref={container}
        className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5 py-20 md:py-24 px-6 md:px-12"
      >
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative max-w-3xl mx-auto mb-14 md:mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              02 · Services
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl sm:text-6xl md:text-7xl mb-4">
            Nos <span className="text-teknic-red">disciplines</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-sm md:text-base leading-relaxed">
            Quatre expertises sous un même toit. Chaque projet est pris en charge
            de bout en bout par nos équipes.
          </p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-6xl mx-auto">
          {SERVICES.map((s, i) => (
            <MobileServiceCard key={s.id} s={s} index={i} />
          ))}
        </div>
      </section>
    )
  }

  // === DESKTOP: pinned crossfade layout ===
  return (
    <section id="services" ref={container} className="relative w-full">
      <div ref={pinTarget} className="relative h-screen w-full overflow-hidden">
        {/* Background morph */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-0"
          style={{
            background: `radial-gradient(ellipse at 30% 40%, ${SERVICES[0].bg.via} 0%, ${SERVICES[0].bg.from} 45%, ${SERVICES[0].bg.to} 100%)`,
          }}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 z-0 opacity-[0.07] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Metallic texture */}
        <div
          className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.4) 0%, transparent 40%)',
          }}
        />

        {/* Section label */}
        <div className="absolute top-24 left-6 md:left-12 z-30 font-mono text-[10px] tracking-[0.4em] text-white/40 uppercase">
          Nos Services · 04 disciplines
        </div>

        {/* Progress indicators */}
        <div className="absolute top-24 right-6 md:right-12 z-30 flex gap-2 items-center">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className={`h-px transition-all duration-500 ${
                i === active ? 'w-10 bg-white' : 'w-4 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Slides stacked, crossfade via opacity */}
        {SERVICES.map((s, i) => {
          const isActive = i === active
          return (
            <div
              key={s.id}
              className="absolute inset-0 z-20 transition-opacity duration-700 ease-out"
              style={{
                opacity: isActive ? 1 : 0,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
            >
              <div className="h-full w-full grid grid-cols-[1.1fr_1.4fr_1fr] gap-6 px-6 md:px-12 py-32">
                {/* LEFT */}
                <div
                  className="relative flex flex-col justify-center"
                  style={{
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    transition:
                      'transform 800ms cubic-bezier(0.22,1,0.36,1) 100ms',
                  }}
                >
                  <div className="flex items-baseline gap-3 mb-8">
                    <span
                      className="font-mono text-sm tracking-[0.3em]"
                      style={{ color: s.accent }}
                    >
                      {s.number}
                    </span>
                    <span className="font-mono text-xs tracking-[0.3em] text-white/40">
                      / 0{SERVICES.length}
                    </span>
                  </div>

                  <h2 className="font-display uppercase leading-[0.85] text-6xl md:text-7xl lg:text-8xl xl:text-9xl mb-8">
                    {s.name[lang]}
                  </h2>

                  <p className="font-serif italic text-xl md:text-2xl text-white/80 max-w-md leading-snug mb-10">
                    {s.headline[lang]}
                  </p>

                  <a
                    href="#soumission"
                    className="inline-flex items-center gap-3 self-start px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                    style={{ borderColor: `${s.accent}55` }}
                  >
                    En savoir plus
                    <span className="w-6 h-px bg-current" />
                  </a>
                </div>

                {/* CENTER — Massive image */}
                <div className="relative flex items-center justify-center">
                  <div
                    className="relative w-full h-[70vh] lg:h-[85vh] max-w-[520px]"
                    style={{
                      transform: isActive
                        ? 'translateY(0) scale(1)'
                        : 'translateY(60px) scale(0.96)',
                      transition:
                        'transform 1000ms cubic-bezier(0.22,1,0.36,1)',
                    }}
                  >
                    <div
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: `0 40px 120px -20px ${s.accent}40, 0 0 0 1px ${s.accent}20`,
                      }}
                    >
                      <img
                        src={s.image}
                        alt={s.name[lang]}
                        className="w-full h-full object-cover"
                        loading="eager"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${s.bg.to}CC 0%, transparent 40%, transparent 70%, ${s.bg.to}66 100%)`,
                        }}
                      />
                    </div>

                    <span className="absolute -top-3 -left-3 w-6 h-6 border-t border-l border-white/40" />
                    <span className="absolute -top-3 -right-3 w-6 h-6 border-t border-r border-white/40" />
                    <span className="absolute -bottom-3 -left-3 w-6 h-6 border-b border-l border-white/40" />
                    <span className="absolute -bottom-3 -right-3 w-6 h-6 border-b border-r border-white/40" />

                    <div className="absolute inset-0 -m-16 pointer-events-none opacity-30 hidden lg:block">
                      <div
                        className="w-full h-full rounded-full border border-dashed animate-spin-slow"
                        style={{ borderColor: `${s.accent}40` }}
                      />
                    </div>
                  </div>
                </div>

                {/* RIGHT */}
                <div
                  className="relative flex flex-col justify-center"
                  style={{
                    transform: isActive ? 'translateY(0)' : 'translateY(30px)',
                    transition:
                      'transform 800ms cubic-bezier(0.22,1,0.36,1) 200ms',
                  }}
                >
                  <div className="mb-8">
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase pb-2 border-b block w-fit mb-6"
                      style={{ borderColor: `${s.accent}80`, color: s.accent }}
                    >
                      Description
                    </span>
                    <p className="font-sans font-light text-white/70 leading-relaxed max-w-sm text-sm md:text-base">
                      {s.description[lang]}
                    </p>
                  </div>

                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase pb-2 border-b block w-fit mb-6"
                      style={{ borderColor: `${s.accent}80`, color: s.accent }}
                    >
                      Spécifications
                    </span>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-sm">
                      {s.specs.map((spec, k) => (
                        <div
                          key={k}
                          className="border-l pl-4"
                          style={{ borderColor: `${s.accent}40` }}
                        >
                          <div className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">
                            {spec.label[lang]}
                          </div>
                          <div className="font-display text-xl md:text-2xl text-white">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}

        {/* Bottom scroll hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Défiler pour explorer
        </div>
      </div>
    </section>
  )
}

function MobileServiceCard({ s, index }: { s: Service; index: number }) {
  const ref = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Parallax on scroll — image drifts as card moves through viewport
  useEffect(() => {
    const el = ref.current
    const img = imgRef.current
    if (!el || !img) return
    let raf = 0
    const update = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Only run when card is near viewport for performance
      if (r.bottom < -100 || r.top > vh + 100) return
      const t = (r.top + r.height / 2 - vh / 2) / vh
      const clamped = Math.max(-1, Math.min(1, t))
      const shift = clamped * -20
      img.style.transform = `translate3d(0, ${shift}px, 0) scale(1.1)`
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Portrait images (soudure, mecanique) need centering to keep face visible
  const objectPosition =
    s.id === 'soudure' || s.id === 'mecanique' ? 'center 20%' : 'center'

  return (
    <article
      ref={ref}
      className="group relative rounded-lg overflow-hidden border border-white/10 animate-[fadeUp_800ms_ease-out_both]"
      style={{
        background: `linear-gradient(160deg, ${s.bg.from}80 0%, ${s.bg.to}90 100%)`,
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Corner ticks */}
      <span className="absolute top-3 left-3 z-20 w-3 h-3 border-t border-l border-white/30" />
      <span className="absolute top-3 right-3 z-20 w-3 h-3 border-t border-r border-white/30" />
      <span className="absolute bottom-3 left-3 z-20 w-3 h-3 border-b border-l border-white/30" />
      <span className="absolute bottom-3 right-3 z-20 w-3 h-3 border-b border-r border-white/30" />

      {/* Progress badge */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5">
        {SERVICES.map((_, i) => (
          <span
            key={i}
            className="h-1 rounded-full transition-all duration-500"
            style={{
              width: i === index ? 16 : 5,
              backgroundColor: i === index ? s.accent : 'rgba(255,255,255,0.25)',
            }}
          />
        ))}
      </div>

      {/* Image — portrait 4:5 aspect works for both portrait and landscape sources */}
      <div className="relative w-full aspect-[4/5] overflow-hidden">
        <img
          ref={imgRef}
          src={s.image}
          alt={s.name[lang]}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover will-change-transform"
          style={{
            objectPosition,
            transform: 'scale(1.08)',
            transition: 'transform 0.1s linear',
          }}
        />
        {/* Dark gradient at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${s.bg.to}FA 0%, ${s.bg.to}80 25%, transparent 55%)`,
          }}
        />
        {/* Number overlay bottom left */}
        <div className="absolute bottom-4 left-5 z-10">
          <div className="flex items-baseline gap-2">
            <span
              className="font-mono text-[11px] tracking-[0.3em]"
              style={{ color: s.accent }}
            >
              {s.number}
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
              / 04
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative p-5 md:p-6">
        <h3 className="font-display uppercase text-3xl md:text-4xl leading-none mb-3">
          {s.name[lang]}
        </h3>

        <p className="font-serif italic text-white/80 text-base leading-snug mb-4">
          {s.headline[lang]}
        </p>

        <p className="font-sans font-light text-white/60 text-sm leading-relaxed mb-5">
          {s.description[lang]}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-4 mb-6">
          {s.specs.map((spec, i) => (
            <div
              key={i}
              className="border-l pl-3"
              style={{ borderColor: `${s.accent}40` }}
            >
              <div className="font-mono text-[9px] tracking-widest uppercase text-white/40 mb-1">
                {spec.label[lang]}
              </div>
              <div className="font-display text-base text-white">
                {spec.value}
              </div>
            </div>
          ))}
        </div>

        <a
          href="#soumission"
          className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-full font-sans text-[10px] tracking-[0.3em] uppercase text-white active:scale-95 transition-transform duration-200"
          style={{ borderColor: `${s.accent}70` }}
        >
          En savoir plus
          <span className="w-4 h-px bg-current" />
        </a>
      </div>
    </article>
  )
}
