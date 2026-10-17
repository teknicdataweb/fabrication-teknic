import Soumission from '../components/Soumission'
import Contact from '../components/Contact'
import LocationReviews from '../components/LocationReviews'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

export default function ContactPage() {
  const { t } = useLang()
  usePageMeta(
    t('Soumission gratuite et contact | Fabrication TEK-NIC', 'Free Quote & Contact | Fabrication TEK-NIC'),
    t(
      "Demandez une soumission gratuite à Fabrication TEK-NIC, atelier d'usinage et de fabrication à Nicolet, Québec. Réponse sous 24 à 48 heures.",
      'Request a free quote from Fabrication TEK-NIC, a machining and fabrication shop in Nicolet, Quebec. Reply within 24 to 48 hours.'
    ),
    '/contact',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: 'Contact', path: '/contact' },
    ])
  )
  return (
    <>
      <Contact asH1 />
      <Soumission />
      <LocationReviews />
    </>
  )
}
