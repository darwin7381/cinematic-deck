import {
  createContext,
  useContext,
  type ReactNode,
} from 'react'
import { useTime } from './Stage'
import { clamp } from './easing'

// ── Sprite context — children access localTime/progress via useSprite() ──
export type SpriteValue = {
  /** Seconds since sprite's start. */
  localTime: number
  /** Linear progress in [0, 1] (0 at start, 1 at end). */
  progress: number
  /** Sprite duration in seconds. */
  duration: number
  /** True while the sprite window covers the current time. */
  visible: boolean
}
const SpriteContext = createContext<SpriteValue | null>(null)

export function useSprite(): SpriteValue {
  const v = useContext(SpriteContext)
  if (!v)
    throw new Error('useSprite must be used inside a <Sprite> (or render-prop child).')
  return v
}

// ── Sprite ────────────────────────────────────────────────────────────────
export type SpriteChild =
  | ReactNode
  | ((v: SpriteValue) => ReactNode)

export type SpriteProps = {
  /** When this sprite becomes visible (seconds from Stage start). */
  start?: number
  /** When this sprite stops being visible. Default Infinity = until Stage end. */
  end?: number
  /** Keep mounted outside [start, end] — useful for long-fade exits. */
  keepMounted?: boolean
  children: SpriteChild
}

/**
 * Sprite — a time-window wrapper.
 *
 * Usage:
 *   <Sprite start={2} end={6}>
 *     {({ progress }) => <div style={{ opacity: progress }}>Hello</div>}
 *   </Sprite>
 *
 * Or plain children (visibility only):
 *   <Sprite start={2} end={6}><Banner /></Sprite>
 */
export function Sprite({
  start = 0,
  end = Infinity,
  keepMounted = false,
  children,
}: SpriteProps) {
  const time = useTime()
  const visible = time >= start && time <= end

  if (!visible && !keepMounted) return null

  const duration = end - start
  const localTime = Math.max(0, time - start)
  const progress =
    duration > 0 && isFinite(duration) ? clamp(localTime / duration, 0, 1) : 0

  const value: SpriteValue = { localTime, progress, duration, visible }

  return (
    <SpriteContext.Provider value={value}>
      {typeof children === 'function' ? children(value) : children}
    </SpriteContext.Provider>
  )
}
