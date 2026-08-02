import { useEffect, useState } from 'react'

const LINKS = [
  { fr: 'ACCUEIL', en: 'HOME', href: '#accueil' },
  { fr: 'SERVICES', en: 'SERVICES', href: '#services' },
  { fr: 'ÉQUIPEMENTS', en: 'EQUIPMENT', href: '#equipements' },
  { fr: 'PORTFOLIO', en: 'PORTFOLIO', href: '#portfolio' },
  { fr: 'CONTACT', en: 'CONTACT', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [lang, setLang] = useState<'fr' | 'en'>('fr')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/40 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <a href="#accueil" className="flex items-center group">
          <img
            src="/logo-teknic.png"
            alt="Fabrication TEK-NIC"
            className={`transition-all duration-500 w-auto ${
              scrolled ? 'h-10 md:h-12' : 'h-12 md:h-14'
            }`}
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
          />
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="relative font-sans text-xs tracking-[0.25em] text-white/70 hover:text-white transition-colors group"
              >
                {lang === 'fr' ? l.fr : l.en}
                <span className="absolute left-0 -bottom-1 h-px w-0 bg-teknic-red transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors"
          aria-label="Toggle language"
        >
          <span className={lang === 'fr' ? 'text-white' : ''}>FR</span>
          <span className="mx-1 text-white/30">|</span>
          <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
        </button>
      </nav>
    </header>
  )
}
