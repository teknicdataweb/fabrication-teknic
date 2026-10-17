import Equipements from '../components/Equipements'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

export default function EquipementsPage() {
  const { t } = useLang()
  usePageMeta(
    t('Équipements CNC, tours et soudage | TEK-NIC', 'CNC Machines, Lathes & Welding Equipment | TEK-NIC'),
    t(
      'Centres CNC, tours, rectifieuses et capacités de soudage de notre atelier à Nicolet, Québec.',
      'CNC centers, lathes, grinders and welding capabilities of our shop in Nicolet, Quebec.'
    ),
    '/equipements',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: t('Équipements', 'Equipment'), path: '/equipements' },
    ])
  )
  return <Equipements asH1 />
}
