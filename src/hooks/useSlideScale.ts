import { useEffect, useState } from 'react'

const SLIDE_W = 1920
const SLIDE_H = 1080

/**
 * Scale a fixed 1920×1080 canvas to fit the viewport while preserving
 * aspect ratio (letterbox/pillarbox).
 * Returns { scale, offsetX, offsetY } so callers can compose transforms.
 */
export function useSlideScale() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const update = () => {
      const sx = window.innerWidth / SLIDE_W
      const sy = window.innerHeight / SLIDE_H
      setScale(Math.min(sx, sy))
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return { scale, width: SLIDE_W, height: SLIDE_H }
}
