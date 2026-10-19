import { useCallback, useEffect, useRef, useState } from 'react'
import { Check } from 'lucide-react'

/** Aviso breve en la parte baja de la pantalla (por ejemplo "Número copiado") */
export function useToast() {
  const [message, setMessage] = useState<string | null>(null)
  const timer = useRef<number | undefined>(undefined)

  const show = useCallback((text: string) => {
    setMessage(text)
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setMessage(null), 4500)
  }, [])

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const toast = (
    <div
      role="status"
      aria-live="polite"
      className={`fixed left-1/2 bottom-24 z-[300] -translate-x-1/2 max-w-[92vw] transition-all duration-300 ${
        message ? 'opacity-100 translate-y-0' : 'pointer-events-none opacity-0 translate-y-3'
      }`}
    >
      {message && (
        <div className="flex items-center gap-3 rounded-full border border-white/15 bg-[#0b0b0b]/95 px-5 py-3 shadow-[0_10px_40px_rgba(0,0,0,0.6)] backdrop-blur">
          <Check className="h-4 w-4 shrink-0 text-teknic-red" strokeWidth={2.5} />
          <span className="font-sans text-sm text-white/90">{message}</span>
        </div>
      )}
    </div>
  )

  return { show, toast }
}
