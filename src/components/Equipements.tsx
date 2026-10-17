import { useEffect, useState, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInView } from 'react-intersection-observer'
import { Flame, Wrench, ConciergeBell, Scissors, SprayCan, Factory, type LucideIcon } from 'lucide-react'
import { HIGHLIGHTS, LATHES, CAPABILITIES, BLOCK_INTROS } from '../data/equipements'
import { useLang } from '../lib/i18n'

const ICONS = {
  flame: Flame,
  wrench: Wrench,
  crane: ConciergeBell,
  saw: Scissors,
  spray: SprayCan,
  factory: Factory,
}

// Filas visibles de la tabla de tornos antes del botón "Voir plus"
const LATHE_PREVIEW = 4

export default function Equipements({ asH1 = false }: { asH1?: boolean }) {
  const Title = asH1 ? 'h1' : 'h2'
  const { lang, t } = useLang()
  const [showAllLathes, setShowAllLathes] = useState(false)

  // Scroll: la trayectoria de cada tarjeta se dibuja mientras se baja, y se borra al subir
  useEffect(() => {
    const paths = gsap.utils.toArray<SVGRectElement>('.trace-path')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      gsap.set(paths, { strokeDashoffset: 0 })
      return
    }
    const tweens = paths.map((path) =>
      gsap.fromTo(
        path,
        { strokeDashoffset: 100 },
        {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: path.closest('.trace-card'),
            start: 'top 85%',
            end: 'bottom 45%',
            scrub: true,
          },
        }
      )
    )
    return () => {
      tweens.forEach((tw) => {
        tw.scrollTrigger?.kill()
        tw.kill()
      })
    }
  }, [])
  const visibleLathes = showAllLathes ? LATHES : LATHES.slice(0, LATHE_PREVIEW)

  return (
    <section
      id="equipements"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5"
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

      {/* Ambient red glow */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]" style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }} />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Section Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              04 · {t('Équipements', 'Equipment')}
            </span>
          </div>
          <Title className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            {t('Notre ', 'Our ')}<span className="text-teknic-red">{t('capacité', 'capacity')}</span>
          </Title>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              "Un parc machine complet pour couvrir chaque étape — de l'ébauche brute à la pièce finie à la tolérance micronique.",
              'A complete machine fleet covering every step — from the raw blank to the finished part at micron tolerance.'
            )}
          </p>
        </div>

        {/* === BLOCK 1 — HIGHLIGHTED CNC & BORING === */}
        <div className="mb-24">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              {t('Usinage CNC · Alésage', 'CNC machining · Boring')}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {t('03 machines phares', '03 flagship machines')}
            </span>
          </div>

          <BlockIntro block="cnc" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {HIGHLIGHTS.map((h) => (
              <RevealOnView key={h.id}>
              <article
                key={h.id}
                className="group metal-sheen trace-card relative border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-b from-[#1b2026] via-[#12161b] to-[#0c0f13] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Corner ticks */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

                {/* Línea de acero cepillado */}
                <span className="reveal-line absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent pointer-events-none z-10" />

                {/* Trayectoria de herramienta: el borde se dibuja con el scroll */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  <rect x="0" y="0" width="100" height="100" pathLength={100} className="trace-path" />
                </svg>

                {/* Hover red glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%)' }} />

                <div className="relative z-10">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3">
                    {h.category[lang]}
                  </div>
                  <h4 className="font-display text-3xl md:text-4xl uppercase leading-none mb-1 bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                    {h.name}
                  </h4>
                  <div className="font-serif italic text-white/50 text-sm mb-4">
                    {h.subtitle[lang]}
                  </div>
                  <p className="font-sans font-light text-white/60 text-sm leading-relaxed mb-8">
                    {h.description[lang]}
                  </p>

                  <div className="grid grid-cols-4 gap-3 mb-6">
                    {h.specs.map((s) => (
                      <div key={s.label} className="border-l border-white/10 group-hover:border-teknic-red/40 pl-2 transition-colors duration-500">
                        <div className="font-mono text-[9px] tracking-widest text-white/40 uppercase mb-1">
                          {s.label}
                        </div>
                        <div className="font-display text-base md:text-lg text-white">
                          {s.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {h.featured && (
                    <div className="mt-6 pt-4 border-t border-white/5">
                      <div className="font-mono text-[10px] tracking-[0.3em] text-teknic-red uppercase mb-1">
                        {t('Capacité', 'Capacity')}
                      </div>
                      <div className="font-display text-lg md:text-xl text-white">
                        {h.featured}
                      </div>
                    </div>
                  )}
                </div>
              </article>
              </RevealOnView>
            ))}
          </div>
        </div>

        {/* === BLOCK 2 — LATHES / DRILLS TABLE === */}
        <div className="mb-24">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              {t('Tours · Perçage · Rectification', 'Lathes · Drilling · Grinding')}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {LATHES.length.toString().padStart(2, '0')} {t('équipements', 'machines')}
            </span>
          </div>

          <BlockIntro block="lathes" />

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[1.4fr_1fr_1.4fr_auto] gap-6 pb-3 mb-2 border-b border-white/10">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {t('Type', 'Type')}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {t('Marque / Modèle', 'Brand / Model')}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                {t('Capacité', 'Capacity')}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase w-8 text-right">
                #
              </div>
            </div>
            <ul>
              {visibleLathes.map((row, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[1.4fr_1fr_1.4fr_auto] gap-6 py-4 border-b border-white/5 hover:border-teknic-red/30 hover:bg-white/[0.02] group transition-all duration-300"
                >
                  <div className="font-sans text-white/80 group-hover:text-white transition-colors">
                    {row.type[lang]}
                  </div>
                  <div className="font-sans text-white/60 group-hover:text-white/90 transition-colors">
                    {row.model}
                  </div>
                  <div className="font-display text-lg text-white tracking-tight">
                    {row.spec}
                  </div>
                  <div className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-teknic-red w-8 text-right transition-colors">
                    {(i + 1).toString().padStart(2, '0')}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden space-y-3">
            {visibleLathes.map((row, i) => (
              <div
                key={i}
                className="border border-white/10 rounded-lg p-4 hover:border-teknic-red/40 transition-colors"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    {row.type[lang]}
                  </div>
                  <span className="font-mono text-[10px] text-teknic-red">
                    {(i + 1).toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="font-sans text-white/70 text-sm mb-2">{row.model}</div>
                <div className="font-display text-lg text-white">{row.spec}</div>
              </div>
            ))}
          </div>

          {LATHES.length > LATHE_PREVIEW && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setShowAllLathes((v) => !v)}
                aria-expanded={showAllLathes}
                className="inline-flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-white/10 transition-colors duration-300"
              >
                {showAllLathes ? t('Afficher moins', 'Show less') : t(`Voir les ${LATHES.length} équipements`, `See all ${LATHES.length} machines`)}
                <span className="font-mono text-base leading-none">{showAllLathes ? '−' : '+'}</span>
              </button>
            </div>
          )}
        </div>

        {/* === BLOCK 3 — CAPABILITIES === */}
        <div>
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              {t('Soudage · Capacités industrielles', 'Welding · Industrial capabilities')}
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {CAPABILITIES.length.toString().padStart(2, '0')} {t('capacités', 'capabilities')}
            </span>
          </div>

          <BlockIntro block="welding" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {CAPABILITIES.map((c, i) => (
              <CapabilityCard key={c.id} c={c} index={i} Icon={ICONS[c.icon]} lang={lang} />
            ))}
          </div>
        </div>

        {/* Bottom signature */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Nicolet, {t('Québec', 'Quebec')} · 50 Route Marie-Victorin
          </div>
          <a
            href="/contact"
            className="inline-flex items-center gap-3 self-start px-5 py-2.5 border border-white/20 rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
          >
            {t('Demander une soumission', 'Request a quote')}
            <span className="w-5 h-px bg-current" />
          </a>
        </div>
      </div>
    </section>
  )
}

/** Descripción corta (y foto opcional) bajo el subtítulo de un bloque */
function BlockIntro({ block }: { block: keyof typeof BLOCK_INTROS }) {
  const { lang } = useLang()
  const { description, image } = BLOCK_INTROS[block]
  return (
    <div className={`-mt-2 mb-10 grid gap-6 items-center ${image ? 'md:grid-cols-[1.2fr_1fr]' : ''}`}>
      <p className="max-w-2xl font-sans font-light text-white/60 text-sm md:text-base leading-relaxed">
        {description[lang]}
      </p>
      {image && (
        <img src={image} alt="" loading="lazy" className="w-full h-48 md:h-56 object-cover rounded-lg border border-white/10" />
      )}
    </div>
  )
}

/** Tarjeta de capacidad: entrada suave al bajar, número rojo e icono que se vuelve rojo al pasar el cursor */
function CapabilityCard({
  c,
  index,
  Icon,
  lang,
}: {
  c: { title: { fr: string; en: string }; detail: { fr: string; en: string } }
  index: number
  Icon: LucideIcon
  lang: 'fr' | 'en'
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const visible = reduceMotion || inView

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: visible && !reduceMotion ? `${index * 100}ms` : '0ms' }}
    >
      <div className="group metal-sheen relative flex items-start gap-4 p-5 md:p-6 overflow-hidden border border-white/10 rounded-lg bg-gradient-to-b from-[#222a33] via-[#13181e] to-[#0a0d11] shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.6)] hover:border-teknic-red/50 transition-colors duration-300 h-full">
        {/* Acero cepillado: líneas finas casi invisibles */}
        <span
          className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            backgroundImage:
              'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 3px)',
          }}
          aria-hidden="true"
        />
        {/* Brillo del borde superior */}
        <span className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zinc-300/60 to-transparent pointer-events-none" />
        {/* Remaches */}
        <span className="absolute top-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)]" />
        <span className="absolute bottom-2 left-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)]" />
        <span className="absolute bottom-2 right-2 w-1 h-1 rounded-full bg-white/20 shadow-[inset_0_-1px_0_rgba(0,0,0,0.6)]" />

        <span className="absolute top-4 right-6 font-mono text-[10px] tracking-widest text-teknic-red z-10">
          {(index + 1).toString().padStart(2, '0')}
        </span>
        {/* Placa metálica del icono */}
        <div className="relative z-10 flex-shrink-0 w-11 h-11 flex items-center justify-center rounded border border-white/15 bg-gradient-to-b from-[#343c46] to-[#12161b] shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_2px_6px_rgba(0,0,0,0.5)] group-hover:bg-teknic-red group-hover:from-teknic-red group-hover:to-[#8e0b20] group-hover:border-teknic-red transition-colors duration-300">
          <Icon className="w-5 h-5 text-white/85 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
        </div>
        <div className="relative z-10 min-w-0 pr-6">
          <div className="font-display text-base md:text-lg uppercase leading-tight mb-1 tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            {c.title[lang]}
          </div>
          <div className="font-sans font-light text-xs md:text-sm text-white/55 leading-relaxed">
            {c.detail[lang]}
          </div>
        </div>
      </div>
    </div>
  )
}

/** Contenedor que revela su contenido una vez al entrar en pantalla */
function RevealOnView({ children }: { children: ReactNode }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const visible = reduceMotion || inView
  return (
    <div
      ref={ref}
      className={`h-full transition-all duration-700 ease-out ${
        visible ? 'is-visible opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
      {children}
    </div>
  )
}
