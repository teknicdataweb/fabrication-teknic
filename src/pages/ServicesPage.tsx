import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '../data/services'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

/** Resumen de servicios: una tarjeta por servicio, cada una lleva a su página */
export default function ServicesPage() {
  const { lang, t, lp } = useLang()
  usePageMeta(
    t("Services d'usinage, fabrication et conception | TEK-NIC", 'Machining, Fabrication & Design Services | TEK-NIC'),
    t(
      'Usinage CNC, fabrication métallique, conception (CAO) et impression 3D à Nicolet, Québec. Un seul atelier pour tout votre projet.',
      'CNC machining, metal fabrication, design (CAD) and 3D printing in Nicolet, Quebec. One shop for your whole project.'
    ),
    '/services',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: 'Services', path: '/services' },
    ], lang)
  )

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white px-6 md:px-12 pt-32 pb-24">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-16 md:mb-20 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              Services · {SERVICES.length} disciplines
            </span>
          </div>
          <h1 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl mb-6">
            {t('Nos ', 'Our ')}<span className="text-teknic-red">{t('disciplines', 'disciplines')}</span>
          </h1>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              'Quatre expertises sous un même toit. Chaque projet est pris en charge de bout en bout par nos équipes.',
              'Four areas of expertise under one roof. Every project is handled end to end by our teams.'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {SERVICES.map((s) => {
            const cover = s.image || s.video?.replace(/\.mp4$/, '-poster.jpg')
            return (
              <Link
                key={s.id}
                to={lp(`/services/${s.id}`)}
                className="group relative block rounded-lg overflow-hidden border border-white/10 hover:border-white/30 transition-colors duration-500"
                style={{ background: `linear-gradient(160deg, ${s.bg.from} 0%, ${s.bg.to} 100%)` }}
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {s.cover ? (
                    <img
                      src={s.cover}
                      alt={s.imageAlt?.[lang] ?? s.name[lang]}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover object-[50%_40%] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : s.cardVideo && s.cardFit === 'contain' ? (
                    // Video vertical: se ve completo, sobre una copia desenfocada de sí mismo que rellena los lados
                    <>
                      <video
                        src={s.cardVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-hidden="true"
                        className="absolute inset-0 w-full h-full object-cover scale-125 blur-2xl opacity-60"
                      />
                      <video
                        src={s.cardVideo}
                        poster={s.video ? s.video.replace(/\.mp4$/, '-poster.jpg') : cover}
                        autoPlay
                        muted
                        loop
                        playsInline
                        aria-label={s.name[lang]}
                        className="absolute inset-0 w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                      />
                    </>
                  ) : s.cardVideo ? (
                    <video
                      src={s.cardVideo}
                      poster={s.video ? s.video.replace(/\.mp4$/, '-poster.jpg') : cover}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover object-[50%_40%] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : cover && (
                    <img
                      src={cover}
                      alt={s.imageAlt?.[lang] ?? s.name[lang]}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, ${s.bg.to} 0%, transparent 60%)` }}
                  />
                  {s.coverLogo && (
                    <img
                      src={s.coverLogo.src}
                      alt={s.coverLogo.alt}
                      loading="lazy"
                      className="absolute top-4 right-4 w-20 md:w-24 h-auto pointer-events-none"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.7))' }}
                    />
                  )}
                  <span
                    className="absolute top-4 left-5 font-mono text-[11px] tracking-[0.3em]"
                    style={{ color: s.accent, textShadow: s.cover ? '0 1px 6px rgba(0,0,0,0.85), 0 0 2px rgba(0,0,0,0.6)' : undefined }}
                  >
                    {s.number}
                  </span>
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="font-display uppercase text-3xl md:text-4xl leading-none mb-3">{s.name[lang]}</h2>
                  {(s.headline[lang] || s.cardText?.[lang]) && (
                    <p className="font-serif italic text-white/80 text-base mb-6">
                      {s.headline[lang] || s.cardText?.[lang]}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.3em] uppercase text-white group-hover:text-teknic-red transition-colors duration-300">
                    {t('Voir ce service', 'View this service')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
