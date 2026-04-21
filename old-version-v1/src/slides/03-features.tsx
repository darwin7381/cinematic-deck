import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'
import { Sparkles, Layers, Wand2, Box } from 'lucide-react'

const FEATURES = [
  {
    icon: Wand2,
    title: 'Framer Motion',
    blurb: 'Full spring physics, layout animations, scroll-linked, gesture-driven.',
    color: 'from-pink-400 to-fuchsia-400',
  },
  {
    icon: Box,
    title: 'React Three Fiber',
    blurb: 'Glass transmission, bloom, chromatic aberration. 300+ drei helpers.',
    color: 'from-violet-400 to-indigo-400',
  },
  {
    icon: Layers,
    title: 'Any component',
    blurb: 'shadcn/ui, Radix, Rive, Remotion Player, Lottie. You own it.',
    color: 'from-cyan-400 to-sky-400',
  },
  {
    icon: Sparkles,
    title: 'AI-native',
    blurb: 'Tailwind + TS + Vite. LLMs write this stack best.',
    color: 'from-emerald-400 to-teal-400',
  },
]

export default function Features03({ onStepsChange, step }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(FEATURES.length) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(180deg, #0a0520 0%, #1a0a2e 100%)">
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'
        return (
          <>
            <CursorGradient color="rgba(168, 85, 247, 0.25)" size={600} />
            <div className="noise" />

            <motion.div
              className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(236, 72, 153, 0.3) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ scale: [1, 1.15, 1], rotate: [0, 20, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />

            <div className={`relative z-10 h-full flex flex-col ${isPortrait ? 'px-[60px] py-[120px]' : 'px-[140px] py-[100px]'}`}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.9 }}
                className={`font-mono tracking-[0.4em] text-pink-300/70 uppercase ${isPortrait ? 'text-base mb-6' : 'text-xs mb-6'}`}
              >
                09 · What's inside
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
                className={`font-bold leading-[1] tracking-[-0.03em] text-white ${isPortrait ? 'text-[80px] mb-10' : 'text-[96px] mb-14 max-w-[1200px]'}`}
              >
                Not another<br />slide framework.
              </motion.h2>

              <div className={`flex-1 gap-6 ${isPortrait ? 'grid grid-cols-2' : 'grid grid-cols-2 gap-8'}`}>
                {FEATURES.map((f, i) => {
                  const Icon = f.icon
                  const shouldShow = step === 0 || i < step
                  return (
                    <motion.div
                      key={f.title}
                      initial={{ opacity: 0, y: 50, scale: 0.95 }}
                      animate={shouldShow ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.15, y: 0, scale: 0.98 }}
                      transition={{
                        type: 'spring',
                        stiffness: 120,
                        damping: 18,
                        delay: step === 0 ? 0.3 + i * 0.12 : 0,
                      }}
                      className={`glass rounded-2xl flex flex-col gap-3 relative overflow-hidden group ${isPortrait ? 'p-6' : 'p-8 gap-4'}`}
                    >
                      <div
                        className={`absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-40 blur-2xl bg-gradient-to-br ${f.color}`}
                      />
                      <div className={`relative z-10 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-lg ${isPortrait ? 'w-11 h-11' : 'w-14 h-14'}`}>
                        <Icon className={isPortrait ? 'w-5 h-5 text-black' : 'w-7 h-7 text-black'} strokeWidth={2.2} />
                      </div>
                      <h3 className={`font-bold text-white relative z-10 ${isPortrait ? 'text-xl' : 'text-3xl'}`}>{f.title}</h3>
                      <p className={`text-white/60 leading-relaxed relative z-10 font-light ${isPortrait ? 'text-sm' : 'text-lg'}`}>
                        {f.blurb}
                      </p>
                    </motion.div>
                  )
                })}
              </div>

              {step > 0 && step < FEATURES.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`absolute font-mono text-white/30 tracking-widest ${isPortrait ? 'bottom-[140px] left-[60px] text-sm' : 'bottom-[90px] left-[140px] text-xs'}`}
                >
                  → {isPortrait ? 'TAP' : 'PRESS SPACE'} TO REVEAL ({step}/{FEATURES.length})
                </motion.div>
              )}
            </div>
          </>
        )
      }}
    </Slide>
  )
}
