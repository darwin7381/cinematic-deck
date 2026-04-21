import { clamp, type EasingFn } from './easing'

/**
 * Map a value from one range to another with optional easing.
 *
 * @example
 * // 0 → 0, 0.5 → 50, 1 → 100
 * interpolate(progress, [0, 1], [0, 100])
 *
 * // Apply easing curve
 * interpolate(progress, [0, 1], [0, 100], Easing.easeOutCubic)
 *
 * // Multi-stop (useful for keyframes)
 * interpolate(progress, [0, 0.3, 1], [0, 80, 100])
 */
export function interpolate(
  value: number,
  inputRange: readonly number[],
  outputRange: readonly number[],
  easing?: EasingFn
): number {
  if (inputRange.length !== outputRange.length)
    throw new Error('interpolate: inputRange and outputRange must have the same length')
  if (inputRange.length < 2) throw new Error('interpolate: need at least 2 stops')

  // Clamp to extremes
  if (value <= inputRange[0]) return outputRange[0]
  if (value >= inputRange[inputRange.length - 1])
    return outputRange[outputRange.length - 1]

  // Find the segment
  let i = 0
  while (value > inputRange[i + 1]) i++

  const inMin = inputRange[i]
  const inMax = inputRange[i + 1]
  const outMin = outputRange[i]
  const outMax = outputRange[i + 1]

  let t = (value - inMin) / (inMax - inMin)
  t = clamp(t, 0, 1)
  if (easing) t = easing(t)

  return outMin + (outMax - outMin) * t
}

/**
 * Convenience curried form — pre-bind ranges and get a mapper function.
 *
 * @example
 * const fadeIn = mapper([0, 1], [0, 1], Easing.easeOutQuad)
 * fadeIn(0.5)  // 0.75
 */
export function mapper(
  inputRange: readonly number[],
  outputRange: readonly number[],
  easing?: EasingFn
): (value: number) => number {
  return (value: number) => interpolate(value, inputRange, outputRange, easing)
}
