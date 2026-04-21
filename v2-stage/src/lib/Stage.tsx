import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { clamp } from './easing'

// ── Chapter types ─────────────────────────────────────────────────────────
export type Chapter = {
  start: number
  end: number
  label: string
  /** Optional Chinese/secondary label shown under the English one. */
  sub?: string
}

// ── Timeline context ──────────────────────────────────────────────────────
type TimelineValue = {
  time: number
  duration: number
  playing: boolean
  play: () => void
  pause: () => void
  toggle: () => void
  seek: (t: number) => void
  /** Advance by seconds (clamped to [0, duration]). */
  nudge: (delta: number) => void
}
const TimelineContext = createContext<TimelineValue | null>(null)

export function useTimeline(): TimelineValue {
  const v = useContext(TimelineContext)
  if (!v) throw new Error('useTimeline must be used inside <Stage>')
  return v
}
export const useTime = (): number => useTimeline().time

// ── Chapter navigation helpers ────────────────────────────────────────────
export function currentChapterIndex(t: number, chapters: Chapter[]): number {
  for (let i = 0; i < chapters.length; i++) {
    if (t >= chapters[i].start && t < chapters[i].end) return i
  }
  if (chapters.length && t >= chapters[chapters.length - 1].end)
    return chapters.length - 1
  return 0
}

/**
 * Smart next — PowerPoint-style.
 *   In first 80% of chapter → jump to "hold" state (chapter.end - 0.05s)
 *   Already at/past hold     → jump to next chapter start
 */
export function smartNext(t: number, chapters: Chapter[]): number {
  if (!chapters.length) return t
  const i = currentChapterIndex(t, chapters)
  const c = chapters[i]
  const len = c.end - c.start
  const local = (t - c.start) / len
  const holdTime = c.end - 0.05
  if (local < 0.8 && t < holdTime - 0.05) return holdTime
  if (i < chapters.length - 1) return chapters[i + 1].start
  return c.end
}

export function smartPrev(t: number, chapters: Chapter[]): number {
  if (!chapters.length) return t
  const i = currentChapterIndex(t, chapters)
  const c = chapters[i]
  const len = c.end - c.start
  const local = (t - c.start) / len
  if (local > 0.2) return c.start
  if (i > 0) return chapters[i - 1].start
  return 0
}

// ── Stage ─────────────────────────────────────────────────────────────────
export type StageProps = {
  width: number
  height: number
  duration: number
  background?: string
  /** fps hint; actual loop is rAF-driven. Default 60. */
  fps?: number
  /** Loop back to 0 when reaching end. Default true. */
  loop?: boolean
  /** Auto-play on mount. Default true. */
  autoplay?: boolean
  /** Persist playhead to localStorage under this key. */
  persistKey?: string
  /** Enables smart chapter nav + chapter strip UI. */
  chapters?: Chapter[]
  /** How to fit canvas inside viewport. Default 'contain'. */
  fit?: 'contain' | 'cover'
  /** Show playback bar + chapter strip. Default true. */
  controls?: boolean
  /** CSS color tokens used by built-in UI. */
  colors?: {
    fg?: string
    fgDim?: string
    accent?: string
  }
  children: ReactNode
}

const DEFAULT_COLORS = {
  fg: '#f3ede2',
  fgDim: 'rgba(243, 237, 226, 0.55)',
  accent: '#c85a2a',
}

export function Stage({
  width,
  height,
  duration,
  background = '#0a0a0a',
  loop = true,
  autoplay = true,
  persistKey,
  chapters,
  fit = 'contain',
  controls = true,
  colors,
  children,
}: StageProps) {
  const c = { ...DEFAULT_COLORS, ...colors }

  // Time state — persisted to localStorage if persistKey provided
  const [time, setTime] = useState<number>(() => {
    if (!persistKey) return 0
    try {
      const v = parseFloat(localStorage.getItem(persistKey + ':t') || '0')
      return isFinite(v) ? clamp(v, 0, duration) : 0
    } catch {
      return 0
    }
  })
  const [playing, setPlaying] = useState<boolean>(autoplay)
  const [scale, setScale] = useState<number>(1)

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const lastTsRef = useRef<number | null>(null)

  // Persist playhead
  useEffect(() => {
    if (!persistKey) return
    try {
      localStorage.setItem(persistKey + ':t', String(time))
    } catch {
      /* noop */
    }
  }, [time, persistKey])

  // Auto-fit canvas to viewport
  useEffect(() => {
    if (!wrapRef.current) return
    const el = wrapRef.current
    const measure = () => {
      const barH = controls ? (chapters?.length ? 74 : 44) : 0
      const availW = el.clientWidth
      const availH = el.clientHeight - barH
      const sW = availW / width
      const sH = availH / height
      const s = fit === 'cover' ? Math.max(sW, sH) : Math.min(sW, sH)
      setScale(Math.max(0.05, s))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [width, height, fit, chapters, controls])

  // RAF animation loop
  useEffect(() => {
    if (!playing) {
      lastTsRef.current = null
      return
    }
    const step = (ts: number) => {
      if (lastTsRef.current == null) lastTsRef.current = ts
      const dt = (ts - lastTsRef.current) / 1000
      lastTsRef.current = ts
      setTime((t) => {
        let next = t + dt
        if (next >= duration) {
          if (loop) next = next % duration
          else {
            next = duration
            setPlaying(false)
          }
        }
        return next
      })
      rafRef.current = requestAnimationFrame(step)
    }
    rafRef.current = requestAnimationFrame(step)
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current)
      lastTsRef.current = null
    }
  }, [playing, duration, loop])

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tgt = e.target as HTMLElement | null
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA')) return

      if (e.code === 'Space') {
        e.preventDefault()
        setPlaying((p) => !p)
      } else if (e.code === 'ArrowRight') {
        e.preventDefault()
        if (chapters?.length) {
          setPlaying(false)
          setTime((t) => smartNext(t, chapters))
        } else {
          setTime((t) => clamp(t + (e.shiftKey ? 1 : 0.1), 0, duration))
        }
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault()
        if (chapters?.length) {
          setPlaying(false)
          setTime((t) => smartPrev(t, chapters))
        } else {
          setTime((t) => clamp(t - (e.shiftKey ? 1 : 0.1), 0, duration))
        }
      } else if (e.code === 'Digit0' || e.code === 'Home') {
        e.preventDefault()
        setTime(0)
      } else if (e.code === 'End') {
        e.preventDefault()
        setTime(duration - 0.01)
      } else if (e.code === 'KeyF') {
        // Toggle fullscreen
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen?.().catch(() => {})
        } else {
          document.exitFullscreen?.().catch(() => {})
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [duration, chapters])

  // Touch: swipe L/R for smart nav (only if chapters)
  const touchRef = useRef<{ x: number; y: number; t: number } | null>(null)
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0]
    touchRef.current = { x: t.clientX, y: t.clientY, t: Date.now() }
  }, [])
  const onTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const s = touchRef.current
      if (!s) return
      const et = e.changedTouches[0]
      const dx = et.clientX - s.x
      const dy = et.clientY - s.y
      const dt = Date.now() - s.t
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 700) {
        if (dx < 0) {
          if (chapters?.length) {
            setPlaying(false)
            setTime((t) => smartNext(t, chapters))
          }
        } else {
          if (chapters?.length) {
            setPlaying(false)
            setTime((t) => smartPrev(t, chapters))
          }
        }
      }
    },
    [chapters]
  )

  // Context value
  const ctxValue = useMemo<TimelineValue>(
    () => ({
      time,
      duration,
      playing,
      play: () => setPlaying(true),
      pause: () => setPlaying(false),
      toggle: () => setPlaying((p) => !p),
      seek: (t) => {
        setPlaying(false)
        setTime(clamp(t, 0, duration))
      },
      nudge: (delta) => setTime((t) => clamp(t + delta, 0, duration)),
    }),
    [time, duration, playing]
  )

  return (
    <TimelineContext.Provider value={ctxValue}>
      <div
        ref={wrapRef}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        style={{
          position: 'fixed',
          inset: 0,
          background,
          overflow: 'hidden',
          touchAction: 'pan-y',
        }}
      >
        {/* Canvas — the 1920×1080 (or whatever) virtual stage, transformed to fit viewport.
            Absolutely centered so scaling never pushes content out. */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: controls ? `calc(50% - ${(chapters?.length ? 74 : 44) / 2}px)` : '50%',
            width,
            height,
            transform: `translate(-50%, -50%) scale(${scale})`,
            transformOrigin: 'center',
            background,
            overflow: 'hidden',
          }}
        >
          {children}
        </div>

        {/* Controls (chapter strip + playback bar) — fixed at bottom */}
        {controls && (
          <PlaybackControls
            chapters={chapters}
            time={time}
            duration={duration}
            playing={playing}
            onTogglePlay={() => setPlaying((p) => !p)}
            onSeek={(t) => {
              setPlaying(false)
              setTime(clamp(t, 0, duration))
            }}
            onJumpChapter={(t) => {
              setPlaying(false)
              setTime(t)
            }}
            colors={c}
          />
        )}
      </div>
    </TimelineContext.Provider>
  )
}

// ── Playback controls ─────────────────────────────────────────────────────
type ControlsProps = {
  chapters?: Chapter[]
  time: number
  duration: number
  playing: boolean
  onTogglePlay: () => void
  onSeek: (t: number) => void
  onJumpChapter: (t: number) => void
  colors: Required<NonNullable<StageProps['colors']>>
}

function PlaybackControls({
  chapters,
  time,
  duration,
  playing,
  onTogglePlay,
  onSeek,
  onJumpChapter,
  colors,
}: ControlsProps) {
  const scrubRef = useRef<HTMLDivElement | null>(null)

  const onScrub = (e: React.MouseEvent) => {
    if (!scrubRef.current) return
    const rect = scrubRef.current.getBoundingClientRect()
    const x = clamp((e.clientX - rect.left) / rect.width, 0, 1)
    onSeek(x * duration)
  }

  const MONO = 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace'
  const activeIdx = chapters ? currentChapterIndex(time, chapters) : -1

  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: 900,
        margin: '0 auto',
        padding: '0 20px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        color: colors.fg,
        fontFamily: MONO,
        userSelect: 'none',
        zIndex: 200,
      }}
    >
      {/* Chapter strip */}
      {chapters?.length ? (
        <div style={{ display: 'flex', gap: 2 }}>
          {chapters.map((ch, i) => {
            const total = chapters[chapters.length - 1].end - chapters[0].start
            const w = ((ch.end - ch.start) / total) * 100
            const isActive = i === activeIdx
            const localProgress = isActive
              ? clamp((time - ch.start) / (ch.end - ch.start), 0, 1)
              : time >= ch.end
                ? 1
                : 0
            return (
              <button
                key={i}
                type="button"
                onClick={() => onJumpChapter(ch.start)}
                title={ch.label}
                style={{
                  flex: `${w} 1 0`,
                  minWidth: 0,
                  background: 'transparent',
                  border: 'none',
                  padding: '4px 6px 6px',
                  cursor: 'pointer',
                  color: isActive ? colors.fg : 'rgba(243, 237, 226, 0.38)',
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  textAlign: 'left',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  transition: 'color 150ms',
                }}
              >
                <span
                  style={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <span style={{ opacity: 0.55, marginRight: 6 }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {ch.label}
                </span>
                <span
                  style={{
                    position: 'relative',
                    height: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 1,
                    overflow: 'hidden',
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: `${localProgress * 100}%`,
                      background: isActive ? colors.accent : 'rgba(243, 237, 226, 0.28)',
                      transition: 'width 120ms linear',
                    }}
                  />
                </span>
              </button>
            )
          })}
        </div>
      ) : null}

      {/* Playback bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 12 }}>
        <button
          type="button"
          onClick={() => onSeek(0)}
          title="Return to start (0)"
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.fgDim,
            cursor: 'pointer',
            fontSize: 14,
            padding: 4,
          }}
        >
          ⏮
        </button>
        <button
          type="button"
          onClick={onTogglePlay}
          title="Play/pause (space)"
          style={{
            background: 'transparent',
            border: 'none',
            color: colors.fg,
            cursor: 'pointer',
            fontSize: 14,
            padding: 4,
          }}
        >
          {playing ? '⏸' : '▶'}
        </button>
        <span style={{ color: colors.fgDim, minWidth: 56 }}>{fmtTime(time)}</span>
        <div
          ref={scrubRef}
          onClick={onScrub}
          style={{
            flex: 1,
            height: 6,
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: 3,
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${(time / duration) * 100}%`,
              background: colors.fg,
              borderRadius: 3,
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: `${(time / duration) * 100}%`,
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: colors.fg,
              boxShadow: '0 0 0 3px rgba(0, 0, 0, 0.4)',
            }}
          />
        </div>
        <span style={{ color: colors.fgDim, minWidth: 56, textAlign: 'right' }}>
          {fmtTime(duration)}
        </span>
      </div>
    </div>
  )
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60)
  const rem = s - m * 60
  return `${m}:${rem.toFixed(2).padStart(5, '0')}`
}
