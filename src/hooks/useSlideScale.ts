import { useEffect, useState } from 'react'

/**
 * Adaptive slide canvas.
 *
 * Landscape viewport (w >= h) → 1920×1080 letterbox
 * Portrait viewport  (w <  h) → 1080×1920 letterbox (portrait canvas)
 *
 * This lets mobile users see content at a sane physical size instead of
 * being squeezed into a tiny horizontal strip.
 *
 * Slides read `orientation` to pick a layout variant.
 */
export type Orientation = 'landscape' | 'portrait'

type Viewport = {
  scale: number
  width: number
  height: number
  orientation: Orientation
}

const LANDSCAPE = { w: 1920, h: 1080 }
const PORTRAIT  = { w: 1080, h: 1920 }

function compute(): Viewport {
  const vw = window.innerWidth
  const vh = window.innerHeight
  const orientation: Orientation = vw >= vh ? 'landscape' : 'portrait'
  const canvas = orientation === 'landscape' ? LANDSCAPE : PORTRAIT
  const scale = Math.min(vw / canvas.w, vh / canvas.h)
  return { scale, width: canvas.w, height: canvas.h, orientation }
}

export function useSlideScale(): Viewport {
  const [vp, setVp] = useState<Viewport>(() => {
    if (typeof window === 'undefined') {
      return { scale: 1, width: LANDSCAPE.w, height: LANDSCAPE.h, orientation: 'landscape' }
    }
    return compute()
  })

  useEffect(() => {
    const update = () => setVp(compute())
    update()
    window.addEventListener('resize', update)
    window.addEventListener('orientationchange', update)
    return () => {
      window.removeEventListener('resize', update)
      window.removeEventListener('orientationchange', update)
    }
  }, [])

  return vp
}
