import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

const FRAMEWORKS = [
  { name: 'reveal.js',        stars: '71.0k',  commit: '2026-04-17', tag: 'Vanilla + HTML',  alive: true },
  { name: 'Slidev',           stars: '45.8k',  commit: '2026-04-16', tag: 'Vue 3 + Vite',    alive: true },
  { name: 'Remotion',         stars: '43.9k',  commit: 'daily',      tag: 'React → MP4',     alive: true },
  { name: 'impress.js',       stars: '38.3k',  commit: '2025-09',    tag: 'CSS3 3D',         alive: true },
  { name: 'Marp',             stars: '19.0k',  commit: '2026-04',    tag: 'TS + Markdown',   alive: true },
  { name: 'Motion Canvas',    stars: '18.4k',  commit: '2025-02',    tag: 'TS DSL',          alive: false, note: 'maintainer hiatus' },
  { name: 'frontend-slides',  stars: '14.8k',  commit: '2026',       tag: 'Prompt pack',     alive: false, note: 'not a framework' },
  { name: 'Spectacle v10',    stars: '10.1k',  commit: '2026-04',    tag: 'React + JSX',     alive: true },
  { name: 'Code Hike',        stars: '5.3k',   commit: '2026-03',    tag: 'MDX + React',     alive: true },
  { name: 'Animotion',        stars: '1.7k',   commit: '2026-04',    tag: 'Svelte 5',        alive: true },
  { name: 'MDX Deck',         stars: '11.5k',  commit: '2023-01',    tag: 'React + MDX',     alive: false, note: 'abandoned' },
  { name: 'DeckDeckGo',       stars: '1.7k',   commit: '2024-02',    tag: 'Stencil WC',      alive: false, note: 'archived' },
  { name: 'Eagle.js',         stars: '4.1k',   commit: '2022-07',    tag: 'Vue 2 only',      alive: false, note: 'dead' },
  { name: 'WebSlides',        stars: '6.3k',   commit: '2022-12',    tag: 'Vanilla',         alive: false, note: 'dead' },
]

export default function Ecosystem03({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(180deg, #050518 0%, #0a0a2a 100%)">
      <CursorGradient color="rgba(99, 102, 241, 0.2)" size={500} />
      <div className="noise" />

      <div className="relative z-10 h-full flex flex-col px-[140px] py-[90px]">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="font-mono text-xs tracking-[0.4em] text-indigo-300/70 mb-6 uppercase"
        >
          03 · Ecosystem scan, April 2026
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.15 }}
          className="text-[72px] font-bold leading-[1] tracking-[-0.03em] mb-10 text-white"
        >
          The landscape, <span className="text-indigo-300">checked honestly.</span>
        </motion.h2>

        <div className="flex-1 grid grid-cols-2 gap-x-12 gap-y-[10px] font-mono text-[14px]">
          {FRAMEWORKS.map((f, i) => (
            <motion.div
              key={f.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.035, ease: 'easeOut' }}
              className="flex items-baseline gap-3 py-[6px] border-b border-white/5"
            >
              <span className={`w-1.5 h-1.5 rounded-full ${f.alive ? 'bg-emerald-400' : 'bg-rose-400/60'}`} />
              <span className={`flex-1 font-semibold tracking-wide ${f.alive ? 'text-white' : 'text-white/40 line-through decoration-rose-400/50'}`}>
                {f.name}
              </span>
              <span className="text-white/40 w-[54px] text-right">{f.stars}</span>
              <span className="text-white/30 w-[90px] text-right">{f.commit}</span>
              <span className={`w-[140px] text-right truncate ${f.alive ? 'text-indigo-300/70' : 'text-rose-400/70'}`}>
                {f.note ?? f.tag}
              </span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="mt-8 flex items-center gap-8 font-mono text-xs text-white/40"
        >
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> alive & active
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400/60" /> zombie / dead / deceiving
          </span>
          <span className="ml-auto text-white/30">
            solid.js + astro = empty (no deck ecosystem)
          </span>
        </motion.div>
      </div>
    </Slide>
  )
}
