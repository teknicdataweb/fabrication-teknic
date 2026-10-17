import { useEffect } from 'react'
import { useLang, localizePath } from './i18n'
import type { Lang } from './i18n'

const SITE = 'https://teknicweb.netlify.app'

/** Netlify sirve /services como /services/, así que la URL canónica lleva barra final.
 *  `frPath` es la ruta en francés; con `lang` se obtiene la de ese idioma. */
export const canonicalUrl = (frPath: string, lang: Lang = 'fr') => {
  const path = localizePath(frPath, lang)
  return SITE + (path === '/' ? '/' : path.replace(/\/$/, '') + '/')
}

function setMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Actualiza título, descripción, URL canónica, idiomas alternativos, Open Graph/Twitter y datos estructurados (JSON-LD).
 *  `path` es la ruta en francés (por ejemplo '/equipements'); el idioma actual se toma de la dirección. */
export function usePageMeta(title: string, description: string, path: string, jsonLd?: object) {
  const { lang } = useLang()

  useEffect(() => {
    const url = canonicalUrl(path, lang)
    document.title = title

    setMeta('meta[name="description"]', 'name', 'description', description)
    setMeta('meta[property="og:title"]', 'property', 'og:title', title)
    setMeta('meta[property="og:description"]', 'property', 'og:description', description)
    setMeta('meta[property="og:url"]', 'property', 'og:url', url)
    setMeta('meta[property="og:locale"]', 'property', 'og:locale', lang === 'en' ? 'en_CA' : 'fr_CA')
    setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMeta('meta[name="twitter:url"]', 'name', 'twitter:url', url)

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

    // Versiones en cada idioma de la misma página (hreflang)
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
    const alternates: [string, string][] = [
      ['fr', canonicalUrl(path, 'fr')],
      ['en', canonicalUrl(path, 'en')],
      ['x-default', canonicalUrl(path, 'fr')],
    ]
    alternates.forEach(([hreflang, href]) => {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hreflang
      link.href = href
      document.head.appendChild(link)
    })

    // JSON-LD propio de la página (se reemplaza al cambiar de ruta)
    document.getElementById('page-jsonld')?.remove()
    if (jsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'page-jsonld'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
    return () => document.getElementById('page-jsonld')?.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, description, path, lang, jsonLd ? JSON.stringify(jsonLd) : ''])
}

/** Migas de pan para buscadores (rutas en francés; `lang` define el idioma de las direcciones) */
export function breadcrumbLd(items: { name: string; path: string }[], lang: Lang = 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: canonicalUrl(it.path, lang),
    })),
  }
}

export { SITE }
