import { useState } from 'react'
import { ArrowRight, MapPin, Clock } from 'lucide-react'
import { JOBS } from '../data/jobs'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'
import ApplicationForm from '../components/ApplicationForm'

/** Página de carreras: lista de ofertas; cada botón lleva al formulario de contacto con "Emplois" preseleccionado */
export default function CareersPage() {
  const { lang, t } = useLang()

  usePageMeta(
    t('Carrières et emplois à Nicolet | Fabrication TEK-NIC', 'Careers & Jobs in Nicolet | Fabrication TEK-NIC'),
    t(
      "Joignez-vous à Fabrication TEK-NIC : emplois en usinage CNC, fabrication et conception à Nicolet, Québec. Postulez dès aujourd'hui.",
      'Join Fabrication TEK-NIC: jobs in CNC machining, fabrication and design in Nicolet, Quebec. Apply today.'
    ),
    '/carrieres',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: t('Carrières', 'Careers'), path: '/carrieres' },
    ], lang)
  )

  const [poste, setPoste] = useState('')
  const apply = (title: string) => {
    setPoste(title)
    document.getElementById('postuler')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden px-6 md:px-12 pt-32 pb-24">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        <div className="mb-14 max-w-3xl">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              {t('Carrières', 'Careers')}
            </span>
          </div>
          <h1 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl mb-6">
            {t('Bâtissez votre carrière ', 'Build your career ')}
            <span className="text-teknic-red">{t('avec nous', 'with us')}</span>
          </h1>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              JOBS.length > 0
                ? 'Chez Fabrication TEK-NIC, nous travaillons le métal avec rigueur et passion. Découvrez nos postes ouverts et joignez une équipe qui vous donne les outils pour exceller.'
                : "Chez Fabrication TEK-NIC, nous travaillons le métal avec rigueur et passion. Aucun poste n'est ouvert pour le moment, mais nous aimons rencontrer des gens de métier : envoyez-nous votre candidature.",
              JOBS.length > 0
                ? 'At Fabrication TEK-NIC, we work metal with rigor and passion. Discover our open positions and join a team that gives you the tools to excel.'
                : 'At Fabrication TEK-NIC, we work metal with rigor and passion. There are no open positions right now, but we love meeting skilled people: send us your application.'
            )}
          </p>
        </div>

        {JOBS.length > 0 && (
          <div className="flex items-baseline justify-between mb-6 pb-4 border-b border-white/10">
            <h2 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              {t('Postes ouverts', 'Open positions')}
            </h2>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
              {JOBS.length.toString().padStart(2, '0')} {t('offres', 'openings')}
            </span>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {JOBS.map((job) => (
            <article
              key={job.id}
              className="group relative border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-teknic-red/60 transition-colors duration-500"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="max-w-2xl">
                  <h3 className="font-display uppercase text-2xl md:text-3xl leading-tight mb-3">{job.title[lang]}</h3>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 font-mono text-[10px] tracking-[0.25em] uppercase text-white/50">
                    <span className="inline-flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-teknic-red" strokeWidth={1.5} />
                      {job.type[lang]}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-teknic-red" strokeWidth={1.5} />
                      {job.location}
                    </span>
                  </div>
                  <p className="font-sans font-light text-white/60 text-sm md:text-base leading-relaxed mb-4">
                    {job.description[lang]}
                  </p>
                  {job.requirements.length > 0 && (
                    <ul className="space-y-2 text-sm text-white/50">
                      {job.requirements.map((r, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teknic-red flex-shrink-0" />
                          <span>{r[lang]}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => apply(job.title[lang])}
                  className="inline-flex items-center gap-3 self-start shrink-0 px-6 py-3 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-[11px] tracking-[0.3em] uppercase hover:scale-105 transition-transform duration-300"
                >
                  {t('Postuler', 'Apply')}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </article>
          ))}

          {/* Candidature spontanée: solo tiene sentido junto a ofertas reales; sin ofertas, el formulario va directo */}
          {JOBS.length > 0 && (
          <article className="relative border border-dashed border-white/20 rounded-lg p-6 md:p-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-display uppercase text-2xl md:text-3xl leading-tight mb-2">
                {t('Candidature spontanée', 'Spontaneous application')}
              </h3>
              <p className="font-sans font-light text-white/60 text-sm md:text-base leading-relaxed">
                {t(
                  'Vous ne voyez pas le poste qui vous convient ? Dites-nous ce que vous proposez, nous gardons votre candidature.',
                  "Don't see the right position? Tell us what you can offer — we'll keep your application on file."
                )}
              </p>
            </div>
            <button
              type="button"
              onClick={() => apply('')}
              className="inline-flex items-center gap-3 self-start shrink-0 px-6 py-3 rounded-full border border-white/30 text-white font-sans text-[11px] tracking-[0.3em] uppercase hover:bg-white/10 transition-colors duration-300"
            >
              {t('Nous écrire', 'Write to us')}
              <ArrowRight className="w-4 h-4" />
            </button>
          </article>
          )}
        </div>

        <div className={JOBS.length > 0 ? 'mt-16' : 'mt-2'}>
          <ApplicationForm poste={poste} />
        </div>
      </div>
    </section>
  )
}
