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
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:id" element={<ServiceDetailPage />} />
          <Route path="/equipements" element={<EquipementsPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/carrieres" element={<CareersPage />} />
        </Routes>
      </main>
      {pathname === '/' && <JoinUs />}
      <Footer />
      <CookieBanner />
    </div>
  )
}
