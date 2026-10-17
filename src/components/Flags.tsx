/** Banderas de Québec y Canadá en SVG (los emojis no incluyen la bandera de Québec) */

const frame = 'inline-block h-3.5 w-auto rounded-[2px] ring-1 ring-white/15 shadow-sm'

function Fleur({ x, y }: { x: number; y: number }) {
  // Flor de lis simplificada, centrada en (x, y)
  return (
    <g transform={`translate(${x} ${y}) scale(0.5) translate(-12 -12)`} fill="#fff">
      <ellipse cx="12" cy="7" rx="2.2" ry="5.2" />
      <ellipse cx="7" cy="12" rx="2" ry="4.6" transform="rotate(-50 7 12)" />
      <ellipse cx="17" cy="12" rx="2" ry="4.6" transform="rotate(50 17 12)" />
      <rect x="7" y="15" width="10" height="1.8" rx="0.6" />
      <path d="M10 17.4 L12 22 L14 17.4 Z" />
    </g>
  )
}

export function QuebecFlag({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 60 40" role="img" aria-label={title} className={frame}>
      <title>{title}</title>
      <rect width="60" height="40" fill="#0055A4" />
      <rect x="26" width="8" height="40" fill="#fff" />
      <rect y="16" width="60" height="8" fill="#fff" />
      <Fleur x={13} y={8} />
      <Fleur x={47} y={8} />
      <Fleur x={13} y={32} />
      <Fleur x={47} y={32} />
    </svg>
  )
}

export function CanadaFlag({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 60 30" role="img" aria-label={title} className={frame}>
      <title>{title}</title>
      <rect width="60" height="30" fill="#fff" />
      <rect width="15" height="30" fill="#D80621" />
      <rect x="45" width="15" height="30" fill="#D80621" />
      <path
        fill="#D80621"
        d="M30 3.5 l2.6 5.2 3.2-1.1-1.4 7.3 4.6-3.9 1 2.1 3.3-.6-1.3 4.4 1.3.6-5.9 4.9.4 1.5-5.8-1v5.8h-2v-5.8l-5.8 1 .4-1.5-5.9-4.9 1.3-.6-1.3-4.4 3.3.6 1-2.1 4.6 3.9-1.4-7.3 3.2 1.1z"
      />
    </svg>
  )
}
