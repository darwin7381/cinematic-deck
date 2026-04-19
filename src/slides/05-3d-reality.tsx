import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

type Row = { tool: string; react: string; reactNum: number; vue: string; vueNum: number }

const ROWS: Row[] = [
  { tool: 'Three.js wrapper',   react: 'react-three-fiber',        reactNum: 30500, vue: 'TresJS',          vueNum: 3500 },
  { tool: 'Helper library',     react: 'drei (300+ comp)',         reactNum: 9600,  vue: 'cientos (~30)',   vueNum: 373 },
  { tool: 'Physics animation',  react: 'react-spring',             reactNum: 29000, vue: '@vueuse/motion',  vueNum: 2200 },
  { tool: 'Post-processing',    react: 'postprocessing',           reactNum: 2760,  vue: '— self-roll',     vueNum: 0 },
  { tool: 'Debug GUI',          react: 'leva',                     reactNum: 5900,  vue: '— self-roll',     vueNum: 0 },
  { tool: 'Rive runtime',       react: 'rive-react (official)',    reactNum: 1100,  vue: '— not official',  vueNum: 3 },
  { tool: 'Spline SDK',         react: '@splinetool/react-spline', reactNum: 1400,  vue: '— not official',  vueNum: 0 },
]

function formatStars(n: number) {
  if (n === 0) return '—'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`
  return String(n)
}

export default function ThreeDReality05({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  const maxStars = Math.max(...ROWS.map(r => r.reactNum))

  return (
    <Slide background="linear-gradient(135deg, #001a3a 0%, #0a0520 70%)">
      <CursorGradient color="rgba(34, 211, 238, 0.18)" size={550} />
      <div className="noise" />

      <div className="relative z-10 h-full flex flex-col px-[140px] py-[90px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-mono text-xs tracking-[0.4em] text-cyan-300/70 mb-6 uppercase"
        >
          05 · The 3D reality check
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-[80px] font-bold leading-[1] tracking-[-0.03em] mb-4 text-white"
        >
          React vs Vue, when
          <br />
          <span className="text-cyan-300">3D enters the chat.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-lg text-white/45 font-light mb-10"
        >
          The gap isn't 2× or 3×. It's an order of magnitude. Here are 2026-04 GitHub stars, side by side.
        </motion.p>

        <div className="flex-1 grid grid-cols-[240px_1fr_1fr] gap-x-8 gap-y-3 items-center">
          {/* Header */}
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-white/40">tool</div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-cyan-300/60">react ecosystem</div>
          <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-emerald-300/50">vue ecosystem</div>

          {ROWS.map((row, i) => (
            <div key={row.tool} className="contents">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="text-white/80 text-[16px] font-medium"
              >
                {row.tool}
              </motion.div>

              {/* React bar */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 h-7 relative bg-white/5 rounded-md overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(row.reactNum / maxStars) * 100}%` }}
                    transition={{ duration: 1, delay: 0.7 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="h-full bg-gradient-to-r from-cyan-500/60 to-indigo-500/60"
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-[13px] font-mono text-white/90">
                    {row.react}
                  </div>
                </div>
                <span className="font-mono text-sm text-cyan-300/80 w-[44px] text-right">{formatStars(row.reactNum)}⭐</span>
              </motion.div>

              {/* Vue bar */}
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                className="flex items-center gap-3"
              >
                <div className="flex-1 h-7 relative bg-white/5 rounded-md overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: row.vueNum > 0 ? `${(row.vueNum / maxStars) * 100}%` : '0%' }}
                    transition={{ duration: 1, delay: 0.75 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className={`h-full ${row.vueNum > 0 ? 'bg-gradient-to-r from-emerald-500/40 to-teal-500/40' : ''}`}
                  />
                  <div className="absolute inset-0 flex items-center px-3 text-[13px] font-mono text-white/60">
                    {row.vue}
                  </div>
                </div>
                <span className="font-mono text-sm text-emerald-300/70 w-[44px] text-right">{formatStars(row.vueNum)}{row.vueNum > 0 ? '⭐' : ''}</span>
              </motion.div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-10 font-mono text-sm text-white/50 border-l-2 border-cyan-400/40 pl-5 max-w-[900px]"
        >
          <span className="text-cyan-300/80">Verdict</span> · if your deck touches 3D, Rive, or Spline — React wins before you start typing.
        </motion.div>
      </div>
    </Slide>
  )
}
