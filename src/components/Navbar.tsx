import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

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
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (drawerOpen) {
      const prev = document.body.style.overflow
      document.body.style.overflow = 'hidden'
      return () => {
        document.body.style.overflow = prev
      }
    }
  }, [drawerOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/40 backdrop-blur-md border-b border-white/10 py-4'
            : 'bg-transparent py-6'
        }`}
      >
        <nav className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <a href="#accueil" className="flex items-center group flex-shrink-0" onClick={() => setDrawerOpen(false)}>
            <img
              src="/logo-teknic.png"
              alt="Fabrication TEK-NIC"
              className={`transition-all duration-500 w-auto ${
                scrolled ? 'h-9 md:h-12' : 'h-11 md:h-14'
              }`}
              style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}
            />
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 lg:gap-8">
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

          <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="font-mono text-xs tracking-widest text-white/60 hover:text-white transition-colors"
              aria-label="Toggle language"
            >
              <span className={lang === 'fr' ? 'text-white' : ''}>FR</span>
              <span className="mx-1 text-white/30">|</span>
              <span className={lang === 'en' ? 'text-white' : ''}>EN</span>
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setDrawerOpen((v) => !v)}
              className="md:hidden w-10 h-10 flex items-center justify-center rounded border border-white/15 text-white hover:border-teknic-red hover:text-teknic-red transition-all"
              aria-label={drawerOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={drawerOpen}
            >
              {drawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`md:hidden fixed inset-0 z-40 transition-opacity duration-500 ${
          drawerOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/90 backdrop-blur-lg"
          onClick={() => setDrawerOpen(false)}
        />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        {/* Red ambient glow */}
        <div
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none opacity-[0.15]"
          style={{ background: 'radial-gradient(circle, #C8102E 0%, transparent 70%)' }}
        />

        {/* Content */}
        <div className="relative h-full flex flex-col justify-between px-6 pt-28 pb-10">
          <div>
            <div className="font-mono text-[10px] tracking-[0.4em] uppercase text-teknic-red mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-teknic-red" />
              Menu · Navigation
            </div>
            <ul className="flex flex-col gap-4">
              {LINKS.map((l, i) => (
                <li
                  key={l.href}
                  className={`transition-all duration-500 ${
                    drawerOpen ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0'
                  }`}
                  style={{ transitionDelay: drawerOpen ? `${100 + i * 60}ms` : '0ms' }}
                >
                  <a
                    href={l.href}
                    onClick={() => setDrawerOpen(false)}
                    className="group flex items-baseline gap-4"
                  >
                    <span className="font-mono text-[10px] tracking-widest text-white/30 group-hover:text-teknic-red transition-colors">
                      0{i + 1}
                    </span>
                    <span className="font-display text-4xl sm:text-5xl uppercase text-white group-hover:text-teknic-red transition-colors leading-none">
                      {lang === 'fr' ? l.fr : l.en}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8 border-t border-white/10 flex items-center justify-between">
            <div className="font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase">
              Nicolet · Québec
            </div>
            <a
              href="#contact"
              onClick={() => setDrawerOpen(false)}
              className="inline-flex items-center gap-2 px-4 py-2 border border-teknic-red rounded-full bg-teknic-red text-white font-mono text-[10px] tracking-[0.3em] uppercase"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
