import { useEffect, useState } from 'react'
import { MapPin, Mail, Phone, User } from 'lucide-react'
import { getConsent, onConsentChange } from '../lib/consent'
import { MAP_EMBED_SRC, MAP_LINK } from '../lib/map'
import { useLang } from '../lib/i18n'
import { useToast } from './Toast'
import { copyAndShow, isTouchDevice, gmailComposeUrl } from '../lib/contactActions'

const CONTACTS = [
  {
    icon: Phone,
    label: 'Bureau · Office',
    value: '819-870-3271',
    href: 'tel:8198703271',
    first: '',
    tag: { fr: 'Ligne directe', en: 'Direct line' },
    topic: 'general' as 'general' | 'print3d',
  },
  {
    icon: User,
    label: 'François Champagne',
    value: '819-383-0679',
    href: 'tel:8193830679',
    first: 'François',
    tag: { fr: 'Direction', en: 'Management' },
    topic: 'general' as 'general' | 'print3d',
  },
  {
    icon: User,
    label: 'Stéphane Philibert',
    value: '819-269-3189',
    href: 'tel:8192693189',
    first: 'Stéphane',
    tag: { fr: 'Direction', en: 'Management' },
    topic: 'general' as 'general' | 'print3d',
  },
  // Impression 3D: servicio ofrecido con el socio DG Innovation 3D
  {
    icon: User,
    label: 'Rémi Domingue',
    value: '819-944-4737',
    href: 'tel:8199444737',
    first: 'Rémi',
    tag: { fr: 'Direction · 3D DG Innovation', en: 'Management · 3D DG Innovation' },
    topic: 'print3d' as 'general' | 'print3d',
  },
  {
    icon: User,
    label: 'Victor Gill',
    value: '819-692-4226',
    href: 'tel:8196924226',
    first: 'Victor',
    tag: { fr: 'Direction · 3D DG Innovation', en: 'Management · 3D DG Innovation' },
    topic: 'print3d' as 'general' | 'print3d',
  },
]

// Correo con asunto y texto prearmados (francés / inglés)
const EMAIL_SUBJECT = {
  fr: 'Demande de soumission · Fabrication TEK-NIC',
  en: 'Quote request · Fabrication TEK-NIC',
}
const EMAIL_BODY = {
  fr: [
    'Bonjour,',
    '',
    'Je souhaite obtenir une soumission pour un projet.',
    '',
    'Nom / entreprise :',
    'Téléphone :',
    'Type de service (usinage, fabrication, conception, impression 3D) :',
    'Description du projet, matériau, quantité et délai souhaité :',
    '',
    'Merci,',
  ].join('\n'),
  en: [
    'Hello,',
    '',
    'I would like to get a quote for a project.',
    '',
    'Name / company:',
    'Phone:',
    'Service type (machining, fabrication, design, 3D printing):',
    'Project description, material, quantity and desired deadline:',
    '',
    'Thank you,',
  ].join('\n'),
}

/** `compact`: solo los teléfonos (oficina + los cuatro socios), para las páginas de soumission; `only3d`: solo Rémi y Victor (DG Innovation 3D) */
export default function Contact({ asH1 = false, compact = false, only3d = false }: { asH1?: boolean; compact?: boolean; only3d?: boolean }) {
  const Title = asH1 ? 'h1' : 'h2'
  const { lang, t } = useLang()
  const { show, toast } = useToast()
  const EMAIL = 'info@fabricationteknic.com'
  const gmailHref = gmailComposeUrl(EMAIL, EMAIL_SUBJECT[lang], EMAIL_BODY[lang])
  const emailHref = `mailto:info@fabricationteknic.com?subject=${encodeURIComponent(
    EMAIL_SUBJECT[lang]
  )}&body=${encodeURIComponent(EMAIL_BODY[lang])}`
  // La carte Google pose des témoins tiers: elle ne s'affiche qu'après acceptation
  const [mapAllowed, setMapAllowed] = useState(() => getConsent() === 'accepted')
  useEffect(() => onConsentChange(() => setMapAllowed(getConsent() === 'accepted')), [])

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

      <div className={`relative max-w-[1600px] mx-auto px-6 md:px-12 ${compact ? 'pt-4 pb-20 md:pb-28' : 'py-24 md:py-32'}`}>
        {compact && (
          <div className="mb-10 md:mb-12">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-teknic-red" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
                {t('Ou appelez-nous', 'Or call us')}
              </span>
            </div>
            <h2 className="font-display uppercase leading-[0.9] text-3xl md:text-5xl">
              {only3d ? (
                <>
                  {t('Joignez ', 'Reach ')}
                  <span className="text-teknic-red">DG Innovation 3D</span>
                </>
              ) : (
                <>
                  {t('Joignez-nous ', 'Reach us ')}
                  <span className="text-teknic-red">{t('directement', 'directly')}</span>
                </>
              )}
            </h2>
          </div>
        )}

        {!compact && (
          <>
        {/* Header */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-12 bg-teknic-red" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red">
              07 · Contact
            </span>
          </div>
          <Title className="font-display uppercase leading-[0.85] text-5xl md:text-7xl lg:text-8xl mb-6">
            {t('Parlons ', "Let's talk ")}<span className="text-teknic-red">{t('métal', 'metal')}</span>
          </Title>
          <p className="max-w-2xl font-sans font-light text-white/60 text-base md:text-lg leading-relaxed">
            {t(
              "Passez à l'atelier, appelez-nous ou écrivez-nous. Notre équipe est prête à répondre à vos questions techniques.",
              'Drop by the shop, call us or write to us. Our team is ready to answer your technical questions.'
            )}
          </p>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-4 md:gap-6 mb-6">
          {/* Address — wide card */}
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col justify-between border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden min-h-[280px]"
          >
            {/* Carte en arrière-plan : toute la carte ouvre Google Maps */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              {mapAllowed ? (
                <iframe
                  src={MAP_EMBED_SRC}
                  title={t("Carte de l'atelier", 'Map of the shop')}
                  tabIndex={-1}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full border-0 opacity-60"
                  style={{
                    filter: 'invert(0.92) hue-rotate(180deg) contrast(0.85) saturate(0.7) brightness(0.95)',
                  }}
                />
              ) : (
                // Sans témoins : fond de plan stylisé (sans image externe ni cookies)
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(255,255,255,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.07) 1px, transparent 1px), radial-gradient(circle at 78% 50%, rgba(200,16,46,0.28) 0%, transparent 45%)',
                    backgroundSize: '48px 48px, 48px 48px, 100% 100%',
                  }}
                >
                  <MapPin className="absolute right-[18%] top-1/2 -translate-y-1/2 w-10 h-10 text-teknic-red/80" strokeWidth={1.5} />
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30" />
            </div>

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
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                  {t("Adresse de l'atelier", 'Shop address')}
                </span>
              </div>

              <div className="font-display text-3xl md:text-4xl lg:text-5xl uppercase leading-[0.95] mb-4 tracking-tight">
                50, <span className="text-teknic-red">Marie-Victorin</span>
              </div>
              <div className="font-sans font-light text-white/70 text-base md:text-lg">
                Nicolet, {t('Québec', 'Quebec')} · J3T 1A1
              </div>
            </div>

            <div className="relative z-10 flex items-center justify-between pt-8 mt-8 border-t border-white/5">
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/60 uppercase">
                {t("12 500 pi² d'atelier", '12,500 sq ft shop')}
              </div>
              <div className="font-mono text-[10px] tracking-[0.3em] text-white/50 group-hover:text-teknic-red uppercase transition-colors">
                {t('Voir sur la carte →', 'View on map →')}
              </div>
            </div>
          </a>

          {/* Email — tall card */}
          <div
            className="group relative flex flex-col justify-between border border-white/10 rounded-lg p-6 md:p-8 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
          >
            {/* Marca de agua: logo de la empresa, muy tenue, que se aviva un poco al pasar el cursor */}
            <img
              src="/logo-teknic.png"
              alt=""
              aria-hidden="true"
              width={640}
              height={227}
              className="pointer-events-none absolute -right-6 -bottom-8 w-[72%] max-w-[420px] h-auto opacity-[0.07] grayscale group-hover:opacity-[0.13] group-hover:grayscale-0 transition-all duration-700 select-none"
            />
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
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                  {t('Courriel', 'Email')}
                </span>
              </div>

              <div className="font-display text-xl md:text-2xl uppercase leading-tight tracking-tight break-all">
                info@
                <span className="text-teknic-red">fabricationteknic</span>
                .com
              </div>
            </div>

            <div className="relative z-10 pt-8 mt-8 border-t border-white/5 flex flex-wrap gap-3">
              <a
                href={isTouchDevice() ? emailHref : gmailHref}
                {...(isTouchDevice() ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
                className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
              >
                {t('Écrire un courriel', 'Write an email')}
              </a>
            </div>
          </div>
        </div>

          </>
        )}

        {/* Phones — 3 + 2 cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-6">
          {(only3d ? CONTACTS.filter((c) => c.topic === 'print3d') : CONTACTS).map((c, i) => {
            const Icon = c.icon
            const phone = c.href.replace('tel:', '')
            // Mensaje de texto prearmado: lleva el nombre de la persona y, para DG Innovation 3D, el tema de impresión 3D
            const smsText =
              c.topic === 'print3d'
                ? t(
                    `Bonjour ${c.first}, je vous contacte via le site Fabrication TEK-NIC au sujet d'un projet d'impression 3D. Pourriez-vous me rappeler ? Merci.`,
                    `Hello ${c.first}, I am contacting you through the Fabrication TEK-NIC website about a 3D printing project. Could you call me back? Thank you.`
                  )
                : t(
                    `Bonjour${c.first ? ' ' + c.first : ''}, je vous contacte via le site Fabrication TEK-NIC au sujet d'un projet. Pourriez-vous me rappeler ? Merci.`,
                    `Hello${c.first ? ' ' + c.first : ''}, I am contacting you through the Fabrication TEK-NIC website about a project. Could you call me back? Thank you.`
                  )
            return (
              <div
                key={c.value}
                className={`${!only3d && i < 3 ? 'md:col-span-2' : 'md:col-span-3'} group relative flex flex-col border border-white/10 rounded-lg p-6 bg-gradient-to-br from-white/[0.02] to-transparent hover:border-teknic-red/60 hover:-translate-y-1 transition-all duration-500 overflow-hidden`}
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
                    <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60">
                      {t(c.tag.fr, c.tag.en)}
                    </div>
                    <div className="font-sans text-sm text-white/80 mt-0.5">
                      {c.label}
                    </div>
                  </div>
                </div>

                <div className="relative z-10 font-display text-2xl md:text-3xl uppercase text-white tracking-tight mt-auto">
                  {c.value}
                </div>

                <div className="relative z-10 mt-6 flex flex-wrap gap-3">
                  <a
                    href={`tel:+1${phone}`}
                    onClick={() => {
                      if (!isTouchDevice())
                        copyAndShow(
                          c.value,
                          t('Numéro copié : ', 'Number copied: ') + c.value + t(' — composez-le depuis votre téléphone.', ' — dial it from your phone.'),
                          t('Numéro : ', 'Number: ') + c.value + t(' — composez-le depuis votre téléphone.', ' — dial it from your phone.'),
                          show
                        )
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
                  >
                    {t('Appeler', 'Call')}
                  </a>
                  <a
                    href={`sms:+1${phone}?&body=${encodeURIComponent(smsText)}`}
                    onClick={() => {
                      if (!isTouchDevice())
                        copyAndShow(
                          smsText,
                          t('Message copié — envoyez-le au ', 'Message copied — send it to ') + c.value + t(' depuis votre téléphone.', ' from your phone.'),
                          t('Envoyez un message au ', 'Send a message to ') + c.value + t(' depuis votre téléphone.', ' from your phone.'),
                          show
                        )
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 rounded-full font-mono text-[10px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
                  >
                    {t('Envoyer un message', 'Send a message')}
                  </a>
                </div>
              </div>
            )
          })}
        </div>

        {/* Hours banner */}
        {!compact && (
        <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-5 md:p-6 border border-white/10 rounded-lg bg-gradient-to-r from-white/[0.02] to-transparent">
          <div className="flex items-center gap-4">
            <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_12px_rgba(74,222,128,0.6)] animate-pulse" />
            <div>
              <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/60 mb-1">
                {t("Heures d'ouverture", 'Opening hours')}
              </div>
              <div className="font-display text-lg md:text-xl uppercase tracking-tight">
                {t('Lundi – Vendredi', 'Monday – Friday')} · <span className="text-teknic-red">{t('7h à 17h', '7 AM to 5 PM')}</span>
              </div>
            </div>
          </div>
          <a
            href="#soumission"
            className="inline-flex items-center gap-3 self-start px-6 py-3 rounded-full border border-white/20 font-sans text-[11px] tracking-[0.3em] uppercase text-white hover:bg-teknic-red hover:border-teknic-red transition-all duration-300"
          >
            {t('Demander une soumission', 'Request a quote')}
            <span className="w-5 h-px bg-current" />
          </a>
        </div>
        )}

      </div>
      {toast}
    </section>
  )
}
