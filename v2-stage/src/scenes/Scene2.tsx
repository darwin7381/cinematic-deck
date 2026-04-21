import { useRef } from 'react'
import type { Mesh } from 'three'
import { useFrame } from '@react-three/fiber'
import { Sprite, SpriteCanvas, Easing, interpolate } from '../lib'
import {
  Chrome,
  Footer,
  Vignette,
  Grain,
  Caption,
  TextSprite,
  TOKENS,
} from '../primitives'
import { Environment, MeshTransmissionMaterial, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

/**
 * Scene 02 — "Glass"
 *
 * Demonstrates R3F integration: 3D glass sphere with bloom post-processing,
 * camera driven by local timeline, 2D caption overlaid.
 *
 * Chapter window: 8 – 20s
 */
export function Scene2() {
  return (
    <Sprite start={8} end={20}>
      <div style={{ position: 'absolute', inset: 0, background: TOKENS.BG }}>
      <Chrome label="Glass / 玻璃" dayLabel="Day 02 — 3D Layer" />

      {/* 3D scene — only mounts during this sprite's window */}
      <SpriteCanvas
        start={8}
        end={20}
        camera={{ position: [0, 0, 4.5], fov: 42 }}
        dpr={[1, 2]}
      >
        {({ progress }) => <GlassScene progress={progress} />}
      </SpriteCanvas>

      {/* 2D caption over the 3D scene */}
      <Sprite start={9.5} end={20}>
        <Caption
          en={'Volumetric\nmaterial.'}
          cn={'體積感光影 · R3F + Bloom'}
          x={140}
          y={700}
          size={120}
          width={1100}
        />
      </Sprite>

      <Sprite start={12} end={20}>
        <TextSprite
          text="MeshTransmissionMaterial"
          x={1340}
          y={920}
          size={13}
          letterSpacing="0.3em"
          color={TOKENS.FG_DIM}
          font="'JetBrains Mono', monospace"
        />
      </Sprite>

      <Footer title="Cinematic Stage · Reference Demo" subtitle="2D + 3D Hybrid" />
      <Vignette intensity={0.45} />
      <Grain opacity={0.04} />
      </div>
    </Sprite>
  )
}

function GlassScene({ progress }: { progress: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((_, dt) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += dt * 0.3
    meshRef.current.rotation.x = Math.sin(performance.now() * 0.0005) * 0.15
  })

  // Grow in, then slight pulse
  const scale = interpolate(progress, [0, 0.3, 1], [0.1, 1, 1.08], Easing.easeOutExpo)
  const bloomIntensity = interpolate(progress, [0, 0.4], [0, 1.2], Easing.easeOutQuad)

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 5, 3]} intensity={1.8} />
      <directionalLight position={[-5, -3, -2]} intensity={0.8} color="#ff8a5a" />

      <Float speed={0.8} rotationIntensity={0.3} floatIntensity={0.6}>
        <mesh ref={meshRef} scale={scale}>
          <icosahedronGeometry args={[1, 8]} />
          <MeshTransmissionMaterial
            samples={8}
            thickness={0.9}
            roughness={0.05}
            chromaticAberration={0.08}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.25}
            temporalDistortion={0.05}
            backside
            ior={1.45}
            color="#f3ede2"
          />
        </mesh>
      </Float>

      <Environment preset="night" />

      <EffectComposer>
        <Bloom intensity={bloomIntensity} luminanceThreshold={0.4} luminanceSmoothing={0.4} />
      </EffectComposer>
    </>
  )
}
