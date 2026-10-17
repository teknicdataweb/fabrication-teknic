import { createContext, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'

export type Lang = 'fr' | 'en'

const STORAGE_KEY = 'teknic-lang'

function readStored(): Lang {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    if (v === 'fr' || v === 'en') return v
  } catch {
    /* sin almacenamiento: francés por defecto */
  }
  return 'fr'
}

type Ctx = { lang: Lang; setLang: (l: Lang) => void }

const LangContext = createContext<Ctx>({ lang: 'fr', setLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readStored)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignorar */
    }
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang: setLangState }}>{children}</LangContext.Provider>
}

/** Idioma actual (francés por defecto) y `t(fr, en)` para elegir el texto */
export function useLang() {
  const { lang, setLang } = useContext(LangContext)
  const t = (fr: string, en: string) => (lang === 'fr' ? fr : en)
  return { lang, setLang, t }
}
