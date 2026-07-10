import { useState, useRef } from 'react'
import { motion, animate } from 'framer-motion'

export function Level2Energy({ onFull, onChargeClick }) {
  const [charge, setCharge] = useState(0)
  const [charging, setCharging] = useState(false)
  const doneRef = useRef(false)

  const startCharge = () => {
    if (charging || charge >= 100 || doneRef.current) return
    onChargeClick?.()
    setCharging(true)
    doneRef.current = false
    const c = animate(0, 100, {
      duration: 2.85,
      ease: 'easeInOut',
      onUpdate: (v) => setCharge(Math.round(v)),
      onComplete: () => {
        setCharging(false)
        doneRef.current = true
        onFull?.()
      },
    })
    return c
  }

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/4 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-600/20 blur-[100px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-fuchsia-600/15 blur-[90px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-lg text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300/90">Level 2 — Aura Loading</p>
        <h2 className="mt-4 font-display text-3xl font-extrabold text-glow">Charging 19th birthday aura…</h2>
        <p className="mt-3 text-sm text-white/50">Tap to manifest maximum vibes.</p>

        <div className="mt-10 h-4 overflow-hidden rounded-full bg-white/10 ring-1 ring-white/10">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-300 shadow-[0_0_24px_rgba(34,211,238,0.5)]"
            animate={{ width: `${charge}%` }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
          />
        </div>
        <p className="mt-3 font-mono text-sm text-white/60">{charge}%</p>

        <motion.button
          type="button"
          onClick={startCharge}
          disabled={charge >= 100 || charging}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-10 rounded-full bg-white/10 px-10 py-4 font-display font-bold text-white ring-1 ring-white/20 backdrop-blur disabled:opacity-50"
        >
          {charge >= 100 ? 'Aura Maxed ⚡' : 'Charge Aura'}
        </motion.button>
      </motion.div>
    </div>
  )
}
