import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MEMORY_PHOTOS } from '../constants.js'

/** phase: intro = blurred + message, unblur = message out + clear blur, ready = interactive */
export function Level4Memory({ introActive, onIntroComplete, onContinue }) {
  const [phase, setPhase] = useState(() => (introActive ? 'intro' : 'ready'))

  useEffect(() => {
    if (!introActive) {
      setPhase('ready')
      return
    }
    setPhase('intro')
    const tUnblur = window.setTimeout(() => setPhase('unblur'), 2600)
    const tReady = window.setTimeout(() => {
      setPhase('ready')
      onIntroComplete?.()
    }, 5200)
    return () => {
      window.clearTimeout(tUnblur)
      window.clearTimeout(tReady)
    }
  }, [introActive, onIntroComplete])

  const interactive = phase === 'ready'

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pb-16 pt-24 sm:px-8">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(251,191,36,0.12),transparent_50%)]" />

      <motion.div
        animate={{
          filter: phase === 'intro' ? 'blur(18px)' : 'blur(0px)',
        }}
        transition={{
          duration: phase === 'unblur' ? 2.1 : 0,
          ease: [0.22, 1, 0.36, 1],
        }}
        className={`relative z-10 w-full max-w-5xl text-center ${interactive ? '' : 'pointer-events-none'}`}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/80">Level 4 — Memory sparks</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-glow sm:text-4xl">Polars from the timeline</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-white/45">
       Relive the memories that matter
        </p>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-10">
  {MEMORY_PHOTOS.map((p, i) => (
    <motion.div
      key={p.src}
      initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -4 : 5 }}
      animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? -3 : 4 }}
      transition={{ delay: i * 0.12, type: 'spring', stiffness: 80 }}
      whileHover={{
        y: -10,
        rotate: 0,
        scale: 1.04,
        transition: { type: 'spring', stiffness: 260, damping: 18 },
      }}
      className="group relative w-[min(100%,260px)]"
      style={{ perspective: 1200 }}
    >
      <div className="relative overflow-hidden rounded-sm bg-white p-3 shadow-[0_25px_60px_rgba(0,0,0,0.45)] ring-1 ring-black/20">
        {/* Hover gradient effect */}
        <div className="pointer-events-none absolute -inset-1 rounded-sm bg-gradient-to-br from-fuchsia-500/0 via-fuchsia-400/0 to-amber-400/0 opacity-0 blur-xl transition duration-500 group-hover:opacity-70 group-hover:via-fuchsia-400/30" />

        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden bg-neutral-900">
          <img
            src={p.src}
            alt=""
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105 group-hover:brightness-110"
            loading="lazy"
          />
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_55%)] opacity-0 transition group-hover:opacity-100" />
        </div>

        {/* Caption moved below the image */}
        <div className="mt-3">
          <p className="text-left font-body text-xs leading-relaxed text-neutral-800">
            {p.caption}
          </p>
        </div>
      </div>

      {/* Sparkle */}
      <span className="pointer-events-none absolute -right-2 -top-2 text-2xl opacity-0 transition group-hover:opacity-100">
        ✨
      </span>
    </motion.div>
  ))}
</div>

        <motion.button
          type="button"
          onClick={onContinue}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
          className="mt-16 rounded-full bg-gradient-to-r from-amber-400 via-rose-500 to-violet-600 px-12 py-4 font-display font-bold text-void shadow-xl"
        >
          Next scene →
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            key="aesthetic-msg"
            className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center px-6"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
          >
<motion.p
  initial={{ opacity: 0, y: 32 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
  transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
  className="max-w-2xl text-center font-display text-2xl font-semibold italic leading-snug tracking-wide  bg-gradient-to-r from-purple-400 via-pink-400 to-indigo-400
bg-clip-text text-transparent sm:text-3xl md:text-4xl"
  style={{
    textShadow: '0 0 40px rgba(167,139,250,0.55), 0 0 80px rgba(236,72,153,0.25), 0 4px 24px rgba(0,0,0,0.45)',
  }}
>
  ✨ Step into the aesthetic vibes! 🌟
</motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
