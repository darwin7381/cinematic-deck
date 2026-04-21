/**
 * Visual primitive vocabulary — the building blocks of cinematic 2D narrative.
 * Ported and adapted from Genesis 49 Days.
 *
 * Design principle:
 *   These are *task-specific* primitives, not generic UI components.
 *   Each one represents a cinematic concept (pulse, grain, vignette, dot-map)
 *   that AI can reason about when composing a scene.
 */

export { DotMap } from './DotMap'
export type { DotMapProps, Point } from './DotMap'

export { PulseDot } from './PulseDot'
export type { PulseDotProps } from './PulseDot'

export { AnimatedArc } from './AnimatedArc'
export type { AnimatedArcProps } from './AnimatedArc'

export { Grain } from './Grain'
export { Vignette } from './Vignette'
export { Chrome } from './Chrome'
export { Footer } from './Footer'
export { Caption } from './Caption'
export type { CaptionProps } from './Caption'
export { TextSprite } from './TextSprite'
export type { TextSpriteProps } from './TextSprite'
export { LargeNumber } from './LargeNumber'
export type { LargeNumberProps } from './LargeNumber'

// Typography + color tokens shared across primitives
export const SERIF = "'Fraunces', 'Noto Serif SC', Georgia, serif"
export const SANS = "'Inter', system-ui, -apple-system, sans-serif"
export const MONO = "'JetBrains Mono', ui-monospace, SFMono-Regular, monospace"

export const TOKENS = {
  FG: '#f3ede2',
  FG_DIM: 'rgba(243, 237, 226, 0.55)',
  FG_MUTED: 'rgba(243, 237, 226, 0.28)',
  ACCENT: '#c85a2a', // burnt orange
  STRIKE: '#e8563e',
  BG: '#0c1013',
}
