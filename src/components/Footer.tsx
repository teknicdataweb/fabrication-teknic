import { setConsent } from '../lib/consent'

const linkClass =
  'font-mono text-[10px] tracking-[0.3em] text-white/40 uppercase hover:text-teknic-red transition-colors'

export default function Footer() {
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
            © {new Date().getFullYear()} · Tous droits réservés
          </span>
        </div>
        <nav aria-label="Informations légales" className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <a href="/legal/confidentialite.html" className={linkClass}>
            Confidentialité
          </a>
          <a href="/legal/conditions.html" className={linkClass}>
            Conditions
          </a>
          <a href="/legal/cookies.html" className={linkClass}>
            Cookies
          </a>
          <button type="button" onClick={() => setConsent(null)} className={linkClass}>
            Gérer les témoins
          </button>
          <a
            href="#accueil"
            className={linkClass}
          >
            Retour en haut
          </a>
        </nav>
        <div className="flex items-center gap-6">
          <span className="font-mono text-[10px] tracking-[0.3em] text-white/30 uppercase">
            Nicolet · Québec
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
