import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import JoinUs from './components/JoinUs'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import CookieBanner from './components/CookieBanner'
import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import ServiceDetailPage from './pages/ServiceDetailPage'
import EquipementsPage from './pages/EquipementsPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import CareersPage from './pages/CareersPage'
import Quote3DPage from './pages/Quote3DPage'
import NotFoundPage from './pages/NotFoundPage'

import { localizePath } from './lib/i18n'

// Rutas del sitio (en francés); cada una existe también en inglés bajo /en
const PAGES: [string, () => JSX.Element][] = [
  ['/', HomePage],
  ['/services', ServicesPage],
  ['/services/:id', ServiceDetailPage],
  ['/equipements', EquipementsPage],
  ['/portfolio', PortfolioPage],
  ['/contact', ContactPage],
  ['/carrieres', CareersPage],
  ['/soumission-3d', Quote3DPage],
]

gsap.registerPlugin(ScrollTrigger)
;(window as any).gsap = gsap
;(window as any).ScrollTrigger = ScrollTrigger

export default function App() {
  const { pathname, hash } = useLocation()

  // Cada página empieza arriba (o en la sección pedida con #ancla) y se recalculan las animaciones por scroll
  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      ScrollTrigger.refresh()
      return
    }
    // La sección puede tardar unos instantes en aparecer, y las animaciones por scroll restauran la posición anterior
    // al recalcularse: se alinea al llegar y se repite un par de veces en el primer segundo (salvo que el usuario ya haya movido la página).
    let tries = 0
    let userMoved = false
    const timers: number[] = []
    const markMoved = () => {
      userMoved = true
    }
    window.addEventListener('wheel', markMoved, { passive: true })
    window.addEventListener('touchstart', markMoved, { passive: true })
    window.addEventListener('keydown', markMoved)
    const align = (el: HTMLElement) => {
      if (userMoved) return
      el.scrollIntoView({ behavior: 'auto', block: 'start' })
    }
    const poll = window.setInterval(() => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)))
      tries++
      if (el) {
        window.clearInterval(poll)
        ScrollTrigger.clearScrollMemory()
        ScrollTrigger.refresh()
        align(el)
        ;[200, 500, 900].forEach((ms) => timers.push(window.setTimeout(() => align(el), ms)))
      } else if (tries > 20) {
        window.clearInterval(poll)
        window.scrollTo(0, 0)
      }
    }, 60)
    return () => {
      window.clearInterval(poll)
      timers.forEach((id) => window.clearTimeout(id))
      window.removeEventListener('wheel', markMoved)
      window.removeEventListener('touchstart', markMoved)
      window.removeEventListener('keydown', markMoved)
    }
  }, [pathname, hash])

  return (
    <div className="relative bg-black text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Routes>
          {/* Francés (predeterminado) en la raíz y su versión en inglés bajo /en */}
          {PAGES.flatMap(([frPath, Page]) =>
            (['fr', 'en'] as const).map((l) => (
              <Route key={`${l}:${frPath}`} path={localizePath(frPath, l)} element={<Page />} />
            ))
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      {(pathname === '/' || pathname === '/en' || pathname === '/en/') && <JoinUs />}
      <Footer />
      <CookieBanner />
    </div>
  )
}
