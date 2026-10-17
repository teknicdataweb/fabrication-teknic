import { Link } from 'react-router-dom'
import { Briefcase } from 'lucide-react'
import { useLang } from '../lib/i18n'

/** Invitación a trabajar con la empresa: abre el correo con un mensaje prearmado */
export default function JoinUs() {
  const { t } = useLang()

  return (
    <section
      id="recrutement"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5"
    >
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.1]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />
      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-20 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-5">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              {t('Recrutement', 'Careers')}
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.9] text-4xl md:text-6xl mb-4">
            {t('Envie de travailler ', 'Want to work ')}
            <span className="text-teknic-red">{t('avec nous ?', 'with us?')}</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              'Consultez nos postes ouverts ou envoyez-nous votre candidature spontanée. Nous aimons rencontrer des gens passionnés par le métal.',
              'Browse our open positions or send us a spontaneous application. We love meeting people who are passionate about metal.'
            )}
          </p>
        </div>

        <Link
          to="/carrieres"
          className="group relative inline-flex items-center gap-3 self-start md:self-center shrink-0 px-8 py-4 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-xs tracking-[0.3em] uppercase overflow-hidden transition-transform duration-500 hover:scale-105"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <Briefcase className="relative z-10 w-4 h-4" strokeWidth={2} />
          <span className="relative z-10">{t('Voir les emplois', 'See job openings')}</span>
        </Link>
      </div>
    </section>
  )
}
