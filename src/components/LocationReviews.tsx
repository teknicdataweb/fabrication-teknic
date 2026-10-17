import { Star, ExternalLink } from 'lucide-react'
import { MAP_LINK } from '../lib/map'
import { useLang } from '../lib/i18n'

// Ajuste estos valores selon los datos reales de Google Business:
const REVIEWS = {
  rating: 5.0,
  count: 1,
  googleUrl: 'https://www.google.com/search?q=Fabrication+TEK-NIC+Nicolet+reviews',
}

export default function LocationReviews() {
  const { t } = useLang()
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
        {/* Sub-header */}
        <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
          <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">{t('Avis · Google', 'Reviews · Google')}</h3>
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">Nicolet · QC</span>
        </div>

        <div className="group relative border border-white/10 rounded-lg p-6 md:p-10 bg-gradient-to-br from-white/[0.02] to-transparent">
          {/* Corner ticks */}
          <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20" />
          <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20" />
          <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20" />
          <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20" />

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
            {/* Note */}
            <div>
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">Google Reviews</span>
              <div className="flex items-baseline gap-3 mt-4 mb-4">
                <span className="font-display text-6xl md:text-7xl leading-none tracking-tight">
                  {REVIEWS.rating.toFixed(1)}
                </span>
                <span className="font-mono text-white/40 text-sm">/ 5.0</span>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 text-teknic-red" fill="#C8102E" strokeWidth={1.5} />
                ))}
              </div>
              <p className="font-sans font-light text-white/60 text-sm">
                {t('Basé sur ', 'Based on ')}
                <span className="text-white">{REVIEWS.count} {t('avis', REVIEWS.count > 1 ? 'reviews' : 'review')}</span>
                {t(' clients', ' from customers')}
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={REVIEWS.googleUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-white/20 rounded-full font-mono text-[11px] tracking-[0.3em] uppercase text-white hover:bg-white/10 transition-colors duration-300"
              >
                {t('Voir les avis', 'See reviews')}
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-teknic-red bg-teknic-red rounded-full font-mono text-[11px] tracking-[0.3em] uppercase text-white hover:opacity-90 transition-opacity duration-300"
              >
                {t('Laisser un avis', 'Leave a review')}
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
