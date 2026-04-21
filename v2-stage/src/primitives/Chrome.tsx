import { MONO, TOKENS } from './index'

/**
 * Chrome — HUD corner label for the current scene.
 *
 * Top-left: accent dot + scene label
 * Top-right: day/chapter tag
 */
export function Chrome({
  label,
  dayLabel,
  color = TOKENS.FG,
  dimColor = TOKENS.FG_DIM,
  accent = TOKENS.ACCENT,
}: {
  label: string
  dayLabel?: string
  color?: string
  dimColor?: string
  accent?: string
}) {
  return (
    <>
      {/* Top-left */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          left: 80,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          fontFamily: MONO,
          fontSize: 12,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color,
          zIndex: 30,
        }}
      >
        <span
          style={{
            display: 'inline-block',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: accent,
            boxShadow: `0 0 12px ${accent}`,
          }}
        />
        {label}
      </div>

      {/* Top-right */}
      {dayLabel ? (
        <div
          style={{
            position: 'absolute',
            top: 40,
            right: 80,
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: dimColor,
            zIndex: 30,
          }}
        >
          {dayLabel}
        </div>
      ) : null}
    </>
  )
}
