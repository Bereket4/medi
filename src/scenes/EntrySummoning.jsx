import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const lines = [
  { t: 'Attention… Year 19 boss detected', emoji: '👀' },
  { t: 'System scanning… Born in 2007?', emoji: '' },
]

export function EntrySummoning({ onEnter }) {
  const [step, setStep] = useState(0)
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const a = window.setTimeout(() => setStep(1), 2200)
    const b = window.setTimeout(() => setShowWelcome(true), 5200)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [])

  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/80 via-void to-black" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(168,85,247,0.45),transparent)] animate-pulse-glow" />
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[length:400%_400%] bg-gradient-to-r from-fuchsia-600/20 via-violet-500/10 to-cyan-500/20 animate-gradient-flow" />
      </div>
      <motion.div
        className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-cyan-400/15 to-transparent"
        animate={{ y: ['-20%', '120vh'] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: 'linear' }}
      />

      <div className="relative z-10 max-w-2xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 text-[10px] font-bold uppercase tracking-[0.5em] text-violet-300/80"
        >
          Level 19 Unlocked ⚡
        </motion.p>

        <AnimatePresence mode="wait">
          {!showWelcome ? (
            <motion.div
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, filter: 'blur(8px)' }}
              className="space-y-6"
            >
              {lines.map((line, i) => (
                <motion.p
                  key={line.t}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: step >= i ? 1 : 0.2, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className={`font-display text-2xl font-bold sm:text-3xl ${i === 0 ? 'animate-text-flicker' : ''}`}
                >
                  {line.t} {line.emoji}
                </motion.p>
              ))}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="mx-auto h-px max-w-xs origin-left bg-gradient-to-r from-transparent via-fuchsia-400/80 to-transparent"
              />
            </motion.div>
          ) : (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18 }}
              className="space-y-8"
            >
              <h1 className="font-display text-4xl font-extrabold text-glow sm:text-5xl">
                Welcome to your 19th Era, Icon <span className="not-italic">😎</span>
              </h1>
              <p className="text-sm text-white/50">Loading Gen Z energy… 19 years of joy and counting.</p>
              <motion.button
                type="button"
                onClick={onEnter}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="rounded-full bg-gradient-to-r from-fuchsia-500 via-violet-500 to-cyan-400 px-12 py-4 font-display text-lg font-bold text-white shadow-[0_0_50px_rgba(168,85,247,0.45)]"
              >
                Start the Main Quest
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
