export type Service = {
  id: string
  number: string
  name: { fr: string; en: string }
  headline: { fr: string; en: string }
  description: { fr: string; en: string }
  image: string
  // Optional looping video — if provided, replaces the static image
  video?: string
  bg: {
    from: string
    via: string
    to: string
  }
  accent: string
  specs: { label: { fr: string; en: string }; value: string; valueEn?: string }[]
  // Optional — for partner brands that live on their own domain
  external?: boolean
  externalUrl?: string
  partnerLabel?: { fr: string; en: string }
  // Optional — small certification logo shown next to the service
  badge?: { src: string; alt: string; altEn?: string }
  // Optional — contacts of the partner company, shown on its service page
  contacts?: { name: string; phone: string }[]
  email?: string
  // Optional — short looping video for the services overview card
  cardVideo?: string
  // Optional — how the card video fits its frame: 'contain' shows the whole (vertical) video over a blurred copy of itself
  cardFit?: 'cover' | 'contain'
  // Optional — short line shown on the services overview card when the service has no headline
  cardText?: { fr: string; en: string }
  // Optional — photo used as the cover on the services overview page (replaces the card video), with a logo over it
  cover?: string
  coverLogo?: { src: string; alt: string }
  // Optional — shape of the video so its frame matches it (no empty bars); default is vertical (9:16)
  videoShape?: 'landscape' | 'square'
  // Optional — descriptive alt text for the photo (SEO / accessibility); falls back to the service name
  imageAlt?: { fr: string; en: string }
}

// Fondos de la marca: negro, rojo, gris y blanco (el blanco va en textos y acentos)
export const SERVICES: Service[] = [
  {
    id: 'usinage',
    number: '01',
    name: { fr: 'USINAGE', en: 'MACHINING' },
    headline: { fr: '', en: '' },
    cardText: {
      fr: 'Précision à 0.001° près',
      en: 'Precision within 0.001°',
    },
    description: {
      fr: "Centres d'usinage CNC horizontaux et verticaux pour pièces jusqu'à 11 000 lb, avec des tolérances microniques.",
      en: 'Horizontal and vertical CNC machining centers for parts up to 11,000 lb, with micron tolerances.',
    },
    image: '/usinage-cnc-operateur-piece-industrielle-nicolet.jpg',
    videoShape: 'landscape',
    imageAlt: {
      fr: "Opérateur usinant une grande pièce industrielle sur un centre d'usinage CNC, Fabrication TEK-NIC à Nicolet, Québec",
      en: 'Operator machining a large industrial part on a CNC machining center, Fabrication TEK-NIC in Nicolet, Quebec',
    },
    bg: { from: '#0B0B0C', via: '#3A3D42', to: '#040405' },
    accent: '#F0434F',
    specs: [
      { label: { fr: 'Capacité', en: 'Capacity' }, value: '11 000 lb' },
      { label: { fr: 'Rotation', en: 'Rotation' }, value: '360° / 0.001°' },
      { label: { fr: 'Course X', en: 'X travel' }, value: '80"' },
      { label: { fr: 'Course Y', en: 'Y travel' }, value: '70"' },
    ],
  },
  {
    id: 'fabrication',
    number: '02',
    name: { fr: 'FABRICATION', en: 'FABRICATION' },
    headline: { fr: '', en: '' },
    cardText: {
      fr: 'Structures, composants et assemblages sur mesure',
      en: 'Custom structures, components and assemblies',
    },
    description: {
      fr: "Structures, composants et assemblages métalliques sur mesure, soudés et finis dans notre atelier de 12 500 pi².",
      en: 'Custom metal structures, components and assemblies, welded and finished in our 12,500 sq ft shop.',
    },
    image: '/fabrication-metallique-pont-roulant-engrenage-nicolet.jpg',
    videoShape: 'square',
    imageAlt: {
      fr: "Grande pièce métallique fabriquée et peinte, suspendue au pont roulant avec son engrenage, atelier Fabrication TEK-NIC à Nicolet, Québec",
      en: 'Large fabricated and painted metal part with its gear hanging from the overhead crane, Fabrication TEK-NIC shop in Nicolet, Quebec',
    },
    bg: { from: '#3D0811', via: '#9B1126', to: '#16040A' },
    accent: '#FFFFFF',
    specs: [
      { label: { fr: 'Atelier', en: 'Shop area' }, value: '12 500 pi²', valueEn: '12,500 sq ft' },
      { label: { fr: 'Pont roulant', en: 'Overhead crane' }, value: '7 tonnes', valueEn: '7 tons' },
      { label: { fr: 'Scie', en: 'Saw' }, value: "jusqu'à 18\"", valueEn: 'up to 18"' },
      { label: { fr: 'Perceuse radiale', en: 'Radial drill' }, value: 'Ø 2¼"' },
    ],
  },
  {
    id: 'conception',
    number: '03',
    name: { fr: 'CONCEPTION', en: 'DESIGN' },
    headline: { fr: '', en: '' },
    cardText: {
      fr: "De l'idée au plan",
      en: 'From idea to drawing',
    },
    description: {
      fr: 'Conception 3D (CAO), plans techniques, rétro-ingénierie et prototypes pour vos pièces sur mesure.',
      en: '3D design (CAD), technical drawings, reverse engineering and prototypes for your custom parts.',
    },
    image: '/service-conception.jpg',
    videoShape: 'landscape',
    bg: { from: '#1A1B1E', via: '#6B7078', to: '#0D0E10' },
    accent: '#FF5A68',
    specs: [
      { label: { fr: 'Modélisation', en: 'Modeling' }, value: '3D · CAO', valueEn: '3D · CAD' },
      { label: { fr: 'Plans', en: 'Drawings' }, value: 'Techniques', valueEn: 'Technical' },
      { label: { fr: 'Rétro-ingénierie', en: 'Reverse engineering' }, value: '✓' },
      { label: { fr: 'Prototypage', en: 'Prototyping' }, value: '✓' },
    ],
  },
  {
    id: '3d',
    number: '04',
    name: { fr: 'IMPRESSION 3D', en: '3D PRINTING' },
    headline: { fr: '', en: '' },
    cardText: {
      fr: 'Concevoir autrement, fabriquer intelligemment',
      en: 'Design differently, build intelligently',
    },
    description: {
      fr: 'Impression 3D industrielle avec notre partenaire DG Innovation 3D : prototypes, modèles et pièces techniques.',
      en: 'Industrial 3D printing with our partner DG Innovation 3D: prototypes, models and technical parts.',
    },
    image: '',
    video: '/service-3d.mp4',
    cover: '/service-3d-cover.jpg',
    coverLogo: { src: '/brand/dg-innovation-logo.png', alt: 'DG Innovation 3D' },
    videoShape: 'square',
    bg: { from: '#050505', via: '#3A0B14', to: '#000000' },
    accent: '#F0434F',
    specs: [
      { label: { fr: 'Conception', en: 'Design' }, value: 'CAO', valueEn: 'CAD' },
      { label: { fr: 'Prototypage', en: 'Prototyping' }, value: 'Rapide', valueEn: 'Rapid' },
      { label: { fr: 'Format', en: 'Format' }, value: 'Intermédiaire', valueEn: 'Intermediate' },
      { label: { fr: 'Pièces', en: 'Parts' }, value: 'Industrielles', valueEn: 'Industrial' },
    ],
    external: true,
    externalUrl: 'https://dginnovation3d.ca/',
    contacts: [
      { name: 'Rémi Domingue', phone: '819-944-4737' },
      { name: 'Victor Gill', phone: '819-692-4226' },
    ],
    email: 'info@dginnovation3d.ca',
    partnerLabel: {
      fr: 'Service partenaire · DG Innovation 3D',
      en: 'Partner service · DG Innovation 3D',
    },
  },
]
