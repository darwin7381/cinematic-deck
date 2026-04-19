# cinematic-deck

> 自組 cinematic deck starter · Vite + React 19 + Framer Motion + react-three-fiber + drei + Tailwind v4

四輪調研後的結論實作。詳見 Obsidian 筆記 `Tech Tree/Cinematic Deck 框架全調研`。

## 為什麼不用 Slidev / reveal.js / code-on-sunday

- **Slidev** Markdown-first 跟你衝突
- **reveal.js** section/fragment 是束縛不是禮物
- **code-on-sunday** Framer Motion 用法停在 fadeUp，progressive reveal 是謊言
- **frontend-slides** 14.8k⭐ 但技術上比 reveal.js 還簡單

自組才有 Stripe/Linear/Vercel 等級的天花板。

## 跑起來

```bash
pnpm install
pnpm dev
```

→ http://localhost:5173

鍵盤：
- `←` `→` / `space` / `enter`：導航
- `backspace`：退回
- `home` / `end`：跳到首/末
- URL `#0` ~ `#3`：直接跳某張

## 架構

```
src/
├── App.tsx                 # <Deck slides={[...]} />
├── components/
│   ├── Deck.tsx            # 鍵盤 / URL hash / progress bar / step coordination
│   ├── Slide.tsx           # 1920×1080 canvas letterbox 縮放
│   ├── CursorGradient.tsx  # 游標追蹤 spotlight
│   └── FakeTerminal.tsx    # scripted CLI 打字機
├── hooks/
│   ├── useSlideScale.ts
│   └── useSlideStep.ts     # 真實作 progressive reveal
├── slides/
│   ├── 01-hero.tsx         # 3D transmission material + Bloom + Chromatic Aberration
│   ├── 02-terminal.tsx     # 毛玻璃 + 假 CLI 動畫
│   ├── 03-features.tsx     # space 推進 feature 卡片（progressive reveal）
│   └── 04-closing.tsx      # Sparkles + Bloom orb
└── index.css               # Tailwind v4 + glass utility + noise
```

## 每張 slide 是一個 .tsx，signature：

```ts
type SlideProps = {
  active: boolean
  step: number
  advance: () => void
  retreat: () => void
  onStepsChange: (n: number) => void  // 告訴 Deck 這張有幾個 progressive step
}
```

## 加 slide 步驟（AI 友善）

1. 建 `src/slides/05-xxx.tsx`，複製一張現有的當模板
2. 改內容 / layout
3. `App.tsx` 裡 import + 加進 `slides` 陣列

就這樣。

## 能嵌什麼

因為是純 React app，**所有 React 生態都能直接 import**：

- **shadcn/ui / Radix** — 精緻 UI primitive
- **Rive** — 互動向量動畫（rive-react 官方）
- **Remotion Player** — MP4 級絲滑動畫嵌 hero slide
- **Magic UI / Aceternity UI** — 現成 cinematic 組件
- **React Three Fiber + drei** — 3D 場景 / 後處理
- **GSAP** — timeline 複雜動畫（如需）

## 展示了什麼能力

| Slide | 展示的技術 |
|---|---|
| 01-hero | R3F + MeshTransmissionMaterial + Bloom + ChromaticAberration + gradient text + cursor gradient |
| 02-terminal | Glass backdrop + scripted typing animation + syntax coloring |
| 03-features | Progressive reveal（真·useState 驅動）+ spring 物理 + blob bg animation |
| 04-closing | 3D emissive orb + Sparkles particles + Bloom + large gradient text |
