import { useState, useEffect, useRef } from 'react'
import { SFX_TYPING } from '../constants.js'
import { playAudioRef, stopAudioRef } from '../utils/sfx.js'

export function Typewriter({ text, speed = 26, className = '', onComplete }) {
  const [shown, setShown] = useState('')
  const [done, setDone] = useState(false)
  const cb = useRef(onComplete)
  const typingRef = useRef(null)
  cb.current = onComplete

  useEffect(() => {
    setShown('')
    setDone(false)
    const typingEl = typingRef.current
    if (typingEl) {
      typingEl.loop = true
      typingEl.volume = 0.38
      playAudioRef(typingEl)
    }
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        window.clearInterval(id)
        setDone(true)
        if (typingEl) {
          stopAudioRef(typingEl)
          typingEl.loop = false
        }
        cb.current?.()
      }
    }, speed)
    return () => {
      window.clearInterval(id)
      if (typingEl) {
        stopAudioRef(typingEl)
        typingEl.loop = false
      }
    }
  }, [text, speed])

  return (
    <>
      <audio ref={typingRef} preload="auto" src={SFX_TYPING} playsInline />
      <p className={`${className} ${!done ? 'typewriter-cursor' : ''}`}>
        {shown}
      </p>
    </>
  )
}
