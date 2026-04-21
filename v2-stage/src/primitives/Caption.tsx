import { useSprite } from '../lib/Sprite'
import { interpolate } from '../lib/interpolate'
import { Easing } from '../lib/easing'
import { SERIF, MONO, TOKENS } from './index'

export type CaptionProps = {
  /** Primary (English) caption — may contain \n for line breaks. */
  en: string
  /** Secondary (Chinese / sub) caption. */
  cn?: string
  x: number
  y: number
  /** Main font size. Default 56. */
  size?: number
  /** Max width in px — wraps text. Default 1200. */
  width?: number
  color?: string
  subColor?: string
}

/**
 * Caption — editorial-style bilingual headline block.
 *
 * Fades in with a subtle rise. Place inside a <Sprite> to gate visibility.
 */
export function Caption({
  en,
  cn,
  x,
  y,
  size = 56,
  width = 1200,
  color = TOKENS.FG,
  subColor = TOKENS.FG_DIM,
}: CaptionProps) {
  const { progress } = useSprite()
  const opacity = interpolate(progress, [0, 0.35], [0, 1], Easing.easeOutCubic)
  const rise = interpolate(progress, [0, 0.4], [18, 0], Easing.easeOutExpo)

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        opacity,
        transform: `translateY(${rise}px)`,
        color,
        fontFamily: SERIF,
        zIndex: 20,
      }}
    >
      <div
        style={{
          fontSize: size,
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          fontWeight: 400,
          whiteSpace: 'pre-line',
        }}
      >
        {en}
      </div>
      {cn ? (
        <div
          style={{
            marginTop: size * 0.28,
            fontSize: Math.max(14, size * 0.32),
            fontFamily: MONO,
            letterSpacing: '0.08em',
            color: subColor,
            fontWeight: 300,
          }}
        >
          {cn}
        </div>
      ) : null}
    </div>
  )
}
