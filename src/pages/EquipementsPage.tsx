import Equipements from '../components/Equipements'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

export default function EquipementsPage() {
  const { lang, t } = useLang()
  usePageMeta(
    t('Équipements CNC, tours et soudage | TEK-NIC', 'CNC Machines, Lathes & Welding Equipment | TEK-NIC'),
    t(
      "Centres d'usinage CNC, aléseuses, tours, rectifieuses et soudage : le parc machine de notre atelier de 12 500 pi² à Nicolet, Québec.",
      'CNC machining centers, boring mills, lathes, grinders and welding: the machine fleet of our 12,500 sq ft shop in Nicolet, Quebec.'
    ),
    '/equipements',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: t('Équipements', 'Equipment'), path: '/equipements' },
    ], lang)
  )
  return <Equipements asH1 />
}
