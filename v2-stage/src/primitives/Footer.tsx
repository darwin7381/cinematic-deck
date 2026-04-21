import { MONO, TOKENS } from './index'

/**
 * Footer — fixed bottom-of-scene credit/title block.
 *
 * Sits at the very bottom of every scene for continuity. Usually shows the
 * project title and date range.
 */
export function Footer({
  title,
  subtitle,
  color = TOKENS.FG_DIM,
}: {
  title: string
  subtitle?: string
  color?: string
}) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 40,
        left: 80,
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        fontFamily: MONO,
        fontSize: 11,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color,
        zIndex: 30,
      }}
    >
      <div>{title}</div>
      {subtitle ? <div style={{ opacity: 0.7 }}>{subtitle}</div> : null}
    </div>
  )
}
