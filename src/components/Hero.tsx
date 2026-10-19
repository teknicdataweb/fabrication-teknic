import { goToService } from '../lib/goToService'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Sparks from './Sparks'
import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'

export default function Hero() {
  const { t, lp } = useLang()
  const container = useRef<HTMLDivElement>(null)
  const line1 = useRef<HTMLSpanElement>(null)
  const line2 = useRef<HTMLSpanElement>(null)
  const subtitle = useRef<HTMLParagraphElement>(null)
  const cta = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      tl.from(line1.current, { y: 120, opacity: 0, duration: 1.2 })
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
          preload="auto"
          poster="/hero-poster.jpg"
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
        <h1 className="font-display flex flex-col leading-[0.9] tracking-tight uppercase">
          <span
            ref={line1}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-white"
          >
            {t("L'allié de vos projets", 'Your ally in')}
          </span>
          <span
            ref={line2}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-teknic-red"
          >
            {t('industriels', 'industrial projects')}
          </span>
        </h1>

        <p
          ref={subtitle}
          className="font-sans font-light text-sm md:text-base tracking-[0.35em] text-white/70 mt-8 uppercase"
        >
          {[
            { id: 'usinage', label: t('Usinage', 'Machining') },
            { id: 'fabrication', label: 'Fabrication' },
            { id: 'soudure', label: t('Soudure', 'Welding') },
            { id: '3d', label: t('Impression 3D', '3D Printing') },
          ].map((item, i, all) => (
            <span key={item.id}>
              <button
                type="button"
                onClick={() => goToService(item.id)}
                className="group relative inline-block pb-1 text-white/70 hover:text-white transition-colors duration-300 cursor-pointer"
                style={{ font: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit', background: 'none', border: 0 }}
              >
                {item.label}
                <span className="absolute left-0 bottom-0 h-px w-full bg-teknic-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
              </button>
              {i < all.length - 1 && <span className="mx-3">·</span>}
            </span>
          ))}
        </p>

        <div ref={cta} className="mt-12 flex items-center justify-center gap-4">
          <Link
            to={lp('/services')}
            className="group inline-flex items-center gap-3 px-8 py-4 border border-white/20 rounded-full font-sans text-xs tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red hover:scale-105 transition-all duration-300"
          >
            {t('Découvrir nos services', 'Discover our services')}
            <span className="w-6 h-px bg-white group-hover:w-10 transition-all duration-300" />
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
          Scroll
        </span>
        <div className="h-12 w-px bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
      </div>

      {/* Corner tech labels */}
      <div className="absolute top-24 left-6 md:left-12 z-20 font-mono text-[10px] tracking-widest text-white/50 hidden md:block">
        46° 13' N · 72° 37' W
      </div>
      <div className="absolute bottom-8 right-6 md:right-12 z-20 font-mono text-[10px] tracking-widest text-white/50 hidden md:block">
        TEK-NIC / EST. QC
      </div>
    </section>
  )
}
