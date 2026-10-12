// Consentimiento de témoins no esenciales (ver public/legal/cookies.html)
export type Consent = 'accepted' | 'refused'

const KEY = 'teknic-cookie-consent'
const EVENT = 'teknic-consent-change'

export function getConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY)
    return v === 'accepted' || v === 'refused' ? v : null
  } catch {
    // Almacenamiento bloqueado (modo privado, etc.): se trata como sin decidir
    return null
  }
}

export function setConsent(value: Consent | null) {
  try {
    if (value === null) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, value)
  } catch {
    /* almacenamiento no disponible: la decisión solo dura esta visita */
  }
  window.dispatchEvent(new CustomEvent(EVENT))
}

export function onConsentChange(handler: () => void) {
  window.addEventListener(EVENT, handler)
  return () => window.removeEventListener(EVENT, handler)
}
