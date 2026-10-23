import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink, Phone, MessageSquare, Mail } from 'lucide-react'
import { SERVICES } from '../data/services'
import { SERVICE_DETAILS } from '../data/serviceDetails'
import { usePageMeta, breadcrumbLd, SITE, canonicalUrl } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'
import { useToast } from '../components/Toast'
import { copyAndShow, isTouchDevice, gmailComposeUrl } from '../lib/contactActions'

/** "IMPRESSION 3D" -> "Impression 3D" (las palabras con cifras, como 3D, se dejan tal cual) */
const titleCase = (name: string) =>
  name
    .split(' ')
    .map((w) => (/\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ')

/** Página propia de un servicio: /services/:id */
export default function ServiceDetailPage() {
  const { id } = useParams()
  const { lang, t, lp } = useLang()
  const { show, toast } = useToast()
  // En computadora no suele haber programa de correo/teléfono: se copia el dato y se avisa
  const copyAndNotify = (text: string, message: string, fallback: string = message) => {
    if (!isTouchDevice()) copyAndShow(text, message, fallback, show)
  }
  const s = SERVICES.find((x) => x.id === id)

  usePageMeta(
    s ? `${titleCase(s.name[lang])} ${t('à Nicolet', 'in Nicolet')} | Fabrication TEK-NIC` : 'Services | Fabrication TEK-NIC',
    s ? s.description[lang] : t('Services de Fabrication TEK-NIC à Nicolet, Québec.', 'Fabrication TEK-NIC services in Nicolet, Quebec.'),
    `/services/${id ?? ''}`,
    s
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: s.name[lang],
            description: s.description[lang],
            url: canonicalUrl(`/services/${s.id}`, lang),
            areaServed: ['Québec', 'Canada'],
            provider: { '@type': 'LocalBusiness', name: 'Fabrication TEK-NIC', url: SITE },
          },
          breadcrumbLd([
            { name: t('Accueil', 'Home'), path: '/' },
            { name: 'Services', path: '/services' },
            { name: s.name[lang], path: `/services/${s.id}` },
          ], lang),
        ]
      : undefined
  )

  if (!s) return <Navigate to={lp('/services')} replace />

  const poster = s.video ? s.video.replace(/\.mp4$/, '-poster.jpg') : undefined

  return (
    <section className="relative w-full min-h-screen bg-[#050505] text-white overflow-hidden px-6 md:px-12 pt-28 pb-24">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 20%, ${s.bg.via} 0%, ${s.bg.from}66 35%, #050505 75%)`,
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        <Link
          to={lp('/services')}
          className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.3em] uppercase text-white/60 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('Tous les services', 'All services')}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div>
            {s.external && s.partnerLabel && (
              <div
                className="partner-pill inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full mb-6 border"
                style={{
                  borderColor: `${s.accent}80`,
                  background: `linear-gradient(90deg, ${s.accent}30, ${s.accent}10)`,
                  boxShadow: `0 0 24px -6px ${s.accent}90`,
                }}
              >
                <span className="relative flex w-2 h-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
                    style={{ backgroundColor: s.accent }}
                  />
                  <span className="relative inline-flex w-2 h-2 rounded-full" style={{ backgroundColor: s.accent }} />
                </span>
                <span className="font-mono text-[10px] tracking-[0.25em] uppercase" style={{ color: s.accent }}>
                  {s.partnerLabel[lang]}
                </span>
              </div>
            )}

            {s.badge && (
              <div className="inline-block bg-white rounded-md p-2 mb-6 shadow-xl shadow-black/40">
                <img src={s.badge.src} alt={lang === 'en' && s.badge.altEn ? s.badge.altEn : s.badge.alt} width={364} height={496} className="block h-24 w-auto" />
              </div>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-mono text-sm tracking-[0.3em]" style={{ color: s.accent }}>
                {s.number}
              </span>
              <span className="font-mono text-xs tracking-[0.3em] text-white/60">/ 05</span>
            </div>

            <h1 className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
              {s.name[lang]}
            </h1>
            {s.headline[lang] && <p className="font-serif italic text-xl md:text-2xl text-white/80 mb-8">{s.headline[lang]}</p>}
            <p className="font-sans font-light text-white/70 leading-relaxed mb-10 max-w-xl">{s.description[lang]}</p>

            <div className="grid grid-cols-2 gap-x-6 gap-y-6 max-w-md mb-12">
              {s.specs.map((spec, k) => (
                <div key={k} className="border-l pl-4" style={{ borderColor: `${s.accent}40` }}>
                  <div className="font-mono text-[10px] tracking-widest uppercase text-white/60 mb-1">
                    {spec.label[lang]}
                  </div>
                  <div className="font-display text-xl md:text-2xl text-white">{lang === 'en' && spec.valueEn ? spec.valueEn : spec.value}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
            {s.external && s.externalUrl ? (
              <>
              <Link
                to={lp('/soumission-3d')}
                className="inline-flex items-center gap-3 px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                style={{ borderColor: s.accent, backgroundColor: `${s.accent}30` }}
              >
                {t('Demander une soumission', 'Request a quote')}
                <span className="w-6 h-px bg-current" />
              </Link>
              <a
                href={s.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                style={{ borderColor: s.accent, backgroundColor: `${s.accent}20` }}
              >
                {t('Visiter le site', 'Visit the website')}
                <ExternalLink className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
              </>
            ) : (
              <Link
                to={`${lp('/soumission')}?service=${s.id}`}
                className="inline-flex items-center gap-3 px-6 py-3 border rounded-full font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:scale-105 transition-transform duration-300"
                style={{ borderColor: `${s.accent}55` }}
              >
                {t('Demander une soumission', 'Request a quote')}
                <span className="w-6 h-px bg-current" />
              </Link>
            )}
            {s.email && (
              // Un solo botón de correo, con asunto y mensaje ya escritos:
              // en celular abre la aplicación de correo; en computadora abre Gmail en el navegador (casi nunca hay un programa de correo configurado)
              <ContactButton
                href={
                  isTouchDevice()
                    ? `mailto:${s.email}?subject=${encodeURIComponent(t(EMAIL_SUBJECT.fr, EMAIL_SUBJECT.en))}&body=${encodeURIComponent(t(EMAIL_BODY.fr, EMAIL_BODY.en))}`
                    : gmailComposeUrl(s.email, t(EMAIL_SUBJECT.fr, EMAIL_SUBJECT.en), t(EMAIL_BODY.fr, EMAIL_BODY.en))
                }
                icon={Mail}
                label={t('Écrire un courriel', 'Send an email')}
                external={!isTouchDevice()}
              />
            )}
            </div>

            {s.contacts && s.email && (
              <div className="mt-14 pt-8 border-t border-white/10">
                <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/60 mb-6">{t('Nous joindre', 'Contact us')}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mb-4">
                  {s.contacts.map((c) => {
                    const digits = c.phone.replace(/\D/g, '')
                    return (
                      <div
                        key={c.phone}
                        className="group relative border border-white/10 hover:border-teknic-red/60 rounded-lg p-5 bg-gradient-to-b from-[#1b2026] via-[#12161b] to-[#0c0f13] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-colors duration-300"
                      >
                        <div className="font-display uppercase text-white text-lg leading-tight mb-1">{c.name}</div>
                        <div className="font-sans text-sm text-white/60 mb-4">{c.phone}</div>
                        <div className="flex flex-wrap gap-2">
                          <ContactButton
                            href={`tel:+1${digits}`}
                            icon={Phone}
                            label={t('Appeler', 'Call')}
                            onClick={() =>
                              copyAndNotify(c.phone, t('Numéro copié : ', 'Number copied: ') + c.phone + t(' — composez-le depuis votre téléphone.', ' — dial it from your phone.'))
                            }
                          />
                          <ContactButton
                            href={`sms:+1${digits}?&body=${encodeURIComponent(t(SMS_TEXT.fr, SMS_TEXT.en))}`}
                            icon={MessageSquare}
                            label={t('Message', 'Text')}
                            onClick={() =>
                              copyAndNotify(
                                t(SMS_TEXT.fr, SMS_TEXT.en),
                                t('Message copié — envoyez-le au ', 'Message copied — send it to ') + c.phone + t(' depuis votre téléphone.', ' from your phone.')
                              )
                            }
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div
            className={`relative w-full rounded-2xl overflow-hidden ${s.videoShape === 'landscape' ? 'aspect-video' : s.videoShape === 'square' ? 'aspect-square' : 'aspect-[4/5] lg:aspect-[3/4]'}`}
            style={{
              boxShadow: `0 40px 120px -20px ${s.accent}40, 0 0 0 1px ${s.accent}20`,
              background: `linear-gradient(160deg, ${s.bg.from} 0%, ${s.bg.to} 100%)`,
            }}
          >
            {s.video ? (
              <video
                src={s.video}
                poster={poster}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : s.image ? (
              <img src={s.image} alt={s.imageAlt?.[lang] ?? s.name[lang]} className="absolute inset-0 w-full h-full object-cover" />
            ) : null}
          </div>
        </div>

        {/* Texto ampliado del servicio */}
        {SERVICE_DETAILS[s.id] && (
          <div className="mt-20 pt-12 border-t border-white/10 max-w-3xl">
            <h2 className="font-display uppercase text-3xl md:text-4xl leading-tight mb-6">
              {SERVICE_DETAILS[s.id].heading[lang]}
            </h2>
            {SERVICE_DETAILS[s.id].paragraphs.map((p, i) => (
              <p key={i} className="font-sans font-light text-white/70 leading-relaxed mb-5 text-base md:text-lg">
                {p[lang]}
              </p>
            ))}
            {/* Enlaces de navegación: no van en el servicio de socio externo (impression 3D) */}
            {!s.external && (
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[11px] tracking-[0.25em] uppercase">
                <Link to={lp('/equipements')} className="text-white/70 hover:text-teknic-red transition-colors">
                  {t('Voir nos équipements →', 'See our equipment →')}
                </Link>
                <Link to={lp('/portfolio')} className="text-white/70 hover:text-teknic-red transition-colors">
                  {t('Voir nos réalisations →', 'See our work →')}
                </Link>
                <Link to={lp('/services')} className="text-white/70 hover:text-teknic-red transition-colors">
                  {t('Tous les services →', 'All services →')}
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {toast}
    </section>
  )
}

const SMS_TEXT = {
  fr: "Bonjour, je vous contacte via le site Fabrication TEK-NIC au sujet d'un projet d'impression 3D. Pourriez-vous me renseigner ? Merci.",
  en: 'Hello, I am contacting you through the Fabrication TEK-NIC website about a 3D printing project. Could you give me more information? Thank you.',
}
const EMAIL_SUBJECT = {
  fr: "Demande d'information · Impression 3D (via Fabrication TEK-NIC)",
  en: 'Information request · 3D printing (via Fabrication TEK-NIC)',
}
const EMAIL_BODY = {
  fr: [
    'Bonjour,',
    '',
    "Je vous contacte via le site Fabrication TEK-NIC au sujet d'un projet d'impression 3D.",
    '',
    'Nom / entreprise :',
    'Téléphone :',
    'Description du projet :',
    '',
    'Merci,',
  ].join('\n'),
  en: [
    'Hello,',
    '',
    'I am contacting you through the Fabrication TEK-NIC website about a 3D printing project.',
    '',
    'Name / company:',
    'Phone:',
    'Project description:',
    '',
    'Thank you,',
  ].join('\n'),
}

/** Botón con brillo que cruza y línea roja que se dibuja al pasar el cursor */
function ContactButton({
  href,
  icon: Icon,
  label,
  wide = false,
  onClick,
  external = false,
}: {
  href: string
  icon: typeof Phone
  label: string
  wide?: boolean
  onClick?: () => void
  external?: boolean
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`group relative overflow-hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-white/20 rounded-full font-mono text-[10px] tracking-[0.25em] uppercase text-white hover:border-teknic-red transition-colors duration-300 ${wide ? 'w-full sm:w-auto' : ''}`}
    >
      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      <Icon className="relative w-3.5 h-3.5 text-teknic-red" strokeWidth={1.5} />
      <span className="relative">{label}</span>
      <span className="absolute left-0 bottom-0 h-px w-full bg-teknic-red origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </a>
  )
}
