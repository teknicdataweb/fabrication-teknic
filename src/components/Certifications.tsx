const COMPANY = {
  name: 'Fabrication Tek‑Nic',
  street: '50 Route Marie-Victorin',
  city: 'Nicolet QC J3T 1A1 Canada',
}

const SCOPE = 'Soudure sur acier diver et framar de roulotte de chantier.'

const BLUE = '#1F66B0'
const BLUE_DARK = '#154A85'

/** Emblème losange « CWB » redessiné en SVG */
function CwbBadge({ size = 56, onDark = false }: { size?: number; onDark?: boolean }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden="true">
      <defs>
        <radialGradient id="cwb-orb" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#4C9BE8" />
          <stop offset="100%" stopColor="#154A85" />
        </radialGradient>
      </defs>
      {onDark && <rect x="9" y="9" width="46" height="46" rx="8" transform="rotate(45 32 32)" fill="#fff" />}
      <rect x="9" y="9" width="46" height="46" rx="8" transform="rotate(45 32 32)" fill="none" stroke={onDark ? '#fff' : BLUE} strokeWidth="3" />
      <circle cx="32" cy="32" r="17" fill="url(#cwb-orb)" />
      <text x="32" y="36.5" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="12" fill="#fff" fontStyle="italic">
        CWB
      </text>
    </svg>
  )
}

/** Sceau doré */
function GoldSeal({ size = 110 }: { size?: number }) {
  const teeth = Array.from({ length: 36 })
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true">
      <defs>
        <radialGradient id="seal-gold" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#F5D27A" />
          <stop offset="60%" stopColor="#C9902F" />
          <stop offset="100%" stopColor="#8A5A12" />
        </radialGradient>
      </defs>
      <g transform="translate(60 60)">
        {teeth.map((_, i) => (
          <polygon key={i} points="-4,-58 0,-47 4,-58" fill="url(#seal-gold)" transform={`rotate(${i * 10})`} />
        ))}
        <circle r="50" fill="url(#seal-gold)" />
        <circle r="44" fill="none" stroke="#8A5A12" strokeOpacity="0.5" strokeWidth="1" />
        <rect x="-24" y="-24" width="48" height="48" rx="5" transform="rotate(45)" fill="none" stroke="#8A5A12" strokeOpacity="0.7" strokeWidth="2" />
        <text y="5" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="800" fontSize="15" fill="#8A5A12" fillOpacity="0.85" fontStyle="italic">
          CWB
        </text>
      </g>
    </svg>
  )
}

/** Marque d'accréditation OCPS (stylisée) */
function Ocps() {
  return (
    <div className="flex flex-col items-center gap-1 border border-neutral-300 rounded-sm px-3 py-2 bg-white">
      <svg width="34" height="34" viewBox="0 0 40 40" fill="none" stroke="#111" strokeWidth="4.5" strokeLinecap="round" aria-hidden="true">
        <path d="M27 9c-3-3-12-3-14 3s3 8 8 9 9 3 7 9-11 6-15 2" />
        <path d="M13 31c3 3 12 3 14-3" opacity="0" />
      </svg>
      <div className="font-sans font-bold text-[10px] leading-none text-neutral-900">OCPS</div>
      <div className="font-sans text-[9px] leading-none text-neutral-600">Accrédité CCN</div>
    </div>
  )
}

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5"
    >
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              Certifications · CWB
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            Soudure <span className="text-teknic-red">certifiée</span>
          </h2>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            Fabrication Tek-Nic est certifiée par le Bureau canadien de soudage
            selon la norme CSA W47.1, validée chaque année.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* === CERTIFICAT === */}
          <article
            className="relative rounded-sm p-3 md:p-4 shadow-2xl shadow-black/60 flex"
            style={{ background: `linear-gradient(135deg, ${BLUE_DARK}, ${BLUE})` }}
          >
            <div className="relative bg-white rounded-sm overflow-hidden flex flex-col flex-1 text-neutral-900 px-6 md:px-12 py-10 md:py-12">
              {/* arcs bleus décoratifs */}
              <div
                className="absolute -left-40 -bottom-40 w-[420px] h-[420px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at 70% 30%, rgba(31,102,176,0.0) 40%, rgba(31,102,176,0.18) 100%)' }}
              />
              <div
                className="absolute -right-32 -top-32 w-[320px] h-[320px] rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle at 30% 70%, rgba(31,102,176,0) 45%, rgba(31,102,176,0.16) 100%)' }}
              />

              <div className="relative flex flex-col flex-1 items-center text-center">
                <div className="flex items-center gap-4">
                  <CwbBadge />
                  <div className="h-10 w-px bg-neutral-300" />
                  <div className="font-sans text-xl md:text-2xl tracking-tight text-neutral-600">
                    certification<span className="font-bold" style={{ color: BLUE }}>cwb</span>
                  </div>
                </div>

                <div className="mt-10 font-sans font-bold uppercase text-xl md:text-2xl tracking-wide" style={{ color: BLUE }}>
                  CWB reconnaît que
                </div>
                <h3 className="mt-1 font-sans font-extrabold text-3xl md:text-4xl text-neutral-900 leading-tight">
                  {COMPANY.name}
                </h3>
                <p className="mt-2 font-sans text-xs md:text-sm text-neutral-700">
                  {COMPANY.street} {COMPANY.city}
                </p>

                <p className="mt-6 font-sans font-semibold text-lg md:text-xl text-neutral-900">
                  est certifié conforme à la norme W47.1
                </p>
                <p className="mt-1 font-sans font-semibold text-base md:text-lg text-neutral-900">
                  Division: 3 &nbsp;&nbsp; Date de certification: 09 juillet 2025
                </p>

                <p className="mt-4 font-sans font-semibold text-lg text-neutral-900">Portée:</p>
                <p className="font-sans text-sm text-neutral-800 max-w-md">{SCOPE}</p>

                <div className="mt-auto pt-14 w-full flex flex-wrap items-end justify-between gap-6 text-left">
                  <div className="font-sans text-xs text-neutral-700 leading-snug">
                    Registraire et directeur,
                    <br />
                    assurance de la qualité
                  </div>
                  <div className="font-sans text-xs text-neutral-700">Signataire autorisé</div>
                  <div className="flex flex-col items-center gap-1 text-center">
                    <Ocps />
                    <span className="font-sans text-[9px] font-bold text-neutral-600 leading-tight">
                      Accrédité CB-PS
                      <br />
                      <span className="font-normal">(Organisme de certification-Produit / Services)</span>
                    </span>
                  </div>
                </div>
                <p className="mt-6 font-sans text-[11px] text-neutral-600 max-w-md">
                  La certification est validée chaque année via une «lettre de validation», dont une copie est
                  disponible auprès de l'entreprise.
                </p>
              </div>
            </div>
          </article>

          {/* === LETTRE DE VALIDATION === */}
          <article className="relative bg-white text-neutral-900 rounded-sm shadow-2xl shadow-black/60 overflow-hidden flex flex-col">
            <div className="px-5 md:px-8 pt-8 md:pt-10">
              <div className="flex items-center gap-4 px-4 py-3 md:py-4 relative" style={{ background: BLUE }}>
                <div className="-ml-8 md:-ml-10 shrink-0">
                  <CwbBadge size={52} onDark />
                </div>
                <h3 className="font-sans font-extrabold uppercase text-white text-2xl md:text-4xl tracking-tight leading-none">
                  Lettre de validation
                </h3>
              </div>
            </div>

            <div className="flex flex-col flex-1 px-6 md:px-12 py-10 text-center">
              <p className="font-sans text-sm md:text-base text-neutral-700">Le Bureau canadien de soudage reconnaît que</p>
              <h4 className="mt-6 font-sans font-bold text-2xl md:text-3xl text-neutral-900">{COMPANY.name}</h4>
              <p className="mt-3 font-sans text-neutral-800 leading-relaxed">
                {COMPANY.street}
                <br />
                {COMPANY.city}
              </p>

              <p className="mt-8 font-sans text-neutral-800">
                est certifiée en vertu de la norme <strong>CSA W47.1</strong>
              </p>
              <p className="font-sans font-semibold text-neutral-900">
                “Certification des compagnies de soudage par fusion de l'acier”
              </p>
              <p className="mt-5 font-sans font-bold text-neutral-900">Dans la DIVISION 3</p>
              <p className="mt-5 font-sans text-neutral-800">
                pour la période du <strong>21 février 2026</strong> au <strong>20 mars 2027</strong>
              </p>
              <p className="mt-4 font-sans text-neutral-900">
                <strong>Code de compagnie:</strong> FATEK1
              </p>
              <p className="mt-4 font-sans font-bold text-neutral-900">Portée:</p>
              <p className="font-sans text-sm text-neutral-800">{SCOPE}</p>

              <div className="mt-auto pt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 text-left items-end">
                <div className="font-sans text-xs md:text-sm text-neutral-800 leading-relaxed">
                  Raison de la publication : Renouvellement
                  <br />
                  Date de Publication: 29 janvier 2026
                  <p className="mt-4 italic text-[11px] text-neutral-600">
                    Pour consulter les plus récentes versions des documents et formulaires de certification ainsi que
                    des conditions générales de certification, veuillez vous rendre à :{' '}
                    <a href="https://www.cwbgroup.org" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: BLUE }}>
                      www.cwbgroup.org
                    </a>
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <GoldSeal size={104} />
                  <div className="w-full border-t border-neutral-400 pt-1 text-center font-sans text-xs text-neutral-700">
                    Registrar
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-4 text-left">
                <Ocps />
                <div className="font-sans text-[10px] text-neutral-600 leading-relaxed text-right">
                  8260 Parkhill Drive, Milton, Ontario L9T 5V7
                  <br />
                  1-800-844-6790 | Int: 905-542-1312 | Fax: 905-542-1318
                  <br />
                  Email: info@cwbgroup.org | Web: www.cwbgroup.org
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
