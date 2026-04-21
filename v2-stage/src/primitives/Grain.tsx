import { useMemo } from 'react'
import { mulberry32 } from '../lib/mulberry32'

/**
 * Grain — subtle film-grain noise overlay.
 *
 * Adds a texture layer that makes digital scenes feel "photographed".
 * Static noise (doesn't animate per frame) — deterministic via mulberry32.
 *
 * Place once near the root of a scene, above content.
 */
export function Grain({
  opacity = 0.06,
  seed = 0x1a2b3c,
  density = 8000,
}: {
  opacity?: number
  seed?: number
  density?: number
}) {
  const dataUrl = useMemo(() => {
    const rng = mulberry32(seed)
    const size = 300
    const cv = document.createElement('canvas')
    cv.width = cv.height = size
    const ctx = cv.getContext('2d')
    if (!ctx) return ''
    const img = ctx.createImageData(size, size)
    const data = img.data
    // scatter random bright pixels
    for (let i = 0; i < density; i++) {
      const x = Math.floor(rng() * size)
      const y = Math.floor(rng() * size)
      const idx = (y * size + x) * 4
      const v = 180 + Math.floor(rng() * 75)
      data[idx] = v
      data[idx + 1] = v
      data[idx + 2] = v
      data[idx + 3] = Math.floor(rng() * 255)
    }
    ctx.putImageData(img, 0, 0)
    return cv.toDataURL('image/png')
  }, [seed, density])

  if (!dataUrl) return null

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url(${dataUrl})`,
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        opacity,
        pointerEvents: 'none',
        zIndex: 90,
      }}
    />
  )
}
