import { Flame, Wrench, ConciergeBell, Scissors, SprayCan, Factory } from 'lucide-react'
import { HIGHLIGHTS, LATHES, CAPABILITIES } from '../data/equipements'

const ICONS = {
  flame: Flame,
  wrench: Wrench,
  crane: ConciergeBell,
  saw: Scissors,
  spray: SprayCan,
  factory: Factory,
}

const lang: 'fr' | 'en' = 'fr'

export default function Equipements() {
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
              04 · Équipements
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            Notre <span className="text-teknic-red">arsenal</span>
          </h2>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            Un parc machine complet pour couvrir chaque étape — de l'ébauche brute
            à la pièce finie à la tolérance micronique.
          </p>
        </div>

        {/* === BLOCK 1 — HIGHLIGHTED CNC & BORING === */}
        <div className="mb-24">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              Usinage CNC · Alésage
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              03 machines phares
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {HIGHLIGHTS.map((h) => (
              <article
                key={h.id}
                className="group relative border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                {/* Corner ticks */}
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

                {/* Hover red glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%)' }} />

                <div className="relative z-10">
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3">
                    {h.category[lang]}
                  </div>
                  <h4 className="font-display text-3xl md:text-4xl uppercase leading-none mb-1">
                    {h.name}
                  </h4>
                  <div className="font-serif italic text-white/50 text-sm mb-8">
                    {h.subtitle[lang]}
                  </div>

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
                        Capacité
                      </div>
                      <div className="font-display text-lg md:text-xl text-white">
                        {h.featured}
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* === BLOCK 2 — LATHES / DRILLS TABLE === */}
        <div className="mb-24">
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              Tours · Perçage · Rectification
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {LATHES.length.toString().padStart(2, '0')} équipements
            </span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block">
            <div className="grid grid-cols-[1.4fr_1fr_1.4fr_auto] gap-6 pb-3 mb-2 border-b border-white/10">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Type
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Marque / Modèle
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                Capacité
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase w-8 text-right">
                #
              </div>
            </div>
            <ul>
              {LATHES.map((row, i) => (
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
            {LATHES.map((row, i) => (
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
        </div>

        {/* === BLOCK 3 — CAPABILITIES === */}
        <div>
          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              Soudage · Capacités industrielles
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              {CAPABILITIES.length.toString().padStart(2, '0')} capacités
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {CAPABILITIES.map((c) => {
              const Icon = ICONS[c.icon]
              return (
                <div
                  key={c.id}
                  className="group relative flex items-start gap-4 p-5 md:p-6 border border-white/10 rounded-lg bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/50 hover:-translate-y-0.5 transition-all duration-400"
                >
                  <div className="flex-shrink-0 w-11 h-11 flex items-center justify-center rounded border border-white/10 group-hover:border-teknic-red/60 group-hover:bg-teknic-red/10 transition-all duration-400">
                    <Icon
                      className="w-5 h-5 text-white/70 group-hover:text-teknic-red transition-colors duration-400"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display text-base md:text-lg uppercase text-white leading-tight mb-1 tracking-tight">
                      {c.title[lang]}
                    </div>
                    <div className="font-sans font-light text-xs md:text-sm text-white/50 leading-relaxed">
                      {c.detail[lang]}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Bottom signature */}
        <div className="mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Nicolet, Québec · 50 Route Marie-Victorin
          </div>
          <a
            href="#contact"
            className="inline-flex items-center gap-3 self-start px-5 py-2.5 border border-white/20 rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
          >
            Demander une soumission
            <span className="w-5 h-px bg-current" />
          </a>
        </div>
      </div>
    </section>
  )
}
