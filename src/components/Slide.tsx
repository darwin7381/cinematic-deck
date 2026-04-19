import { type ReactNode } from 'react'
import { useSlideScale, type Orientation } from '../hooks/useSlideScale'

type SlideProps = {
  children: ReactNode | ((ctx: { orientation: Orientation }) => ReactNode)
  background?: string
  className?: string
}

/**
 * Renders a fixed canvas (1920×1080 landscape OR 1080×1920 portrait)
 * letterboxed/pillarboxed to fit the viewport.
 *
 * Children can be a render-prop that receives the current orientation,
 * allowing each slide to provide landscape vs portrait layout variants.
 */
export function Slide({ children, background, className }: SlideProps) {
  const { scale, width, height, orientation } = useSlideScale()

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: background ?? '#050518' }}
    >
      <div
        className={`relative overflow-hidden shadow-2xl flex-shrink-0 ${className ?? ''}`}
        style={{
          width,
          height,
          transform: `scale(${scale})`,
          transformOrigin: 'center',
          background: background ?? '#050518',
        }}
      >
        {typeof children === 'function' ? children({ orientation }) : children}
      </div>
    </div>
  )
}
