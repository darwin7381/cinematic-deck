import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

type Row = { name: string; scores: number[]; total: number; winner?: boolean }

const DIMENSIONS = ['Design', '2D anim', '3D anim', 'Interact', 'AI-edit', 'Onboard', 'Ecosystem', 'Ceiling']
const DIM_SHORT = ['Des', '2D', '3D', 'Int', 'AI', 'On', 'Eco', 'Top']

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
  if (s >= 9) return 'bg-emerald-400/20'
  if (s >= 7) return 'bg-cyan-400/20'
  if (s >= 5) return 'bg-amber-400/20'
  return 'bg-rose-400/20'
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
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'

        return (
          <>
            <CursorGradient color="rgba(168, 85, 247, 0.2)" size={550} />
            <div className="noise" />

            <div className={`relative z-10 h-full flex flex-col ${isPortrait ? 'px-[60px] py-[120px]' : 'px-[140px] py-[80px]'}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className={`font-mono tracking-[0.4em] text-fuchsia-300/70 uppercase ${isPortrait ? 'text-base mb-6' : 'text-xs mb-6'}`}
              >
                06 · Scoring matrix
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
                className={`font-bold leading-[1] tracking-[-0.03em] text-white ${isPortrait ? 'text-[72px] mb-4' : 'text-[72px] mb-3'}`}
              >
                Eight dimensions.<br />
                <span className="text-fuchsia-300">One winner.</span>
              </motion.h2>

              {/* PORTRAIT: card-list with big total, compact scores below */}
              {isPortrait ? (
                <div className="flex-1 flex flex-col gap-3 mt-6">
                  {CONTENDERS.map((c, idx) => (
                    <motion.div
                      key={c.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.3 + idx * 0.08 }}
                      className={`rounded-xl p-4 relative overflow-hidden ${c.winner ? 'bg-gradient-to-r from-fuchsia-500/15 via-purple-500/10 to-transparent ring-1 ring-fuchsia-400/40' : 'bg-white/[0.04]'}`}
                    >
                      <div className="flex items-baseline gap-3 mb-3">
                        {c.winner && <span className="text-fuchsia-300 text-sm font-mono">◆</span>}
                        <span className={`flex-1 text-[22px] font-semibold leading-tight ${c.winner ? 'text-white' : 'text-white/80'}`}>
                          {c.name}
                        </span>
                        <span className={`font-mono font-bold text-[32px] ${c.winner ? 'text-fuchsia-300' : 'text-white/60'}`}>
                          {c.total}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {c.scores.map((s, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.6 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                              type: 'spring',
                              stiffness: 200,
                              damping: 15,
                              delay: 0.5 + idx * 0.08 + i * 0.03,
                            }}
                            className="flex-1 flex flex-col items-center gap-1"
                          >
                            <div className="text-[9px] font-mono text-white/30 uppercase">{DIM_SHORT[i]}</div>
                            <div className={`w-full aspect-square rounded flex items-center justify-center text-[16px] font-mono font-bold text-white ${scoreColor(s)}`}>
                              {s}
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                // LANDSCAPE: original horizontal matrix
                <>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.9, delay: 0.3 }}
                    className="text-base text-white/45 font-light font-mono mb-8"
                  >
                    each 0–10 · {DIMENSIONS.join(' · ')}
                  </motion.p>
                  <div className="flex-1 flex flex-col gap-2">
                    <div
                      className="grid gap-1 items-center px-3 text-[9px] font-mono uppercase tracking-widest text-white/40"
                      style={{ gridTemplateColumns: '1fr repeat(8, 36px) 52px' }}
                    >
                      <div></div>
                      {DIMENSIONS.map(d => (
                        <div key={d} className="text-center">{d}</div>
                      ))}
                      <div className="text-right">Total</div>
                    </div>
                    {CONTENDERS.map((c, idx) => (
                      <motion.div
                        key={c.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                        className={`grid gap-1 items-center rounded-xl px-3 py-2.5 relative overflow-hidden ${c.winner ? 'bg-gradient-to-r from-fuchsia-500/15 via-purple-500/10 to-transparent ring-1 ring-fuchsia-400/40' : 'bg-white/[0.03]'}`}
                        style={{ gridTemplateColumns: '1fr repeat(8, 36px) 52px' }}
                      >
                        <div className={`font-medium flex items-center gap-2 min-w-0 text-[15px] ${c.winner ? 'text-white' : 'text-white/75'}`}>
                          {c.winner && <span className="text-fuchsia-300 text-xs font-mono flex-shrink-0">◆</span>}
                          <span className="truncate">{c.name}</span>
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
                            <div className={`w-[30px] h-[30px] rounded-md flex items-center justify-center text-[11px] font-mono font-bold text-white ${scoreColor(s)}`}>
                              {s}
                            </div>
                          </motion.div>
                        ))}
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1.2 + idx * 0.08 }}
                          className={`text-right font-mono font-bold text-lg ${c.winner ? 'text-fuchsia-300' : 'text-white/60'}`}
                        >
                          {c.total}
                        </motion.div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )
      }}
    </Slide>
  )
}
