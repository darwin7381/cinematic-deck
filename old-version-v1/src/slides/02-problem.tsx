import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Slide } from '../components/Slide'
import { CursorGradient } from '../components/CursorGradient'

export default function Problem02({ onStepsChange }: {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void
}) {
  useEffect(() => { onStepsChange(0) }, [onStepsChange])

  return (
    <Slide background="linear-gradient(135deg, #1a0a2e 0%, #2d0b3f 100%)">
      {({ orientation }) => {
        const isPortrait = orientation === 'portrait'
        return (
          <>
            <CursorGradient color="rgba(236, 72, 153, 0.25)" size={isPortrait ? 480 : 600} />
            <div className="noise" />

            <div
              className={`relative z-10 h-full flex flex-col justify-center ${
                isPortrait ? 'px-[80px] py-[140px]' : 'px-[140px]'
              }`}
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`font-mono tracking-[0.4em] text-rose-300/60 uppercase ${
                  isPortrait ? 'text-base mb-10' : 'text-xs mb-8'
                }`}
              >
                02 · The question
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className={`font-bold leading-[0.95] tracking-[-0.04em] text-white ${
                  isPortrait ? 'text-[130px] mb-12' : 'text-[128px] mb-10'
                }`}
              >
                But everyone
                <br />
                <span
                  style={{
                    background: 'linear-gradient(90deg, #fb7185 0%, #f0abfc 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  lies.
                </span>
              </motion.h2>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className={isPortrait ? 'space-y-8 max-w-[900px]' : 'max-w-[1100px] space-y-6'}
              >
                <p className={`text-white/70 font-light leading-relaxed ${isPortrait ? 'text-4xl' : 'text-3xl'}`}>
                  LivePPT 的 viral 影片聲稱一個工具能生成
                  <span className="text-rose-300"> cinematic hero demo</span>。
                </p>
                <p className={`text-white/50 font-light leading-relaxed ${isPortrait ? 'text-2xl' : 'text-xl max-w-[920px]'}`}>
                  影片吹：React + Tailwind + 互動模擬器 + 熱更新 + 絲滑轉場。
                  <br />
                  實際 repo：<span className="font-mono text-amber-300/80">Python 600 行</span>、
                  無 Tailwind、無 React、沒測試、沒 issue、7 週沒人回報 bug。
                </p>
                <p className={`text-white/40 font-light ${isPortrait ? 'text-2xl' : 'text-xl'}`}>
                  README 的 commit message 寫：
                  <span className="font-mono text-rose-400/80 ml-2">"Optimize with viral formula"</span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className={`absolute font-mono text-white/30 tracking-[0.3em] ${
                  isPortrait ? 'bottom-[140px] left-[80px] text-sm' : 'bottom-[90px] right-[140px] text-xs'
                }`}
              >
                SO WHAT SHOULD WE USE?
              </motion.div>
            </div>
          </>
        )
      }}
    </Slide>
  )
}
