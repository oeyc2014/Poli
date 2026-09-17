import { useState } from 'react'
import type { NumberLineStep } from '../types'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'

export function NumberLineGame({
  step,
  onAnswer,
  reveal,
}: {
  step: NumberLineStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const [wrong, setWrong] = useState<number[]>([])
  const [hit, setHit] = useState(false)
  const numbers: number[] = []
  for (let n = step.min; n <= step.max; n++) numbers.push(n)

  return (
    <div className="flex w-full flex-col items-center gap-3">
      <div className="relative w-full overflow-x-auto pb-2 no-bar">
        <div className="relative mx-auto flex items-end gap-0 px-4" style={{ minWidth: numbers.length * 56 }}>
          {/* the line itself */}
          <div className="absolute bottom-[26px] left-4 right-4 h-2 rounded-full bg-ink-900/80" />

          {numbers.map((n) => {
            const isWrong = wrong.includes(n)
            const isAnswer = reveal && n === step.answer
            const isHit = hit && n === step.answer
            return (
              <div key={n} className="relative flex flex-col items-center" style={{ width: 56 }}>
                <button
                  type="button"
                  disabled={isWrong || hit || reveal}
                  onClick={() => {
                    if (n === step.answer) {
                      setHit(true)
                      sfx.correct()
                      onAnswer(true)
                    } else {
                      setWrong((w) => [...w, n])
                      sfx.wrong()
                      onAnswer(false)
                    }
                  }}
                  aria-label={`Number ${n}`}
                  className={`grid place-items-center rounded-2xl border-4 font-display text-xl font-bold transition-all ${
                    isHit
                      ? 'border-grass-700 bg-grass-400 text-white scale-110'
                      : isWrong
                        ? 'border-coral-700 bg-coral-200 text-coral-700 opacity-50'
                        : isAnswer
                          ? 'border-sun-600 bg-sun-300 text-ink-900'
                          : 'border-ink-900/70 bg-white text-ink-900 hover:-translate-y-1 active:translate-y-0'
                  }`}
                  style={{
                    width: 46,
                    height: 46,
                    marginBottom: 14,
                    animation: isAnswer ? 'poli-heartbeat 1.1s ease-in-out infinite' : undefined,
                  }}
                >
                  {n}
                </button>
                {/* tick */}
                <span className="absolute bottom-[20px] h-3 w-1.5 rounded-full bg-ink-900/70" />
                {isHit && (
                  <span className="anim-hop absolute -top-9">
                    <Icon name="rabbit" size={34} />
                  </span>
                )}
              </div>
            )
          })}
        </div>
      </div>
      <p className="font-display text-base text-ink-500">
        Count along the line: {step.min} … {step.max}
      </p>
    </div>
  )
}
