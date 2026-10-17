import type { ReactNode } from 'react'

/** Estilos compartidos de los formularios (clase .input) */
export function FormStyles() {
  return (
    <style>{`
        .input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.10);
          border-radius: 0.5rem;
          padding: 0.85rem 1rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          font-weight: 300;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          outline: none;
        }
        .input::placeholder { color: rgba(255,255,255,0.30); }
        .input:hover { border-color: rgba(255,255,255,0.20); }
        .input:focus {
          border-color: #C8102E;
          box-shadow:
            0 0 0 3px rgba(200,16,46,0.12),
            0 0 30px rgba(200,16,46,0.15);
          background: rgba(200,16,46,0.03);
        }
        .input:focus::placeholder { color: rgba(255,255,255,0.15); }
        select.input option { padding: 0.5rem; }
      `}</style>
  )
}

export function Field({
  label,
  required,
  children,
}: {
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block group">
      <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/50 mb-2 flex items-center gap-1">
        {label}
        {required && <span className="text-teknic-red">*</span>}
      </span>
      {children}
    </label>
  )
}
