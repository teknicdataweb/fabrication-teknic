import { getConsent, onConsentChange } from './consent'

// Código de medición de Google Analytics (G-XXXXXXXXXX). Se define en la variable VITE_GA_ID.
const GA_ID = import.meta.env.VITE_GA_ID as string | undefined

let loaded = false

/** Carga Google Analytics solo si el visitante aceptó las cookies y el código está configurado */
function loadAnalytics() {
  if (!GA_ID || loaded || getConsent() !== 'accepted') return
  loaded = true

  const w = window as any
  w.dataLayer = w.dataLayer || []
  w.gtag = function gtag(...args: unknown[]) {
    w.dataLayer.push(args)
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(script)

  w.gtag('js', new Date())
  w.gtag('config', GA_ID)
}

/** Llamar una vez al iniciar la aplicación; vuelve a revisar cuando cambia la elección de cookies */
export function initAnalytics() {
  loadAnalytics()
  onConsentChange(loadAnalytics)
}
