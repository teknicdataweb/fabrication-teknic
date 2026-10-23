import Soumission from '../components/Soumission'
import Contact from '../components/Contact'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

/** Soumission dedicada a la impresión 3D (servicio con el socio DG Innovation 3D) */
export default function Quote3DPage() {
  const { lang, t } = useLang()
  usePageMeta(
    t('Soumission impression 3D | Fabrication TEK-NIC', '3D Printing Quote | Fabrication TEK-NIC'),
    t(
      "Demandez une soumission pour votre projet d'impression 3D industrielle : prototypes, modèles et pièces techniques, avec notre partenaire DG Innovation 3D.",
      'Request a quote for your industrial 3D printing project: prototypes, models and technical parts, with our partner DG Innovation 3D.'
    ),
    '/soumission-3d',
    breadcrumbLd(
      [
        { name: t('Accueil', 'Home'), path: '/' },
        { name: 'Services', path: '/services' },
        { name: t('Impression 3D', '3D printing'), path: '/services/3d' },
        { name: t('Soumission', 'Quote'), path: '/soumission-3d' },
      ],
      lang
    )
  )
  return (
    <>
      <Soumission asH1 variant="3d" />
      <Contact compact only3d />
    </>
  )
}
