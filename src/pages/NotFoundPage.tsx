import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { usePageMeta } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

/** Página 404: las direcciones que no existen muestran esto y no se indexan */
export default function NotFoundPage() {
  const { t, lp } = useLang()

  usePageMeta(
    t('Page introuvable | Fabrication TEK-NIC', 'Page not found | Fabrication TEK-NIC'),
    t("Cette page n'existe pas ou a été déplacée.", 'This page does not exist or has been moved.'),
    '/404'
  )

  // Los buscadores no deben indexar la página de error
  useEffect(() => {
    const meta = document.querySelector('meta[name="robots"]')
    const previous = meta?.getAttribute('content') ?? 'index, follow'
    meta?.setAttribute('content', 'noindex, follow')
    return () => meta?.setAttribute('content', previous)
  }, [])

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden px-6 md:px-12 pt-40 pb-24 flex items-center">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />
      <div className="relative max-w-3xl mx-auto md:mx-0 md:ml-[8vw]">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-teknic-red" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">Erreur 404</span>
        </div>
        <h1 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl mb-6">
          {t('Page ', 'Page ')}
          <span className="text-teknic-red">{t('introuvable', 'not found')}</span>
        </h1>
        <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed mb-10 max-w-xl">
          {t(
            "La page que vous cherchez n'existe pas ou a été déplacée. Retournez à l'accueil ou consultez nos services.",
            'The page you are looking for does not exist or has been moved. Go back home or browse our services.'
          )}
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            to={lp('/')}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-[11px] tracking-[0.3em] uppercase hover:scale-105 transition-transform duration-300"
          >
            {t("Retour à l'accueil", 'Back to home')}
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to={lp('/services')}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/30 text-white font-sans text-[11px] tracking-[0.3em] uppercase hover:bg-white/10 transition-colors duration-300"
          >
            {t('Nos services', 'Our services')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
