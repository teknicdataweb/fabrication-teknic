export type Highlight = {
  id: string
  category: { fr: string; en: string }
  name: string
  subtitle: { fr: string; en: string }
  specs: { label: string; value: string }[]
  featured?: string
}

export const HIGHLIGHTS: Highlight[] = [
  {
    id: 'maxcut',
    category: { fr: 'Alésage horizontal', en: 'Horizontal boring' },
    name: 'Maxcut',
    subtitle: {
      fr: 'CNC conversationnel',
      en: 'Conversational CNC',
    },
    specs: [
      { label: 'X', value: '80"' },
      { label: 'Y', value: '70"' },
      { label: 'Z', value: '55.125"' },
      { label: 'W', value: '19.625"' },
    ],
    featured: '11 000 lb · 360° / 0.001°',
  },
  {
    id: 'mitsubishi',
    category: { fr: 'Centre d\'usinage', en: 'Machining center' },
    name: 'Mitsubishi',
    subtitle: { fr: 'CNC numérique', en: 'Numerical CNC' },
    specs: [
      { label: 'X', value: '49.25"' },
      { label: 'Y', value: '27.625"' },
      { label: 'Z', value: '25.625"' },
    ],
  },
  {
    id: 'giddings',
    category: { fr: 'Alésage vertical', en: 'Vertical boring' },
    name: 'Giddings & Lewis',
    subtitle: { fr: 'CNC conversationnel', en: 'Conversational CNC' },
    specs: [
      { label: 'Ø', value: '59"' },
      { label: 'H', value: '48"' },
    ],
  },
]

export type Row = {
  type: { fr: string; en: string }
  model: string
  spec: string
}

export const LATHES: Row[] = [
  {
    type: { fr: 'Tour conventionnel', en: 'Conventional lathe' },
    model: 'Yunnan',
    spec: 'Ø 18" × 80"',
  },
  {
    type: { fr: 'Tour CNC', en: 'CNC lathe' },
    model: 'Conversational',
    spec: 'Ø 21" × 65"',
  },
  {
    type: { fr: 'Tour conventionnel', en: 'Conventional lathe' },
    model: 'Tarnow',
    spec: 'Ø 21" × 120"',
  },
  {
    type: { fr: 'Tour conventionnel', en: 'Conventional lathe' },
    model: 'Prestige',
    spec: 'Ø 14" × 40"',
  },
  {
    type: { fr: 'Rectifieuse plane', en: 'Surface grinder' },
    model: '—',
    spec: '30" × 12"',
  },
  {
    type: { fr: 'Rectifieuse plane', en: 'Surface grinder' },
    model: '—',
    spec: '60" × 10"',
  },
  {
    type: { fr: 'Fraiseuse', en: 'Milling' },
    model: 'TOS',
    spec: 'X 36" · Y 18" · Z 18"',
  },
  {
    type: { fr: 'Perceuse radiale', en: 'Radial drill' },
    model: '—',
    spec: 'Ø 2¼"',
  },
  {
    type: { fr: 'Alésage portatif', en: 'Portable boring' },
    model: '—',
    spec: 'Ø 1.25" → Ø 12"',
  },
]

export type Capability = {
  id: string
  icon: 'flame' | 'wrench' | 'crane' | 'saw' | 'spray' | 'factory'
  title: { fr: string; en: string }
  detail: { fr: string; en: string }
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'welding',
    icon: 'flame',
    title: { fr: 'Soudage complet', en: 'Complete welding' },
    detail: {
      fr: 'Aluminium · inox · acier · fonte d\'acier · fonte ductile · laiton',
      en: 'Aluminum · stainless · steel · cast steel · ductile iron · brass',
    },
  },
  {
    id: 'maintenance',
    icon: 'wrench',
    title: {
      fr: 'Entretien mécanique industriel',
      en: 'Industrial mechanical maintenance',
    },
    detail: {
      fr: 'Interventions en atelier et sur site',
      en: 'In-shop and on-site interventions',
    },
  },
  {
    id: 'crane',
    icon: 'crane',
    title: { fr: 'Pont roulant', en: 'Overhead crane' },
    detail: { fr: 'Capacité 7 tonnes', en: '7-ton capacity' },
  },
  {
    id: 'saw',
    icon: 'saw',
    title: { fr: 'Scie de coupe', en: 'Cutting saw' },
    detail: { fr: 'Jusqu\'à 18"', en: 'Up to 18"' },
  },
  {
    id: 'sandblast',
    icon: 'spray',
    title: { fr: 'Sablage et peinture', en: 'Sandblast and paint' },
    detail: { fr: 'Finition industrielle', en: 'Industrial finish' },
  },
  {
    id: 'area',
    icon: 'factory',
    title: { fr: 'Superficie de travail', en: 'Working area' },
    detail: { fr: '12 500 pi²', en: '12,500 sq ft' },
  },
]
