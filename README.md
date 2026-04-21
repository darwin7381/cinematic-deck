# Cinematic Deck

Two parallel architectures for building cinematic interactive decks / short films.

## 📁 Structure

```
cinematic-deck/
├── v2-stage/           ← CURRENT — Stage/Sprite time-axis architecture (recommended)
├── old-version-v1/     ← Legacy — Slide/Step dual-state (preserved for reference)
└── .github/workflows/
    └── deploy.yml      — Builds both, serves v1 at / and v2 at /v2/
```

## 🚀 Live

| Version | URL | Architecture |
|---|---|---|
| **v1** (legacy) | https://darwin7381.github.io/cinematic-deck/ | Slide + Step + framer-motion |
| **v2** (current) | https://darwin7381.github.io/cinematic-deck/v2/ | Stage + Sprite + R3F |

## 🧠 Architecture

**v1** treats a deck as a list of independent slides, each with its own step state. Works but:
- Two coupled state machines (slide index + step) — AI struggles to reason
- Can't seek, can't export video, can't pipe a unified timeline
- Uses framer-motion spring physics — imprecise rhythm control

**v2** treats the entire deck as a **single timeline** with **chapters as semantic breakpoints**:
- Only state: `time` (seconds) — one source of truth
- → key = smart chapter nav (hold state → next chapter)
- Space = play like a video from any point
- R3F Canvas integrates as a `<SpriteCanvas>` — 3D scenes mount/unmount per chapter
- Hand-rolled easing curves — mm-precise timing

This architecture is descended from Claude Code's **Genesis 49 Days** project (see [`sliding_and_anime_research_labs`](https://github.com/darwin7381/sliding_and_anime_research_labs)). We kept the brilliant single-timeline idea and extended it with R3F 3D capabilities Genesis can't deliver.

See **[`v2-stage/README.md`](./v2-stage/README.md)** for the full v2 documentation.

## 🛠 Development

```bash
# v2 (current)
cd v2-stage && pnpm install && pnpm dev    # → http://localhost:5180

# v1 (legacy)
cd old-version-v1 && pnpm install && pnpm dev  # → http://localhost:5173
```

## 🤖 AI skill

A `cinematic-stage` skill at `~/.hermes/skills/creative/cinematic-stage/` teaches the AI how to author new scenes following the v2 rhythm, typography, and primitive conventions. It encodes the directorial mindset we learned from studying Genesis 49 Days — fewer elements, slower entrances, intentional stagger, off-white cream on near-black, always end with `<Vignette />` + `<Grain />`.

Ask the AI: *"add a [X] scene between [Y] and [Z]"* and the skill will structure the work.
