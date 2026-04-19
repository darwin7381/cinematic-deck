import { useEffect, useState, useRef, useCallback } from 'react'

/**
 * Real progressive reveal: within one slide, track a `step` counter.
 * The parent <Deck> tells us how many steps this slide has via `totalSteps`.
 * Returns [step, advance, retreat, isDone] so slides can show bullets one by one.
 *
 * Integration: <Deck> reads `isDone` to decide whether ArrowRight should
 * advance step-within-slide or move to the next slide.
 */
export function useSlideStep(totalSteps: number, active: boolean) {
  const [step, setStep] = useState(0)
  const totalRef = useRef(totalSteps)
  totalRef.current = totalSteps

  const advance = useCallback(() => {
    setStep((s) => Math.min(s + 1, totalRef.current))
  }, [])

  const retreat = useCallback(() => {
    setStep((s) => Math.max(s - 1, 0))
  }, [])

  const reset = useCallback(() => setStep(0), [])

  // Reset step when leaving the slide
  useEffect(() => {
    if (!active) setStep(0)
  }, [active])

  const isDone = step >= totalSteps
  return { step, advance, retreat, reset, isDone }
}
