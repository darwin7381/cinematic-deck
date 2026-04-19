import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'
import { X, Check } from 'lucide-react'

type Item = { label: string; ok: boolean; detail?: string }

const FRONTEND_SLIDES: Item[] = [
  { label: 'Runtime code',          ok: false, detail: '0 lines — 只有 .md 檔' },
  { label: 'Example HTML',          ok: false, detail: 'repo 裡完全沒有' },
  { label: 'Animation library',     ok: false, detail: 'GSAP / Framer / anime — 全 0 match' },
  { label: '@keyframes',            ok: false, detail: '整個 repo 搜不到' },
  { label: '12 real presets',       ok: false, detail: '後 4 個只有 3 行描述' },
]

const CODE_ON_SUNDAY: Item[] = [
  { label: 'Framer Motion (real)',  ok: false, detail: '只用 5 個 basic variants' },
  { label: 'Spring physics',        ok: false, detail: 'SKILL 明文禁止 spring' },
  { label: 'Progressive reveal',    ok: false, detail: '6 examples 裡 useState = 0' },
  { label: '<Deck> / <Slide>',      ok: false, detail: '根本沒定義' },
  { label: '11 real presets',       ok: false, detail: '只有 3 個有 example' },
]

function Card({ title, stars, subtitle, items, color }: { title: string; stars: string; subtitle: string; items: Item[]; color: string }) {
  return (
    <div className="glass-strong rounded-2xl p-10 flex flex-col">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="text-[40px] font-bold text-white tracking-tight">{title}</h3>
        <span className="font-mono text-sm text-amber-300/80">{stars} ⭐</span>
      </div>
      <p className={`text-lg mb-8 font-light ${color}`}>{subtitle}</p>
      <div className="space-y-4 flex-1">
        {items.map((it, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + i * 0.08 }}
            className="flex items-start gap-4"
          >
            <div className={`mt-1 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${it.ok ? 'bg-emerald-400/20' : 'bg-rose-500/20'}`}>
              {it.ok ? <Check className="w-4 h-4 text-emerald-400" strokeWidth={3} /> : <X className="w-4 h-4 text-rose-400" strokeWidth={3} />}
            </div>
            <div className="flex-1">
              <div className="text-white font-medium text-[17px]">{it.label}</div>
              {it.detail && <div className="text-sm text-white/40 mt-0.5 font-mono">{it.detail}</div>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default function ViralFakes04({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(135deg, #1a0618 0%, #2a0a2e 100%)">
      <CursorGradient color="rgba(236, 72, 153, 0.2)" size={550} />
      <div className="noise" />

      <div className="relative z-10 h-full flex flex-col px-[140px] py-[90px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-mono text-xs tracking-[0.4em] text-rose-300/70 mb-6 uppercase"
        >
          04 · The viral fakes, source-read
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-[72px] font-bold leading-[1] tracking-[-0.03em] mb-4 text-white"
        >
          Stars lie. <span className="text-rose-300">READMEs lie.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-xl text-white/50 font-light mb-10 max-w-[1100px]"
        >
          Cloned both repos. Read every source file. Counted every import. Here's what the hype hides.
        </motion.p>

        <div className="grid grid-cols-2 gap-8 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              title="frontend-slides"
              stars="14.8k"
              subtitle="「AI-first cinematic deck」宣傳 → 實際是 8 個 .md prompt 檔"
              items={FRONTEND_SLIDES}
              color="text-rose-300/70"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <Card
              title="code-on-sunday"
              stars="new"
              subtitle="「anti-AI-slop + progressive reveal」 → 檢查 source 後發現謊言"
              items={CODE_ON_SUNDAY}
              color="text-amber-300/70"
            />
          </motion.div>
        </div>
      </div>
    </Slide>
  )
}
