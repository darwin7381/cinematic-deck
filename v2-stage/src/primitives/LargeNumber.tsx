import { useSprite } from '../lib/Sprite'
import { interpolate } from '../lib/interpolate'
import { Easing } from '../lib/easing'
import { SERIF, TOKENS } from './index'

export type LargeNumberProps = {
  value: number | string
  x: number
  y: number
  /** Font size in px. Default 420. */
  size?: number
  color?: string
  /** Reveal direction — 'rise' = slides up, 'fade' = only fade. */
  enter?: 'rise' | 'fade'
}

/**
 * LargeNumber — hero-style large serif numeral.
 *
 * Used for title cards: "49", "Day 01", "$120B". The cinematic "big number
 * that grounds the scene" pattern.
 * Must be inside a <Sprite>.
 */
export function LargeNumber({
  value,
  x,
  y,
  size = 420,
  color = TOKENS.FG,
  enter = 'rise',
}: LargeNumberProps) {
  const { progress } = useSprite()
  const opacity = interpolate(progress, [0, 0.3], [0, 1], Easing.easeOutCubic)
  const rise =
    enter === 'rise'
      ? interpolate(progress, [0, 0.5], [40, 0], Easing.easeOutExpo)
      : 0

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontFamily: SERIF,
        fontSize: size,
        fontWeight: 300,
        color,
        lineHeight: 0.85,
        letterSpacing: '-0.04em',
        opacity,
        transform: `translateY(${rise}px)`,
        zIndex: 18,
      }}
    >
      {value}
    </div>
  )
}
