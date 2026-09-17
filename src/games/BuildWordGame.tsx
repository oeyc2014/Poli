import { useState } from 'react'
import type { BuildWordStep } from '../types'
import { Btn } from '../components/Ui'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'

export function BuildWordGame({
  step,
  onAnswer,
  reveal,
}: {
  step: BuildWordStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const [used, setUsed] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const word = step.word
  const tiles = step.tiles ?? word.split('')
  const built = used.map((i) => tiles[i]).join('')

  const full = built.length >= word.length

  const check = () => {
    const ok = built.toLowerCase() === word.toLowerCase()
    if (ok) {
      setDone(true)
      sfx.correct()
    } else {
      sfx.wrong()
    }
    onAnswer(ok)
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* letter slots */}
      <div className="flex items-center justify-center gap-2">
        {word.split('').map((_, i) => {
          const letter = reveal && !done ? word[i] : built[i]
          return (
            <span
              key={i}
              className={`grid h-16 w-14 place-items-center rounded-2xl border-4 font-display text-3xl font-bold uppercase ${
                letter
                  ? done || reveal
                    ? 'border-grass-700 bg-grass-300 text-ink-900'
                    : 'border-grape-600 bg-grape-100 text-ink-900'
                  : 'border-dashed border-ink-900/40 bg-white/70 text-transparent'
              }`}
              style={{ animation: letter ? 'poli-pop 0.32s ease' : undefined }}
            >
              {letter ?? '•'}
            </span>
          )
        })}
      </div>

      {/* available tiles */}
      <div className="flex max-w-xl flex-wrap items-center justify-center gap-2">
        {tiles.map((letter, i) => {
          const isUsed = used.includes(i)
          return (
            <button
              key={i}
              type="button"
              disabled={isUsed || done || reveal}
              onClick={() => {
                if (built.length >= word.length) return
                setUsed((u) => [...u, i])
                sfx.tap()
              }}
              className={`grid h-16 w-14 place-items-center rounded-2xl border-4 font-display text-3xl font-bold uppercase transition-all ${
                isUsed
                  ? 'border-ink-900/25 bg-ink-100 text-transparent opacity-40'
                  : 'border-ink-900/80 bg-white text-ink-900 hover:-translate-y-1 active:translate-y-0'
              }`}
            >
              {letter}
            </button>
          )
        })}
      </div>

      {!done && !reveal && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Btn
            tone="white"
            size="md"
            icon={<Icon name="refresh" size={24} color="currentColor" />}
            onClick={() => { setUsed([]); sfx.whoosh() }}
            disabled={!used.length}
          >
            Clear
          </Btn>
          <Btn tone="grass" size="lg" icon={<Icon name="check" size={26} color="currentColor" />} onClick={check} disabled={!full}>
            Check
          </Btn>
        </div>
      )}

      {done && (
        <p className="flex items-center justify-center gap-2 font-display text-xl text-grass-700">
          <Icon name="starGlow" size={28} />
          You spelled {word.toUpperCase()}!
        </p>
      )}
    </div>
  )
}
