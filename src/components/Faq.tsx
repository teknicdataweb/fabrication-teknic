import { Plus } from 'lucide-react'
import { FAQ } from '../data/faq'
import { useLang } from '../lib/i18n'

/** Preguntas frecuentes con acordeón (sin JavaScript extra: <details>) */
export default function Faq() {
  const { lang, t } = useLang()

  return (
    <section id="faq" className="relative w-full bg-[#050505] text-white border-t border-white/5">
      <div className="relative max-w-[1100px] mx-auto px-6 md:px-12 py-20 md:py-24">
        <div className="flex items-center gap-4 mb-6">
          <span className="h-px w-12 bg-teknic-red" />
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">FAQ</span>
        </div>
        <h2 className="font-display uppercase leading-[0.9] text-4xl md:text-6xl mb-10">
          {t('Questions ', 'Frequently asked ')}
          <span className="text-teknic-red">{t('fréquentes', 'questions')}</span>
        </h2>

        <div className="border-t border-white/10">
          {FAQ.map((item, i) => (
            <details key={i} className="group border-b border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="font-sans text-base md:text-lg text-white/90 group-open:text-white">{item.q[lang]}</h3>
                <Plus
                  className="w-5 h-5 shrink-0 text-teknic-red transition-transform duration-300 group-open:rotate-45"
                  strokeWidth={1.5}
                />
              </summary>
              <p className="pb-6 pr-10 font-sans font-light text-white/65 leading-relaxed">{item.a[lang]}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Datos estructurados FAQPage para buscadores */
export function faqLd(lang: 'fr' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ.map((item) => ({
      '@type': 'Question',
      name: item.q[lang],
      acceptedAnswer: { '@type': 'Answer', text: item.a[lang] },
    })),
  }
}
