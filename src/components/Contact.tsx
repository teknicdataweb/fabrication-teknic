import { MapPin, Mail, Phone, User } from 'lucide-react'

const CONTACTS = [
  {
    icon: Phone,
    label: 'Bureau · Office',
    value: '819-870-3271',
    href: 'tel:8198703271',
    role: null as string | null,
  },
  {
    icon: User,
    label: 'François Champagne',
    value: '819-383-0679',
    href: 'tel:8193830679',
    role: 'Direction',
  },
  {
    icon: User,
    label: 'Stéphane Philibert',
    value: '819-269-3189',
    href: 'tel:8192693189',
    role: 'Direction',
  },
]

export default function Contact() {
  return (
    <section
      id="contact"
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

      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full pointer-events-none opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32">
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              07 · Contact
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            Parlons <span className="text-teknic-red">métal</span>
          </h2>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            Passez à l'atelier, appelez-nous ou écrivez-nous. Notre équipe est prête
            à répondre à vos questions techniques.
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 md:gap-6 mb-6">
          {/* Address — wide card */}
          <a
            href="https://maps.google.com/?q=50+Route+Marie-Victorin+Nicolet+QC+J3T+1A1"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden min-h-[280px]"
          >
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(circle at 30% 50%, rgba(200,16,46,0.12) 0%, transparent 60%)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center rounded border border-white/10 group-hover:border-teknic-red/60 group-hover:bg-teknic-red/10 transition-all duration-500">
                  <MapPin
                    className="w-5 h-5 text-white/70 group-hover:text-teknic-red transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Adresse de l'atelier
                </span>
              </div>

              <div className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-[0.95] mb-4 tracking-tight">
                50, <span className="text-teknic-red">Marie-Victorin</span>
              </div>
              <div className="font-sans font-light text-white/70 text-base md:text-lg">
                Nicolet, Québec · J3T 1A1
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-8 mt-8 border-t border-white/5">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
                12 500 pi² d'atelier
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 group-hover:text-teknic-red uppercase transition-colors">
                Voir sur la carte →
              </div>
            </div>
          </a>

          {/* Email — tall card */}
          <a
            href="mailto:info@fabricationteknic.com"
            className="group relative flex flex-col justify-between border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
            <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-11 h-11 flex items-center justify-center rounded border border-white/10 group-hover:border-teknic-red/60 group-hover:bg-teknic-red/10 transition-all duration-500">
                  <Mail
                    className="w-5 h-5 text-white/70 group-hover:text-teknic-red transition-colors duration-500"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                  Courriel
                </span>
              </div>

              <div className="font-display text-xl md:text-2xl uppercase leading-tight tracking-tight break-all">
                info@
                <span className="text-teknic-red">fabricationteknic</span>
                .com
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/5">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 group-hover:text-teknic-red uppercase transition-colors">
                Nous écrire →
              </div>
            </div>
          </a>
        </div>

        {/* Phones — 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {CONTACTS.map((c) => {
            const Icon = c.icon
            return (
              <a
                key={c.value}
                href={c.href}
                className="group relative flex flex-col border border-white/10 rounded-lg p-6 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
              >
                <span className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/20 group-hover:border-teknic-red transition-colors duration-500" />
                <span className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/20 group-hover:border-teknic-red transition-colors duration-500" />

                <div className="relative z-10 flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 flex items-center justify-center rounded border border-white/10 group-hover:border-teknic-red/60 group-hover:bg-teknic-red/10 transition-all duration-500">
                    <Icon
                      className="w-4 h-4 text-white/70 group-hover:text-teknic-red transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40">
                      {c.role || 'Ligne directe'}
                    </div>
                    <div className="font-sans text-sm text-white/80 mt-0.5">
                      {c.label}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 font-display text-2xl md:text-3xl uppercase text-white tracking-tight mt-auto">
                  {c.value}
                </div>
              </a>
            )
          })}
        </div>

        {/* Hours banner */}
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 md:p-6 border border-white/10 rounded-lg bg-gradient-to-r from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)] animate-pulse" />
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/40 mb-1">
                Heures d'ouverture
              </div>
              <div className="font-display text-lg md:text-xl uppercase tracking-tight">
                Lundi – Vendredi · <span className="text-teknic-red">7h à 17h</span>
              </div>
            </div>
          </div>
          <a
            href="#soumission"
            className="inline-flex items-center gap-3 self-start px-6 py-3 rounded-full border border-white/20 font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
          >
            Demander une soumission
            <span className="w-5 h-px bg-current" />
          </a>
        </div>

      </div>
    </section>
  )
}
