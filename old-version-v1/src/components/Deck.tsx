import { useCallback, useEffect, useRef, useState, type ReactElement } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

export type SlideRenderer = (props: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) => ReactElement

type DeckProps = {
  slides: SlideRenderer[]
}

/**
 * Core deck shell: keyboard + touch nav, URL hash persistence,
 * progress bar, step-based progressive reveal, and slide transitions.
 *
 * Keyboard:
 *   ArrowRight / Space / Enter  → advance (within slide step OR next slide)
 *   ArrowLeft / Backspace       → retreat
 *   Home / End                  → jump first/last
 *
 * Touch:
 *   Swipe left  → next
 *   Swipe right → prev
 *   Tap left 30%  → prev
 *   Tap right 30% → next
 */
export function Deck({ slides }: DeckProps) {
  const [index, setIndex] = useState(() => {
    const hash = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(hash) ? Math.max(0, Math.min(slides.length - 1, hash)) : 0
  })
  const [step, setStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  const onStepsChange = useCallback((n: number) => setTotalSteps(n), [])

  useEffect(() => {
    setStep(0)
    setTotalSteps(0)
    window.location.hash = String(index)
  }, [index])

  const next = useCallback(() => {
    setIndex((i) => Math.min(slides.length - 1, i + 1))
  }, [slides.length])

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1))
  }, [])

  const advance = useCallback(() => {
    if (step < totalSteps) setStep((s) => s + 1)
    else next()
  }, [step, totalSteps, next])

  const retreat = useCallback(() => {
    if (step > 0) setStep((s) => s - 1)
    else prev()
  }, [step, prev])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        retreat()
      } else if (e.key === 'Home') setIndex(0)
      else if (e.key === 'End') setIndex(slides.length - 1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, retreat, slides.length])

  // Hash sync
  useEffect(() => {
    const onHash = () => {
      const hash = parseInt(window.location.hash.slice(1), 10)
      if (Number.isFinite(hash)) setIndex(Math.max(0, Math.min(slides.length - 1, hash)))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [slides.length])

  // Touch: swipe + tap zones
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null)

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() }
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const start = touchRef.current
    if (!start) return
    const endT = e.changedTouches[0]
    const dx = endT.clientX - start.x
    const dy = endT.clientY - start.y
    const dt = Date.now() - start.t
    const absX = Math.abs(dx)
    const absY = Math.abs(dy)

    // Swipe: horizontal movement dominates, min distance, reasonably fast
    if (absX > 50 && absX > absY * 1.5 && dt < 700) {
      if (dx < 0) advance()
      else retreat()
      return
    }

    // Tap (minimal movement + short duration): zone-based navigation
    if (absX < 12 && absY < 12 && dt < 300) {
      const w = window.innerWidth
      const x = endT.clientX
      if (x < w * 0.3) retreat()
      else if (x > w * 0.7) advance()
      // middle 40%: do nothing (leave room for interactive elements)
    }
  }, [advance, retreat])

  const Current = slides[index]

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ touchAction: 'pan-y' }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Current
            active
            step={step}
            advance={advance}
            retreat={retreat}
            onStepsChange={onStepsChange}
          />
        </motion.div>
      </AnimatePresence>

      {/* Progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-[3px] bg-white/10 z-50">
        <motion.div
          className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500"
          initial={false}
          animate={{ width: `${((index + 1) / slides.length) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Slide counter */}
      <div className="fixed bottom-4 right-6 z-50 font-mono text-xs text-white/40 tracking-widest select-none">
        {String(index + 1).padStart(2, '0')} / {String(slides.length).padStart(2, '0')}
      </div>

      {/* Keyboard / touch hint — hidden on very small viewports to save space */}
      <div className="fixed bottom-4 left-6 z-50 font-mono text-[10px] text-white/30 tracking-widest select-none hidden sm:block">
        ← → / space / swipe / tap edges
      </div>
    </div>
  )
}
