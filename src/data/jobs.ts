export type Job = {
  id: string
  title: { fr: string; en: string }
  type: { fr: string; en: string }
  location: string
  description: { fr: string; en: string }
  requirements: { fr: string; en: string }[]
}

/** Ofertas de empleo mostradas en /carrieres.
 *  TODO: los textos son EJEMPLOS; reemplazarlos por las ofertas reales. Lista vacía = se muestra solo la candidatura espontánea. */
export const JOBS: Job[] = [
  {
    id: 'machiniste-cnc',
    title: { fr: 'Machiniste CNC', en: 'CNC Machinist' },
    type: { fr: 'Temps plein', en: 'Full time' },
    location: 'Nicolet, QC',
    description: {
      fr: "Texte d'exemple — décrivez ici le poste, les tâches principales et ce que vous offrez.",
      en: 'Sample text — describe the position, main duties and what you offer.',
    },
    requirements: [
      { fr: 'Expérience en usinage CNC (exemple)', en: 'CNC machining experience (example)' },
      { fr: 'Lecture de plans (exemple)', en: 'Blueprint reading (example)' },
    ],
  },
  {
    id: 'soudeur',
    title: { fr: 'Soudeur', en: 'Welder' },
    type: { fr: 'Temps plein', en: 'Full time' },
    location: 'Nicolet, QC',
    description: {
      fr: "Texte d'exemple — décrivez ici le poste, les tâches principales et ce que vous offrez.",
      en: 'Sample text — describe the position, main duties and what you offer.',
    },
    requirements: [
      { fr: 'Soudage MIG / TIG (exemple)', en: 'MIG / TIG welding (example)' },
      { fr: 'Certification CWB, un atout (exemple)', en: 'CWB certification an asset (example)' },
    ],
  },
  {
    id: 'mecanicien-industriel',
    title: { fr: 'Mécanicien industriel', en: 'Industrial Mechanic' },
    type: { fr: 'Temps plein', en: 'Full time' },
    location: 'Nicolet, QC',
    description: {
      fr: "Texte d'exemple — décrivez ici le poste, les tâches principales et ce que vous offrez.",
      en: 'Sample text — describe the position, main duties and what you offer.',
    },
    requirements: [
      { fr: 'Réparation et entretien mécanique (exemple)', en: 'Mechanical repair and maintenance (example)' },
    ],
  },
]
