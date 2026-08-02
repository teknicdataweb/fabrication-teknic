import { Star, MapPin, ExternalLink } from 'lucide-react'

// Ajuste estos valores selon los datos reales de Google Business:
const REVIEWS = {
  rating: 5.0,
  count: 12,
  googleUrl:
    'https://www.google.com/search?q=Fabrication+TEK-NIC+Nicolet+reviews',
}

// Adresse : 50, Route Marie-Victorin, Nicolet, QC J3T 1A1
const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=50%20Route%20Marie-Victorin%2C%20Nicolet%2C%20QC%20J3T%201A1&t=&z=15&ie=UTF8&iwloc=&output=embed'

const MAP_LINK =
  'https://www.google.com/maps/place/50+Route+Marie-Victorin,+Nicolet,+QC+J3T+1A1'

export default function LocationReviews() {
  return (
    <section
      id="location"
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

      <div
        className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Sub-header — same pattern as Equipements sub-blocks */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
          <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
            Localisation · Avis
          </h3>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
            Nicolet · QC
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-4 md:gap-6">
          {/* === MAP CARD === */}
          <div className="group relative border border-white/10 rounded-lg overflow-hidden bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/40 transition-all duration-500">
            {/* Corner ticks */}
            <span className="absolute top-3 left-3 z-30 w-3 h-3 border-t border-l border-white/30 group-hover:border-teknic-red transition-colors duration-500 pointer-events-none" />
            <span className="absolute top-3 right-3 z-30 w-3 h-3 border-t border-r border-white/30 group-hover:border-teknic-red transition-colors duration-500 pointer-events-none" />
            <span className="absolute bottom-3 left-3 z-30 w-3 h-3 border-b border-l border-white/30 group-hover:border-teknic-red transition-colors duration-500 pointer-events-none" />
            <span className="absolute bottom-3 right-3 z-30 w-3 h-3 border-b border-r border-white/30 group-hover:border-teknic-red transition-colors duration-500 pointer-events-none" />

            {/* Map iframe with dark-mode CSS filter */}
            <div className="relative w-full h-[380px] md:h-[460px] overflow-hidden">
              <iframe
                src={MAP_EMBED_SRC}
                title="Fabrication TEK-NIC · Nicolet"
                className="absolute inset-0 w-full h-full border-0"
                style={{
                  filter:
                    'invert(0.92) hue-rotate(180deg) contrast(0.85) saturate(0.7) brightness(0.95)',
                }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              {/* Subtle red vignette overlay */}
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    'radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.35) 100%)',
                }}
              />
            </div>

            {/* Info bar */}
            <div className="relative z-20 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5 md:p-6 border-t border-white/10 bg-black/60 backdrop-blur-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded border border-white/10 group-hover:border-teknic-red/60 group-hover:bg-teknic-red/10 transition-all duration-500">
                  <MapPin
                    className="w-4 h-4 text-white/70 group-hover:text-teknic-red transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase mb-0.5">
                    Adresse de l'atelier
                  </div>
                  <div className="font-display text-base md:text-lg uppercase tracking-tight leading-tight">
                    50, Route <span className="text-teknic-red">Marie-Victorin</span> · Nicolet
                  </div>
                </div>
              </div>

              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start px-5 py-2.5 border border-white/20 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
              >
                Ouvrir dans Maps
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* === REVIEWS CARD === */}
          <a
            href={REVIEWS.googleUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden min-h-[380px] lg:min-h-[460px]"
          >
            {/* Corner ticks */}
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

            {/* Hover red glow */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 50% 0%, rgba(200,16,46,0.12) 0%, transparent 60%)',
              }}
            />

            {/* Top — label */}
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Google Reviews
                </span>
                <span className="h-px flex-1 bg-white/10" />
              </div>
            </div>

            {/* Middle — big rating */}
            <div className="relative z-10 py-4">
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-display text-6xl md:text-7xl leading-none tracking-tight">
                  {REVIEWS.rating.toFixed(1)}
                </span>
                <span className="font-mono text-white/40 text-sm">/ 5.0</span>
              </div>

              <div className="flex items-center gap-1 mb-3">
                {[0, 1, 2, 3, 4].map((i) => {
                  const filled = REVIEWS.rating >= i + 1
                  const half = !filled && REVIEWS.rating >= i + 0.5
                  return (
                    <div key={i} className="relative w-5 h-5">
                      <Star
                        className="absolute inset-0 w-5 h-5 text-white/15"
                        strokeWidth={1.5}
                      />
                      {(filled || half) && (
                        <div
                          className="absolute inset-0 overflow-hidden"
                          style={{ width: half ? '50%' : '100%' }}
                        >
                          <Star
                            className="w-5 h-5 text-teknic-red"
                            fill="#C8102E"
                            strokeWidth={1.5}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="font-sans font-light text-white/60 text-sm">
                Basé sur <span className="text-white">{REVIEWS.count} avis</span> clients
              </div>
            </div>

            {/* Bottom — CTA */}
            <div className="relative z-10 pt-6 border-t border-white/5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                  Réputation vérifiée
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] text-white group-hover:text-teknic-red uppercase transition-colors flex items-center gap-2">
                  Voir tous nos avis
                  <ExternalLink className="w-3 h-3" strokeWidth={2} />
                </span>
              </div>
              <div className="mt-3 font-display text-base md:text-lg uppercase tracking-tight leading-tight">
                Voir tous nos avis <br className="hidden sm:block" />
                <span className="text-teknic-red">sur Google</span>
              </div>
            </div>
          </a>
        </div>
      </div>
    </section>
  )
}
