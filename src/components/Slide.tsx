import { type ReactNode } from 'react'
import { useSlideScale } from '../hooks/useSlideScale'

type SlideProps = {
  children: ReactNode
  background?: string // CSS background value
  className?: string
}

/**
 * Renders a 1920×1080 "canvas" slide, letterboxed to fit the viewport.
 * Children write layout in absolute 1920×1080 coordinate system.
 */
export function Slide({ children, background, className }: SlideProps) {
  const { scale, width, height } = useSlideScale()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: background ?? '#050518' }}
    >
      <div
        className={`relative overflow-hidden shadow-2xl ${className ?? ''}`}
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          background: background ?? '#050518',
        }}
      >
        {children}
      </div>
    </div>
  )
}
