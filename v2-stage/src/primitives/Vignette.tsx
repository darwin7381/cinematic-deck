/**
 * Vignette — radial gradient darkening at edges.
 *
 * The single most effective "cinema feel" CSS trick. Darkens the corners
 * and focuses attention to the center. Pair with Grain for classic look.
 */
export function Vignette({
  intensity = 0.6,
  inner = 30,
  outer = 100,
}: {
  /** Darkness at outer edge (0..1). */
  intensity?: number
  /** Inner transparent radius percent. */
  inner?: number
  /** Outer dark radius percent. */
  outer?: number
}) {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at center, transparent ${inner}%, rgba(0,0,0,${intensity}) ${outer}%)`,
        pointerEvents: 'none',
        zIndex: 85,
      }}
    />
  )
}
