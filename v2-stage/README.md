# Cinematic Stage (v2)

A production-grade cinematic deck framework — combining the **single-timeline elegance** of Genesis 49 Days with **R3F 3D + post-processing** capabilities the Genesis architecture can't deliver.

**Live**: https://darwin7381.github.io/cinematic-deck/v2/ (after first deploy)
**Local dev**: `pnpm dev` → http://localhost:5180

---

## Philosophy

> **One `time` state. Chapters as semantic breakpoints. R3F Canvas as just another Sprite.**

This replaces the previous `v1` architecture (Slide + Step dual state machine — see `../old-version-v1/`) with a unified time-axis approach inspired by Claude Code's Genesis 49 Days project.

### Three-layer abstraction

```
Stage         ← global timeline + chapters + smart ←→ nav
  └─ Sprite   ← time window [start, end]; children get {localTime, progress, duration, visible}
      └─ interpolate(progress, [0,1], [from,to], easing)
```

### Why it's better

| Capability | Slide+Step (v1) | Stage+Sprite (v2) |
|---|---|---|
| Multi-chapter nav | ✅ | ✅ |
| Timeline-precise motion | ⚠️ spring physics | ✅ hand-rolled easing |
| Space = play from start | ❌ | ✅ |
| Arbitrary seek | ❌ | ✅ |
| Video export potential | ❌ | ✅ (unified timebase) |
| Chapter strip UI | ❌ | ✅ |
| R3F Canvas lifecycle | always mounted | mounts per chapter |
| AI-friendly single state | ❌ two state machines | ✅ just `time` |

---

## Quick start

```bash
cd ~/Projects/cinematic-deck/v2-stage
pnpm install
pnpm dev          # → http://localhost:5180
pnpm build        # → dist/
```

### Keyboard

| Key | Action |
|---|---|
| `Space` | Play / pause |
| `→` | Smart next (hold state → next chapter) |
| `←` | Smart prev (chapter start → previous chapter) |
| `0` / `Home` | Reset to start |
| `End` | Jump to end |
| `F` | Toggle fullscreen |

**Touch** (mobile): swipe L/R = chapter navigation.

---

## Adding a new scene

1. Create `src/scenes/SceneN.tsx`:

```tsx
import { Sprite, interpolate, Easing } from '../lib'
import { Chrome, Footer, Vignette, Grain, Caption, TOKENS } from '../primitives'

export function Scene4() {
  const sceneStart = 32
  const sceneEnd = 44

  return (
    <Sprite start={sceneStart} end={sceneEnd}>
      <div style={{ position: 'absolute', inset: 0, background: TOKENS.BG }}>
        <Chrome label="YourScene / 中文" dayLabel="Day 04" />

        <Sprite start={sceneStart + 1} end={sceneEnd}>
          <Caption en={'Your headline.'} cn={'標題'} x={200} y={500} size={120} />
        </Sprite>

        <Footer title="Your Project" subtitle="Scene Subtitle" />
        <Vignette />
        <Grain />
      </div>
    </Sprite>
  )
}
```

2. Register in `src/App.tsx`:

```tsx
const CHAPTERS: Chapter[] = [
  // ... existing
  { start: 32, end: 44, label: 'YourScene', sub: '中文' },
]

<Stage duration={44} chapters={CHAPTERS}>
  <Scene1 />
  <Scene2 />
  <Scene3 />
  <Scene4 />  {/* ← add */}
</Stage>
```

That's it.

---

## Primitive vocabulary

### 2D
- `<LargeNumber>` — Hero title card numerals (49, 01, $120B)
- `<Caption>` — Editorial bilingual headline with fade+rise
- `<TextSprite>` — Labels, dates, HUD text
- `<DotMap>` — Geographic/abstract point constellation (use with `mulberry32`!)
- `<PulseDot>` — Event marker (pulsing ring)
- `<AnimatedArc>` — Cartographic connection / strike line
- `<Chrome>` / `<Footer>` — Scene HUD corners
- `<Vignette>` / `<Grain>` — ALWAYS the last two elements of a scene

### 3D (via SpriteCanvas)
- Wrap any R3F scene in `<SpriteCanvas start end>` — handles mount/unmount, dpr capping, timeline bridging.

See `src/scenes/Scene2.tsx` for a complete 3D glass + bloom example.

---

## Architecture

```
src/
├── main.tsx            — Entry
├── App.tsx             — Stage + chapters[] + scene list
├── lib/
│   ├── Stage.tsx       — Global timeline, chapters, smartNext/smartPrev, ChapterStrip
│   ├── Sprite.tsx      — Time window primitive
│   ├── SpriteCanvas.tsx — R3F bridge (3D becomes a Sprite)
│   ├── easing.ts       — 19 hand-rolled easings
│   ├── interpolate.ts  — Value mapper with multi-stop support
│   ├── mulberry32.ts   — Deterministic PRNG (reproducible particles)
│   └── index.ts        — Barrel export
├── primitives/         — Visual vocabulary (2D)
└── scenes/             — One file per chapter
```

---

## AI-assisted authoring

A skill `cinematic-stage` is installed at `~/.hermes/skills/creative/cinematic-stage/` that teaches the AI:

- Scene rhythm template (staggering, hold time)
- Primitive selection rules (when 2D vs when 3D)
- Common mistakes & fixes
- Editorial typography tokens (Fraunces cream on near-black, NEVER pure white)

To get AI to add a scene: just ask — *"add a scene showing [X] between Glass and Retaliation"*. The skill will guide structure, rhythm, and primitive choice.

---

## Credits & references

- **Genesis 49 Days** (Claude Code): https://github.com/darwin7381/sliding_and_anime_research_labs — the one-shot masterpiece we learned from
- Typography: Fraunces (Google Fonts) · Noto Serif SC · Inter · JetBrains Mono
- 3D stack: React Three Fiber · Drei · @react-three/postprocessing · three
