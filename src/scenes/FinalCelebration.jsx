import { motion } from 'framer-motion'
import { Typewriter } from '../components/Typewriter.jsx'
import { CinematicConfetti } from '../components/CinematicConfetti.jsx'
import { FRIEND_SHORT_NAME, FINAL_MESSAGE } from '../constants.js'

export function FinalCelebration({ onReplay, typeDone, onTypeDone }) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 pb-16 pt-24 text-center">
      <CinematicConfetti active count={100} />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-violet-950/50 via-transparent to-fuchsia-950/40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(250,204,21,0.12),transparent_60%)] animate-pulse-glow" />

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {['🎈', '🎉', '✨', '🎈', '💫'].map((e, i) => (
          <motion.span
            key={i}
            className="absolute text-4xl sm:text-5xl"
            style={{ left: `${12 + i * 18}%`, top: `${8 + (i % 3) * 12}%` }}
            animate={{ y: [0, -18, 0], rotate: [0, 4, -4, 0] }}
            transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {e}
          </motion.span>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 100, damping: 16 }}
        className="relative z-10 max-w-3xl"
      >
        <motion.h1
          className="font-display text-4xl font-extrabold leading-tight text-glow sm:text-5xl md:text-6xl"
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{
            backgroundImage: 'linear-gradient(90deg, #fda4af, #e879f9, #67e8f9, #fde68a, #fda4af)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Happy 19th Birthday, {FRIEND_SHORT_NAME} 🎂⚡
        </motion.h1>

        <div className="glass mt-10 rounded-3xl p-8 text-left">
          <Typewriter
            text={FINAL_MESSAGE}
            speed={20}
            onComplete={onTypeDone}
            className="text-base leading-relaxed text-white/85 sm:text-lg"
          />
        </div>

        <motion.button
          type="button"
          onClick={onReplay}
          disabled={!typeDone}
          whileHover={typeDone ? { scale: 1.05 } : {}}
          className="mt-12 rounded-full border border-white/20 bg-white/5 px-10 py-4 font-display font-bold text-white backdrop-blur disabled:cursor-not-allowed disabled:opacity-40"
        >
          Run it again 😎
        </motion.button>
      </motion.div>

<div
  className="pointer-events-none fixed bottom-8 left-0 right-0 z-20 flex justify-center opacity-60"
>
  <div className="flex items-center gap-4 text-[10px] font-bold tracking-[0.2em] text-white/90 uppercase">
    <div className="h-[1px] w-8 bg-white/40"></div>
    <span>made by friend</span>
    <div className="h-[1px] w-8 bg-white/40"></div>
  </div>
</div>
    </div>
  )
}
