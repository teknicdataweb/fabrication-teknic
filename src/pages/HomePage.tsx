import Hero from '../components/Hero'
import ServicesShowcase from '../components/ServicesShowcase'
import Equipements from '../components/Equipements'
import Portfolio from '../components/Portfolio'
import ContactCta from '../components/ContactCta'
import LocationReviews from '../components/LocationReviews'
import { usePageMeta } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

export default function HomePage() {
  const { t } = useLang()
  usePageMeta(
    t('Usinage CNC, fabrication et soudure à Nicolet | TEK-NIC', 'CNC Machining, Fabrication & Welding in Nicolet | TEK-NIC'),
    t(
      'Fabrication TEK-NIC : usinage CNC, fabrication métallique, soudure, mécanique industrielle et impression 3D à Nicolet, Centre-du-Québec. Demandez une soumission.',
      'Fabrication TEK-NIC: CNC machining, metal fabrication, welding, industrial mechanics and 3D printing in Nicolet, Quebec. Request a quote.'
    ),
    '/'
  )

  return (
    <>
      <Hero />
      <ServicesShowcase />
      <Equipements teaser />
      <Portfolio teaser />
      <ContactCta />
      <LocationReviews />
    </>
  )
}
