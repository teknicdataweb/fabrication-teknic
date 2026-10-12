import { useCallback, useState } from 'react'
import CertModal, { type CertImage } from './CertModal'

const CERTS: CertImage[] = [
  {
    src: '/certificados/certificado-cwb.jpg',
    alt: 'Certificat CWB — Fabrication Tek-Nic, norme CSA W47.1',
    caption: 'Certificat · CWB',
  },
  {
    src: '/certificados/lettre-validation.jpg',
    alt: 'Lettre de validation CWB — Fabrication Tek-Nic, 2026-2027',
    caption: 'Lettre de validation · 2026-2027',
  },
]

const FACTS = [
  { label: 'Norme', value: 'CSA W47.1' },
  { label: 'Division', value: '3' },
  { label: 'Période', value: '21 fév 2026 — 20 mars 2027' },
]

export default function Certifications() {
  const [active, setActive] = useState<CertImage | null>(null)
  const close = useCallback(() => setActive(null), [])

  return (
    <section
      id="certifications"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5"
    >
      <div className="relative max-w-[1200px] mx-auto px-6 md:px-12 py-20 md:py-28">
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              Certifications · CWB
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl mb-6">
            Soudure <span className="text-teknic-red">certifiée</span>
          </h2>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base leading-relaxed">
            Fabrication Tek-Nic est certifiée par le Bureau canadien de soudage selon la norme CSA W47.1,
            validée chaque année.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTS.map((c) => (
            <button
              key={c.src}
              type="button"
              onClick={() => setActive(c)}
              className="group text-left border border-white/10 hover:border-white/30 rounded-lg p-3 bg-white/[0.02] transition-colors"
            >
              <img
                src={c.src}
                alt={c.alt}
                loading="lazy"
                className="block w-full h-auto rounded-sm shadow-lg shadow-black/50"
              />
              <div className="mt-4 px-1 flex items-center justify-between gap-4">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">{c.caption}</span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-teknic-red transition-transform group-hover:translate-x-1">
                  Agrandir →
                </span>
              </div>
            </button>
          ))}
        </div>

        <dl className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
          {FACTS.map((f) => (
            <div key={f.label} className="border-l pl-4" style={{ borderColor: 'rgba(200,16,46,0.4)' }}>
              <dt className="font-mono text-[10px] tracking-widest uppercase text-white/40 mb-1">{f.label}</dt>
              <dd className="font-display text-xl text-white">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {active && <CertModal image={active} onClose={close} />}
    </section>
  )
}
