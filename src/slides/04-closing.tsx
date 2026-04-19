import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { Environment, Sparkles, Float } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

function Orb() {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh>
        <icosahedronGeometry args={[1.3, 4]} />
        <meshStandardMaterial
          color="#f0abfc"
          emissive="#e879f9"
          emissiveIntensity={0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </Float>
  )
}

export default function Closing04({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="#000">
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 2]}>
          <ambientLight intensity={0.2} />
          <pointLight position={[5, 5, 5]} intensity={2} color="#f0abfc" />
          <Environment preset="night" />
          <Orb />
          <Sparkles count={150} scale={10} size={2.5} speed={0.4} color="#e9d5ff" />
          <EffectComposer>
            <Bloom intensity={1.8} luminanceThreshold={0.1} luminanceSmoothing={0.95} />
          </EffectComposer>
        </Canvas>
      </div>

      <CursorGradient color="rgba(236, 72, 153, 0.3)" size={600} />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="font-mono text-xs tracking-[0.4em] text-pink-300/70 mb-10 uppercase"
        >
          Now ship yours.
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-[180px] font-bold leading-[0.9] tracking-[-0.05em] mb-12"
          style={{
            background: 'linear-gradient(180deg, #fff 0%, #f0abfc 60%, #e879f9 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          make it<br />move.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-mono text-sm text-white/40 tracking-wider"
        >
          pnpm dev · cmd+shift+r · ship it
        </motion.div>
      </div>
    </Slide>
  )
}
