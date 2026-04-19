import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

const STACK = [
  { name: 'Vite', reason: 'Lightning HMR · ESM native · no SSR overhead' },
  { name: 'React 19', reason: 'Concurrent · largest LLM corpus' },
  { name: 'Framer Motion 12', reason: 'Spring · layout · gestures · scroll-linked' },
  { name: 'Tailwind v4', reason: 'Design tokens · zero-config · Oklch' },
  { name: 'react-three-fiber + drei', reason: 'Declarative 3D · 300+ helpers' },
  { name: 'shadcn / Radix', reason: 'Copy-paste primitives · accessibility' },
]

export default function Winner07({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(135deg, #0a0a2e 0%, #1a0830 50%, #2d0a4a 100%)">
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'
        return (
          <>
            <CursorGradient color="rgba(236, 72, 153, 0.22)" size={isPortrait ? 600 : 700} />
            <div className="noise" />

            <motion.div
              className="absolute -top-80 -right-40 w-[900px] h-[900px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.25) 0%, transparent 65%)',
                filter: 'blur(80px)',
              }}
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-80 -left-40 w-[800px] h-[800px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.22) 0%, transparent 65%)',
                filter: 'blur(80px)',
              }}
              animate={{ scale: [1.08, 1, 1.08] }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className={`relative z-10 h-full flex flex-col ${isPortrait ? 'px-[60px] py-[130px]' : 'px-[140px] py-[90px]'}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className={`font-mono tracking-[0.4em] text-pink-300/80 uppercase ${isPortrait ? 'text-base mb-8' : 'text-xs mb-6'}`}
              >
                07 · The winning stack
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`font-bold leading-[0.95] tracking-[-0.04em] text-white ${isPortrait ? 'text-[110px] mb-4' : 'text-[108px] mb-4'}`}
              >
                Build it
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #f0abfc 0%, #a78bfa 60%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  yourself.
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 0.5 }}
                className={`text-white/55 font-light ${isPortrait ? 'text-lg mb-8 max-w-full' : 'text-xl mb-10 max-w-[900px]'}`}
              >
                No framework sandbox. No Markdown DSL. ~600 lines of plain React.
              </motion.p>

              <div className={`gap-x-6 gap-y-3 ${isPortrait ? 'flex flex-col max-w-full' : 'grid grid-cols-2 gap-x-10 gap-y-4 max-w-[1400px]'}`}>
                {STACK.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, y: 30, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 18,
                      delay: 0.6 + i * 0.09,
                    }}
                    className={`glass rounded-xl flex items-baseline gap-4 ${isPortrait ? 'px-5 py-4' : 'px-6 py-5'}`}
                  >
                    <span className={`font-mono text-pink-300/60 ${isPortrait ? 'text-[10px] w-5' : 'text-[11px] w-6'}`}>
                      0{i + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className={`font-semibold text-white ${isPortrait ? 'text-lg mb-0.5' : 'text-xl mb-1'}`}>{s.name}</div>
                      <div className={`text-white/50 font-light leading-relaxed ${isPortrait ? 'text-xs' : 'text-sm'}`}>{s.reason}</div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.9, delay: 1.5 }}
                className={`font-mono text-white/40 flex items-center gap-3 ${isPortrait ? 'mt-6 text-xs' : 'mt-10 text-sm'}`}
              >
                <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
                <span>this deck you're watching uses exactly this stack →</span>
              </motion.div>
            </div>
          </>
        )
      }}
    </Slide>
  )
}
