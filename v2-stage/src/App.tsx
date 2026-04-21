import { Stage, type Chapter } from './lib'
import { Scene1 } from './scenes/Scene1'
import { Scene2 } from './scenes/Scene2'
import { Scene3 } from './scenes/Scene3'

/**
 * Cinematic Stage v2 — reference demo deck.
 *
 * Architecture (see Obsidian: "Tech Tree/Cinematic Stage v2 架構重構決策"):
 *   Stage          ← global timeline + chapters + smart nav
 *     Scene1       ← 2D primitives (DotMap/PulseDot/LargeNumber/Caption)
 *     Scene2       ← R3F glass + bloom via SpriteCanvas
 *     Scene3       ← Cartographic strike pattern (AnimatedArc)
 *
 * Keyboard:
 *   Space    play/pause
 *   → / ←    smart chapter nav (hold-then-advance)
 *   0 / Home reset to start
 *   End      jump to end
 *   F        fullscreen toggle
 *
 * Touch: swipe L/R = next/prev chapter.
 */

const CHAPTERS: Chapter[] = [
  { start: 0, end: 8, label: 'Origin', sub: '起點' },
  { start: 8, end: 20, label: 'Glass', sub: '玻璃' },
  { start: 20, end: 32, label: 'Retaliation', sub: '反擊' },
]

export function App() {
  return (
    <Stage
      width={1920}
      height={1080}
      duration={32}
      background="#0a0a0a"
      persistKey="cinematic-stage-v2"
      chapters={CHAPTERS}
      fit="contain"
    >
      {/* All three scenes live inside the same Stage — they just use different
          absolute time windows. This is the key Genesis v2 pattern:
          "one timeline, multiple chapters with semantic breakpoints". */}
      <Scene1 />
      <Scene2 />
      <Scene3 />
    </Stage>
  )
}
