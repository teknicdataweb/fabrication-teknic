// Después de `vite build`: crea un index.html por ruta con título, descripción, canonical y
// etiquetas Open Graph/Twitter propios (en francés, el idioma predeterminado).
// Así los buscadores y las redes sociales (WhatsApp, Facebook…) que no ejecutan JavaScript
// ven los datos correctos de cada página. La aplicación sigue funcionando igual.
// Mantener estos textos alineados con los de src/pages/*.tsx.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const SITE = 'https://teknicweb.netlify.app'
const dist = 'dist'
const template = readFileSync(join(dist, 'index.html'), 'utf8')

// Servicios: se leen de src/data/services.ts para no duplicar los textos
const servicesSrc = readFileSync('src/data/services.ts', 'utf8')
const literal = (str) => new Function(`return ${str}`)()
const titleCase = (name) =>
  name
    .split(' ')
    .map((w) => (/\d/.test(w) ? w : w.charAt(0) + w.slice(1).toLowerCase()))
    .join(' ')

const services = []
const re = /id: '([^']+)',[\s\S]*?name: \{ fr: ('(?:[^'\\]|\\.)*'),[\s\S]*?description: \{\s*fr:\s*("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*')/g
let m
while ((m = re.exec(servicesSrc))) {
  services.push({ id: m[1], name: literal(m[2]), description: literal(m[3]) })
}
if (services.length === 0) throw new Error('No se encontraron servicios en src/data/services.ts')

const routes = [
  {
    path: '/services',
    title: "Services d'usinage, fabrication et soudure | TEK-NIC",
    description:
      'Usinage CNC, fabrication métallique, soudure, mécanique industrielle et impression 3D à Nicolet, Québec. Un seul atelier pour tout votre projet.',
  },
  {
    path: '/equipements',
    title: 'Équipements CNC, tours et soudage | TEK-NIC',
    description:
      "Centres d'usinage CNC, aléseuses, tours, rectifieuses et soudage : le parc machine de notre atelier de 12 500 pi² à Nicolet, Québec.",
  },
  {
    path: '/portfolio',
    title: 'Réalisations : pièces usinées et soudées | TEK-NIC',
    description:
      'Réalisations de Fabrication TEK-NIC : pièces usinées, soudées et fabriquées sur mesure en acier, aluminium et inox, à Nicolet, Québec.',
  },
  {
    path: '/contact',
    title: 'Soumission gratuite et contact | Fabrication TEK-NIC',
    description:
      "Demandez une soumission gratuite à Fabrication TEK-NIC, atelier d'usinage et de fabrication à Nicolet, Québec. Réponse sous 24 à 48 heures.",
  },
  {
    path: '/carrieres',
    title: 'Carrières et emplois à Nicolet | Fabrication TEK-NIC',
    description:
      "Joignez-vous à Fabrication TEK-NIC : emplois en usinage CNC, soudure et mécanique industrielle à Nicolet, Québec. Postulez dès aujourd'hui.",
  },
  ...services.map((s) => ({
    path: `/services/${s.id}`,
    title: `${titleCase(s.name)} à Nicolet | Fabrication TEK-NIC`,
    description: s.description,
  })),
]

const esc = (v) => v.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

function setContent(html, selector, value) {
  // selector: p. ej. 'name="description"' → reemplaza el content de esa etiqueta <meta>
  const rx = new RegExp(`(<meta\\s+${selector}\\s+content=")[^"]*(")`)
  if (!rx.test(html)) throw new Error(`No se encontró la etiqueta meta ${selector}`)
  return html.replace(rx, `$1${esc(value)}$2`)
}

let count = 0
for (const r of routes) {
  const url = `${SITE}${r.path}/`
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(r.title)}</title>`)
  html = setContent(html, 'name="description"', r.description)
  html = setContent(html, 'property="og:title"', r.title)
  html = setContent(html, 'property="og:description"', r.description)
  html = setContent(html, 'property="og:url"', url)
  html = setContent(html, 'name="twitter:title"', r.title)
  html = setContent(html, 'name="twitter:description"', r.description)
  html = setContent(html, 'name="twitter:url"', url)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`)

  const dir = join(dist, r.path)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'index.html'), html)
  count++
}
console.log(`generate-route-meta: ${count} páginas generadas`)
