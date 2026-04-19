import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

type Line =
  | { type: 'prompt'; text: string; typingSpeed?: number }
  | { type: 'output'; text: string; delay?: number; color?: string }

type Props = {
  lines: Line[]
  active?: boolean
}

/**
 * Scripted fake terminal: types prompts character-by-character,
 * then reveals output lines with an optional delay.
 *
 * Pure JS + Framer Motion, frame-independent (setTimeout based).
 */
export function FakeTerminal({ lines, active = true }: Props) {
  const [cursor, setCursor] = useState(0) // current line index
  const [typed, setTyped] = useState('') // typed chars for current prompt
  const [finished, setFinished] = useState<string[]>([]) // finished lines

  // Reset when becoming active again
  useEffect(() => {
    if (!active) {
      setCursor(0)
      setTyped('')
      setFinished([])
    }
  }, [active])

  // Script runner
  useEffect(() => {
    if (!active) return
    if (cursor >= lines.length) return
    const line = lines[cursor]

    if (line.type === 'prompt') {
      const speed = line.typingSpeed ?? 35
      if (typed.length < line.text.length) {
        const t = setTimeout(() => setTyped(line.text.slice(0, typed.length + 1)), speed)
        return () => clearTimeout(t)
      } else {
        // Line fully typed; commit and advance
        const t = setTimeout(() => {
          setFinished((f) => [...f, `$ ${line.text}`])
          setTyped('')
          setCursor((c) => c + 1)
        }, 400)
        return () => clearTimeout(t)
      }
    }

    if (line.type === 'output') {
      const delay = line.delay ?? 350
      const t = setTimeout(() => {
        setFinished((f) => [...f, line.text])
        setCursor((c) => c + 1)
      }, delay)
      return () => clearTimeout(t)
    }
  }, [active, cursor, typed, lines])

  return (
    <div className="font-mono text-[18px] leading-[1.7] text-white/90 w-full h-full overflow-hidden">
      {finished.map((line, i) => {
        const isPrompt = line.startsWith('$ ')
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="whitespace-pre"
          >
            {isPrompt ? (
              <>
                <span className="text-pink-400">$</span>{' '}
                <span className="text-white">{line.slice(2)}</span>
              </>
            ) : (
              <span className="text-emerald-300/80">{line}</span>
            )}
          </motion.div>
        )
      })}
      {cursor < lines.length && lines[cursor].type === 'prompt' && (
        <div className="whitespace-pre">
          <span className="text-pink-400">$</span> <span>{typed}</span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="inline-block w-[10px] h-[22px] bg-white/80 align-middle ml-[2px]"
          />
        </div>
      )}
    </div>
  )
}
