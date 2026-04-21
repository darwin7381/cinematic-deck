import { useSprite } from '../lib/Sprite'
import { interpolate } from '../lib/interpolate'
import { Easing } from '../lib/easing'
import { SANS, TOKENS } from './index'

export type TextSpriteProps = {
  text: string
  x: number
  y: number
  size?: number
  color?: string
  font?: string
  letterSpacing?: string
  weight?: number
  /** Starting Y offset (px) — animates to 0. */
  riseFrom?: number
  /** Override opacity curve start. Default 0. */
  fadeStart?: number
  /** Override opacity curve end (progress value at full opacity). Default 0.4. */
  fadeEnd?: number
}

/**
 * TextSprite — a single text element that fades+rises in.
 *
 * For mono labels, serif pull-quotes, or any one-shot text element.
 * Must be inside a <Sprite>.
 */
export function TextSprite({
  text,
  x,
  y,
  size = 14,
  color = TOKENS.FG,
  font = SANS,
  letterSpacing,
  weight = 400,
  riseFrom = 8,
  fadeStart = 0,
  fadeEnd = 0.4,
}: TextSpriteProps) {
  const { progress } = useSprite()
  const opacity = interpolate(progress, [fadeStart, fadeEnd], [0, 1], Easing.easeOutCubic)
  const rise = interpolate(progress, [fadeStart, fadeEnd], [riseFrom, 0], Easing.easeOutExpo)

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        opacity,
        transform: `translateY(${rise}px)`,
        color,
        fontFamily: font,
        fontSize: size,
        fontWeight: weight,
        letterSpacing,
        zIndex: 20,
        pointerEvents: 'none',
        whiteSpace: 'pre-line',
      }}
    >
      {text}
    </div>
  )
}
