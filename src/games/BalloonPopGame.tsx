import { useEffect, useRef, useState } from 'react'
import type { BalloonStep } from '../types'
import { haptic, sfx } from '../lib/sound'

type Balloon = {
  id: number
  x: number
  y: number
  label: string
  color: string
  wobbleDelay: number
  dur: number
  popped: boolean
}

const COLORS = ['#ff7a50', '#ffd166', '#3ddc84', '#2ec9f5', '#8b46f0', '#f9409a']

/**
 * Balloon Pop — balloons float up the screen; pop every one that
 * matches the target. A lesson step in party clothes: correct pops
 * count, wrong pops count against you, exactly like every other game.
 */
export function BalloonPopGame({
  step,
  onAnswer,
  reveal,
}: {
  step: BalloonStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const matches = step.matches ?? 3
  const [balloons, setBalloons] = useState<Balloon[]>([])
  const [poppedRight, setPoppedRight] = useState(0)
  const [wrongCount, setWrongCount] = useState(0)
  const [solved, setSolved] = useState(false)
  const answerRef = useRef(onAnswer)
  answerRef.current = onAnswer

  /* build the sky once — the balloons belong to this step */
  useEffect(() => {
    const list: Balloon[] = step.labels.map((label, i) => ({
      id: i,
      x: 6 + (i % 5) * 19 + Math.random() * 6,
      y: 105 + Math.floor(i / 5) * 30,
      label,
      color: COLORS[i % COLORS.length],
      wobbleDelay: Math.random() * 2,
      dur: 9 + Math.random() * 7,
      popped: false,
    }))
    setBalloons(list)
  }, [step.labels])

  /* reveal the answer when the child is stuck */
  useEffect(() => {
    if (reveal) {
      setSolved(true)
      setBalloons((bs) => bs.map((b) => (b.label === step.target ? { ...b, popped: true } : b)))
    }
  }, [reveal, step.target])

  const pop = (b: Balloon) => {
    if (b.popped || solved || reveal) return
    const isRight = b.label === step.target
    if (isRight) {
      sfx.pop()
      haptic(14)
      const next = poppedRight + 1
      setPoppedRight(next)
      setBalloons((bs) => bs.map((x) => (x.id === b.id ? { ...x, popped: true } : x)))
      if (next >= matches) {
        sfx.correct()
        setSolved(true)
        window.setTimeout(() => answerRef.current(true), 700)
      }
    } else {
      sfx.wrong()
      haptic([10, 40, 10])
      setWrongCount((w) => w + 1)
      /* a wrong balloon wobbles away — no scary pops */
      setBalloons((bs) => bs.map((x) => (x.id === b.id ? { ...x, popped: true } : x)))
      answerRef.current(false)
    }
  }

  const allGone = balloons.length > 0 && balloons.every((b) => b.popped)

  return (
    <div className="flex flex-col items-center gap-3">
      {/* mission banner */}
      <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border-[3px] border-ink-900 bg-sun-300 px-5 py-2 font-display text-xl font-bold text-ink-900 sm:text-2xl">
        Pop the
        <span className="anim-heartbeat inline-block rounded-xl border-[3px] border-ink-900 bg-white px-3">{step.target}</span>
        !
      </div>

      {/* sky */}
      <div className="relative h-[24rem] w-full overflow-hidden rounded-[2rem] border-[4px] border-ink-900 bg-gradient-to-b from-sky-200 via-sky-100 to-cream-50 shadow-[0_8px_0_0_rgba(65,51,100,0.85)]">
        {balloons.map((b) => (
          <button
            key={b.id}
            aria-label={`balloon ${b.label}`}
            onClick={() => pop(b)}
            className="absolute touch-none"
            style={{
              left: `${b.x}%`,
              bottom: `${b.y}%`,
              animation: `poli-rise-up ${b.dur}s linear ${b.wobbleDelay}s infinite`,
              visibility: b.popped ? 'hidden' : 'visible',
            }}
          >
            <span className="anim-wobble block" style={{ animationDuration: `${2.4 + b.wobbleDelay}s` }}>
              <BalloonShape color={b.color} />
              <span className="pointer-events-none absolute inset-0 grid place-items-center font-display text-2xl font-bold text-ink-900">
                {b.label}
              </span>
            </span>
          </button>
        ))}

        {(solved || allGone) && (
          <div className="absolute inset-0 grid place-items-center">
            <p className="font-party text-4xl text-grass-600 text-pop-sm anim-bounce-in">Great popping!</p>
          </div>
        )}
      </div>

      <p className="font-display text-base text-ink-500">
        popped {poppedRight}/{matches}
        {wrongCount > 0 && <> · oops {wrongCount}</>}
      </p>
    </div>
  )
}

/** A chunky glossy balloon drawn inline. */
function BalloonShape({ color }: { color: string }) {
  return (
    <svg width="84" height="104" viewBox="0 0 84 104" aria-hidden>
      <path d="M42 88q-2 8 4 14" fill="none" stroke="#4a3f63" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="42" cy="48" rx="38" ry="44" fill={color} stroke="#413364" strokeWidth="4" />
      <ellipse cx="30" cy="30" rx="10" ry="14" fill="#ffffff" opacity="0.5" transform="rotate(-20 30 30)" />
      <path d="M34 90l8 6-10 6z" fill={color} stroke="#413364" strokeWidth="3" strokeLinejoin="round" />
    </svg>
  )
}
