import { useTime } from '../lib/Stage'
import { Easing, clamp } from '../lib/easing'
import { TOKENS } from './index'

export type AnimatedArcProps = {
  from: { x: number; y: number }
  to: { x: number; y: number }
  /** Absolute time (seconds since Stage start) to begin drawing. */
  delay?: number
  /** Seconds to draw the full arc. */
  duration?: number
  color?: string
  /** Stroke width. */
  width?: number
  /** Arc height in pixels (how high the midpoint rises above the straight line). */
  archHeight?: number
  /** Dash pattern for dotted arcs. Default solid. */
  dashed?: boolean
}

/**
 * AnimatedArc — SVG path that draws itself from origin to target.
 *
 * Uses strokeDasharray + strokeDashoffset trick — the path exists the whole
 * time, but the "visible length" animates from 0 to full. Classic
 * cartographic / strike-trajectory visual.
 *
 * Place inside a <Sprite> (reads absolute time — delay is from scene start,
 * not sprite start). Or place outside a Sprite if drawing during idle time.
 */
export function AnimatedArc({
  from,
  to,
  delay = 0,
  duration = 1.0,
  color = TOKENS.ACCENT,
  width = 1.2,
  archHeight = 80,
  dashed = false,
}: AnimatedArcProps) {
  const time = useTime()
  const localT = time - delay
  const progress = clamp(Easing.easeOutCubic(clamp(localT / duration, 0, 1)), 0, 1)

  const dx = to.x - from.x
  const dy = to.y - from.y
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2 - archHeight

  const path = `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`
  // Approximate length with straight + arch offset
  const straight = Math.hypot(dx, dy)
  const len = straight + archHeight * 0.7

  return (
    <path
      d={path}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed ? '4 4' : `${len}`}
      strokeDashoffset={dashed ? 0 : len * (1 - progress)}
      opacity={progress > 0 ? 0.85 : 0}
    />
  )
}
