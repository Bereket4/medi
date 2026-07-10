import { motion } from 'framer-motion'

export function Level1Assembly({ onCorrect, onWrong }) {
  return (
    <div className="relative flex min-h-[100dvh] flex-col items-center justify-center px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(236,72,153,0.15),transparent_50%)]" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass relative z-10 max-w-lg rounded-3xl p-10 text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-fuchsia-300/90">Level 1 — Vibe Check</p>
        <h2 className="mt-4 font-display text-2xl font-extrabold sm:text-3xl">Only 2007 royalty can proceed</h2>
        <p className="mt-3 text-sm text-white/55">Fr fr, the system is strict.</p>

        <div className="mt-10 flex flex-col gap-4">
          <motion.button
            type="button"
            onClick={onCorrect}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 py-4 font-display font-bold text-void shadow-lg"
          >
            I am 19 now 😎
          </motion.button>
          <motion.button
            type="button"
            onClick={onWrong}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="rounded-2xl border border-white/15 bg-white/5 py-4 font-semibold text-white/85 backdrop-blur"
          >
            Wait I'm a boomer 👀
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}
