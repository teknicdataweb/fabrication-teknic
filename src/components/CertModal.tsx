import { useEffect } from 'react'

export type CertImage = { src: string; alt: string; caption: string }

/** Visor a pantalla completa: se cierra con la X, Escape o clic fuera de la imagen */
export default function CertModal({ image, onClose }: { image: CertImage; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer"
        className="absolute top-4 right-4 w-10 h-10 rounded-full border border-white/30 text-white text-xl leading-none hover:bg-white/10"
      >
        ×
      </button>
      <img
        src={image.src}
        alt={image.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[80vh] max-w-full object-contain rounded-sm shadow-2xl bg-white"
      />
      <p className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase text-white/70 text-center">{image.caption}</p>
    </div>
  )
}
