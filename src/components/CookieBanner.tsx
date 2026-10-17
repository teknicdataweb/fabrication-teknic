import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import { getConsent, onConsentChange, setConsent } from '../lib/consent'

/** Bandeau de témoins: aparece hasta que el visitante decide (acepta o rechaza) */
export default function CookieBanner() {
  const { t } = useLang()
  const [show, setShow] = useState(() => getConsent() === null)

  useEffect(() => {
    return onConsentChange(() => setShow(getConsent() === null))
  }, [])

  if (!show) return null

  const decide = (value: 'accepted' | 'refused') => {
    setConsent(value)
  }

  return (
    <div
      role="dialog"
      aria-label={t('Avis sur les témoins', 'Cookie notice')}
      className="fixed bottom-0 inset-x-0 z-[150] bg-[#0b0b0b]/95 backdrop-blur border-t border-white/10 text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="font-sans text-sm text-white/70 leading-relaxed flex-1">
          {t(
            'Nous utilisons des témoins essentiels au fonctionnement du site. Avec votre accord, nous activons aussi les témoins de Google pour afficher la carte de notre atelier et mesurer les visites (statistiques globales). Vous pouvez changer votre choix à tout moment.',
            'We use cookies that are essential for the site to work. With your consent, we also enable Google cookies to display the map of our shop and measure visits (overall statistics). You can change your choice at any time.'
          )}{' '}
          <a
            href={t('/legal/cookies.html', '/legal/cookies.en.html')}
            className="underline text-white/90 hover:text-teknic-red"
          >
            {t('Politique de cookies', 'Cookie policy')}
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide('refused')}
            className="px-5 py-2.5 border border-white/30 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-white/10"
          >
            {t('Tout refuser', 'Refuse all')}
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="px-5 py-2.5 rounded-full bg-teknic-red font-mono text-[11px] tracking-[0.2em] uppercase text-white hover:opacity-90"
          >
            {t('Accepter', 'Accept')}
          </button>
        </div>
      </div>
    </div>
  )
}
