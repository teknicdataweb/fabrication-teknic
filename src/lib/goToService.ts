import { SERVICES } from '../data/services'

/** Lleva a la sección de un servicio dentro de la portada (escritorio: diapositiva fija; móvil: tarjeta) */
export function goToService(id: string) {
  const index = SERVICES.findIndex((s) => s.id === id)
  const section = document.getElementById('services')
  if (index < 0 || !section) return

  if (window.matchMedia('(min-width: 1024px)').matches) {
    // Cada diapositiva ocupa 800px de desplazamiento dentro de la sección fijada
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + index * 800 + 400, behavior: 'smooth' })
  } else {
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
