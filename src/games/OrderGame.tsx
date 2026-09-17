import { useMemo, useState } from 'react'
import type { OrderStep } from '../types'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'

function shuffleArr<T>(arr: T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function OrderGame({
  step,
  onAnswer,
  reveal,
}: {
  step: OrderStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const display = useMemo(() => shuffleArr(step.items), [step.items])
  const [placed, setPlaced] = useState<string[]>([])
  const [shake, setShake] = useState<string | null>(null)

  const orderOf = (id: string) => step.items.find((i) => i.id === id)?.order ?? 0
  const allPlaced = reveal || placed.length === step.items.length
  const nextNumber = placed.length + 1

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* progress positions */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {step.items.map((_, i) => (
          <span
            key={i}
            className={`grid h-10 w-10 place-items-center rounded-full border-[3px] font-display text-lg font-bold ${
              i < placed.length
                ? 'border-grass-700 bg-grass-400 text-white'
                : 'border-ink-900/40 bg-white/70 text-ink-400'
            }`}
          >
            {i + 1}
          </span>
        ))}
      </div>

      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-3">
        {display.map((item, i) => {
          const placedIndex = placed.indexOf(item.id)
          const isPlaced = placedIndex >= 0
          return (
            <button
              key={item.id}
              type="button"
              disabled={isPlaced || allPlaced}
              onClick={() => {
                if (orderOf(item.id) === nextNumber) {
                  setPlaced((p) => [...p, item.id])
                  sfx.correct()
                  if (placed.length + 1 === step.items.length) onAnswer(true)
                } else {
                  setShake(item.id)
                  window.setTimeout(() => setShake(null), 550)
                  sfx.wrong()
                  onAnswer(false)
                }
              }}
              className={`relative grid min-h-[104px] w-[104px] place-items-center gap-1 rounded-3xl border-4 px-2 py-2 transition-all ${
                isPlaced
                  ? 'border-grass-700 bg-grass-300'
                  : 'border-ink-900/75 bg-white hover:-translate-y-1'
              }`}
              style={{
                animation: shake === item.id ? 'poli-shake 0.5s both' : `poli-pop 0.4s ease ${i * 0.07}s both`,
              }}
              aria-label={item.label ?? item.icon}
            >
              <Icon name={item.icon} size={54} />
              {item.label && <span className="font-display text-sm font-semibold text-ink-600">{item.label}</span>}
              {isPlaced && (
                <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full border-[3px] border-ink-900 bg-grass-500 font-display text-base font-bold text-white anim-blossom">
                  {placedIndex + 1}
                </span>
              )}
            </button>
          )
        })}
      </div>

      <p className="flex items-center justify-center gap-2 text-center font-display text-lg text-ink-500">
        {allPlaced ? (
          <>
            <Icon name="party" size={26} />
            Perfect order!
          </>
        ) : (
          <>
            <Icon name="hand" size={24} />
            Which one comes number {nextNumber}?
          </>
        )}
      </p>
    </div>
  )
}
