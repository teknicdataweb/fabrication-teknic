import Portfolio from '../components/Portfolio'
import { usePageMeta, breadcrumbLd } from '../lib/pageMeta'
import { useLang } from '../lib/i18n'

export default function PortfolioPage() {
  const { t } = useLang()
  usePageMeta(
    t('Réalisations : pièces usinées et soudées | TEK-NIC', 'Our Work: Machined & Welded Parts | TEK-NIC'),
    t(
      'Réalisations de Fabrication TEK-NIC : pièces usinées, soudées et fabriquées sur mesure à Nicolet, Québec.',
      'Fabrication TEK-NIC projects: custom machined, welded and fabricated parts in Nicolet, Quebec.'
    ),
    '/portfolio',
    breadcrumbLd([
      { name: t('Accueil', 'Home'), path: '/' },
      { name: 'Portfolio', path: '/portfolio' },
    ])
  )
  return <Portfolio asH1 />
}
