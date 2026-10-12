import { useEffect, useState } from 'react'
import { getConsent, onConsentChange, setConsent } from '../lib/consent'

/** Bandeau de témoins: aparece hasta que el visitante decide (acepta o rechaza) */
export default function CookieBanner() {
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
      aria-label="Avis sur les témoins"
      className="fixed bottom-0 inset-x-0 z-[150] bg-[#0b0b0b]/95 backdrop-blur border-t border-white/10 text-white"
    >
      <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
        <p className="font-sans text-sm text-white/70 leading-relaxed flex-1">
          Nous utilisons des témoins essentiels au fonctionnement du site. Avec votre accord, nous activons aussi les témoins de Google
          pour afficher la carte de notre atelier. Vous pouvez changer votre choix à tout moment.{' '}
          <a
            href="/legal/cookies.html"
            className="underline text-white/90 hover:text-teknic-red"
          >
            Politique de cookies
          </a>
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => decide('refused')}
            className="px-5 py-2.5 border border-white/30 rounded-full font-mono text-[11px] tracking-[0.2em] uppercase hover:bg-white/10"
          >
            Tout refuser
          </button>
          <button
            type="button"
            onClick={() => decide('accepted')}
            className="px-5 py-2.5 rounded-full bg-teknic-red font-mono text-[11px] tracking-[0.2em] uppercase text-white hover:opacity-90"
          >
            Accepter
          </button>
        </div>
      </div>
    </div>
  )
}
