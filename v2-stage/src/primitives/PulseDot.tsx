import { useSprite } from '../lib/Sprite'
import { TOKENS } from './index'

export type PulseDotProps = {
  x: number
  y: number
  /** Base diameter in px. */
  size?: number
  color?: string
  /** Seconds per pulse cycle. Default 1.5. */
  period?: number
}

/**
 * PulseDot — concentric pulsing ring emanating from a point.
 *
 * Signature "event marker" for documentary/news vis. The outer ring grows
 * and fades on each period; the center dot stays solid.
 *
 * Must be placed inside a <Sprite> (uses useSprite for localTime).
 */
export function PulseDot({
  x,
  y,
  size = 16,
  color = TOKENS.ACCENT,
  period = 1.5,
}: PulseDotProps) {
  const { localTime } = useSprite()
  const phase = (localTime % period) / period // 0..1 each cycle
  const ringScale = 1 + phase * 2 // grows 1x → 3x
  const ringOpacity = Math.pow(1 - phase, 1.4) * 0.6

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: 0,
        height: 0,
        pointerEvents: 'none',
      }}
    >
      {/* Expanding ring */}
      <div
        style={{
          position: 'absolute',
          left: -size / 2,
          top: -size / 2,
          width: size,
          height: size,
          borderRadius: '50%',
          border: `1px solid ${color}`,
          transform: `scale(${ringScale})`,
          opacity: ringOpacity,
        }}
      />
      {/* Solid center */}
      <div
        style={{
          position: 'absolute',
          left: -size / 4,
          top: -size / 4,
          width: size / 2,
          height: size / 2,
          borderRadius: '50%',
          background: color,
          boxShadow: `0 0 ${size}px ${color}`,
        }}
      />
    </div>
  )
}
