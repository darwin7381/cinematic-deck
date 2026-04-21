import { useMemo } from 'react'
import {
  Sprite,
  interpolate,
  Easing,
  mulberry32,
  range,
  useTime,
} from '../lib'
import {
  DotMap,
  PulseDot,
  AnimatedArc,
  Grain,
  Vignette,
  Chrome,
  Footer,
  Caption,
  TextSprite,
  TOKENS,
} from '../primitives'

/**
 * Scene 03 — "Retaliation"
 *
 * Demonstrates the classic cartographic strike pattern:
 * origin → 5 targets, staggered arcs, pulse dots on arrival.
 *
 * Chapter window: 20 – 32s
 */
export function Scene3() {
  const time = useTime()
  const sceneStart = 20

  const regionDots = useMemo(() => {
    const rng = mulberry32(0x7a2b3)
    return Array.from({ length: 1200 }, () => ({
      x: range(rng, 40, 1880),
      y: range(rng, 40, 1040),
      o: range(rng, 0.08, 0.25),
      size: range(rng, 0.7, 1.3),
    }))
  }, [])

  const origin = { x: 960, y: 540 }
  const targets = [
    { x: 620, y: 430, label: 'ISRAEL', delay: sceneStart + 0.3 },
    { x: 1240, y: 640, label: 'QATAR · UAE', delay: sceneStart + 0.8 },
    { x: 1110, y: 370, label: 'IRAQ', delay: sceneStart + 1.3 },
    { x: 540, y: 320, label: 'CYPRUS', delay: sceneStart + 1.7 },
    { x: 780, y: 300, label: 'TURKEY', delay: sceneStart + 2.2 },
  ]

  return (
    <Sprite start={sceneStart} end={32}>
      <div style={{ position: 'absolute', inset: 0, background: TOKENS.BG }}>
      <Chrome label="Retaliation / 反擊" dayLabel="Day 03 — 10" />

      {/* Region dot cloud */}
      <Sprite start={sceneStart} end={32}>
        {({ progress }) => {
          const opacity = interpolate(progress, [0, 0.2], [0, 1], Easing.easeOutCubic)
          return (
            <div style={{ position: 'absolute', inset: 0, opacity }}>
              <DotMap width={1920} height={1080} points={regionDots} />
            </div>
          )
        }}
      </Sprite>

      {/* Origin pulse */}
      <Sprite start={sceneStart + 0.2} end={32}>
        <PulseDot x={origin.x} y={origin.y} size={24} color={TOKENS.STRIKE} />
      </Sprite>

      <Sprite start={sceneStart + 0.4} end={32}>
        <TextSprite
          text="IRAN · 伊朗"
          x={origin.x + 24}
          y={origin.y - 14}
          size={13}
          letterSpacing="0.28em"
          weight={500}
          color={TOKENS.FG_DIM}
          font="'JetBrains Mono', monospace"
        />
      </Sprite>

      {/* Arcs — drawn directly on the absolute timeline */}
      <svg
        width={1920}
        height={1080}
        viewBox="0 0 1920 1080"
        style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}
      >
        {targets.map((t, i) => (
          <AnimatedArc
            key={i}
            from={origin}
            to={{ x: t.x, y: t.y }}
            delay={t.delay}
            duration={1.1}
            color={TOKENS.STRIKE}
            width={1.4}
            archHeight={Math.hypot(t.x - origin.x, t.y - origin.y) * 0.18}
          />
        ))}
      </svg>

      {/* Target pulses — appear after arc completes */}
      {targets.map((t, i) => {
        const arriveAt = t.delay + 1.1
        return (
          <Sprite key={i} start={arriveAt} end={32}>
            <>
              <PulseDot x={t.x} y={t.y} size={16} color={TOKENS.STRIKE} />
              <div
                style={{
                  position: 'absolute',
                  left: t.x + 18,
                  top: t.y - 8,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  letterSpacing: '0.25em',
                  color: TOKENS.STRIKE,
                  fontWeight: 500,
                  opacity: interpolate(time - arriveAt, [0, 0.4], [0, 1], Easing.easeOutCubic),
                }}
              >
                {t.label}
              </div>
            </>
          </Sprite>
        )
      })}

      {/* Caption */}
      <Sprite start={sceneStart + 4.5} end={32}>
        <Caption
          en={'Drones and missiles\nstrike five countries.'}
          cn={'數百枚無人機與導彈 · 打擊五國'}
          x={80}
          y={820}
          size={56}
          width={1400}
        />
      </Sprite>

      <Footer title="Cinematic Stage · Reference Demo" subtitle="Cartographic Strike Pattern" />
      <Vignette intensity={0.55} />
      <Grain opacity={0.05} />
      </div>
    </Sprite>
  )
}
