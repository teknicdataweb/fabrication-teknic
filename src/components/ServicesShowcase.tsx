import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import { ExternalLink } from 'lucide-react'
import { SERVICES, showcaseView } from '../data/services'
import type { Service } from '../data/services'
import { useLang } from '../lib/i18n'
import { goToService } from '../lib/goToService'
import { SLIDE_SCROLL } from '../lib/carousel'

export default function ServicesShowcase() {
  const { lang, t, lp } = useLang()
  const container = useRef<HTMLDivElement>(null)
  const pinTarget = useRef<HTMLDivElement>(null)
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

  // Escritorio: la sección se fija y UNA línea de tiempo ligada al scroll (scrub) anima la salida y la entrada de cada servicio.
  // La animación sigue directamente la rueda/trackpad (y se puede ir y volver); al soltar, se acomoda suavemente en el servicio más cercano.
  useEffect(() => {
    if (!isDesktop) return
    const root = container.current
    const pin = pinTarget.current
    if (!root || !pin) return
    const total = SERVICES.length
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const k = reduce ? 0 : 1 // sin desplazamientos si el visitante pidió menos movimiento

    const ctx = gsap.context(() => {
      const slides = Array.from(root.querySelectorAll<HTMLElement>('.slide'))
      const layers = Array.from(root.querySelectorAll<HTMLElement>('.slide-bg'))

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: `+=${total * SLIDE_SCROLL}`,
          pin,
          pinSpacing: true,
          anticipatePin: 1,
          scrub: 0.8,
          // Al soltar el scroll, se acomoda en el centro del servicio más cercano
          snap: {
            snapTo: SERVICES.map((_, i) => (i + 0.5) / total),
            // Sin inercia: un gesto de scroll avanza al servicio siguiente, no se salta varios
            inertia: false,
            delay: 0.12,
            duration: { min: 0.35, max: 0.8 },
            ease: 'power2.inOut',
          },
          onUpdate: (self) => {
            // Servicio "activo" (indicador, videos, accesibilidad), con un pequeño margen para evitar parpadeos en el borde
            const pos = self.progress * total * 0.999
            const raw = Math.min(total - 1, Math.floor(pos))
            const current = activeRef.current
            const margin = 0.06
            const crossed = raw > current ? pos >= raw + margin : raw < current ? pos <= raw + 1 - margin : false
            if (crossed) {
              activeRef.current = raw
              setActive(raw)
            }
          },
        },
      })
      // Duración total = un tramo por servicio
      tl.to({}, { duration: total }, 0)

      slides.forEach((el, i) => {
        const items = Array.from(el.querySelectorAll<HTMLElement>('.slide-left > *, .slide-right > *'))
        const media = el.querySelector<HTMLElement>('.slide-media')
        const inner = el.querySelector<HTMLElement>('.slide-media-inner > video, .slide-media-inner > img')

        // Estado inicial de los servicios que aún no se ven
        if (i > 0) {
          gsap.set(el, { opacity: 0 })
          gsap.set(items, { opacity: 0, y: 42 * k })
          if (media) gsap.set(media, { y: 64 * k, scale: 0.96 })
        }

        // Paralaje: la foto/video se desplaza un poco mientras se recorre el servicio
        if (inner && !reduce && !inner.hasAttribute('data-still')) {
          gsap.set(inner, { scale: 1.12 })
          tl.fromTo(inner, { y: 24 }, { y: -24, duration: 1, immediateRender: i === 0 }, i)
        }

        // Entrada (empieza justo después de que sale el servicio anterior; no se mezclan los textos)
        if (i > 0) {
          tl.to(el, { opacity: 1, duration: 0.08 }, i)
          tl.to(items, { opacity: 1, y: 0, duration: 0.24, ease: 'power2.out', stagger: 0.028 }, i + 0.01)
          if (media) tl.to(media, { y: 0, scale: 1, duration: 0.3, ease: 'power2.out' }, i)
        }

        // Salida (hacia arriba, rápida)
        if (i < total - 1) {
          const t0 = i + 1 - 0.22
          tl.to(items, { opacity: 0, y: -32 * k, duration: 0.18, ease: 'power1.in', stagger: 0.012 }, t0)
          if (media) tl.to(media, { y: -52 * k, scale: 0.97, duration: 0.2, ease: 'power1.in' }, t0)
          tl.to(el, { opacity: 0, duration: 0.04 }, i + 1 - 0.04)
        }
      })

      // Fondo: cada servicio tiene su capa de color; se hace un fundido entre capas al cambiar
      layers.forEach((layer, i) => {
        if (i === 0) return
        gsap.set(layer, { opacity: 0 })
        tl.fromTo(layers[i - 1], { opacity: 1 }, { opacity: 0, duration: 0.4, immediateRender: false }, i - 0.2)
        tl.fromTo(layer, { opacity: 0 }, { opacity: 1, duration: 0.4, immediateRender: false }, i - 0.2)
      })
    }, root)

    return () => ctx.revert()
  }, [isDesktop])

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
            {t('Nos ', 'Our ')}<span className="text-teknic-red">{t('disciplines', 'disciplines')}</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-sm md:text-base leading-relaxed">
            {t(
              'Cinq expertises sous un même toit. Chaque projet est pris en charge de bout en bout par nos équipes.',
              'Five areas of expertise under one roof. Every project is handled end to end by our teams.'
            )}
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
        {/* Fondos: una capa por servicio (se hace un fundido entre ellas con el scroll) */}
        {SERVICES.map((sv, i) => (
          <div
            key={sv.id}
            className="slide-bg absolute inset-0 z-0"
            style={{
              background: `radial-gradient(ellipse at 30% 40%, ${sv.bg.via} 0%, ${sv.bg.from} 45%, ${sv.bg.to} 100%)`,
              opacity: i === 0 ? 1 : 0,
            }}
          />
        ))}

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
        <div className="absolute top-24 left-6 md:left-12 z-30 font-mono text-[10px] tracking-[0.4em] text-white/60 uppercase">
          {t('Nos Services', 'Our Services')} · {String(SERVICES.length).padStart(2, '0')} disciplines
        </div>

        {/* Progress indicators: clicables, el activo muestra el nombre */}
        <nav
          aria-label={t('Services', 'Services')}
          className="absolute top-24 right-6 md:right-12 z-30 flex gap-4 items-center"
        >
          {SERVICES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goToService(s.id)}
              aria-label={s.name[lang]}
              aria-current={i === active ? 'true' : undefined}
              className="group flex items-center gap-2 py-2"
            >
              <span
                className={`font-mono text-[10px] tracking-[0.25em] uppercase transition-all duration-500 ${
                  i === active
                    ? 'max-w-[200px] opacity-100 text-white'
                    : 'max-w-0 overflow-hidden opacity-0 text-white/60 group-hover:max-w-[40px] group-hover:opacity-100'
                }`}
                style={{ whiteSpace: 'nowrap' }}
              >
                {i === active ? (
                  <>
                    {`0${i + 1}`}
                    <span className="hidden xl:inline"> · {s.name[lang]}</span>
                  </>
                ) : (
                  `0${i + 1}`
                )}
              </span>
              <span
                className={`h-px transition-all duration-500 ${
                  i === active ? 'w-10 bg-white' : 'w-4 bg-white/30 group-hover:bg-white/70'
                }`}
              />
            </button>
          ))}
        </nav>

        {/* Slides stacked, crossfade via opacity */}
        {SERVICES.map((s0, i) => {
          const s = showcaseView(s0)
          const isActive = i === active
          return (
            <div
              key={s.id}
              className={`slide ${i === 0 ? 'slide-first' : ''} absolute inset-0 z-20`}
              style={{ pointerEvents: isActive ? 'auto' : 'none' }}
            >
              <div className="h-full w-full grid grid-cols-[1.1fr_1.5fr_0.9fr] gap-6 px-6 md:px-12 pt-24 pb-16">
                {/* LEFT */}
                <div className="slide-left relative flex flex-col justify-center">
                  {/* Partner badge (only for external services) */}
                  {s.external && s.partnerLabel && (
                    <div
                      className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full mb-6 border"
                      style={{
                        borderColor: `${s.accent}60`,
                        backgroundColor: `${s.accent}15`,
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: s.accent }}
                      />
                      <span
                        className="font-mono text-[10px] tracking-[0.25em] uppercase"
                        style={{ color: s.accent }}
                      >
                        {s.partnerLabel[lang]}
                      </span>
                    </div>
                  )}

                  {s.badge && (
                    <div className="self-start mb-6 bg-white rounded-md p-2 shadow-xl shadow-black/40">
                      <img
                        src={s.badge.src}
                        width={364}
                        height={496}
                        alt={lang === 'en' && s.badge.altEn ? s.badge.altEn : s.badge.alt}
                        loading="lazy"
                        className="block h-24 w-auto"
                      />
                    </div>
                  )}

                  <div className="flex items-baseline gap-3 mb-4">
                    <span
                      className="font-mono text-sm tracking-[0.3em]"
                      style={{ color: s.accent }}
                    >
                      {s.number}
                    </span>
                    <span className="font-mono text-xs tracking-[0.3em] text-white/60">
                      / 0{SERVICES.length}
                    </span>
                  </div>

                  <h2
                    className={`font-display uppercase leading-[0.85] mb-4 ${
                      s.name[lang].includes(' ')
                        ? 'whitespace-nowrap'
                        : 'text-6xl md:text-7xl lg:text-[min(6rem,12vh)] xl:text-[min(8rem,12vh)]'
                    }`}
                    // Nombres de varias palabras: una sola línea, con el tamaño que cabe antes del video
                    style={
                      s.name[lang].includes(' ')
                        ? { fontSize: `min(calc((34vw - 72px) / ${(s.name[lang].length * 0.43).toFixed(2)}), 12vh)` }
                        : undefined
                    }
                  >
                    {s.name[lang]}
                  </h2>

                  {s.headline[lang] && (
                    <p className="font-serif italic text-xl md:text-2xl text-white/80 max-w-md leading-snug mb-3">
                      {s.headline[lang]}
                    </p>
                  )}

                  <p className="font-sans font-light text-white/70 leading-relaxed max-w-lg text-sm lg:text-[15px] mb-6">
                    {s.description[lang]}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 self-start">
                    <Link
                      to={lp(`/services/${s.id}`)}
                      className="inline-flex items-center gap-3 self-start px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                      style={{ borderColor: `${s.accent}55` }}
                    >
                      {t('En savoir plus', 'Learn more')}
                      <span className="w-6 h-px bg-current" />
                    </Link>
                    {s.external && s.externalUrl && (
                      <a
                      href={s.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/cta inline-flex items-center gap-3 self-start px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                      style={{
                        borderColor: s.accent,
                        backgroundColor: `${s.accent}20`,
                      }}
                    >
                      {t('Visiter le site', 'Visit the website')}
                      <ExternalLink
                        className="w-3.5 h-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </a>
                    )}
                  </div>
                </div>

                {/* CENTER — Massive image / video */}
                <div className="relative flex items-center justify-center">
                  <div
                    className={`slide-media ${
                      !s.video && s.videoShape === 'landscape'
                        ? 'relative w-full aspect-video max-h-[78vh] max-w-[820px] mx-auto'
                        : s.video && s.videoShape === 'landscape'
                        ? 'relative w-full aspect-[4/3] max-h-[78vh] max-w-[760px] mx-auto'
                        : s.videoShape === 'square'
                        ? 'relative w-full aspect-square max-h-[70vh] max-w-[560px] mx-auto'
                        : s.video
                        ? 'relative h-[70vh] lg:h-[85vh] aspect-[9/16] max-w-full mx-auto'
                        : 'relative w-full h-[70vh] lg:h-[85vh] max-w-[520px]'
                    }`}
                  >
                    <div
                      className="slide-media-inner absolute inset-0 rounded-2xl overflow-hidden"
                      style={{
                        boxShadow: `0 40px 120px -20px ${s.accent}40, 0 0 0 1px ${s.accent}20`,
                        background: `linear-gradient(160deg, ${s.bg.from} 0%, ${s.bg.to} 100%)`,
                      }}
                    >
                      {s.video ? (
                        <ServiceVideo src={s.video} objectFit={s.videoShape ? 'cover' : 'contain'} active={isActive} />
                      ) : s.image ? (
                        <img
                          src={s.image}
                          alt={s.imageAlt?.[lang] ?? s.name[lang]}
                          className="w-full h-full object-cover"
                          loading="eager"
                          {...(s.showcaseImage ? { 'data-still': '' } : {})}
                        />
                      ) : (
                        <MediaPlaceholder accent={s.accent} label={s.name[lang]} />
                      )}
                      <div
                        className="absolute inset-0"
                        style={{
                          background: `linear-gradient(to top, ${s.bg.to}CC 0%, transparent 40%, transparent 70%, ${s.bg.to}66 100%)`,
                        }}
                      />
                      {s.showcaseLogo && (
                        <img
                          src={s.showcaseLogo.src}
                          alt={s.showcaseLogo.alt}
                          width={520}
                          height={518}
                          className="absolute top-4 right-4 z-10 w-28 xl:w-36 h-auto pointer-events-none"
                          style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.7))' }}
                        />
                      )}
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
                <div className="slide-right relative flex flex-col justify-center">
                  <div>
                    <span
                      className="font-mono text-[10px] tracking-[0.3em] uppercase pb-2 border-b block w-fit mb-6"
                      style={{ borderColor: `${s.accent}80`, color: s.accent }}
                    >
                      {t('Spécifications', 'Specifications')}
                    </span>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-sm">
                      {s.specs.map((spec, k) => (
                        <div
                          key={k}
                          className="border-l pl-4"
                          style={{ borderColor: `${s.accent}40` }}
                        >
                          <div className="font-mono text-[10px] tracking-widest uppercase text-white/60 mb-1">
                            {spec.label[lang]}
                          </div>
                          <div className="font-display text-xl md:text-2xl text-white">
                            {lang === 'en' && spec.valueEn ? spec.valueEn : spec.value}
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
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
          {t('Défiler pour explorer', 'Scroll to explore')}
        </div>
      </div>
    </section>
  )
}

function ServiceVideo({
  src,
  objectFit = 'contain',
  active,
}: {
  src: string
  objectFit?: 'contain' | 'cover'
  /** Escritorio: true cuando la diapositiva está activa (el video arranca desde el inicio y se pausa al salir) */
  active?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  // Derive poster path: /service-3d.mp4 -> /service-3d-poster.jpg
  const poster = src.replace(/\.[^.]+$/, '-poster.jpg')

  // Escritorio (prop active): cada vez que se llega al servicio, el video empieza desde el principio
  useEffect(() => {
    if (active === undefined) return
    const el = ref.current
    if (!el) return
    if (active) {
      el.currentTime = 0
      el.play().catch(() => {})
    } else {
      el.pause()
    }
  }, [active])

  // Móvil (sin prop active): pausa fuera de pantalla y vuelve a empezar desde el inicio al entrar en vista
  useEffect(() => {
    if (active !== undefined) return
    const el = ref.current
    if (!el) return
    let raf = 0
    let wasIn = false
    const check = () => {
      raf = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      const inView = r.bottom > -100 && r.top < vh + 100
      if (inView && !wasIn) el.currentTime = 0
      wasIn = inView
      if (inView && el.paused) {
        el.play().catch(() => {})
      } else if (!inView && !el.paused) {
        el.pause()
      }
    }
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(check)
    }
    check()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className={`absolute inset-0 w-full h-full ${
        objectFit === 'cover' ? 'object-cover' : 'object-contain'
      }`}
    />
  )
}

function MediaPlaceholder({ accent, label }: { accent: string; label: string }) {
  const { t } = useLang()
  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Concentric rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="absolute rounded-full border animate-pulse"
            style={{
              width: `${20 + i * 18}%`,
              height: `${20 + i * 18}%`,
              borderColor: `${accent}${(50 - i * 10).toString(16).padStart(2, '0')}`,
              animationDelay: `${i * 400}ms`,
              animationDuration: '3s',
            }}
          />
        ))}
      </div>
      {/* Label */}
      <div className="relative z-10 text-center px-6">
        <div
          className="font-mono text-[10px] tracking-[0.4em] uppercase mb-2"
          style={{ color: accent }}
        >
          {t('Média · à venir', 'Media · coming soon')}
        </div>
        <div className="font-display text-2xl md:text-3xl uppercase text-white/70 tracking-tight">
          {label}
        </div>
      </div>
    </div>
  )
}

function MobileServiceCard({ s: s0, index }: { s: Service; index: number }) {
  const s = showcaseView(s0)
  const { lang, t, lp } = useLang()
  const ref = useRef<HTMLElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)

  // Parallax on scroll — image drifts as card moves through viewport
  useEffect(() => {
    const el = ref.current
    const img = imgRef.current
    // La foto de la impresora 3D se muestra completa: sin zoom ni desplazamiento
    if (!el || !img || s.showcaseImage) return
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

  // Imágenes verticales: se centran arriba para no cortar la parte importante
  const objectPosition =
    'center'

  return (
    <article
      ref={ref}
      id={`service-${s.id}`}
      className="group relative scroll-mt-24 rounded-lg overflow-hidden border border-white/10 animate-[fadeUp_800ms_ease-out_both]"
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

      {/* Media — 9:16 for videos (native vertical), 4:5 for photos */}
      <div
        className={`relative w-full overflow-hidden ${
          s.videoShape === 'landscape' ? 'aspect-video' : s.videoShape === 'square' ? 'aspect-square' : s.video ? 'aspect-[9/16]' : 'aspect-[4/5]'
        }`}
        style={{
          background: `linear-gradient(160deg, ${s.bg.from} 0%, ${s.bg.to} 100%)`,
        }}
      >
        {s.video ? (
          <ServiceVideo src={s.video} objectFit={s.videoShape ? 'cover' : 'contain'} />
        ) : s.image ? (
          <img
            ref={imgRef}
            src={s.image}
            alt={s.imageAlt?.[lang] ?? s.name[lang]}
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover will-change-transform"
            style={{
              objectPosition,
              transform: s.showcaseImage ? 'none' : 'scale(1.08)',
              transition: 'transform 0.1s linear',
            }}
          />
        ) : (
          <MediaPlaceholder accent={s.accent} label={s.name[lang]} />
        )}
        {/* Dark gradient at bottom for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${s.bg.to}FA 0%, ${s.bg.to}80 25%, transparent 55%)`,
          }}
        />
        {s.showcaseLogo && (
                <img
                  src={s.showcaseLogo.src}
                  alt={s.showcaseLogo.alt}
                  width={520}
                  height={518}
                  className="absolute top-4 right-4 z-10 w-24 h-auto pointer-events-none"
                  style={{ filter: 'drop-shadow(0 2px 10px rgba(0,0,0,0.7))' }}
                />
              )}
        {/* Number overlay bottom left */}
        <div className="absolute bottom-4 left-5 z-10">
          <div className="flex items-baseline gap-2">
            <span
              className="font-mono text-[11px] tracking-[0.3em]"
              style={{ color: s.accent }}
            >
              {s.number}
            </span>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/60">
              / 0{SERVICES.length}
            </span>
          </div>
        </div>

        {/* Partner badge (top-left on image) */}
        {s.external && s.partnerLabel && (
          <div
            className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border backdrop-blur-sm"
            style={{
              borderColor: `${s.accent}60`,
              backgroundColor: `${s.accent}20`,
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: s.accent }}
            />
            <span
              className="font-mono text-[9px] tracking-[0.25em] uppercase"
              style={{ color: s.accent }}
            >
              {s.partnerLabel[lang].split('·')[0].trim()}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative p-5 md:p-6">
        {s.badge && (
          <div className="inline-block mb-4 bg-white rounded-md p-1.5 shadow-lg shadow-black/40">
            <img src={s.badge.src} alt={lang === 'en' && s.badge.altEn ? s.badge.altEn : s.badge.alt} width={364} height={496} loading="lazy" className="block h-20 w-auto" />
          </div>
        )}

        <h3 className="font-display uppercase text-3xl md:text-4xl leading-none mb-3">
          {s.name[lang]}
        </h3>

        {s.headline[lang] && (
          <p className="font-serif italic text-white/80 text-base leading-snug mb-4">
            {s.headline[lang]}
          </p>
        )}

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
              <div className="font-mono text-[9px] tracking-widest uppercase text-white/60 mb-1">
                {spec.label[lang]}
              </div>
              <div className="font-display text-base text-white">
                {lang === 'en' && spec.valueEn ? spec.valueEn : spec.value}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to={lp(`/services/${s.id}`)}
            className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-full font-sans text-[10px] tracking-[0.3em] uppercase text-white active:scale-95 transition-transform duration-200"
            style={{ borderColor: `${s.accent}70` }}
          >
            {t('En savoir plus', 'Learn more')}
            <span className="w-4 h-px bg-current" />
          </Link>
          {s.external && s.externalUrl && (
            <a
            href={s.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 border rounded-full font-sans text-[10px] tracking-[0.3em] uppercase text-white active:scale-95 transition-transform duration-200"
            style={{
              borderColor: s.accent,
              backgroundColor: `${s.accent}20`,
            }}
          >
            {t('Visiter le site', 'Visit the website')}
            <ExternalLink className="w-3 h-3" strokeWidth={2} />
          </a>
          )}
        </div>
      </div>
    </article>
  )
}
