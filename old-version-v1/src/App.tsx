import { Deck } from './components/Deck'
import Hero01 from './slides/01-hero'
import Problem02 from './slides/02-problem'
import Ecosystem03 from './slides/03-ecosystem'
import ViralFakes04 from './slides/04-viral-fakes'
import ThreeDReality05 from './slides/05-3d-reality'
import Scoring06 from './slides/06-scoring'
import Winner07 from './slides/07-winner'
import Terminal08 from './slides/02-terminal'
import Features09 from './slides/03-features'
import Closing10 from './slides/04-closing'

export default function App() {
  return (
    <Deck
      slides={[
        Hero01,          // 01 · "Design should move you"
        Problem02,       // 02 · "But everyone lies" (LivePPT truth)
        Ecosystem03,     // 03 · Ecosystem scan (20+ frameworks)
        ViralFakes04,    // 04 · The viral fakes (source-read proof)
        ThreeDReality05, // 05 · React vs Vue 3D gap
        Scoring06,       // 06 · Scoring matrix
        Winner07,        // 07 · The winning stack
        Terminal08,      // 08 · Fake CLI demo
        Features09,      // 09 · What's inside (progressive reveal)
        Closing10,       // 10 · make it move
      ]}
    />
  )
}
