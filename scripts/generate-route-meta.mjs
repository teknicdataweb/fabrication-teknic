// Después de `vite build`: crea un index.html por ruta e idioma (francés en la raíz, inglés bajo /en)
// con título, descripción, canonical, idiomas alternativos (hreflang) y etiquetas Open Graph/Twitter propios.
// También genera sitemap.xml. Así los buscadores y las redes sociales (WhatsApp, Facebook…) que no ejecutan
// JavaScript ven los datos correctos de cada página. La aplicación sigue funcionando igual.
// Mantener los textos alineados con los de src/pages/*.tsx.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://teknicweb.netlify.app'
const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

// ---- Rutas: francés en la raíz; inglés bajo /en, con dos nombres de ruta traducidos
const FR_TO_EN = { equipements: 'equipment', carrieres: 'careers' }
const localize = (frPath, lang) => {
  if (lang === 'fr') return frPath
  const segs = frPath.split('/').filter(Boolean)
  if (segs.length && FR_TO_EN[segs[0]]) segs[0] = FR_TO_EN[segs[0]]
  return '/en' + (segs.length ? '/' + segs.join('/') : '')
}
const urlFor = (frPath, lang) => {
  const p = localize(frPath, lang)
  return SITE + (p === '/' ? '/' : p.replace(/\/$/, '') + '/')
}

// ---- Servicios: se leen de src/data/services.ts para no duplicar los textos
const servicesSrc = readFileSync('src/data/services.ts', 'utf8')
const literal = (str) => new Function(`return ${str}`)()
const titleCase = (name) =>
  name
    .split(' ')
    .map((w) => (/\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ')
const STR = `(?:'(?:[^'\\\\]|\\\\.)*'|"(?:[^"\\\\]|\\\\.)*")`
const re = new RegExp(
  `id: '([^']+)',[\\s\\S]*?name: \\{ fr: (${STR}), en: (${STR}) \\},[\\s\\S]*?description: \\{\\s*fr:\\s*(${STR}),\\s*en:\\s*(${STR})`,
  'g'
)
const services = []
let m
while ((m = re.exec(servicesSrc))) {
  services.push({
    id: m[1],
    name: { fr: literal(m[2]), en: literal(m[3]) },
    description: { fr: literal(m[4]), en: literal(m[5]) },
  })
}
if (services.length === 0) throw new Error('No se encontraron servicios en src/data/services.ts')

const pages = [
  {
    path: '/',
    fr: {
      title: 'Usinage CNC, fabrication et soudure à Nicolet | TEK-NIC',
      description:
        'Fabrication TEK-NIC : usinage CNC, fabrication métallique, soudure, mécanique industrielle et impression 3D à Nicolet, Centre-du-Québec. Demandez une soumission.',
    },
    en: {
      title: 'CNC Machining, Fabrication & Welding in Nicolet | TEK-NIC',
      description:
        'Fabrication TEK-NIC: CNC machining, metal fabrication, welding, industrial mechanics and 3D printing in Nicolet, Quebec. Request a quote.',
    },
  },
  {
    path: '/services',
    fr: {
      title: "Services d'usinage, fabrication et soudure | TEK-NIC",
      description:
        'Usinage CNC, fabrication métallique, soudure, mécanique industrielle et impression 3D à Nicolet, Québec. Un seul atelier pour tout votre projet.',
    },
    en: {
      title: 'Machining, Fabrication & Welding Services | TEK-NIC',
      description:
        'CNC machining, metal fabrication, welding, industrial mechanics and 3D printing in Nicolet, Quebec. One shop for your whole project.',
    },
  },
  {
    path: '/equipements',
    fr: {
      title: 'Équipements CNC, tours et soudage | TEK-NIC',
      description:
        "Centres d'usinage CNC, aléseuses, tours, rectifieuses et soudage : le parc machine de notre atelier de 12 500 pi² à Nicolet, Québec.",
    },
    en: {
      title: 'CNC Machines, Lathes & Welding Equipment | TEK-NIC',
      description:
        'CNC machining centers, boring mills, lathes, grinders and welding: the machine fleet of our 12,500 sq ft shop in Nicolet, Quebec.',
    },
  },
  {
    path: '/portfolio',
    fr: {
      title: 'Réalisations : pièces usinées et soudées | TEK-NIC',
      description:
        'Réalisations de Fabrication TEK-NIC : pièces usinées, soudées et fabriquées sur mesure en acier, aluminium et inox, à Nicolet, Québec.',
    },
    en: {
      title: 'Our Work: Machined & Welded Parts | TEK-NIC',
      description:
        'Fabrication TEK-NIC projects: custom machined, welded and fabricated parts in steel, aluminum and stainless steel, made in Nicolet, Quebec.',
    },
  },
  {
    path: '/contact',
    fr: {
      title: 'Soumission gratuite et contact | Fabrication TEK-NIC',
      description:
        "Demandez une soumission gratuite à Fabrication TEK-NIC, atelier d'usinage et de fabrication à Nicolet, Québec. Réponse sous 24 à 48 heures.",
    },
    en: {
      title: 'Free Quote & Contact | Fabrication TEK-NIC',
      description:
        'Request a free quote from Fabrication TEK-NIC, a machining and fabrication shop in Nicolet, Quebec. Reply within 24 to 48 hours.',
    },
  },
  {
    path: '/carrieres',
    fr: {
      title: 'Carrières et emplois à Nicolet | Fabrication TEK-NIC',
      description:
        "Joignez-vous à Fabrication TEK-NIC : emplois en usinage CNC, soudure et mécanique industrielle à Nicolet, Québec. Postulez dès aujourd'hui.",
    },
    en: {
      title: 'Careers & Jobs in Nicolet | Fabrication TEK-NIC',
      description:
        'Join Fabrication TEK-NIC: jobs in CNC machining, welding and industrial mechanics in Nicolet, Quebec. Apply today.',
    },
  },
  ...services.map((s) => ({
    path: `/services/${s.id}`,
    fr: { title: `${titleCase(s.name.fr)} à Nicolet | Fabrication TEK-NIC`, description: s.description.fr },
    en: { title: `${titleCase(s.name.en)} in Nicolet | Fabrication TEK-NIC`, description: s.description.en },
  })),
]

// ---- Edición del HTML
const esc = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setContent(html, selector, value) {
  const rx = new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*(")`)
  if (!rx.test(html)) throw new Error(`No se encontró la etiqueta meta ${selector}`)
  return html.replace(rx, `$1${esc(value)}$2`)
}

function render(page, lang) {
  const { title, description } = page[lang]
  const url = urlFor(page.path, lang)
  let html = template
  html = html.replace(/<html lang="[^"]*"/, `<html lang="${lang}"`)
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
  html = setContent(html, 'name="description"', description)
  html = setContent(html, 'property="og:title"', title)
  html = setContent(html, 'property="og:description"', description)
  html = setContent(html, 'property="og:url"', url)
  html = setContent(html, 'property="og:locale"', lang === 'en' ? 'en_CA' : 'fr_CA')
  html = setContent(html, 'property="og:locale:alternate"', lang === 'en' ? 'fr_CA' : 'en_CA')
  html = setContent(html, 'name="twitter:title"', title)
  html = setContent(html, 'name="twitter:description"', description)
  html = setContent(html, 'name="twitter:url"', url)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)
  const alternates = [
    ['fr', urlFor(page.path, 'fr')],
    ['en', urlFor(page.path, 'en')],
    ['x-default', urlFor(page.path, 'fr')],
  ]
    .map(([l, href]) => `    <link rel="alternate" hreflang="${l}" href="${href}" />`)
    .join('\n')
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>/g, '')
  html = html.replace('</head>', `${alternates}\n  </head>`)
  return html
}

let count = 0
for (const page of pages) {
  for (const lang of ['fr', 'en']) {
    const html = render(page, lang)
    const p = localize(page.path, lang)
    const dir = p === '/' ? dist : join(dist, p)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, 'index.html'), html)
    count++
  }
}

// ---- sitemap.xml con las dos versiones de cada página
const legal = ['confidentialite', 'conditions', 'cookies']
const entry = (loc, alternates, priority, changefreq) =>
  `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n${alternates
    .map(([l, href]) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${href}" />`)
    .join('\n')}\n  </url>`
const priority = (p) => (p === '/' ? '1.0' : p.split('/').length > 2 ? '0.7' : '0.8')
const urls = []
for (const page of pages) {
  const alts = [
    ['fr', urlFor(page.path, 'fr')],
    ['en', urlFor(page.path, 'en')],
    ['x-default', urlFor(page.path, 'fr')],
  ]
  for (const lang of ['fr', 'en']) {
    urls.push(entry(urlFor(page.path, lang), alts, priority(page.path), page.path === '/' ? 'weekly' : 'monthly'))
  }
}
for (const l of legal) {
  const fr = `${SITE}/legal/${l}.html`
  const en = `${SITE}/legal/${l}.en.html`
  const alts = [['fr', fr], ['en', en]]
  urls.push(entry(fr, alts, '0.3', 'yearly'), entry(en, alts, '0.3', 'yearly'))
}
writeFileSync(
  join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`
)

console.log(`generate-route-meta: ${count} páginas y sitemap.xml generados`)
