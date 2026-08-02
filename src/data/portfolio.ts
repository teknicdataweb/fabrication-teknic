export type Project = {
  id: string
  src: string
  aspect: 'portrait' | 'landscape' | 'square'
  title: { fr: string; en: string }
  category: { fr: string; en: string }
  material?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'p01',
    src: '/portfolio/p01.jpg',
    aspect: 'portrait',
    title: { fr: 'Arbre denté à bride', en: 'Splined shaft with flange' },
    category: { fr: 'Tournage · Fraisage', en: 'Turning · Milling' },
    material: 'Acier allié',
  },
  {
    id: 'p02',
    src: '/portfolio/p02.jpg',
    aspect: 'landscape',
    title: { fr: 'Bloc prismatique', en: 'Prismatic block' },
    category: { fr: 'Fraisage CNC', en: 'CNC milling' },
    material: 'Acier',
  },
  {
    id: 'p03',
    src: '/portfolio/p03.jpg',
    aspect: 'landscape',
    title: { fr: 'Composant mécanique', en: 'Mechanical component' },
    category: { fr: 'Usinage', en: 'Machining' },
    material: 'Aluminium',
  },
  {
    id: 'p04',
    src: '/portfolio/p04.jpg',
    aspect: 'portrait',
    title: { fr: 'Pièce cylindrique polie', en: 'Polished cylindrical part' },
    category: { fr: 'Tournage · Rectification', en: 'Turning · Grinding' },
    material: 'Inox',
  },
  {
    id: 'p05',
    src: '/portfolio/p05.jpg',
    aspect: 'landscape',
    title: { fr: 'Ensemble d\'usinage', en: 'Machining assembly' },
    category: { fr: 'Usinage complexe', en: 'Complex machining' },
    material: 'Acier',
  },
  {
    id: 'p06',
    src: '/portfolio/p06.jpg',
    aspect: 'landscape',
    title: { fr: 'Pièce de précision', en: 'Precision part' },
    category: { fr: 'CNC 5-axes', en: '5-axis CNC' },
    material: 'Aluminium',
  },
  {
    id: 'p07',
    src: '/portfolio/p07.jpg',
    aspect: 'landscape',
    title: { fr: 'Composant industriel', en: 'Industrial component' },
    category: { fr: 'Fabrication', en: 'Fabrication' },
    material: 'Acier',
  },
  {
    id: 'p08',
    src: '/portfolio/p08.jpg',
    aspect: 'landscape',
    title: { fr: 'Assemblage soudé', en: 'Welded assembly' },
    category: { fr: 'Soudure · Fabrication', en: 'Welding · Fabrication' },
    material: 'Acier',
  },
  {
    id: 'p09',
    src: '/portfolio/p09.jpg',
    aspect: 'landscape',
    title: { fr: 'Projet spécial', en: 'Special project' },
    category: { fr: 'Sur mesure', en: 'Custom' },
    material: 'Multi-matériaux',
  },
  {
    id: 'p10',
    src: '/portfolio/p10.jpg',
    aspect: 'landscape',
    title: { fr: 'Turbine sur pont d\'usinage', en: 'Turbine on machining bed' },
    category: { fr: 'Alésage vertical', en: 'Vertical boring' },
    material: 'Inox',
  },
  {
    id: 'p12',
    src: '/portfolio/p12.jpg',
    aspect: 'landscape',
    title: { fr: 'Intervention machine radiale', en: 'Radial machine setup' },
    category: { fr: 'Perçage · Alésage', en: 'Drilling · Boring' },
  },
  {
    id: 'p13',
    src: '/portfolio/p13.jpg',
    aspect: 'square',
    title: { fr: 'Support de moteur orange', en: 'Orange motor support' },
    category: { fr: 'Fabrication mécanique', en: 'Mechanical fabrication' },
    material: 'Acier peint',
  },
  {
    id: 'p14',
    src: '/portfolio/p14.jpg',
    aspect: 'landscape',
    title: { fr: 'Pompe industrielle', en: 'Industrial pump' },
    category: { fr: 'Remise à neuf', en: 'Refurbishment' },
    material: 'Fonte',
  },
]
