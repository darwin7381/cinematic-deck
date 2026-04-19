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
  { name: 'Motion Canvas',    stars: '18.4k',  commit: '2025-02',    tag: 'hiatus',          alive: false, note: 'hiatus' },
  { name: 'frontend-slides',  stars: '14.8k',  commit: '2026',       tag: 'prompt pack',     alive: false, note: 'not framework' },
  { name: 'Spectacle v10',    stars: '10.1k',  commit: '2026-04',    tag: 'React + JSX',     alive: true },
  { name: 'Code Hike',        stars: '5.3k',   commit: '2026-03',    tag: 'MDX + React',     alive: true },
  { name: 'Animotion',        stars: '1.7k',   commit: '2026-04',    tag: 'Svelte 5',        alive: true },
  { name: 'MDX Deck',         stars: '11.5k',  commit: '2023-01',    tag: 'abandoned',       alive: false, note: 'abandoned' },
  { name: 'DeckDeckGo',       stars: '1.7k',   commit: '2024-02',    tag: 'archived',        alive: false, note: 'archived' },
  { name: 'Eagle.js',         stars: '4.1k',   commit: '2022-07',    tag: 'dead',            alive: false, note: 'dead' },
  { name: 'WebSlides',        stars: '6.3k',   commit: '2022-12',    tag: 'dead',            alive: false, note: 'dead' },
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
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'
        return (
          <>
            <CursorGradient color="rgba(99, 102, 241, 0.2)" size={500} />
            <div className="noise" />

            <div className={`relative z-10 h-full flex flex-col ${isPortrait ? 'px-[70px] py-[120px]' : 'px-[140px] py-[90px]'}`}>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
                className={`font-mono tracking-[0.4em] text-indigo-300/70 uppercase ${isPortrait ? 'text-base mb-8' : 'text-xs mb-6'}`}
              >
                03 · Ecosystem scan, April 2026
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.15 }}
                className={`font-bold leading-[1] tracking-[-0.03em] text-white ${isPortrait ? 'text-[72px] mb-10' : 'text-[72px] mb-10'}`}
              >
                The landscape,<br />
                <span className="text-indigo-300">checked honestly.</span>
              </motion.h2>

              {/* Portrait: single column compact · Landscape: 2 columns */}
              <div
                className={
                  isPortrait
                    ? 'flex-1 flex flex-col gap-[6px] font-mono text-[18px]'
                    : 'flex-1 grid grid-cols-2 gap-x-12 gap-y-[10px] font-mono text-[14px]'
                }
              >
                {FRAMEWORKS.map((f, i) => (
                  <motion.div
                    key={f.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 + i * 0.035, ease: 'easeOut' }}
                    className="flex items-baseline gap-3 py-[8px] border-b border-white/5"
                  >
                    <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${f.alive ? 'bg-emerald-400' : 'bg-rose-400/60'}`} />
                    <span className={`flex-1 font-semibold tracking-wide ${f.alive ? 'text-white' : 'text-white/40 line-through decoration-rose-400/50'}`}>
                      {f.name}
                    </span>
                    <span className={`text-white/40 text-right ${isPortrait ? 'w-[64px]' : 'w-[54px]'}`}>{f.stars}</span>
                    {!isPortrait && <span className="text-white/30 w-[90px] text-right">{f.commit}</span>}
                    <span className={`text-right truncate ${isPortrait ? 'w-[120px]' : 'w-[140px]'} ${f.alive ? 'text-indigo-300/70' : 'text-rose-400/70'}`}>
                      {f.note ?? f.tag}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 1.3 }}
                className={`mt-8 font-mono text-white/40 ${isPortrait ? 'flex flex-col gap-2 text-sm' : 'flex items-center gap-8 text-xs'}`}
              >
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> alive & active
                </span>
                <span className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400/60" /> zombie / dead / deceiving
                </span>
                {!isPortrait && (
                  <span className="ml-auto text-white/30">
                    solid.js + astro = empty
                  </span>
                )}
              </motion.div>
            </div>
          </>
        )
      }}
    </Slide>
  )
}
