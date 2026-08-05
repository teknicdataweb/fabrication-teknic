import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sparks from './Sparks'

export default function Hero() {
  const container = useRef<HTMLDivElement>(null)
  const eyebrow = useRef<HTMLParagraphElement>(null)
  const line1 = useRef<HTMLSpanElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const subtitle = useRef<HTMLParagraphElement>(null)
  const cta = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(eyebrow.current, { y: 40, opacity: 0, duration: 1 })
        .from(line1.current, { y: 120, opacity: 0, duration: 1.2 }, '-=0.6')
        .from(line2.current, { y: 120, opacity: 0, duration: 1.2 }, '-=0.9')
        .from(subtitle.current, { y: 30, opacity: 0, duration: 0.9 }, '-=0.6')
        .from(cta.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.5')

      gsap.to(container.current, {
        scale: 0.85,
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="accueil"
      ref={container}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black" />
      </div>

      {/* Sparks overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Sparks count={22} />
      </div>

      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-6xl">
        <p
          ref={eyebrow}
          className="font-sans text-xs md:text-sm tracking-[0.4em] text-white/60 mb-8 uppercase"
        >
          Depuis 2014 · Nicolet, Québec
        </p>

        <h1 className="font-display flex flex-col leading-[0.9] tracking-tight uppercase">
          <span
            ref={line1}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white"
          >
            L'art
          </span>
          <span
            ref={line2}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
          >
            du <span className="text-teknic-red">métal</span>
          </span>
        </h1>

        <p
          ref={subtitle}
          className="font-sans font-light text-sm md:text-base tracking-[0.35em] text-white/70 mt-8 uppercase"
        >
          Usinage · Fabrication · Soudure · Conception
        </p>

        <div ref={cta} className="mt-12 flex items-center justify-center gap-4">
          <a
            href="#services"
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-sans text-xs tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red hover:scale-105 transition-all duration-300"
          >
            Découvrir nos services
            <span className="w-6 h-px bg-white group-hover:w-10 transition-all duration-300" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Corner tech labels */}
      <div className="absolute top-24 left-6 md:left-12 z-20 font-mono text-[10px] tracking-widest text-white/30 hidden md:block">
        50° 21' N · 72° 39' W
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 z-20 font-mono text-[10px] tracking-widest text-white/30 hidden md:block">
        TEK-NIC / EST. QC
      </div>
    </section>
  )
}
