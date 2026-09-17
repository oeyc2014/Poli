import type { GameOption } from '../types'
import { ShapeView } from '../components/Shape'
import { Icon } from '../icons'

export type TileState = 'idle' | 'wrong' | 'right' | 'revealed'

/** Text that shrinks as it gets longer, so short answers stay BIG. */
function textSize(text: string): string {
  const n = text.length
  if (n <= 2) return '3.6rem'
  if (n <= 4) return '2.6rem'
  if (n <= 10) return '1.8rem'
  if (n <= 22) return '1.35rem'
  return '1.1rem'
}

export function OptionTile({
  option,
  state,
  onPick,
  disabled,
  hideCaption,
  minHeight = 120,
  /** the keyboard shortcut for this tile, shown as a small quiet badge */
  hintKey,
}: {
  option: GameOption
  state: TileState
  onPick: () => void
  disabled?: boolean
  hideCaption?: boolean
  minHeight?: number
  hintKey?: string
}) {
  const isRight = state === 'right' || state === 'revealed'
  const isWrong = state === 'wrong'

  const surface = isRight
    ? 'bg-gradient-to-b from-grass-200 to-grass-400'
    : isWrong
      ? 'bg-gradient-to-b from-coral-100 to-coral-300'
      : 'bg-white'

  const shadow = isRight ? '#3e6e53' : isWrong ? '#98503d' : '#aaacb8'

  return (
    <button
      type="button"
      onClick={onPick}
      disabled={disabled || isWrong || isRight}
      aria-label={option.caption ?? option.text ?? option.icon ?? 'answer'}
      className={`btn3d relative w-full flex-col gap-2 !px-3 !py-3 transition-opacity ${surface} ${
        isWrong ? 'opacity-55' : ''
      } ${isRight ? 'anim-tada' : ''}`}
      style={{
        ['--btn-shadow' as string]: shadow,
        minHeight,
        animation: state === 'wrong' ? 'poli-shake 0.5s both' : undefined,
      }}
    >
      {/* badge */}
      {isRight && (
        <span className="absolute -right-2 -top-3 grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink-900 bg-grass-500 anim-blossom">
          <Icon name="check" size={20} color="#ffffff" />
        </span>
      )}
      {isWrong && (
        <span className="absolute -right-2 -top-3 grid h-9 w-9 place-items-center rounded-full border-[3px] border-ink-900 bg-coral-500 anim-blossom">
          <Icon name="cross" size={18} color="#ffffff" />
        </span>
      )}

      {/* keyboard shortcut hint — desktop only, and quiet enough to ignore */}
      {hintKey && state === 'idle' && !disabled && (
        <span className="absolute -left-1 -top-2 hidden h-7 w-7 place-items-center rounded-full border-[3px] border-ink-900/70 bg-cream-100 font-display text-sm font-bold text-ink-500 sm:grid">
          {hintKey}
        </span>
      )}

      {/* content */}
      {option.shape && <ShapeView spec={option.shape} size={Math.min(minHeight - 20, 116)} />}

      {option.group && (
        <span className="grid grid-cols-3 place-items-center gap-1">
          {option.group.map((e: string, i: number) => (
            <span key={i} className="leading-none" style={{ animation: `poli-pop 0.4s ease ${i * 0.05}s both` }}>
              <Icon name={e} size={34} />
            </span>
          ))}
        </span>
      )}

      {option.icon && !option.group && (
        <span className="leading-none anim-float">
          <Icon name={option.icon} size={Math.max(46, minHeight - 46)} />
        </span>
      )}

      {option.text && (
        <span className="font-display font-bold leading-tight text-ink-900" style={{ fontSize: textSize(option.text) }}>
          {option.text}
        </span>
      )}

      {option.caption && !hideCaption && !option.text && (
        <span className="font-display text-base font-semibold text-ink-600">{option.caption}</span>
      )}
    </button>
  )
}
