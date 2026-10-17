import { useEffect, useRef, useState, FormEvent } from 'react'
import { Send, Check, Loader2 } from 'lucide-react'
import { useLang } from '../lib/i18n'
import { Field, FormStyles } from './formParts'

// Netlify limita el envío total a ~8 Mo; 5 Mo por CV deja margen
const MAX_CV_BYTES = 5 * 1024 * 1024

type Status = 'idle' | 'sending' | 'sent' | 'error'

/** Formulario de candidatura (con CV opcional). `poste` viene del botón "Postuler" de cada oferta. */
export default function ApplicationForm({ poste }: { poste: string }) {
  const { t } = useLang()
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', phone: '', poste, message: '' })
  const [cv, setCv] = useState<File | null>(null)
  const [cvError, setCvError] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  // Al elegir otra oferta se actualiza el puesto
  useEffect(() => {
    setForm((f) => ({ ...f, poste }))
  }, [poste])

  const onChange =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }))

  const onCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    if (file && file.size > MAX_CV_BYTES) {
      setCv(null)
      setCvError(true)
      e.target.value = ''
      return
    }
    setCvError(false)
    setCv(file)
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      // Netlify recibe el envío en "/" (multipart para poder adjuntar el CV) y avisa por correo al equipo
      const body = new FormData()
      body.append('form-name', 'candidature')
      Object.entries(form).forEach(([k, v]) => body.append(k, v))
      if (cv) body.append('cv', cv)
      const res = await fetch('/', { method: 'POST', body })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', poste: '', message: '' })
      setCv(null)
      if (fileRef.current) fileRef.current.value = ''
      setTimeout(() => setStatus('idle'), 3000)
    } catch {
      setStatus('error')
    }
  }

  return (
    <form
      id="postuler"
      onSubmit={onSubmit}
      className="relative border border-white/10 rounded-2xl p-6 md:p-10 bg-gradient-to-br from-white/[0.03] to-transparent backdrop-blur-sm scroll-mt-28"
    >
      <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30" />
      <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/30" />
      <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/30" />
      <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30" />

      <div className="flex items-baseline justify-between mb-8 pb-4 border-b border-white/10">
        <h3 className="font-display text-xl md:text-2xl uppercase tracking-tight">
          {t('Envoyer ma candidature', 'Send my application')}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Field label={t('Nom complet', 'Full name')} required>
          <input
            type="text"
            required
            value={form.name}
            onChange={onChange('name')}
            placeholder={t('Jean Tremblay', 'John Smith')}
            className="input"
          />
        </Field>
        <Field label={t('Courriel', 'Email')} required>
          <input
            type="email"
            required
            value={form.email}
            onChange={onChange('email')}
            placeholder={t('vous@exemple.com', 'you@example.com')}
            className="input"
          />
        </Field>
        <Field label={t('Téléphone', 'Phone')}>
          <input
            type="tel"
            value={form.phone}
            onChange={onChange('phone')}
            placeholder="819 000-0000"
            className="input"
          />
        </Field>
        <Field label={t('Poste visé', 'Position')}>
          <input
            type="text"
            value={form.poste}
            onChange={onChange('poste')}
            placeholder={t('Candidature spontanée', 'Spontaneous application')}
            className="input"
          />
        </Field>
      </div>

      <Field label={t('Message', 'Message')}>
        <textarea
          rows={4}
          value={form.message}
          onChange={onChange('message')}
          placeholder={t('Expérience, disponibilité, ce que vous pouvez apporter…', 'Experience, availability, what you can bring…')}
          className="input resize-none"
        />
      </Field>

      <div className="mt-5">
        <Field label={t('CV (optionnel · PDF ou Word, max 5 Mo)', 'Resume (optional · PDF or Word, max 5 MB)')}>
          <input
            ref={fileRef}
            type="file"
            name="cv"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={onCvChange}
            className="input file:mr-4 file:rounded-full file:border-0 file:bg-teknic-red file:px-4 file:py-2 file:font-mono file:text-[10px] file:uppercase file:tracking-[0.2em] file:text-white cursor-pointer"
          />
        </Field>
        {cvError && (
          <p role="alert" className="font-sans text-[11px] text-teknic-red mt-2">
            {t('Le fichier dépasse 5 Mo. Choisissez un fichier plus léger.', 'The file is larger than 5 MB. Please choose a smaller file.')}
          </p>
        )}
      </div>

      <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-xs">
          <p className="font-sans font-light text-[11px] text-white/60 leading-relaxed">
            {t(
              "En envoyant, vous acceptez que nous utilisions ces renseignements pour évaluer votre candidature.",
              'By submitting, you agree that we may use this information to assess your application.'
            )}
          </p>
          {status === 'error' && (
            <p role="alert" className="font-sans text-[11px] text-teknic-red leading-relaxed mt-2">
              {t('Une erreur est survenue. Réessayez ou écrivez-nous à ', 'Something went wrong. Please try again or write to us at ')}
              info@fabricationteknic.com.
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={status === 'sending' || status === 'sent'}
          className="group relative inline-flex items-center gap-3 self-start px-7 py-3.5 rounded-full border border-teknic-red bg-teknic-red text-white font-sans text-xs tracking-[0.3em] uppercase overflow-hidden transition-all duration-500 hover:scale-105 disabled:opacity-80 disabled:cursor-wait"
        >
          {(status === 'idle' || status === 'error') && (
            <>
              <span className="relative z-10">{status === 'error' ? t('Réessayer', 'Try again') : t('Envoyer', 'Send')}</span>
              <Send className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
            </>
          )}
          {status === 'sending' && (
            <>
              <Loader2 className="relative z-10 w-4 h-4 animate-spin" />
              <span className="relative z-10">{t('Envoi…', 'Sending…')}</span>
            </>
          )}
          {status === 'sent' && (
            <>
              <Check className="relative z-10 w-4 h-4" />
              <span className="relative z-10">{t('Envoyé · Merci', 'Sent · Thank you')}</span>
            </>
          )}
        </button>
      </div>
      <FormStyles />
    </form>
  )
}
