import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { EntrySummoning } from './scenes/EntrySummoning.jsx'
import { Level1Assembly } from './scenes/Level1Assembly.jsx'
import { Level2Energy } from './scenes/Level2Energy.jsx'
import { Level3Cake } from './scenes/Level3Cake.jsx'
import { Level4Memory } from './scenes/Level4Memory.jsx'
import { FinalCelebration } from './scenes/FinalCelebration.jsx'
import { HBD_AUDIO_PATH, GALLERY_MUSIC_PATH, SFX_BUTTON_A, SFX_BUTTON_B, SFX_TRANSITION } from './constants.js'
import { playAudioRef, stopAudioRef } from './utils/sfx.js'

const SCENE = {
  ENTRY: 0,
  L1: 1,
  L2: 2,
  CAKE: 3,
  MEMORY: 4,
  FINAL: 5,
}

export default function App() {
  const [scene, setScene] = useState(SCENE.ENTRY)
  const [toast, setToast] = useState(null)
  const [accessFlash, setAccessFlash] = useState(false)
  const [candleLit, setCandleLit] = useState(true)
  const [wishAccepted, setWishAccepted] = useState(false)
  const [cakeFx, setCakeFx] = useState(false)
  const [cakeShake, setCakeShake] = useState(0)
  const [typeDone, setTypeDone] = useState(false)
  const [memoryIntroActive, setMemoryIntroActive] = useState(false)

  const hbdRef = useRef(null)
  const galleryMusicRef = useRef(null)
  const buttonARef = useRef(null)
  const buttonBRef = useRef(null)
  const transitionRef = useRef(null)
  const useButtonA = useRef(true)
  const toastTimer = useRef(null)

  const playButtonSound = useCallback(() => {
    const el = useButtonA.current ? buttonARef.current : buttonBRef.current
    useButtonA.current = !useButtonA.current
    playAudioRef(el)
  }, [])

  const playTransitionSound = useCallback(() => {
    playAudioRef(transitionRef.current)
  }, [])

  const showToast = useCallback((msg) => {
    setToast(msg)
    if (toastTimer.current) window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => setToast(null), 3200)
  }, [])

  const go = useCallback((next) => {
    setScene(next)
  }, [])

  const handleWrong = () => {
    playButtonSound()
    showToast('Relax — even the bouncer knows you’re 2000. Try the first button 😉')
  }

  const handleCorrect = () => {
    playTransitionSound()
    setAccessFlash(true)
    window.setTimeout(() => {
      setAccessFlash(false)
      go(SCENE.L2)
    }, 2200)
  }

  const handleEnergyFull = () => {
    playTransitionSound()
    window.setTimeout(() => go(SCENE.CAKE), 450)
  }

  const handleBlow = () => {
    if (!candleLit) return
    setCandleLit(false)
    setCakeFx(true)
    setCakeShake(1.25)
    window.setTimeout(() => setCakeShake(0), 750)
    window.setTimeout(() => setWishAccepted(true), 2600)
    window.setTimeout(() => setCakeFx(false), 1500)
    window.setTimeout(() => {
      const el = hbdRef.current
      if (!el) return
      el.currentTime = 0
      el.play().catch(() => {})
    }, 300)
  }

  const handleCakeContinue = () => {
    playButtonSound()
    playTransitionSound()
    stopAudioRef(hbdRef.current)
    playAudioRef(galleryMusicRef.current)
    setMemoryIntroActive(true)
    go(SCENE.MEMORY)
  }

  const restart = () => {
    stopAudioRef(galleryMusicRef.current)
    stopAudioRef(hbdRef.current)
    setMemoryIntroActive(false)
    setScene(SCENE.ENTRY)
    setCandleLit(true)
    setWishAccepted(false)
    setCakeFx(false)
    setCakeShake(0)
    setTypeDone(false)
    setAccessFlash(false)
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-void">
      <audio ref={hbdRef} preload="auto" src={HBD_AUDIO_PATH} playsInline />
      <audio ref={galleryMusicRef} preload="auto" src={GALLERY_MUSIC_PATH} playsInline loop />
      <audio ref={buttonARef} preload="auto" src={SFX_BUTTON_A} playsInline />
      <audio ref={buttonBRef} preload="auto" src={SFX_BUTTON_B} playsInline />
      <audio ref={transitionRef} preload="auto" src={SFX_TRANSITION} playsInline />

      {toast && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-[90] max-w-sm -translate-x-1/2 rounded-2xl border border-white/10 bg-black/70 px-5 py-3 text-center text-sm text-white/90 backdrop-blur-xl"
        >
          {toast}
        </div>
      )}

      <AnimatePresence>
        {accessFlash && (
          <motion.div
            key="access"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex flex-col items-center justify-center bg-black/80 px-6 backdrop-blur-md"
          >
            <motion.p
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="font-display text-3xl font-extrabold text-glow sm:text-4xl"
            >
              Access Granted 🔓
            </motion.p>
            <p className="mt-4 text-lg text-emerald-300/95">Welcome, 2018 Champion</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          key={scene}
          initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-[100dvh]"
        >
          {scene === SCENE.ENTRY && (
            <EntrySummoning
              onEnter={() => {
                playButtonSound()
                go(SCENE.L1)
              }}
            />
          )}

          {scene === SCENE.L1 && (
            <Level1Assembly onCorrect={handleCorrect} onWrong={handleWrong} />
          )}

          {scene === SCENE.L2 && (
            <Level2Energy onFull={handleEnergyFull} onChargeClick={playButtonSound} />
          )}

          {scene === SCENE.CAKE && (
            <Level3Cake
              candleLit={candleLit}
              wishAccepted={wishAccepted}
              fxBurst={cakeFx}
              shake={cakeShake}
              onFlameClick={handleBlow}
              onContinue={handleCakeContinue}
            />
          )}

          {scene === SCENE.MEMORY && (
            <Level4Memory
              introActive={memoryIntroActive}
              onIntroComplete={() => setMemoryIntroActive(false)}
              onContinue={() => {
                playButtonSound()
                playTransitionSound()
                go(SCENE.FINAL)
              }}
            />
          )}

          {scene === SCENE.FINAL && (
            <FinalCelebration
              typeDone={typeDone}
              onTypeDone={() => setTypeDone(true)}
              onReplay={() => {
                playButtonSound()
                restart()
              }}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
