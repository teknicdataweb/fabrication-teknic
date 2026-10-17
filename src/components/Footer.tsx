import { Link } from 'react-router-dom'
import { setConsent } from '../lib/consent'
import { QuebecFlag, CanadaFlag } from './Flags'
import { useLang } from '../lib/i18n'

const linkClass =
  'font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase hover:text-teknic-red transition-colors'

export default function Footer() {
  const { t } = useLang()
  return (
    <footer className="relative w-full bg-[#050505] text-white border-t border-white/5">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="flex items-center gap-3">
          <img
            src="/logo-teknic.png"
            alt="Fabrication TEK-NIC"
            className="h-8 w-auto opacity-80"
          />
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            © {new Date().getFullYear()} · {t('Tous droits réservés', 'All rights reserved')}
          </span>
        </div>
        <nav aria-label={t('Informations légales', 'Legal information')} className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href={t('/legal/confidentialite.html', '/legal/confidentialite.en.html')} className={linkClass}>
            {t('Confidentialité', 'Privacy')}
          </a>
          <a href={t('/legal/conditions.html', '/legal/conditions.en.html')} className={linkClass}>
            {t('Conditions', 'Terms')}
          </a>
          <a href={t('/legal/cookies.html', '/legal/cookies.en.html')} className={linkClass}>
            {t('Cookies', 'Cookies')}
          </a>
          <Link to="/carrieres" className={linkClass}>
            {t('Carrières', 'Careers')}
          </Link>
          <button type="button" onClick={() => setConsent(null)} className={linkClass}>
            {t('Gérer les témoins', 'Manage cookies')}
          </button>
          <a
            href="/"
            className={linkClass}
          >
            {t('Retour en haut', 'Back to top')}
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Nicolet · {t('Québec', 'Quebec')}
          </span>
          <span className="flex items-center gap-2" aria-hidden="false">
            <QuebecFlag title={t('Drapeau du Québec', 'Flag of Quebec')} />
            <CanadaFlag title={t('Drapeau du Canada', 'Flag of Canada')} />
          </span>
        </div>
      </div>
      <div className="border-t border-white/5">
        <a
          href="https://www.dgreatai.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Powered by DGreat.AI — dgreatai.com"
          className="group flex items-center justify-center gap-4 py-5"
        >
          <span className="font-mono text-[10px] tracking-[0.4em] uppercase text-white/40 transition-colors group-hover:text-white/70">
            Powered by
          </span>
          <img
            src="/brand/dgreat-logo.png"
            alt="DGreat.AI"
            loading="lazy"
            className="h-6 w-auto opacity-80 transition-opacity group-hover:opacity-100"
          />
        </a>
      </div>
    </footer>
  )
}
