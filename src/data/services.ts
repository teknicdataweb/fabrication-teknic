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
}

export const SERVICES: Service[] = [
  {
    id: 'usinage',
    number: '01',
    name: { fr: 'USINAGE', en: 'MACHINING' },
    headline: {
      fr: 'Précision à 0.001° près',
      en: 'Precision within 0.001°',
    },
    description: {
      fr:
        "Centres d'usinage horizontaux et verticaux CNC pour pièces jusqu'à 11 000 lb, avec rotation 360° et tolérances microniques. En atelier et sur site.",
      en:
        'Horizontal and vertical CNC machining centers for parts up to 11,000 lb, with 360° rotation and micron tolerances. In-house and on-site.',
    },
    image: '/service-usinage.jpg',
    bg: { from: '#0F172A', via: '#1E293B', to: '#020617' },
    accent: '#94A3B8',
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
      fr:
        "Fabrication métallique sur mesure, structures, composants et assemblages complexes réalisés dans nos 12 500 pi² d'atelier équipé.",
      en:
        'Custom metal fabrication, structures, components and complex assemblies built in our 12,500 sq ft equipped shop.',
    },
    image: '/service-fabrication.jpg',
    video: '/service-fabrication.mp4',
    videoShape: 'landscape',
    cardVideo: '/service-fabrication-card.mp4',
    bg: { from: '#451A03', via: '#78350F', to: '#1C0B02' },
    accent: '#F59E0B',
    specs: [
      { label: { fr: 'Atelier', en: 'Shop area' }, value: '12 500 pi²', valueEn: '12,500 sq ft' },
      { label: { fr: 'Pont roulant', en: 'Overhead crane' }, value: '7 tonnes', valueEn: '7 tons' },
      { label: { fr: 'Scie', en: 'Saw' }, value: 'jusqu\'à 18"', valueEn: 'up to 18"' },
      { label: { fr: 'Perceuse radiale', en: 'Radial drill' }, value: 'Ø 2¼"' },
    ],
  },
  {
    id: 'soudure',
    number: '03',
    name: { fr: 'SOUDURE', en: 'WELDING' },
    headline: {
      fr: 'Chaque cordon, une signature',
      en: 'Every weld, a signature',
    },
    description: {
      fr:
        'Équipement complet pour souder aluminium, acier inoxydable, acier, fonte d\'acier, fonte ductile et laiton avec finition impeccable.',
      en:
        'Complete equipment to weld aluminum, stainless steel, steel, cast steel, ductile iron and brass with impeccable finish.',
    },
    image: '/service-soudure.jpg',
    video: '/service-soudure.mp4',
    cardVideo: '/service-soudure-card.mp4',
    cardFit: 'contain',
    badge: {
      src: '/brand/cwb-certified.png',
      alt: 'Logo CWB — Certifié CSA W47.1',
      altEn: 'CWB logo — CSA W47.1 Certified',
    },
    bg: { from: '#1E3A8A', via: '#1E40AF', to: '#0C1B4A' },
    accent: '#60A5FA',
    specs: [
      { label: { fr: 'Aluminium', en: 'Aluminum' }, value: 'MIG / TIG' },
      { label: { fr: 'Inox', en: 'Stainless' }, value: 'TIG' },
      { label: { fr: 'Fonte ductile', en: 'Ductile iron' }, value: '✓' },
      { label: { fr: 'Laiton & Acier', en: 'Brass & Steel' }, value: '✓' },
    ],
  },
  {
    id: 'mecanique',
    number: '04',
    name: { fr: 'MÉCANIQUE', en: 'MECHANICS' },
    headline: {
      fr: 'Réparation, entretien, remise à neuf',
      en: 'Repair, maintenance, refurbishment',
    },
    description: {
      fr:
        'Réparation de composants mécaniques, entretien industriel, jet de sable et peinture — tout au même endroit, exécuté par des mains expertes.',
      en:
        'Repair of mechanical components, industrial maintenance, sandblasting and painting — all under one roof, delivered by expert hands.',
    },
    image: '/service-mecanique.jpg',
    video: '/service-mecanique.mp4',
    cardVideo: '/service-mecanique-card.mp4',
    bg: { from: '#450A0A', via: '#7F1D1D', to: '#1A0303' },
    accent: '#C8102E',
    specs: [
      { label: { fr: 'Réparation', en: 'Repair' }, value: '✓' },
      { label: { fr: 'Entretien', en: 'Maintenance' }, value: '24/7' },
      { label: { fr: 'Sablage', en: 'Sandblast' }, value: '✓' },
      { label: { fr: 'Peinture', en: 'Painting' }, value: 'Industrielle', valueEn: 'Industrial' },
    ],
  },
  {
    id: '3d',
    number: '05',
    name: { fr: 'IMPRESSION 3D', en: '3D PRINTING' },
    headline: {
      fr: 'Concevoir autrement, fabriquer intelligemment',
      en: 'Design differently, build intelligently',
    },
    description: {
      fr:
        "Conception et impression 3D pour entreprises, ingénieurs et créateurs. Prototypes, modèles réduits de machines et pièces techniques de calibre industriel — service complet de bout en bout.",
      en:
        'Full 3D design and printing service for companies, engineers and creators. Prototypes, scale models and industrial-grade technical parts — end-to-end service.',
    },
    image: '',
    video: '/service-3d.mp4',
    cover: '/service-3d-cover.jpg',
    coverLogo: { src: '/brand/dg-innovation-logo.png', alt: 'DG Innovation 3D' },
    videoShape: 'square',
    bg: { from: '#083344', via: '#0E7490', to: '#022530' },
    accent: '#06B6D4',
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
