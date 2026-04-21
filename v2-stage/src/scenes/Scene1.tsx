import { useMemo } from 'react'
import { Sprite, interpolate, Easing, mulberry32, range } from '../lib'
import {
  DotMap,
  PulseDot,
  Grain,
  Vignette,
  Chrome,
  Footer,
  Caption,
  LargeNumber,
  TextSprite,
  TOKENS,
} from '../primitives'

/**
 * Scene 01 — "Origin"
 *
 * Hero title card. Demonstrates: LargeNumber, DotMap (deterministic),
 * PulseDot, Caption, editorial typography, Vignette + Grain.
 *
 * Chapter window: 0 – 8s
 */
export function Scene1() {
  const sceneStart = 0
  const sceneEnd = 8

  // Deterministic dot field — same seed = same constellation every render
  const dots = useMemo(() => {
    const rng = mulberry32(0x49d41)
    return Array.from({ length: 900 }, () => ({
      x: range(rng, 60, 1860),
      y: range(rng, 80, 1000),
      o: range(rng, 0.1, 0.35),
      size: range(rng, 0.8, 1.6),
    }))
  }, [])

  return (
    <Sprite start={sceneStart} end={sceneEnd}>
      <div style={{ position: 'absolute', inset: 0, background: TOKENS.BG }}>
      <Chrome label="Origin / 起點" dayLabel="Day 01" />

      {/* Background dot cloud — fades in slowly */}
      <Sprite start={0.2} end={8}>
        {({ progress }) => {
          const opacity = interpolate(progress, [0, 0.25], [0, 1], Easing.easeOutCubic)
          return (
            <div style={{ position: 'absolute', inset: 0, opacity }}>
              <DotMap width={1920} height={1080} points={dots} />
            </div>
          )
        }}
      </Sprite>

      {/* Giant "01" */}
      <Sprite start={0.6} end={8}>
        <LargeNumber value="01" x={1360} y={340} size={380} color={TOKENS.FG} />
      </Sprite>

      {/* Central pulse marker */}
      <Sprite start={1.2} end={8}>
        <PulseDot x={640} y={540} size={28} color={TOKENS.ACCENT} />
      </Sprite>

      {/* "THE WAR BEGINS." — serif hero text */}
      <Sprite start={1.5} end={8}>
        <Caption
          en={'The war\nbegins.'}
          cn={'戰爭 · 開始'}
          x={200}
          y={420}
          size={180}
          width={1000}
        />
      </Sprite>

      {/* Date line */}
      <Sprite start={3.2} end={8}>
        <TextSprite
          text="28 · FEB · 2026"
          x={200}
          y={820}
          size={16}
          letterSpacing="0.4em"
          color={TOKENS.FG_DIM}
          font="'JetBrains Mono', monospace"
        />
      </Sprite>

      <Footer title="Cinematic Stage · Reference Demo" subtitle="2D Primitives Layer" />
      <Vignette intensity={0.7} />
      <Grain opacity={0.05} />
      </div>
    </Sprite>
  )
}
