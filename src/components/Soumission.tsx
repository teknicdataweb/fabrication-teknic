import { useState, FormEvent } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'

const SERVICE_OPTIONS = [
  { value: '', label: 'Sélectionner un service…' },
  { value: 'usinage-cnc', label: 'Usinage CNC' },
  { value: 'tournage', label: 'Tournage' },
  { value: 'soudage', label: 'Soudage' },
  { value: 'maintenance', label: 'Maintenance industrielle' },
  { value: 'autre', label: 'Autre' },
]

type Status = 'idle' | 'sending' | 'sent'

export default function Soumission() {
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    setTimeout(() => {
      setStatus('sent')
      setTimeout(() => {
        setStatus('idle')
        setForm({ name: '', email: '', phone: '', service: '', message: '' })
      }, 3000)
    }, 1200)
  }

  return (
    <section
      id="soumission"
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

      {/* Ambient red glow */}
      <div
        className="absolute top-1/2 right-0 w-[700px] h-[700px] rounded-full pointer-events-none opacity-[0.08] -translate-y-1/2"
        style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
      />

      <div className="relative max-w-[1600px] mx-auto px-6 md:px-12 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-16 lg:gap-24">
        {/* LEFT — pitch */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              06 · Soumission
            </span>
          </div>
          <h2 className="font-display uppercase leading-[0.85] text-5xl md:text-6xl lg:text-7xl mb-8">
            Un projet <br />
            <span className="text-teknic-red">en tête ?</span>
          </h2>
          <p className="font-sans font-light text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md">
            Décrivez-nous votre besoin — pièce unitaire, série ou projet complexe.
            Notre équipe vous répond avec une soumission détaillée.
          </p>
          <div className="space-y-3 text-sm text-white/50">
            <div className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teknic-red flex-shrink-0" />
              <span>Réponse sous 24 à 48 heures ouvrables</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teknic-red flex-shrink-0" />
              <span>Estimation gratuite et sans engagement</span>
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teknic-red flex-shrink-0" />
              <span>Confidentialité garantie sur vos plans</span>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <form
          onSubmit={onSubmit}
          className="relative border border-white/10 rounded-2xl p-6 md:p-10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm"
        >
          {/* Corner ticks */}
          <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30" />
          <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/30" />
          <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/30" />
          <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30" />

          <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
            <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
              Formulaire
            </h3>
            <span className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              5 champs
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <Field label="Nom / Entreprise" required>
              <input
                type="text"
                required
                value={form.name}
                onChange={onChange('name')}
                placeholder="Jean Tremblay · Acme inc."
                className="input"
              />
            </Field>

            <Field label="Courriel" required>
              <input
                type="email"
                required
                value={form.email}
                onChange={onChange('email')}
                placeholder="vous@exemple.com"
                className="input"
              />
            </Field>

            <Field label="Téléphone">
              <input
                type="tel"
                value={form.phone}
                onChange={onChange('phone')}
                placeholder="819 000-0000"
                className="input"
              />
            </Field>

            <Field label="Type de service" required>
              <select
                required
                value={form.service}
                onChange={onChange('service')}
                className="input appearance-none pr-10 bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 20 20%22 fill=%22%23888%22><path d=%22M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z%22/></svg>')] bg-no-repeat bg-[right_0.75rem_center]"
              >
                {SERVICE_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value} className="bg-[#0A0A0A] text-white">
                    {o.label}
                  </option>
                ))}
              </select>
            </Field>
          </div>

          <Field label="Description du projet" required>
            <textarea
              required
              rows={5}
              value={form.message}
              onChange={onChange('message')}
              placeholder="Matériau, tolérances, quantité, délai souhaité…"
              className="input resize-none"
            />
          </Field>

          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="font-sans font-light text-[11px] text-white/40 leading-relaxed max-w-xs">
              En envoyant, vous acceptez d'être contacté par notre équipe.
            </p>

            <button
              type="submit"
              disabled={status !== 'idle'}
              className="group relative inline-flex items-center gap-3 self-start px-7 py-3.5 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-xs tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 disabled:opacity-80 disabled:cursor-wait"
            >
              {/* Shine sweep */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              {status === 'idle' && (
                <>
                  <span className="relative z-10">Envoyer la demande</span>
                  <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                </>
              )}
              {status === 'sending' && (
                <>
                  <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
                  <span className="relative z-10">Envoi…</span>
                </>
              )}
              {status === 'sent' && (
                <>
                  <Check className="relative z-10 w-4 h-4" />
                  <span className="relative z-10">Envoyé · Merci</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 0.5rem;
          padding: 0.85rem 1rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          outline: none;
        }
        .input::placeholder { color: rgba(255,255,255,0.30); }
        .input:hover { border-color: rgba(255,255,255,0.20); }
        .input:focus {
          border-color: #C8102E;
          box-shadow:
            0 0 0 3px rgba(200,16,46,0.12),
            0 0 30px rgba(200,16,46,0.15);
          background: rgba(200,16,46,0.03);
        }
        .input:focus::placeholder { color: rgba(255,255,255,0.15); }
        select.input option { padding: 0.5rem; }
      `}</style>
    </section>
  )
}

function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: React.ReactNode
}) {
  return (
    <label className="block group">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-teknic-red">*</span>}
      </span>
      {children}
    </label>
  )
}
