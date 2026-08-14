import { Suspense, useEffect, useRef, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import { MillenniumCakeScene } from '../three/MillenniumCake.jsx'
import { CinematicConfetti } from '../components/CinematicConfetti.jsx'

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.warn('3D Canvas loading error caught by boundary:', error)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="text-6xl animate-bounce">🎂</div>
          <p className="mt-4 font-display text-xl font-bold text-white">19th Birthday Cake</p>
          <p className="mt-2 text-xs text-white/60">3D preview mode unavailable</p>
          <button
            type="button"
            onClick={this.props.onFlameClick}
            className="mt-6 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 font-display text-sm font-bold text-white shadow-lg"
          >
            Blow the candle 💨
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export function Level3Cake({ candleLit, wishAccepted, fxBurst, shake, onFlameClick, onContinue }) {
  const wishBlockRef = useRef(null)

  useEffect(() => {
    if (!wishAccepted) return
    const id = window.requestAnimationFrame(() => {
      wishBlockRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    })
    return () => window.cancelAnimationFrame(id)
  }, [wishAccepted])

  return (
    <div className="relative flex min-h-[100dvh] flex-col">
      <CinematicConfetti active={fxBurst} count={120} />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,58,237,0.22),transparent_55%)]" />

      <motion.div
        className="relative z-10 mx-auto w-full max-w-4xl flex-1 px-4 pb-12 pt-24 text-center sm:px-6"
        animate={shake ? { x: [0, -6, 6, -5, 5, 0], scale: [1, 1.02, 0.99, 1] } : {}}
        transition={{ duration: 0.55 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-violet-300/90">The 19th Level Boss</p>
        <h2 className="mt-3 font-display text-3xl font-extrabold text-glow sm:text-4xl">Make a wish… then blow the candle</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/55">
          Tap the flame — your anthem drops once, only here.
        </p>

        <div className="relative mx-auto mt-5 h-[min(58vh,520px)] w-full max-w-3xl overflow-hidden rounded-[2rem] border border-white/10 bg-black/50 shadow-[0_0_90px_rgba(168,85,247,0.28)]">
          <CanvasErrorBoundary onFlameClick={onFlameClick}>
            <Canvas
              shadows
              camera={{ position: [0, 1.1, 5.2], fov: 42 }}
              gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <MillenniumCakeScene
                  candleLit={candleLit}
                  cameraShake={shake}
                  onBlowRequest={onFlameClick}
                />
              </Suspense>
            </Canvas>
          </CanvasErrorBoundary>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
        </div>

        <AnimatePresence>
          {fxBurst && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="pointer-events-none mt-4 text-6xl sm:text-7xl"
            >
              💨
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-6 space-y-2">
          {!wishAccepted && (
            <p className="text-sm text-white/45">{candleLit ? 'Waiting for you to blow it out…' : 'Sealing the wish…'}</p>
          )}
          {wishAccepted && (
            <motion.div
              ref={wishBlockRef}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <p className="font-display text-xl font-bold text-emerald-300/95">Wish accepted 🎉</p>
              <motion.span
                className="pointer-events-none block text-lg text-violet-300/80"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              >
                ↓
              </motion.span>
              <motion.button
                type="button"
                onClick={onContinue}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 px-10 py-3 font-display font-bold text-white shadow-lg"
              >
                Unlock the memories →
              </motion.button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  )
}
