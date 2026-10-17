import { Link } from 'react-router-dom'
import { useLang } from '../lib/i18n'

/** Invitación breve en la portada: lleva a la página Contact (datos + formulario) */
export default function ContactCta() {
  const { t, lp } = useLang()
  return (
    <section className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5">
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-20 md:py-28 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">Contact</span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            {t('Parlons ', "Let's talk ")}
            <span className="text-teknic-red">{t('métal', 'metal')}</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              "Passez à l'atelier, appelez-nous ou demandez une soumission. Notre équipe est prête à répondre à vos questions techniques.",
              'Drop by the shop, call us or request a quote. Our team is ready to answer your technical questions.'
            )}
          </p>
        </div>
        <Link
          to={lp('/contact')}
          className="group inline-flex items-center gap-3 self-start md:self-auto shrink-0 px-8 py-4 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-xs tracking-[0.3em] uppercase hover:scale-105 transition-transform duration-500"
        >
          {t('Nous contacter', 'Contact us')}
          <span className="w-6 h-px bg-white group-hover:w-10 transition-all duration-300" />
        </Link>
      </div>
    </section>
  )
}
