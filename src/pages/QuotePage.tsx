import Soumission from '../components/Soumission'
import Contact from '../components/Contact'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

/** Página única de soumission: formulario (con el servicio ya elegido) y, debajo, los teléfonos de la oficina y de los socios */
export default function QuotePage() {
  const { lang, t } = useLang()
  usePageMeta(
    t('Demande de soumission | Fabrication TEK-NIC', 'Request a Quote | Fabrication TEK-NIC'),
    t(
      "Demandez une soumission gratuite pour votre projet d'usinage, de fabrication ou de conception à Nicolet, Québec. Réponse sous 24 à 48 heures.",
      'Request a free quote for your machining, fabrication or design project in Nicolet, Quebec. Reply within 24 to 48 hours.'
    ),
    '/soumission',
    breadcrumbLd(
      [
        { name: t('Accueil', 'Home'), path: '/' },
        { name: t('Soumission', 'Quote'), path: '/soumission' },
      ],
      lang
    )
  )
  return (
    <>
      <Soumission asH1 />
      <Contact compact />
    </>
  )
}
