import { useEffect, useState, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import { PROJECTS } from '../data/portfolio'

const lang: 'fr' | 'en' = 'fr'

const ASPECT = {
  portrait: 'aspect-[3/4]',
  landscape: 'aspect-[4/3]',
  square: 'aspect-square',
}

export default function Portfolio() {
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  const close = useCallback(() => setOpenIdx(null), [])
  const prev = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i - 1 + PROJECTS.length) % PROJECTS.length)),
    []
  )
  const next = useCallback(
    () => setOpenIdx((i) => (i === null ? null : (i + 1) % PROJECTS.length)),
    []
  )

  useEffect(() => {
    if (openIdx === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [openIdx, close, prev, next])

  const openProject = openIdx !== null ? PROJECTS[openIdx] : null

  return (
    <section
      id="portfolio"
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

      {/* Ambient red glow — mirror of Equipements */}
      <div
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header — same pattern as Equipements */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              05 · Portfolio
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            Pièces <span className="text-teknic-red">livrées</span>
          </h2>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            Une sélection de projets — simples ou complexes — réalisés dans notre
            atelier. Cliquez sur une image pour l'agrandir.
          </p>
        </div>

        {/* Sub-header */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
          <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
            Galerie · Réalisations
          </h3>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
            {PROJECTS.length.toString().padStart(2, '0')} projets
          </span>
        </div>

        {/* Grid — masonry-like via CSS columns for varied aspect ratios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
          {PROJECTS.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setOpenIdx(i)}
              className={`group relative block w-full text-left rounded-lg overflow-hidden border border-white/10 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 ${ASPECT[p.aspect]}`}
            >
              {/* Corner ticks — same as Equipements highlight cards */}
              <span className="absolute top-3 left-3 w-3 h-3 z-20 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
              <span className="absolute top-3 right-3 w-3 h-3 z-20 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
              <span className="absolute bottom-3 left-3 w-3 h-3 z-20 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
              <span className="absolute bottom-3 right-3 w-3 h-3 z-20 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

              {/* Image */}
              <img
                src={p.src}
                alt={p.title[lang]}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale-[0.15] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
              />

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

              {/* Red glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    'radial-gradient(circle at 50% 100%, rgba(200,16,46,0.15) 0%, transparent 60%)',
                }}
              />

              {/* Index number */}
              <span className="absolute top-5 right-5 z-20 font-mono text-[10px] tracking-widest text-white/50 group-hover:text-teknic-red transition-colors">
                {(i + 1).toString().padStart(2, '0')}
              </span>

              {/* Meta panel bottom */}
              <div className="absolute inset-x-0 bottom-0 z-20 p-5 md:p-6">
                <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-white/50 group-hover:text-teknic-red mb-1 transition-colors">
                  {p.category[lang]}
                </div>
                <div className="font-display text-base md:text-lg uppercase leading-tight text-white tracking-tight">
                  {p.title[lang]}
                </div>
                {p.material && (
                  <div className="font-sans font-light text-[11px] text-white/50 mt-1">
                    {p.material}
                  </div>
                )}
              </div>

              {/* Expand icon */}
              <div className="absolute top-5 left-5 z-20 w-8 h-8 flex items-center justify-center rounded border border-white/20 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-1 group-hover:translate-y-0">
                <Maximize2 className="w-3.5 h-3.5 text-white" strokeWidth={1.5} />
              </div>
            </button>
          ))}
        </div>

        {/* Bottom signature */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Nicolet · Québec · 12 500 pi² d'atelier
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 self-start px-5 py-2.5 border border-white/20 rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
          >
            Discuter d'un projet
            <span className="w-5 h-px bg-current" />
          </a>
        </div>
      </div>

      {/* === Fullscreen Modal === */}
      {openProject && (
        <div
          className="fixed inset-0 z-[70] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-12 animate-[fadeIn_0.3s_ease-out]"
          onClick={close}
        >
          {/* Close */}
          <button
            onClick={close}
            className="absolute top-6 right-6 z-30 w-11 h-11 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-teknic-red hover:border-teknic-red transition-all"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-teknic-red hover:border-teknic-red transition-all"
            aria-label="Précédent"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center rounded-full border border-white/20 text-white hover:bg-teknic-red hover:border-teknic-red transition-all"
            aria-label="Suivant"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div
            className="relative max-w-6xl w-full max-h-full flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative flex-1 flex items-center justify-center min-h-0">
              <img
                src={openProject.src}
                alt={openProject.title[lang]}
                className="max-w-full max-h-[75vh] object-contain rounded-md"
              />
              {/* Corner ticks on modal image */}
              <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-white/50" />
              <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-white/50" />
              <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-white/50" />
              <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-white/50" />
            </div>

            <div className="flex items-end justify-between gap-6 pt-2">
              <div>
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-teknic-red mb-2">
                  {openProject.category[lang]}
                </div>
                <h4 className="font-display text-2xl md:text-3xl uppercase leading-tight">
                  {openProject.title[lang]}
                </h4>
                {openProject.material && (
                  <div className="font-sans font-light text-sm text-white/60 mt-2">
                    Matériau : {openProject.material}
                  </div>
                )}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase whitespace-nowrap">
                {(openIdx! + 1).toString().padStart(2, '0')} / {PROJECTS.length.toString().padStart(2, '0')}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
