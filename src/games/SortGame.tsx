import { useEffect, useState } from 'react'
import type { SortStep } from '../types'
import { tone as toneOf } from '../lib/tone'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'

export function SortGame({
  step,
  onAnswer,
  reveal,
}: {
  step: SortStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [placed, setPlaced] = useState<Record<string, string>>({})
  const [shakeBin, setShakeBin] = useState<string | null>(null)

  const remaining = step.items.filter((i) => !placed[i.id])
  const allDone = remaining.length === 0

  /* when we have to show the answer, drop everything in the right basket */
  useEffect(() => {
    if (!reveal) return
    setPlaced(Object.fromEntries(step.items.map((i) => [i.id, i.bin])))
    setSelected(null)
  }, [reveal, step.items])

  const dropInto = (binId: string) => {
    if (!selected || reveal) return
    const item = step.items.find((i) => i.id === selected)
    if (!item) return
    if (item.bin === binId) {
      setPlaced((p) => ({ ...p, [item.id]: binId }))
      setSelected(null)
      sfx.drop()
      if (remaining.length - 1 === 0) onAnswer(true)
    } else {
      setShakeBin(binId)
      window.setTimeout(() => setShakeBin(null), 550)
      sfx.wrong()
      onAnswer(false)
    }
  }

  return (
    <div className="flex w-full flex-col items-center gap-4">
      {/* baskets */}
      <div className="grid w-full grid-cols-2 gap-3">
        {step.bins.map((bin) => {
          const t = toneOf(bin.tone ?? 'sky')
          const contents = step.items.filter((i) => placed[i.id] === bin.id)
          return (
            <button
              key={bin.id}
              type="button"
              onClick={() => dropInto(bin.id)}
              disabled={!selected || reveal}
              className={`flex min-h-[132px] flex-col items-center gap-2 rounded-3xl border-4 border-ink-900/85 p-3 transition-transform ${t.soft} ${
                selected ? 'hover:-translate-y-1 ring-4 ring-sun-400' : ''
              }`}
              style={{ animation: shakeBin === bin.id ? 'poli-shake 0.5s both' : undefined }}
            >
              <span className="flex items-center gap-2 font-display text-lg font-bold text-ink-800">
                <Icon name={bin.icon} size={34} />
                {bin.label}
              </span>
              <span className="flex min-h-[52px] flex-wrap items-center justify-center gap-1">
                {contents.map((c) => (
                  <span key={c.id} className="leading-none anim-blossom">
                    <Icon name={c.icon} size={34} />
                  </span>
                ))}
              </span>
            </button>
          )
        })}
      </div>

      {/* tray */}
      <div className="flex min-h-[96px] w-full flex-wrap items-center justify-center gap-2 rounded-3xl border-4 border-dashed border-ink-900/40 bg-white/60 p-3">
        {remaining.length === 0 ? (
          <span className="flex items-center gap-2 font-display text-lg text-grass-700">
            <Icon name="party" size={28} />
            Everything is sorted!
          </span>
        ) : (
          remaining.map((item, i) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelected(selected === item.id ? null : item.id)
                if (selected === item.id) sfx.unselect()
                else sfx.select()
              }}
              className={`grid h-[76px] w-[76px] place-items-center rounded-2xl border-4 transition-all ${
                selected === item.id
                  ? '-translate-y-2 border-grape-600 bg-grape-100 ring-4 ring-grape-300'
                  : 'border-ink-900/75 bg-white hover:-translate-y-1'
              }`}
              style={{ animation: `poli-pop 0.4s ease ${i * 0.05}s both` }}
              aria-label={item.label ?? item.icon}
            >
              <Icon name={item.icon} size={52} />
            </button>
          ))
        )}
      </div>

      <p className="flex items-center justify-center gap-2 text-center font-display text-lg text-ink-500">
        {allDone ? (
          <>
            <Icon name="star" size={24} />
            All sorted!
          </>
        ) : selected ? (
          <>
            <Icon name="hand" size={24} />
            Now tap the basket it belongs in
          </>
        ) : (
          <>
            <Icon name="hand" size={24} />
            Tap a picture first
          </>
        )}
      </p>
    </div>
  )
}
