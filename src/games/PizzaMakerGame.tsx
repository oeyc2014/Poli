import { useState } from 'react'
import type { PizzaStep } from '../types'
import { Btn, IconBtn, Panel } from '../components/Ui'
import { Icon } from '../icons'
import { haptic, sfx } from '../lib/sound'
import { speak } from '../lib/speech'

const DEFAULT_SHELF = [
  { icon: 'mushroom', name: 'mushroom' },
  { icon: 'cheese', name: 'cheese' },
  { icon: 'pepper', name: 'pepper' },
  { icon: 'olive', name: 'olive' },
  { icon: 'pineapple', name: 'pineapple' },
  { icon: 'basil', name: 'basil' },
]

/**
 * Pizza Maker — a customer orders a pizza; the child taps exactly the
 * right toppings onto it, then bakes. The order is spoken, the child
 * reads the ticket, and counting the toppings is the hidden math lesson.
 */
export function PizzaMakerGame({
  step,
  onAnswer,
  reveal,
}: {
  step: PizzaStep
  onAnswer: (correct: boolean) => void
  reveal: boolean
}) {
  const each = step.each ?? 1
  const shelf = step.shelf ?? DEFAULT_SHELF
  const [placed, setPlaced] = useState<{ icon: string; x: number; y: number; rot: number }[]>([])
  const [baked, setBaked] = useState<null | 'perfect' | 'oops'>(null)

  const addTopping = (icon: string) => {
    if (baked || reveal) return
    sfx.drop()
    haptic(10)
    /* toppings are sprinkled around the pizza in a circle */
    const angle = placed.length * 2.399963 // golden angle for even sprinkling
    const radius = 26 + (placed.length % 4) * 26
    setPlaced((p) => [
      ...p,
      {
        icon,
        x: 50 + radius * Math.cos(angle) * 0.85,
        y: 50 + radius * Math.sin(angle) * 0.72,
        rot: Math.random() * 60 - 30,
      },
    ])
  }

  const bake = () => {
    if (baked || reveal || placed.length === 0) return
    sfx.whoosh()
    window.setTimeout(() => {
      /* every requested topping must be on the pizza exactly `each` times,
         and nothing else may be there */
      const counts = new Map<string, number>()
      placed.forEach((p) => counts.set(p.icon, (counts.get(p.icon) ?? 0) + 1))
      const wanted = step.toppings.map((t) => t.icon)
      const perfect =
        wanted.every((icon) => counts.get(icon) === each) &&
        [...counts.keys()].every((icon) => wanted.includes(icon))
      if (perfect) {
        sfx.correct()
        haptic([10, 30, 10])
        setBaked('perfect')
        speak('Yummy! That is exactly what I ordered. Thank you!', { rate: 0.92 })
        window.setTimeout(() => onAnswer(true), 1500)
      } else {
        sfx.wrong()
        setBaked('oops')
        speak('Hmm, that is not quite my order. Look again!', { rate: 0.92 })
        window.setTimeout(() => {
          setBaked(null)
          setPlaced([])
        }, 1800)
      }
    }, 700)
  }

  if (!step.toppings.length) return null

  return (
    <div className="flex flex-col items-center gap-4">
      {/* the order ticket */}
      <Panel pad="sm" className="w-full max-w-md !bg-cream-100">
        <div className="flex items-center gap-3">
          <span className="font-note text-xl text-ink-700">Order from {step.customer}:</span>
          <IconBtn
            label="Hear the order"
            tone="sky"
            size={38}
            onClick={() =>
              speak(
                `I want a pizza with ${step.toppings.map((t) => `${each === 1 ? '' : `${each} `}${t.name}`).join(' and ')}!`,
                { rate: 0.9 },
              )
            }
          >
            <Icon name="speaker" size={18} color="currentColor" />
          </IconBtn>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          {step.toppings.map((t, i) => {
            const done = placed.filter((p) => p.icon === t.icon).length >= each
            return (
              <span
                key={i}
                className={`flex items-center gap-1 rounded-full border-[3px] px-2 py-1 font-display text-sm font-bold ${
                  done ? 'border-grass-600 bg-grass-200 text-grass-700' : 'border-ink-900/30 bg-white text-ink-700'
                }`}
              >
                <Icon name={t.icon} size={22} /> {each > 1 ? `${each}× ` : ''}
                {t.name} {done && '✓'}
              </span>
            )
          })}
        </div>
      </Panel>

      {/* kitchen counter */}
      <div className="relative w-full max-w-lg">
        {/* the pizza */}
        <div className="relative mx-auto aspect-square w-[19rem] max-w-full">
          <div
            className={`absolute inset-0 rounded-full border-[5px] border-ink-900 shadow-[0_8px_0_0_rgba(65,51,100,0.85)] transition-all duration-700 ${
              baked === 'perfect' ? 'brightness-110 saturate-125' : ''
            }`}
            style={{
              background:
                'radial-gradient(circle at 40% 35%, #ffe3ad 0 18%, transparent 19%), radial-gradient(circle, #ffd166 0 62%, #f28000 62% 100%)',
            }}
            role="img"
            aria-label="pizza"
          >
            {/* sauce + cheese swirl */}
            <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,#ff7a50_0_58%,#f9409a_58%_100%)] opacity-85" />
            <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle,#fff1d6_0_58%,transparent_58%)] opacity-90" />

            {/* toppings */}
            {placed.map((p, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                  transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
                  animation: 'poli-blossom 0.35s cubic-bezier(0.34,1.56,0.64,1) both',
                }}
              >
                <Icon name={p.icon} size={44} />
              </span>
            ))}
          </div>

          {baked === 'perfect' && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-party text-4xl text-grass-600 text-pop-sm anim-bounce-in">Perfect pizza!</span>
            </div>
          )}
          {baked === 'oops' && (
            <div className="absolute inset-0 grid place-items-center">
              <span className="font-party text-4xl text-coral-600 text-pop-sm anim-bounce-in">Not quite!</span>
            </div>
          )}
        </div>
      </div>

      {/* topping shelf */}
      {!baked && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {shelf.map((t) => (
            <button
              key={t.icon}
              onClick={() => addTopping(t.icon)}
              aria-label={`add ${t.name}`}
              className="btn3d flex-col !gap-0.5 bg-white !px-3 !py-2"
              style={{ ['--btn-shadow' as string]: '#aaacb8' }}
            >
              <Icon name={t.icon} size={40} />
              <span className="font-display text-xs font-bold text-ink-600">{t.name}</span>
            </button>
          ))}
        </div>
      )}

      {!baked && (
        <div className="flex gap-3">
          <Btn tone="sun" size="lg" icon={<Icon name="fire" size={26} />} onClick={bake} disabled={placed.length === 0}>
            Bake it!
          </Btn>
          <Btn
            tone="white"
            variant="outline"
            size="lg"
            icon={<Icon name="refresh" size={24} color="currentColor" />}
            onClick={() => {
              sfx.tap()
              setPlaced([])
            }}
          >
            Clear
          </Btn>
        </div>
      )}
    </div>
  )
}
