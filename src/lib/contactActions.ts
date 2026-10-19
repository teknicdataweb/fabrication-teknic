/** Copia texto al portapapeles (con alternativa para navegadores sin la API moderna) */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    try {
      const el = document.createElement('textarea')
      el.value = text
      el.setAttribute('readonly', '')
      el.style.position = 'fixed'
      el.style.opacity = '0'
      document.body.appendChild(el)
      el.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(el)
      return ok
    } catch {
      return false
    }
  }
}

/** En celulares y tabletas los enlaces tel:/sms:/mailto: abren su aplicación; en computadora suele no haber ninguna */
export const isTouchDevice = () =>
  typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches

/** Enlace para escribir el correo desde Gmail en el navegador (no necesita programa de correo instalado) */
export const gmailComposeUrl = (to: string, subject: string, body: string) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

/** Copia el texto y muestra un aviso: `okMsg` si se copió, `failMsg` si el navegador lo impidió */
export async function copyAndShow(text: string, okMsg: string, failMsg: string, show: (m: string) => void) {
  const ok = await copyText(text)
  show(ok ? okMsg : failMsg)
}
