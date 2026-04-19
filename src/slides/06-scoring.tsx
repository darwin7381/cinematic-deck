import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

type Row = { name: string; scores: number[]; total: number; winner?: boolean }

const DIMENSIONS = ['Design', '2D anim', '3D anim', 'Interact', 'AI-edit', 'Onboard', 'Ecosystem', 'Ceiling']

const CONTENDERS: Row[] = [
  { name: 'Vite + React + Framer + R3F + drei',  scores: [9, 10, 10, 10, 8, 6, 10, 10], total: 73, winner: true },
  { name: 'reveal.js 6 + React + Remotion',      scores: [8, 9, 9, 9, 8, 5, 9, 9],      total: 66 },
  { name: 'Mixed: Vue body + React iframe 3D',   scores: [9, 8, 9, 8, 7, 6, 8, 9],      total: 64 },
  { name: 'Vite + Vue + motion-v + TresJS',      scores: [10, 8, 6, 9, 8, 7, 7, 8],     total: 63 },
  { name: 'Spectacle v10 (React JSX)',           scores: [8, 8, 9, 9, 9, 8, 7, 9],      total: 58 },
  { name: 'code-on-sunday',                      scores: [6, 5, 6, 4, 9, 10, 5, 6],     total: 49 },
  { name: 'frontend-slides (prompt pack)',       scores: [5, 3, 3, 3, 9, 10, 8, 5],     total: 46 },
]

function scoreColor(s: number) {
  if (s >= 9) return 'bg-emerald-400'
  if (s >= 7) return 'bg-cyan-400'
  if (s >= 5) return 'bg-amber-400'
  return 'bg-rose-400'
}

export default function Scoring06({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(135deg, #0a0520 0%, #1a0a2e 100%)">
      <CursorGradient color="rgba(168, 85, 247, 0.2)" size={550} />
      <div className="noise" />

      <div className="relative z-10 h-full flex flex-col px-[140px] py-[80px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-mono text-xs tracking-[0.4em] text-fuchsia-300/70 mb-6 uppercase"
        >
          06 · Scoring matrix
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-[72px] font-bold leading-[1] tracking-[-0.03em] mb-3 text-white"
        >
          Eight dimensions. <span className="text-fuchsia-300">One winner.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="text-base text-white/45 font-light mb-8 font-mono"
        >
          {DIMENSIONS.join(' · ')} · each 0–10
        </motion.p>

        <div className="flex-1 flex flex-col gap-2">
          {/* Header row */}
          <div className="grid grid-cols-[1fr_repeat(8,36px)_60px] gap-2 items-center px-4 text-[10px] font-mono uppercase tracking-widest text-white/40">
            <div></div>
            {DIMENSIONS.map(d => (
              <div key={d} className="text-center text-[9px]">{d}</div>
            ))}
            <div className="text-right">Total</div>
          </div>

          {CONTENDERS.map((c, idx) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={`grid grid-cols-[1fr_repeat(8,36px)_60px] gap-2 items-center rounded-xl px-4 py-3 relative overflow-hidden ${c.winner ? 'bg-gradient-to-r from-fuchsia-500/15 via-purple-500/10 to-transparent ring-1 ring-fuchsia-400/40' : 'bg-white/[0.03]'}`}
            >
              <div className={`text-[15px] font-medium ${c.winner ? 'text-white' : 'text-white/75'} flex items-center gap-2`}>
                {c.winner && <span className="text-fuchsia-300 text-xs font-mono">◆</span>}
                <span>{c.name}</span>
              </div>
              {c.scores.map((s, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                    delay: 0.7 + idx * 0.08 + i * 0.03,
                  }}
                  className="flex items-center justify-center"
                >
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center text-[11px] font-mono font-bold ${scoreColor(s)}/20 text-white`}>
                    {s}
                  </div>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 + idx * 0.08 }}
                className={`text-right font-mono text-lg font-bold ${c.winner ? 'text-fuchsia-300' : 'text-white/60'}`}
              >
                {c.total}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  )
}
