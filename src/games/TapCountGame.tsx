import { useState } from 'react'
import type { TapCountStep } from '../types'
import { Btn } from '../components/Ui'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'

export function TapCountGame({
  step,
  onAnswer,
  reveal,
}: {
  step: TapCountStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const [picked, setPicked] = useState<number[]>([])
  const [done, setDone] = useState(false)
  const items = step.visual.items
  const collect = step.mode === 'collect'

  const toggle = (i: number) => {
    if (done || reveal) return
    if (picked.includes(i)) {
      setPicked(picked.filter((p) => p !== i))
      sfx.unselect()
    } else {
      setPicked([...picked, i])
      sfx.pop()
    }
  }

  const check = () => {
    const ok = picked.length === step.target
    if (ok) {
      setDone(true)
    }
    onAnswer(ok)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {/* what the child must do, as a picture + number */}
      <div className="flex items-center gap-2 rounded-full border-4 border-ink-900/80 bg-white px-4 py-2">
        <span className="font-display text-lg text-ink-600">Tap</span>
        <span className="grid h-11 w-11 place-items-center rounded-full border-[3px] border-ink-900 bg-sun-300 font-display text-2xl font-bold text-ink-900 anim-heartbeat">
          {step.target}
        </span>
      </div>

      <div className="flex max-w-2xl flex-wrap items-center justify-center gap-2">
        {items.map((name, i) => {
          const on = picked.includes(i)
          const mustTap = reveal && i < step.target
          return (
            <button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              aria-label={on ? `unselect ${name}` : `select ${name}`}
              className="relative grid place-items-center rounded-3xl border-4 transition-all duration-150"
              style={{
                width: 78,
                height: 78,
                lineHeight: 1,
                background: on ? '#b0f5d3' : collect && on ? 'transparent' : 'rgba(255,255,255,0.85)',
                borderColor: on ? '#046b4a' : mustTap ? '#f28000' : 'rgba(43,33,64,0.25)',
                opacity: on && collect ? 0 : 1,
                transform: on && !collect ? 'scale(0.9)' : 'scale(1)',
                animation: on
                  ? collect
                    ? undefined
                    /* "backwards" so the inline scale(0.9) settles in afterwards */
                    : 'poli-squish 0.42s cubic-bezier(0.34,1.56,0.64,1) backwards'
                  : mustTap
                    ? 'poli-heartbeat 1.1s ease-in-out infinite'
                    : undefined,
              }}
            >
              <span style={{ opacity: on && collect ? 0 : 1 }}>
                <Icon name={name} size={48} />
              </span>
              {on && !collect && (
                <span className="absolute -right-2 -top-2 grid h-7 w-7 place-items-center rounded-full border-[3px] border-ink-900 bg-grass-500 anim-blossom">
                  <Icon name="check" size={15} color="#ffffff" />
                </span>
              )}
            </button>
          )
        })}
      </div>

      {/* counter + check */}
      {!done && !reveal && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-2xl border-4 border-ink-900/80 bg-white px-4 py-2">
            <span className="font-display text-lg text-ink-600">You tapped</span>
            <span
              className="grid h-10 w-10 place-items-center rounded-full border-[3px] border-ink-900 bg-sky-300 font-display text-xl font-bold"
              key={picked.length}
              style={{ animation: 'poli-jelly 0.4s ease' }}
            >
              {picked.length}
            </span>
          </div>
          <Btn
            tone="grass"
            size="lg"
            icon={<Icon name="check" size={26} color="currentColor" />}
            onClick={check}
            disabled={picked.length === 0}
          >
            Check
          </Btn>
        </div>
      )}

      {done && (
        <p className="flex items-center justify-center gap-2 font-display text-xl text-grass-700">
          <Icon name="party" size={30} />
          You tapped {step.target} — perfect!
        </p>
      )}
    </div>
  )
}
