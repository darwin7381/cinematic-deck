import { TOKENS } from './index'

export type Point = { x: number; y: number; size?: number; o?: number }

export type DotMapProps = {
  width: number
  height: number
  points: Point[]
  highlight?: Point[]
  /** Fill color for regular dots. */
  color?: string
  /** Fill color for highlighted dots (center of attention). */
  highlightColor?: string
  /** Default radius if point.size not set. */
  defaultRadius?: number
}

/**
 * DotMap — SVG dot constellation.
 *
 * A staple of documentary/data-journalism design. Represents geographic or
 * abstract clouds of points. Use with `useMulberry32` seeded generators to
 * keep positions reproducible across renders.
 *
 * Example (with a seeded generator):
 *   const points = useMemo(() => {
 *     const rng = mulberry32(0x12345)
 *     return Array.from({ length: 800 }, () => ({
 *       x: range(rng, 100, 1820),
 *       y: range(rng, 100, 980),
 *       o: range(rng, 0.15, 0.45),
 *     }))
 *   }, [])
 */
export function DotMap({
  width,
  height,
  points,
  highlight = [],
  color = TOKENS.FG,
  highlightColor,
  defaultRadius = 1.4,
}: DotMapProps) {
  const hi = highlightColor ?? color
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
    >
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={p.size ?? defaultRadius}
          fill={color}
          opacity={p.o ?? 0.28}
        />
      ))}
      {highlight.map((p, i) => (
        <circle
          key={`h${i}`}
          cx={p.x}
          cy={p.y}
          r={p.size ?? 2.2}
          fill={hi}
          opacity={0.5}
        />
      ))}
    </svg>
  )
}
