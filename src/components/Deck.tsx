import { useCallback, useEffect, useState, type ReactElement } from 'react'
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
 * Core deck shell: keyboard nav, URL hash persistence, progress bar,
 * step-based progressive reveal coordination, and slide transitions.
 *
 * ArrowRight/Space:
 *   - If current slide has unconsumed steps, advance step
 *   - Otherwise move to next slide
 * ArrowLeft/Backspace:
 *   - If current step > 0, retreat step
 *   - Otherwise previous slide
 */
export function Deck({ slides }: DeckProps) {
  const [index, setIndex] = useState(() => {
    const hash = parseInt(window.location.hash.slice(1), 10)
    return Number.isFinite(hash) ? Math.max(0, Math.min(slides.length - 1, hash)) : 0
  })
  const [step, setStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)

  const onStepsChange = useCallback((n: number) => setTotalSteps(n), [])

  // Reset step when slide changes
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
    if (step < totalSteps) {
      setStep((s) => s + 1)
    } else {
      next()
    }
  }, [step, totalSteps, next])

  const retreat = useCallback(() => {
    if (step > 0) {
      setStep((s) => s - 1)
    } else {
      prev()
    }
  }, [step, prev])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault()
        advance()
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace') {
        e.preventDefault()
        retreat()
      } else if (e.key === 'Home') {
        setIndex(0)
      } else if (e.key === 'End') {
        setIndex(slides.length - 1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, retreat, slides.length])

  // React to hash changes (back/forward buttons)
  useEffect(() => {
    const onHash = () => {
      const hash = parseInt(window.location.hash.slice(1), 10)
      if (Number.isFinite(hash)) setIndex(Math.max(0, Math.min(slides.length - 1, hash)))
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [slides.length])

  const Current = slides[index]

  return (
    <>
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

      {/* Keyboard hint */}
      <div className="fixed bottom-4 left-6 z-50 font-mono text-[10px] text-white/30 tracking-widest select-none">
        ← → navigate  ·  space advance  ·  home/end jump
      </div>
    </>
  )
}
