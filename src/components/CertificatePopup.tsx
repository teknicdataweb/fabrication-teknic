import { useEffect, useState } from 'react'
import CertModal from './CertModal'

// Se muestra una vez por sesión del navegador; si el storage no está disponible, aparece en cada carga
const SEEN_KEY = 'teknic-cert-popup-seen'

const CERT = {
  src: '/certificados/certificado-cwb.jpg',
  alt: 'Certificat CWB — Fabrication Tek-Nic, norme CSA W47.1',
  caption: 'Soudure certifiée · CSA W47.1 · Division 3',
}

export default function CertificatePopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      seen = false
    }
    if (seen) return

    const timer = window.setTimeout(() => {
      setOpen(true)
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {
        /* storage bloqueado: no pasa nada */
      }
    }, 1500)
    return () => window.clearTimeout(timer)
  }, [])

  if (!open) return null
  return <CertModal image={CERT} onClose={() => setOpen(false)} />
}
