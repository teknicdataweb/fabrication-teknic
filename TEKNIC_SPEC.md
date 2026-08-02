# Fabrication TEK-NIC — Detailed Technical & Design Specification Prompt

Este prompt es el blueprint completo para recrear el sitio web de **Fabrication TEK-NIC** (usinage, fabrication, soudure, mécanique industrielle) con la misma arquitectura, animaciones y calidad visual del sitio "Maison Horlogerie", pero adaptado al universo industrial: metal, precisión CNC, chispas de soldadura, maquinaria pesada.

---

## 1. Project Overview & Tech Stack

- **Framework:** React 18+ via Vite
- **Language:** TypeScript
- **Styling:** Tailwind CSS (v3) + PostCSS
- **Animation Engine:** GSAP (Core + ScrollTrigger) & Framer Motion
- **Smooth Scrolling:** Lenis (`lenis` package)
- **Icons:** `lucide-react` (Wrench, Cog, Flame, HardHat, Factory, Zap, Ruler)
- **Architecture:** Single-page scroll application con secciones pinned, scroll horizontal, morphs de fondo, parallax de metal/chispas, y transición cinematográfica entre servicios.

---

## 2. Visual Design System

### Typography

- **Primary Font (Headings/Display):** `Bodoni Moda` o alternativa industrial elegante `Oswald` / `Anton` (Sans Condensed Bold) — para transmitir peso industrial.
  - **Recomendación:** `Anton` (Display) para títulos masivos, evoca acero laminado y fuerza industrial.
  - Weights: `700` – `900`.
- **Secondary Font (Body/Labels):** `Inter` o `JetBrains Mono` para specs técnicas (tolerancias, medidas en pulgadas, capacidades).
  - Weights: `300` (Light) para copy, `700` (Bold) para labels técnicos y botones.

### Color Palette

- **Base Backgrounds:** Negro puro (`#000000`) y grafito profundo (`#0A0A0A`).
- **Text:** Blanco (`#FFFFFF`) con opacidades (`/40`, `/60`, `/70`, `/80`) para jerarquía.
- **Accent Principal:** Rojo TEK-NIC (`#C8102E` — tomado del logo original) para hover states, subrayados, íconos activos, chispas de soldadura.
- **Accent Secundario:** Naranja hierro fundido (`#F97316`) para elementos de calor/forja.

**Dynamic Service Colors (Tailwind Config):**

```javascript
colors: {
  teknic: {
    red: '#C8102E',
    steel: '#4A5568',
    graphite: '#0A0A0A',
    spark: '#F97316'
  },
  usinage:    { light: '#94A3B8', mid: '#334155', dark: '#0F172A' }, // acero cepillado
  fabrication:{ light: '#FCD34D', mid: '#F59E0B', dark: '#451A03' }, // chispas / forja
  soudure:    { light: '#60A5FA', mid: '#2563EB', dark: '#1E3A8A' }, // arco eléctrico azul
  mecanique:  { light: '#FCA5A5', mid: '#DC2626', dark: '#450A0A' }  // rojo TEK-NIC
}
```

---

## 3. Core Architecture & Global Setup

### Lenis Smooth Scroll

Inicializar Lenis en el root de `App` con integración GSAP ticker:
- `duration: 1.2`
- `easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))`
- `smoothWheel: true`
- Registrar `lenis.raf(time * 1000)` en `gsap.ticker` y `gsap.ticker.lagSmoothing(0)`.

### Navigation (`Navbar.tsx`)

- **State:** Fijo top layer (`z-50`).
- **Contenido:** Logo TEK-NIC (izquierda) + links `ACCUEIL · SERVICES · ÉQUIPEMENTS · PORTFOLIO · CONTACT` + toggle idioma `FR | EN`.
- **Scroll Behavior:** Transparente al inicio; al pasar 50px transiciona a glassmorphism oscuro (`bg-black/40 backdrop-blur-md border-b border-white/10`).
- **Hover links:** subrayado rojo `#C8102E` animado con GSAP (`width: 0 → 100%`).

---

## 4. Section-by-Section Specifications

### Section 1: Hero / Accueil (`Home.tsx`)

- **Layout:** `h-screen w-full` flex-centered.
- **Background:** Video loop en full-screen mostrando plano macro de una fresadora CNC cortando metal, con chispas y fluido de corte. Overlay gradiente `from-black/80 via-black/40 to-black`.
  - Alternativa: video de brazo de soldadura con arco eléctrico.
- **Typography:**
  - Eyebrow: `"DEPUIS 1996 · NICOLET, QC"` — Inter, `text-sm`, `tracking-[0.4em]`, `text-white/60`.
  - Título principal: `"L'ART DU MÉTAL"` — Anton/Bodoni, `text-5xl` → `text-9xl`, stacked en `flex-col`.
  - Subtítulo: `"Usinage · Fabrication · Soudure · Conception"` — Inter Light, `tracking-widest`.
  - CTA: botón pill `"DÉCOUVRIR NOS SERVICES"` con borde `border-white/20`, hover a fondo rojo `#C8102E`.
- **Animaciones (GSAP):**
  - Cada palabra del título entra con `y: 100, opacity: 0` → `y: 0, opacity: 1`, stagger 0.15s, ease `power4.out`.
  - Parallax: el contenedor completo hace `scale: 0.85` + `opacity: 0` al scrollear (ScrollTrigger scrub).
- **Detalle industrial:** partículas de chispas SVG cayendo lento en background (`pointer-events-none`), rojas/naranjas, con `mix-blend-screen`.

---

### Section 2: Services Showcase (`ServicesShowcase.tsx`) — *equivalente a Collections*

- **Layout:** Full-screen pinned. `ScrollTrigger` pinea el contenedor por `+=1200px` para scrollear entre 4 servicios.
- **Mecánica:** `self.progress` mapea a `activeIndex` (0 a 3), disparando `AnimatePresence` de Framer Motion.
- **Left Column:** Número del servicio (`01 / 04`), Nombre grande (Anton/Bodoni), Headline (Inter), botón `EN SAVOIR PLUS`.
- **Center Column:** Imagen absoluta masiva del servicio (altura hasta 90%), entra con `y: "100%", opacity: 0` y sale con ease.
- **Right Column:** Descripción + grid 2x2 de specs técnicas relevantes al servicio.
- **Background Morph:** Div de fondo que transiciona colores según `activeIndex` (usa la paleta `usinage/fabrication/soudure/mecanique`). Overlay de partículas SVG (limaduras metálicas, chispas, gotas de fluido de corte).

**Services Data (4 slides):**

1. **USINAGE**
   - Headline: *"Précision à 0.001° près"*
   - Descripción: *"Centres d'usinage horizontaux et verticaux CNC pour pièces jusqu'à 11 000 lb, avec rotation 360° et tolérances microniques."*
   - Specs Grid: `Capacité: 11 000 lb` · `Rotation: 360° / 0.001°` · `Course X: 80"` · `Course Y: 70"`
   - Imagen central: pieza torneada en aluminio pulido sobre fondo oscuro.
   - Color: `usinage` (acero cepillado azul-gris).

2. **FABRICATION**
   - Headline: *"Le métal, façonné à la demande"*
   - Descripción: *"Fabrication métallique sur mesure, structures, composants et assemblages complexes réalisés dans nos 12 500 pi² d'atelier."*
   - Specs Grid: `Atelier: 12 500 pi²` · `Pont roulant: 7 tonnes` · `Scie: jusqu'à 18"` · `Perceuse radiale: Ø 2¼"`
   - Imagen: estructura de acero fabricada, con reflejos anaranjados de forja.
   - Color: `fabrication` (chispas/forja).

3. **SOUDURE**
   - Headline: *"Chaque cordon, une signature"*
   - Descripción: *"Équipement complet pour souder aluminium, acier inoxydable, acier, fonte d'acier, fonte ductile et laiton avec finition impeccable."*
   - Specs Grid: `Aluminium` · `Inox` · `Fonte ductile` · `Laiton & Acier`
   - Imagen: arco de soldadura TIG con chispas azuladas.
   - Color: `soudure` (arco azul).

4. **MÉCANIQUE INDUSTRIELLE**
   - Headline: *"Réparation, entretien, remise à neuf"*
   - Descripción: *"Réparation de composants mécaniques, entretien industriel, jet de sable et peinture — tout au même endroit."*
   - Specs Grid: `Réparation` · `Entretien` · `Sablage` · `Peinture industrielle`
   - Imagen: engranaje industrial reacondicionado (naranja como el de tus fotos).
   - Color: `mecanique` (rojo TEK-NIC).

---

### Section 3: Héritage (`Heritage.tsx`)

- **Layout:** Asimétrico side-by-side. `bg-[#0A0A0A]`.
- **Left Side (Imagen):** Contenedor 50vh-80vh con reveal por `clip-path: inset(...)`. Foto blanco y negro de la nave industrial TEK-NIC con `grayscale` y `mix-blend-luminosity`. Parallax `y: "20%"`.
- **Right Side (Texto):**
  - Eyebrow: `"NICOLET, QUÉBEC"` — rojo `#C8102E`, tracking-wide.
  - Título: *"Un héritage forgé dans l'acier"* (Anton/Bodoni).
  - Párrafo: *"Depuis notre atelier au 50, Route Marie-Victorin à Nicolet, Fabrication TEK-NIC combine tous les niveaux de services — usinage, fabrication, soudure, mécanique industrielle — au même endroit. Notre mission : être une entreprise manufacturière axée sur la qualité et le service, avec l'expertise et le niveau d'automatisation pour répondre aux demandes les plus complexes."*
  - Badge de premio: *"Lauréat régional · Concours québécois en entrepreneuriat — Exploitation, transformation, production"* con ícono trophy dorado.
  - Reveal GSAP staggered.

---

### Section 4: Équipements / Craftsmanship (`Equipements.tsx`)

- **Layout:** Sección alta (`150vh`) con `sticky top-0 h-screen` para mantener el contenido pinned mientras scrollea.
- **Background Layer:** Macro shot de un cabezal de fresadora CNC o brocas girando. Escala `1.2 → 1.5` y `y: "20%"` via GSAP scrub. Elemento decorativo: círculo con borde dashed rotando (`animate-[spin_120s_linear_infinite]`) simulando volante/torno.
- **Foreground Text:** Centrado, *"Précision Invisible"* / *"Unseen Precision"* — fade in en `start: "top 60%"`, fade out en `start: "bottom 80%"` con scrub.
- **Below fold:** Lista/carrusel horizontal de equipamiento clave:
  - `Horizontal Boring Mill Maxcut — X 80" Y 70" Z 55.125" · 11 000 lb · 360°/0.001°`
  - `Machining Center Mitsubishi CNC — X 49.25" Y 27.625" Z 25.625"`
  - `Vertical Boring Mill Giddings & Lewis — Ø 59" x 48"`
  - `Tour conventionnel Tarnow — Ø 21" x 120"`
  - `Tour CNC — Ø 21" x 65"`
  - `Rectifieuse plane — 60" x 10"`
  - `Fraiseuse TOS — X 36" Y 18" Z 18"`
  - `Perceuse radiale — Ø 2¼"`
  - `Alésage portatif — Ø 1.25" jusqu'à Ø 12"`
  - `Pont roulant — 7 tonnes`

Cada línea con la spec en `JetBrains Mono` para look técnico.

---

### Section 5: Portfolio / Gallery (`Portfolio.tsx`)

- **Layout:** Scroll horizontal GSAP. Contenedor `h-screen` pinned; flex interno se mueve `x: -totalWidth` con scrub.
- **Velocity Skew:** `gsap.quickSetter` aplica `skewX` a `.gallery-item` según velocidad de scroll (clamp -15° a 15°).
- **Contenido:** Grid horizontal de proyectos reales de TEK-NIC — usar las fotos que ya tienes:
  - Piezas cilíndricas de aluminio mecanizadas
  - Ejes torneados con brida
  - Componentes prismáticos fresados
  - Cono de precisión
  - Bloque motor mecanizado
  - Impeller/hélice
  - Vista de máquinas Maxcut en operación
  - Estructura naranja masiva con engranaje (la última foto que compartiste)
- **Fullscreen Modal:** click en imagen abre modal Framer Motion `AnimatePresence`, flechas laterales, botón close, imagen borderless + descripción debajo (`Nom du projet · Matériau · Tolérance · Client (si divulgué)`).
- **Intro tag:** *"Fabrication TEK-NIC peut réaliser une multitude de projets, simples ou complexes. Voici quelques exemples."*

---

### Section 6: Contact & Footer (`Contact.tsx`)

- **Animaciones:** `framer-motion` + `useInView` de `react-intersection-observer` (threshold 0.3) para fade-ins `y: 30`.
- **Form Layout:** Estética industrial oscura. Inputs transparentes con `border-b border-white/20`, focus con `border-[#C8102E]`.
  - Campos: `Nom` · `Entreprise` · `Courriel` · `Téléphone` · `Type de projet` (dropdown: Usinage / Fabrication / Soudure / Réparation / Autre) · `Description du projet` (textarea).
  - CTA: `"DEMANDER UNE SOUMISSION"` con hover a fondo rojo.
- **Coordenadas TEK-NIC (columna lateral):**
  - **Adresse:** `50, Route Marie-Victorin, Nicolet, QC J3T 1A1`
  - **Téléphone:** `819-870-3271`
  - **Heures:** `Lundi – Vendredi · 7h à 17h`
  - Mini mapa opcional embebido (tile oscuro).
- **Footer:** Flex row con logo `FABRICATION TEK-NIC` (rojo/blanco), links sociales, badge del premio, y `© 2026 Fabrication TEK-NIC · Tous droits réservés`.

---

## 5. Animations & Micro-interactions

- **Custom Cursor:** Elemento DOM fijo con spring/GSAP `quickTo`. Sobre imágenes de portfolio se agranda y muestra `VOIR`. Sobre botones se contrae a punto rojo.
- **Botones:** Pill, `border-white/20` transparente, hover → fondo `#C8102E`, texto blanco, `scale: 1.05`.
- **Chispas SVG:** partículas naranja/rojas cayendo con `y` random y `opacity` fade, distribuidas en Hero y Section transitions.
- **Sonido opcional:** hover sutil (click metálico) — opcional, deshabilitado por defecto.
- **Stagger & Masks:** GSAP `clip-path: inset(...)` para reveals de imagen; `y: 50, opacity: 0` para stagger de texto.

---

## 6. Asset Specifications

Estructura recomendada en `/public/`:

```
/public/
  /videos/
    hero_cnc.mp4          → macro fresadora en operación (loop)
    welding_arc.mp4       → opcional para sección Soudure
  /images/
    services/
      usinage.png         → pieza torneada aluminio pulido
      fabrication.png     → estructura de acero
      soudure.png         → arco TIG con chispas
      mecanique.png       → engranaje/componente reacondicionado
    heritage.png          → nave industrial B&N
    craftsmanship.png     → macro cabezal CNC
    portfolio/
      p01.png … p12.png   → tus fotos actuales (piezas, máquinas, engranaje naranja)
    logo-teknic.svg       → logo vectorial
    logo-teknic-white.svg
```

**Fuentes de video (usar propias o CDN de stock):** grabaciones reales de tu taller son ideales — CNC en corte, brazo de soldadura, torno girando. Alternativas Pexels/Pixabay libres para prototipo.

---

## 7. Performance & Optimization

- **Lenis + GSAP:** `gsap.ticker.lagSmoothing(0)` y `lenis.raf(time * 1000)` registrado en el ticker de GSAP.
- **Imágenes/Videos:** WebP para imágenes, `.mp4` H.264 comprimido (< 3MB por loop). `pointer-events-none` en overlays y partículas.
- **State Updates:** Dentro del Services Showcase pinned, envolver el cambio de índice en un `useRef` check para evitar re-renders por cada pixel de scroll.
- **Lazy loading:** portfolio images con `loading="lazy"` fuera de viewport.

---

## 8. Responsive Behavior

- Tailwind `md:` y `lg:` en todo.
- **Mobile:**
  - Services Showcase stackea vertical (imagen arriba, texto debajo, sin pin horizontal).
  - Reducir partículas a la mitad.
  - Font sizes: `text-8xl` → `text-5xl`; `text-9xl` → `text-6xl`.
  - Parallax minimizado (los touch devices sufren con scrub agresivo).
  - Portfolio scroll horizontal se vuelve grid vertical 1 columna.
- **Tablet:** grid 2 columnas en portfolio y equipements.

---

## 9. Contenido de textos claves (FR / EN listos)

### Tagline principal
- **FR:** *"L'art du métal — usinage, fabrication, soudure et mécanique industrielle."*
- **EN:** *"The art of metal — machining, fabrication, welding and industrial mechanics."*

### Mission
- **FR:** *"Fabrication TEK-NIC combine tous les niveaux de services au même endroit. Notre mission : être une entreprise manufacturière axée sur la qualité et le service à la clientèle, avec l'expertise et l'automatisation nécessaires pour répondre aux demandes de haute complexité."*
- **EN:** *"Fabrication TEK-NIC combines all levels of service under one roof. Our mission: to be a manufacturing company focused on quality and customer service, with the expertise and automation to meet high-complexity demands."*

### Reconocimiento
- **FR:** *"Lauréat régional du Concours québécois en entrepreneuriat — catégorie Exploitation, transformation, production."*
- **EN:** *"Regional winner of the Concours québécois en entrepreneuriat — Exploitation, transformation, production category."*

---

## 10. Diferencias clave vs. sitio de relojes (para no perder personalidad TEK-NIC)

| Watch site               | TEK-NIC site                                    |
|--------------------------|-------------------------------------------------|
| Dorado/rosa lujoso       | Rojo `#C8102E` + naranja forja + gris acero    |
| Bodoni elegante          | Anton/Oswald industrial + Bodoni títulos       |
| Video watch mechanism    | Video CNC corte / arco soldadura                |
| Partículas polvo dorado  | Chispas rojas/naranjas + limaduras metálicas    |
| "Collections"            | "Services"                                      |
| Specs: movement/reserve  | Specs: capacité/course/tolérance/tonnage        |
| "Heritage since 1884"    | "Nicolet, Québec · Lauréat régional"           |
| "Boutique locations"     | "Type de projet · Soumission"                  |

---

## 11. Checklist de implementación

- [ ] `npm create vite@latest teknic -- --template react-ts`
- [ ] Instalar: `tailwindcss postcss autoprefixer gsap lenis framer-motion lucide-react react-intersection-observer`
- [ ] Configurar Tailwind con la paleta custom TEK-NIC
- [ ] Estructura de carpetas: `/src/components/{Navbar, Home, ServicesShowcase, Heritage, Equipements, Portfolio, Contact}`
- [ ] Setup Lenis + GSAP ticker en `App.tsx`
- [ ] Registrar `ScrollTrigger` global
- [ ] Cargar fuentes: `Anton`, `Bodoni Moda`, `Inter`, `JetBrains Mono` (Google Fonts)
- [ ] Custom Cursor global
- [ ] Toggle FR / EN (i18n simple con context o `react-i18next`)
- [ ] Meta SEO: título, description, OG image con logo TEK-NIC
- [ ] Formulario contacto → Formspree / Resend / mailto fallback

---

**Resultado esperado:** un sitio con la misma sofisticación cinematográfica del prompt original de relojes, pero que transmita **peso industrial, precisión mecánica y confianza técnica** — el equivalente digital de entrar al taller de TEK-NIC y ver una fresadora Maxcut cortando una pieza de 11 000 libras con tolerancia de 0.001°.
