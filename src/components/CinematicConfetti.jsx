import { useMemo } from 'react'
import { motion } from 'framer-motion'

export function CinematicConfetti({ active, count = 90, className = '' }) {
  const pieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 2.5,
      dur: 3.5 + Math.random() * 4,
      hue: Math.floor(Math.random() * 360),
      w: 5 + Math.random() * 10,
      h: 7 + Math.random() * 14,
      rot: Math.random() * 360,
    }))
  }, [count])

  if (!active) return null

  return (
    <div className={`pointer-events-none fixed inset-0 z-[60] overflow-hidden ${className}`} aria-hidden>
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute top-0 rounded-[2px] opacity-90 shadow-sm"
          style={{
            left: `${p.x}%`,
            width: p.w,
            height: p.h,
            backgroundColor: `hsl(${p.hue} 90% 58%)`,
            rotate: p.rot,
          }}
          initial={{ y: '-8vh', opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 1, 1, 0.85] }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
