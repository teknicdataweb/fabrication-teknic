export type Job = {
  id: string
  title: { fr: string; en: string }
  type: { fr: string; en: string }
  location: string
  description: { fr: string; en: string }
  requirements: { fr: string; en: string }[]
}

/** Ofertas de empleo mostradas en /carrieres.
 *  Lista vacía = la página muestra solo la candidatura espontánea.
 *  Para publicar una vacante, agregue un objeto como este dentro de la lista:
 *
 *  {
 *    id: 'machiniste-cnc',
 *    title: { fr: 'Machiniste CNC', en: 'CNC Machinist' },
 *    type: { fr: 'Temps plein', en: 'Full time' },
 *    location: 'Nicolet, QC',
 *    description: { fr: '…', en: '…' },
 *    requirements: [{ fr: '…', en: '…' }],
 *  }
 */
export const JOBS: Job[] = []
