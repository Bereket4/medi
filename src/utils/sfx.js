/** Reset and play — use only from user-driven handlers (or tied typing animation). */
export function playAudioRef(el) {
  if (!el) return
  el.currentTime = 0
  el.play().catch(() => {})
}

export function stopAudioRef(el) {
  if (!el) return
  el.pause()
  el.currentTime = 0
}
