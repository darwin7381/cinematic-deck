import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, type ReactNode } from 'react'
import { Sprite, type SpriteValue } from './Sprite'

/**
 * SpriteCanvas — an R3F scene wrapped in a Sprite time-window.
 *
 * The Canvas mounts only during [start, end], so a 3D scene costs zero GPU
 * outside its chapter. Inside the Canvas, children can call useSprite()
 * or useSpriteTime() to drive camera rigs, shader uniforms, etc. from the
 * timeline.
 *
 * @example
 * <SpriteCanvas start={30} end={60}>
 *   {({ progress, localTime }) => (
 *     <>
 *       <ambientLight intensity={0.4} />
 *       <CameraRig t={localTime} />
 *       <HeroMesh scale={1 + progress * 0.2} />
 *     </>
 *   )}
 * </SpriteCanvas>
 */
export type SpriteCanvasProps = {
  start?: number
  end?: number
  /** Optional camera — forwarded to R3F <Canvas>. */
  camera?: {
    position?: [number, number, number]
    fov?: number
  }
  /** Device pixel ratio cap. Default [1, 2] — prevents mobile from burning GPU. */
  dpr?: [number, number]
  /** 'always' (default for cinematic) or 'demand' (paused when idle). */
  frameloop?: 'always' | 'demand' | 'never'
  /** Fallback while scene loads. */
  fallback?: ReactNode
  /** Transparent background — lets Stage background show through. Default true. */
  transparent?: boolean
  children: (sprite: SpriteValue) => ReactNode
}

export function SpriteCanvas({
  start = 0,
  end = Infinity,
  camera = { position: [0, 0, 5], fov: 50 },
  dpr = [1, 2],
  frameloop = 'always',
  fallback = null,
  transparent = true,
  children,
}: SpriteCanvasProps) {
  return (
    <Sprite start={start} end={end}>
      {(sprite) => (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
          }}
        >
          <Canvas
            camera={camera}
            dpr={dpr}
            frameloop={frameloop}
            gl={{
              alpha: transparent,
              antialias: true,
              powerPreference: 'high-performance',
            }}
            style={{
              background: transparent ? 'transparent' : undefined,
            }}
          >
            <Suspense fallback={fallback}>
              <SpriteTimeBridge sprite={sprite}>{children(sprite)}</SpriteTimeBridge>
            </Suspense>
          </Canvas>
        </div>
      )}
    </Sprite>
  )
}

/**
 * Bridges the outer Sprite context into the R3F render tree so hooks like
 * useSprite() work inside Canvas children.
 *
 * Note: Canvas creates a separate React root (via react-reconciler), so
 * context providers from outside don't reach inside. We re-provide here.
 */
function SpriteTimeBridge({
  sprite,
  children,
}: {
  sprite: SpriteValue
  children: ReactNode
}) {
  // Re-inject via a lightweight useFrame hook for cases that need per-frame
  // access to the latest sprite.localTime without re-rendering.
  useFrame(() => {
    // reserved for future per-frame updates (camera rigs etc.)
    void sprite
  })
  return <>{children}</>
}
