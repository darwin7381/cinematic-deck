import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { FakeTerminal } from '../components/FakeTerminal'
import { CursorGradient } from '../components/CursorGradient'

export default function Terminal02({ onStepsChange, active }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="radial-gradient(ellipse at top, #0d1b2a 0%, #050518 70%)">
      <CursorGradient color="rgba(34, 211, 238, 0.15)" size={500} />
      <div className="noise" />

      <div className="relative z-10 h-full grid grid-cols-2 gap-20 px-[140px] py-[120px]">
        {/* Left: copy */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-mono text-xs tracking-[0.4em] text-cyan-300/70 mb-8 uppercase"
          >
            02 · Scripted Terminal Animation
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="text-[88px] font-bold leading-[1] tracking-[-0.03em] mb-10 text-white"
          >
            Fake CLI,<br />
            <span className="text-cyan-300">real impact.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xl text-white/50 leading-relaxed font-light max-w-[480px]"
          >
            Hand-crafted typing sequences, arbitrary delays, colored output.
            The same technique LivePPT fakes — but you own the code.
          </motion.p>
        </div>

        {/* Right: glass terminal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-black/20">
            <div className="w-3 h-3 rounded-full bg-red-400/70" />
            <div className="w-3 h-3 rounded-full bg-yellow-400/70" />
            <div className="w-3 h-3 rounded-full bg-green-400/70" />
            <div className="flex-1 text-center font-mono text-xs text-white/40">
              ~/joey/cinematic-deck
            </div>
          </div>
          <div className="flex-1 p-8">
            <FakeTerminal
              active={active}
              lines={[
                { type: 'prompt', text: 'pnpm create vite cinematic-deck --template react-ts', typingSpeed: 28 },
                { type: 'output', text: '✓ Scaffolded project in /Users/joey/cinematic-deck', delay: 600 },
                { type: 'prompt', text: 'pnpm add framer-motion @react-three/fiber @react-three/drei', typingSpeed: 32 },
                { type: 'output', text: '+ framer-motion 12.36.0', delay: 500 },
                { type: 'output', text: '+ @react-three/fiber 30.5.0', delay: 150 },
                { type: 'output', text: '+ @react-three/drei 9.58.0', delay: 150 },
                { type: 'prompt', text: 'pnpm dev', typingSpeed: 40 },
                { type: 'output', text: '  VITE v8.0.0  ready in 248 ms', delay: 600 },
                { type: 'output', text: '  ➜  Local:   http://localhost:5173/', delay: 200 },
                { type: 'output', text: '  ➜  Ship cinematic deck. ✨', delay: 400 },
              ]}
            />
          </div>
        </motion.div>
      </div>
    </Slide>
  )
}
