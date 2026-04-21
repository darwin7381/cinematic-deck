/**
 * Mulberry32 — a fast 32-bit PRNG with deterministic output.
 *
 * Critical for cinematic animation: particle positions, dot-map coordinates,
 * grain noise etc. must be REPRODUCIBLE across renders, seeks, and reloads.
 * Using Math.random() causes visual "shimmer" when you seek the timeline.
 *
 * Seed is any 32-bit integer. Returns a function that yields next [0,1).
 *
 * @example
 * const rng = mulberry32(0x12345)
 * rng()  // 0.6789...
 * rng()  // 0.2345...
 * // Restart with same seed → same sequence
 */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return function () {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Random in [min, max) using a seeded RNG. */
export function range(rng: () => number, min: number, max: number): number {
  return min + rng() * (max - min)
}

/** Random int in [min, max] inclusive. */
export function rangeInt(rng: () => number, min: number, max: number): number {
  return Math.floor(min + rng() * (max - min + 1))
}
