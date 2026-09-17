import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ChoiceStep, GameOption } from '../types'
import { OptionTile, type TileState } from './OptionTile'
import { Icon } from '../icons'

const LAYOUT_CLASS: Record<NonNullable<ChoiceStep['layout']>, string> = {
  row: 'grid grid-cols-1 sm:grid-cols-3 gap-3',
  'grid-2': 'grid grid-cols-2 gap-3',
  'grid-3': 'grid grid-cols-2 sm:grid-cols-3 gap-3',
  stack: 'flex flex-col gap-3 max-w-xl mx-auto',
}

export function ChoiceGame({
  step,
  onAnswer,
  mistakes,
  reveal,
  hideCaptions,
}: {
  step: ChoiceStep
  onAnswer: (correct: boolean) => void
  mistakes: number
  reveal: boolean
  hideCaptions: boolean
}) {
  const [wrongIds, setWrongIds] = useState<string[]>([])
  const [pickedRight, setPickedRight] = useState(false)

  const correctId = useMemo(() => step.options.find((o) => o.correct)?.id, [step.options])
  const layout = step.layout ?? 'grid-3'
  const minHeight = layout === 'stack' ? 96 : layout === 'grid-2' ? 168 : 156

  const pick = useCallback(
    (option: GameOption) => {
      if (option.correct) {
        setPickedRight(true)
        onAnswer(true)
      } else {
        setWrongIds((w) => [...w, option.id])
        onAnswer(false)
      }
    },
    [onAnswer],
  )

  /* A grown-up helping out (or a kid on a laptop) can just press 1–9. */
  const keyed = step.options.length <= 9
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey || e.repeat) return
      if (!/^[1-9]$/.test(e.key)) return
      if (pickedRight || reveal) return
      const option = step.options[Number(e.key) - 1]
      if (!option || wrongIds.includes(option.id)) return
      e.preventDefault()
      pick(option)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [pick, pickedRight, reveal, step.options, wrongIds])

  return (
    <div className={LAYOUT_CLASS[layout]}>
      {step.options.map((option, i) => {
        const state: TileState =
          option.id === correctId && (pickedRight || reveal)
            ? 'revealed'
            : wrongIds.includes(option.id)
              ? 'wrong'
              : 'idle'

        return (
          <div
            key={option.id}
            style={{ animation: `poli-pop 0.44s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s backwards` }}
          >
            <OptionTile
              option={option}
              state={state}
              minHeight={minHeight}
              hideCaption={hideCaptions}
              hintKey={keyed ? String(i + 1) : undefined}
              disabled={pickedRight || reveal}
              onPick={() => pick(option)}
            />
          </div>
        )
      })}
      {reveal && !pickedRight && mistakes >= 2 && (
        <p className="col-span-full mt-1 flex items-center justify-center gap-2 text-center font-display text-lg text-grass-700">
          <Icon name="hand" size={24} />
          The glowing one is the answer!
        </p>
      )}
    </div>
  )
}
