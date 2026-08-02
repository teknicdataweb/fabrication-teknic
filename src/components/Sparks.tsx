import { useMemo } from 'react'

interface SparkProps {
  count?: number
}

export default function Sparks({ count = 20 }: SparkProps) {
  const sparks = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 2.5 + Math.random() * 3,
        size: 1 + Math.random() * 2,
        color: Math.random() > 0.5 ? '#F97316' : '#C8102E',
        opacity: 0.4 + Math.random() * 0.5,
      })),
    [count]
  )

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {sparks.map((s) => (
        <span
          key={s.id}
          className="absolute rounded-full blur-[0.5px]"
          style={{
            left: `${s.left}%`,
            top: '-5vh',
            width: `${s.size}px`,
            height: `${s.size}px`,
            backgroundColor: s.color,
            boxShadow: `0 0 ${s.size * 3}px ${s.color}`,
            opacity: s.opacity,
            animation: `spark-fall ${s.duration}s linear ${s.delay}s infinite`,
            mixBlendMode: 'screen',
          }}
        />
      ))}
    </div>
  )
}
