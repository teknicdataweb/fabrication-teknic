import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ServicesShowcase from './components/ServicesShowcase'
import Equipements from './components/Equipements'
import Portfolio from './components/Portfolio'
import Soumission from './components/Soumission'
import Contact from './components/Contact'
import LocationReviews from './components/LocationReviews'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'

gsap.registerPlugin(ScrollTrigger)
;(window as any).gsap = gsap
;(window as any).ScrollTrigger = ScrollTrigger

export default function App() {
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [])

  return (
    <div className="relative bg-black text-white">
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <ServicesShowcase />
        <Equipements />
        <Portfolio />
        <Soumission />
        <Contact />
        <LocationReviews />
        <Footer />
      </main>
    </div>
  )
}
