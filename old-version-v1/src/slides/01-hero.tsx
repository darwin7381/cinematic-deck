import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial, Environment } from '@react-three/drei'
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

function GlassKnot() {
  return (
    <Float speed={1.5} rotationIntensity={1.2} floatIntensity={1.5}>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusKnotGeometry args={[1.1, 0.38, 180, 48]} />
        <MeshTransmissionMaterial
          thickness={0.55}
          roughness={0.05}
          anisotropicBlur={0.3}
          chromaticAberration={0.08}
          distortion={0.3}
          temporalDistortion={0.15}
          ior={1.4}
          color="#d8b4fe"
        />
      </mesh>
    </Float>
  )
}

export default function Hero01({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(135deg, #0a0a1f 0%, #1a0a2e 50%, #0f0520 100%)">
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'
        return (
          <>
            <div className="absolute inset-0">
              <Canvas camera={{ position: [0, 0, 4.5], fov: isPortrait ? 55 : 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1.5} />
                <Environment preset="city" />
                <GlassKnot />
                <EffectComposer>
                  <Bloom intensity={1.2} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
                  <ChromaticAberration offset={[0.0015, 0.0015] as unknown as [number, number]} />
                </EffectComposer>
              </Canvas>
            </div>

            <CursorGradient color="rgba(232, 121, 249, 0.35)" size={isPortrait ? 500 : 700} />
            <div className="noise" />

            <div
              className={`relative z-10 h-full flex flex-col justify-center ${
                isPortrait ? 'px-[80px] py-[120px]' : 'px-[140px]'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className={`font-mono tracking-[0.4em] text-pink-300/70 uppercase ${
                  isPortrait ? 'text-base mb-10' : 'text-sm mb-8'
                }`}
              >
                Cinematic Deck · 2026
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`font-bold leading-[0.95] tracking-[-0.04em] ${
                  isPortrait ? 'text-[110px] mb-14' : 'text-[140px] mb-10'
                }`}
                style={{
                  background: 'linear-gradient(180deg, #fff 0%, #c4b5fd 60%, #f0abfc 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Design should<br />move you.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className={`text-white/60 leading-relaxed font-light ${
                  isPortrait ? 'text-[26px] max-w-full' : 'text-2xl max-w-[720px]'
                }`}
              >
                React · Framer Motion · R3F · drei · shadcn
                <br />
                <span className="text-white/40">No framework sandbox.<br />Pure component freedom.</span>
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className={`absolute flex items-center gap-3 font-mono text-white/40 tracking-widest ${
                  isPortrait
                    ? 'bottom-[140px] left-[80px] text-sm'
                    : 'bottom-[80px] right-[140px] text-xs'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                {isPortrait ? 'TAP OR SWIPE TO ADVANCE' : 'HOVER TO INTERACT'}
              </motion.div>
            </div>
          </>
        )
      }}
    </Slide>
  )
}
