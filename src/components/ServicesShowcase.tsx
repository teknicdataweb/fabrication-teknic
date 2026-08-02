import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../data/services'

export default function ServicesShowcase() {
  const container = useRef<HTMLDivElement>(null)
  const pinTarget = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const activeRef = useRef(0)
  const [active, setActive] = useState(0)
  const lang: 'fr' | 'en' = 'fr'

  useEffect(() => {
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
  }, [])

  useEffect(() => {
    const s = SERVICES[active]
    if (!bgRef.current) return
    gsap.to(bgRef.current, {
      background: `radial-gradient(ellipse at 30% 40%, ${s.bg.via} 0%, ${s.bg.from} 45%, ${s.bg.to} 100%)`,
      duration: 1.2,
      ease: 'power2.inOut',
    })
  }, [active])

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
              <div className="h-full w-full grid grid-cols-1 lg:grid-cols-[1.1fr_1.4fr_1fr] gap-6 px-6 md:px-12 py-32">
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
                    href="#contact"
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
