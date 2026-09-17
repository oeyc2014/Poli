import { useEffect, useRef, useState } from 'react'
import type { RaceStep } from '../types'
import { Icon } from '../icons'
import { haptic, sfx } from '../lib/sound'
import { speak } from '../lib/speech'

type Phase = 'question' | 'zoom' | 'crash'

/**
 * Car Race — answer the question by choosing the lane with the
 * right sign; the car speeds forward with every right answer.
 * Wrong lanes are bumpy but never scary — just slow.
 */
export function CarRaceGame({
  step,
  onAnswer,
  reveal,
}: {
  step: RaceStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const [phase, setPhase] = useState<Phase>('question')
  const [laneChoice, setLaneChoice] = useState<number | null>(null)
  const [answered, setAnswered] = useState(false)
  const timers = useRef<number[]>([])
  const answerRef = useRef(onAnswer)
  answerRef.current = onAnswer

  useEffect(() => {
    return () => timers.current.forEach(window.clearTimeout)
  }, [])

  /* stable shuffled lane order for this step */
  const lanes = useRef(
    (() => {
      const opts = [step.answer, ...step.decoys]
      for (let i = opts.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[opts[i], opts[j]] = [opts[j], opts[i]]
      }
      return opts
    })(),
  ).current

  useEffect(() => {
    if (phase === 'question') speak(`${step.question} Drive to the right answer!`, { rate: 0.9 })
  }, [phase, step.question]) // eslint-disable-line react-hooks/exhaustive-deps

  /* reveal: drive straight into the right lane */
  useEffect(() => {
    if (reveal && !answered && phase === 'question') {
      setPhase('zoom')
      setLaneChoice(lanes.indexOf(step.answer))
      timers.current.push(window.setTimeout(() => answerRef.current(false), 1200))
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [reveal])

  const chooseLane = (i: number) => {
    if (phase !== 'question' || answered) return
    const isRight = lanes[i] === step.answer
    setLaneChoice(i)
    if (isRight) {
      sfx.correct()
      haptic([10, 26, 10])
      setPhase('zoom')
      setAnswered(true)
      timers.current.push(window.setTimeout(() => answerRef.current(true), 1500))
    } else {
      /* a bump, not a fail: the child wobbles and can pick another lane */
      sfx.wrong()
      haptic([14, 60, 14])
      setPhase('crash')
      speak(`Oops! ${lanes[i]} is not it. Try another lane!`, { rate: 0.9 })
      timers.current.push(
        window.setTimeout(() => {
          setPhase('question')
          setLaneChoice(null)
        }, 1300),
      )
      answerRef.current(false)
    }
  }

  const laneBg = (i: number) => {
    if (phase === 'question') return 'white'
    if (lanes[i] === step.answer) return '#7deaa8'
    if (laneChoice === i) return '#ffa584'
    return 'white'
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* the question */}
      <div className="flex items-center gap-3 rounded-full border-[3px] border-ink-900 bg-grape-200 px-6 py-2 font-display text-2xl font-bold text-ink-900 shadow-[0_4px_0_0_rgba(65,51,100,0.85)]">
        <Icon name="car" size={34} />
        {step.question}
        <button
          aria-label="Hear the question"
          onClick={() => speak(`${step.question} Drive to the right answer!`, { rate: 0.9 })}
          className="grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink-900 bg-white"
        >
          <Icon name="speaker" size={18} color="#4a3f63" />
        </button>
      </div>

      {/* the road */}
      <div className="relative h-72 w-full max-w-lg overflow-hidden rounded-[2rem] border-[4px] border-ink-900 shadow-[0_8px_0_0_rgba(65,51,100,0.85)]">
        {/* asphalt */}
        <div
          className="absolute inset-0"
          style={{
            background: 'repeating-linear-gradient(to bottom, #5c5078 0 60px, #5c5078 60px, transparent 60px, transparent 90px)',
            backgroundPosition: 'center',
            animation: phase === 'zoom' ? 'poli-road 0.35s linear infinite' : phase === 'crash' ? 'none' : 'poli-road 1.2s linear infinite',
          }}
        />
        {/* grass edges */}
        <div className="absolute inset-y-0 left-0 w-[12%] bg-grass-500" />
        <div className="absolute inset-y-0 right-0 w-[12%] bg-grass-500" />

        {/* lane signs */}
        <div className="absolute inset-y-0 left-[12%] right-[12%] grid grid-cols-3 items-start justify-items-center pt-4">
          {lanes.map((label, i) => (
            <button
              key={i}
              onClick={() => chooseLane(i)}
              disabled={phase !== 'question'}
              className="btn3d h-16 w-16 !rounded-2xl font-display text-2xl font-bold text-ink-900"
              style={{ ['--btn-shadow' as string]: '#aaacb8', background: laneBg(i) }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* the car */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2"
          style={{
            transform:
              phase === 'crash' && laneChoice !== null
                ? `translateX(calc(-50% + ${(laneChoice - 1) * 22}%)) rotate(-8deg)`
                : phase === 'zoom'
                  ? 'translateX(-50%) scale(1.08)'
                  : 'translateX(-50%)',
            transition: 'transform 0.45s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <span className={phase === 'zoom' ? 'anim-jelly' : 'anim-bob'} style={{ animationDuration: '2.6s' }}>
            <svg width="110" height="70" viewBox="0 0 110 70" aria-hidden>
              <path d="M10 52q2-18 18-22l10-14q2-4 8-4h20q6 0 9 5l9 13q16 4 18 22 0 8-8 8H18q-8 0-8-8z" fill="#f9409a" stroke="#413364" strokeWidth="4" strokeLinejoin="round" />
              <path d="M40 18h22l8 12H34z" fill="#7ddcff" stroke="#413364" strokeWidth="3.5" strokeLinejoin="round" />
              <circle cx="30" cy="58" r="9" fill="#413364" stroke="#413364" strokeWidth="3" />
              <circle cx="80" cy="58" r="9" fill="#413364" stroke="#413364" strokeWidth="3" />
              <circle cx="30" cy="58" r="4" fill="#a89bbd" />
              <circle cx="80" cy="58" r="4" fill="#a89bbd" />
              <ellipse cx="24" cy="34" rx="6" ry="3" fill="#ffffff" opacity="0.55" transform="rotate(-18 24 34)" />
            </svg>
          </span>
        </div>

        {phase === 'zoom' && (
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <span className="font-party text-4xl text-white text-pop anim-bounce-in">VROOOM!</span>
          </div>
        )}
      </div>

      <p className="font-display text-base text-ink-500">
        {phase === 'question' ? 'Pick the lane with the right answer!' : phase === 'crash' ? 'Bump! Pick another lane…' : 'Vrooom!'}
      </p>
    </div>
  )
}
