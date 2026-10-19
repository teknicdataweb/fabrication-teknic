import { SERVICES } from '../data/services'
import { SLIDE_SCROLL } from './carousel'

/** Lleva a la sección de un servicio dentro de la portada (escritorio: diapositiva fija; móvil: tarjeta) */
export function goToService(id: string) {
  const index = SERVICES.findIndex((s) => s.id === id)
  const section = document.getElementById('services')
  if (index < 0 || !section) return

  if (window.matchMedia('(min-width: 1024px)').matches) {
    // Cada diapositiva ocupa SLIDE_SCROLL px de desplazamiento dentro de la sección fijada (se apunta a su centro)
    const top = section.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: top + index * SLIDE_SCROLL + SLIDE_SCROLL / 2, behavior: 'smooth' })
  } else {
    document.getElementById(`service-${id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
