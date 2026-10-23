import { createContext, useContext, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type Lang = 'fr' | 'en'

const STORAGE_KEY = 'teknic-lang'

// El francés es el idioma predeterminado y vive en la raíz (/services).
// El inglés vive bajo /en (/en/services), con algunos nombres de ruta traducidos.
const FR_TO_EN: Record<string, string> = { equipements: 'equipment', carrieres: 'careers', soumission: 'quote', 'soumission-3d': 'quote-3d' }
const EN_TO_FR: Record<string, string> = Object.fromEntries(Object.entries(FR_TO_EN).map(([fr, en]) => [en, fr]))

export function langFromPath(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'fr'
}

/** Recibe una ruta en francés ("/equipements", "/services/3d", "/") y devuelve su versión en el idioma pedido */
export function localizePath(frPath: string, lang: Lang): string {
  if (lang === 'fr') return frPath
  const segs = frPath.split('/').filter(Boolean)
  if (segs.length > 0 && FR_TO_EN[segs[0]]) segs[0] = FR_TO_EN[segs[0]]
  return '/en' + (segs.length ? '/' + segs.join('/') : '')
}

/** Convierte cualquier ruta actual (francés o inglés) a su ruta en francés */
export function toFrenchPath(pathname: string): string {
  if (langFromPath(pathname) === 'fr') return pathname
  const segs = pathname.split('/').filter(Boolean).slice(1) // quita "en"
  if (segs.length > 0 && EN_TO_FR[segs[0]]) segs[0] = EN_TO_FR[segs[0]]
  return '/' + segs.join('/')
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void }

const LangContext = createContext<Ctx>({ lang: 'fr', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  const lang = langFromPath(pathname)
  const firstLoad = useRef(true)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  // Quien eligió inglés antes y vuelve a la portada en francés pasa a la portada en inglés
  useEffect(() => {
    if (!firstLoad.current) return
    firstLoad.current = false
    try {
      if (pathname === '/' && localStorage.getItem(STORAGE_KEY) === 'en') {
        navigate(localizePath('/', 'en') + search + hash, { replace: true })
      }
    } catch {
      /* sin almacenamiento: se queda en francés */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setLang = (target: Lang) => {
    try {
      localStorage.setItem(STORAGE_KEY, target)
    } catch {
      /* ignorar */
    }
    if (target === lang) return
    navigate(localizePath(toFrenchPath(pathname), target) + search + hash)
  }

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>
}

/** Idioma actual (según la dirección), `t(fr, en)` para elegir el texto y `lp(ruta)` para enlaces internos */
export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en)
  const lp = (frPath: string) => localizePath(frPath, lang)
  return { lang, setLang, t, lp }
}
