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
]

gsap.registerPlugin(ScrollTrigger)
;(window as any).gsap = gsap
;(window as any).ScrollTrigger = ScrollTrigger

export default function App() {
  const { pathname } = useLocation()

  // Cada página empieza arriba y se recalculan las animaciones por scroll
  useEffect(() => {
    window.scrollTo(0, 0)
    ScrollTrigger.refresh()
  }, [pathname])

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
