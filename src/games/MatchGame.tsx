import { useMemo, useState } from 'react'
import type { MatchStep } from '../types'
import { AutoIcon, Icon } from '../icons'
import { sfx } from '../lib/sound'

function shuffleArr<T>(arr: T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function MatchGame({
  step,
  onAnswer,
  reveal,
}: {
  step: MatchStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const rights = useMemo(
    () =>
      shuffleArr(
        step.pairs.map((p, i) => ({ pairIndex: i, text: p.right, label: p.rightLabel })),
      ),
    [step.pairs],
  )
  const [selected, setSelected] = useState<number | null>(null)
  const [matched, setMatched] = useState<number[]>([])
  const [shakeRight, setShakeRight] = useState<number | null>(null)

  const allMatched = reveal || matched.length === step.pairs.length

  const tileClass = (state: 'idle' | 'sel' | 'done') =>
    `grid min-h-[76px] min-w-[76px] flex-1 place-items-center rounded-3xl border-4 px-3 py-2 text-center font-display text-3xl font-bold transition-all duration-150 ${
      state === 'done'
        ? 'border-grass-700 bg-grass-300 text-ink-900'
        : state === 'sel'
          ? 'border-grape-600 bg-grape-200 text-ink-900 scale-[1.04] ring-4 ring-grape-300'
          : 'border-ink-900/75 bg-white text-ink-900 hover:-translate-y-0.5'
    }`

  return (
    <div className="flex w-full max-w-2xl flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:gap-6">
        {/* left column */}
        <div className="flex flex-col gap-3">
          {step.pairs.map((p, i) => {
            const isDone = allMatched || matched.includes(i)
            return (
              <div key={i} className="flex" style={{ animation: `poli-slide-up 0.4s ease ${i * 0.07}s both` }}>
                <button
                  type="button"
                  disabled={isDone}
                  onClick={() => {
                    setSelected(i)
                    sfx.select()
                  }}
                  className={tileClass(isDone ? 'done' : selected === i ? 'sel' : 'idle')}
                  style={{ animation: !isDone && selected === i ? 'poli-jelly 0.45s ease' : undefined }}
                  aria-label={p.leftLabel ?? p.left}
                >
                  <AutoIcon value={p.left} size={52} />
                  {p.leftLabel && <span className="block text-base font-semibold text-ink-600">{p.leftLabel}</span>}
                </button>
              </div>
            )
          })}
        </div>

        {/* right column */}
        <div className="flex flex-col gap-3">
          {rights.map((r, idx) => {
            const isDone = allMatched || matched.includes(r.pairIndex)
            return (
              <div key={idx} className="flex" style={{ animation: `poli-slide-up 0.4s ease ${idx * 0.07}s both` }}>
                <button
                  type="button"
                  disabled={isDone}
                  onClick={() => {
                    if (selected === null) return
                    if (selected === r.pairIndex) {
                      setMatched((m) => [...m, r.pairIndex])
                      setSelected(null)
                      sfx.correct()
                      if (matched.length + 1 === step.pairs.length) onAnswer(true)
                    } else {
                      setShakeRight(idx)
                      window.setTimeout(() => setShakeRight(null), 550)
                      sfx.wrong()
                      onAnswer(false)
                      setSelected(null)
                    }
                  }}
                  className={tileClass(isDone ? 'done' : 'idle')}
                  style={{ animation: shakeRight === idx ? 'poli-shake 0.5s both' : undefined }}
                  aria-label={r.label ?? r.text}
                >
                  <AutoIcon value={r.text} size={52} />
                  {r.label && <span className="block text-base font-semibold text-ink-600">{r.label}</span>}
                </button>
              </div>
            )
          })}
        </div>
      </div>

      <p className="flex items-center justify-center gap-2 text-center font-display text-lg text-ink-500">
        {allMatched ? (
          <>
            <Icon name="party" size={26} />
            You matched them all!
          </>
        ) : selected === null ? (
          <>
            <Icon name="hand" size={24} />
            Tap a picture on the left first
          </>
        ) : (
          <>
            <Icon name="hand" size={24} />
            Now tap its partner on the right
          </>
        )}
      </p>
    </div>
  )
}
