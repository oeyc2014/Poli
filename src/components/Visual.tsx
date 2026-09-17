import type { Visual } from '../types'
import { ShapeView } from './Shape'
import { tone as toneOf } from '../lib/tone'
import { Icon } from '../icons'

const ICON_SIZE = { md: 40, lg: 56, xl: 76 } as const

/* ------------------------------------------------------------
   One picture in a soft tile — the tile stops kids from
   double-counting when they scan a group.
   ------------------------------------------------------------ */
function IconTile({
  name,
  size,
  index,
  tiled = true,
}: {
  name: string
  size: number
  index: number
  tiled?: boolean
}) {
  const box = size * 1.32
  return (
    <span
      className="grid place-items-center"
      style={{
        width: box,
        height: box,
        borderRadius: '30%',
        background: tiled ? 'rgba(255,255,255,0.78)' : 'transparent',
        border: tiled ? '3px solid rgba(43,33,64,0.16)' : 'none',
        animation: `poli-pop 0.42s cubic-bezier(0.34,1.56,0.64,1) ${Math.min(index * 0.045, 0.7)}s both`,
      }}
    >
      <Icon name={name} size={size} />
    </span>
  )
}

/* ------------------------------------------------------------
   Main renderer
   ------------------------------------------------------------ */
export function VisualView({
  visual,
  hideCaptions = false,
  /** used by games that make individual pictures tappable */
  renderIcon,
}: {
  visual: Visual
  hideCaptions?: boolean
  renderIcon?: (name: string, index: number) => React.ReactNode
}) {
  switch (visual.kind) {
    case 'picture': {
      const size = ICON_SIZE[visual.size ?? 'lg']
      return (
        <div className="flex flex-col items-center gap-2">
          <span className="anim-float select-none">
            <Icon name={visual.icon} size={size * 1.9} />
          </span>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-xl text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'icons': {
      const size = ICON_SIZE[visual.size ?? 'lg']
      const layout = visual.layout ?? 'row'
      const count = visual.items.length
      const cols = layout === 'grid' ? Math.min(count, count > 12 ? 5 : 4) : undefined
      return (
        <div className="flex flex-col items-center gap-2">
          <div
            className={layout === 'row' ? 'flex flex-wrap items-center justify-center gap-1.5' : 'grid justify-center gap-1.5'}
            style={cols ? { gridTemplateColumns: `repeat(${cols}, minmax(0, auto))` } : undefined}
          >
            {visual.items.map((e, i) =>
              renderIcon ? (
                <span key={i}>{renderIcon(e, i)}</span>
              ) : (
                <IconTile key={i} name={e} size={size} index={i} tiled={layout === 'grid'} />
              ),
            )}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'groups': {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-stretch justify-center gap-3">
            {visual.groups.map((g, gi) => (
              <div
                key={gi}
                className={`flex min-w-[8rem] flex-col items-center gap-2 rounded-3xl border-4 border-ink-900/80 p-3 ${
                  toneOf(g.tone ?? 'sky').soft
                }`}
                style={{ animation: `poli-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${gi * 0.12}s both` }}
              >
                <div className="flex max-w-[16rem] flex-wrap items-center justify-center gap-1">
                  {g.icons.map((e, i) => (
                    <IconTile key={i} name={e} size={38} index={i} tiled={false} />
                  ))}
                </div>
                {g.label && !hideCaptions && (
                  <span className="font-display text-lg font-semibold text-ink-700">{g.label}</span>
                )}
              </div>
            ))}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'equation': {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {visual.parts.map((p, i) => (
              <div
                key={i}
                className="flex items-center gap-1"
                style={{
                  animation: `poli-bounce-in 0.42s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09}s both`,
                  opacity: p.faded ? 0.4 : 1,
                  textDecoration: p.faded ? 'line-through' : 'none',
                  filter: p.faded ? 'grayscale(0.45)' : undefined,
                }}
              >
                {p.text && (
                  <span
                    className="grid place-items-center rounded-2xl border-4 border-ink-900/80 bg-white px-3 py-1 font-display text-4xl font-bold text-ink-900"
                    style={{ minWidth: '3.6rem' }}
                  >
                    {p.text}
                  </span>
                )}
                {p.icons && (
                  <div className="flex max-w-[22rem] flex-wrap items-center justify-center gap-1">
                    {p.icons.map((e, j) => (
                      <IconTile key={j} name={e} size={34} index={j} tiled={false} />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'shapes': {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {visual.shapes.map((s, i) => (
              <span key={i} style={{ animation: `poli-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.08}s both` }}>
                <ShapeView spec={s} />
              </span>
            ))}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'tenframe': {
      const filled = Math.max(0, Math.min(10, visual.filled))
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="rounded-3xl border-4 border-ink-900/85 bg-white p-2">
            <div className="grid grid-cols-5 gap-1">
              {Array.from({ length: 10 }, (_, i) => {
                const isOn = i < filled
                return (
                  <span
                    key={i}
                    className="grid place-items-center rounded-xl border-[3px] border-ink-900/30"
                    style={{ width: 46, height: 46, background: isOn ? '#ffd166' : 'rgba(43,33,64,0.06)' }}
                  >
                    {isOn && (
                      <span style={{ animation: `poli-blossom 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s both` }}>
                        <Icon name="redBall" size={30} />
                      </span>
                    )}
                  </span>
                )
              })}
            </div>
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'word': {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-2">
            {visual.words.map((w, i) => (
              <span
                key={i}
                className="grid place-items-center rounded-2xl border-4 border-ink-900/85 bg-gradient-to-b from-sun-200 to-sun-400 px-4 py-2 font-display text-4xl font-bold tracking-wide text-ink-900"
                style={{ animation: `poli-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.09}s both` }}
              >
                {w}
              </span>
            ))}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    case 'story': {
      return (
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {visual.frames.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 rounded-3xl border-4 border-ink-900/80 bg-white px-4 py-3"
                style={{ animation: `poli-slide-up 0.45s cubic-bezier(0.22,1.2,0.36,1) ${i * 0.11}s both` }}
              >
                <Icon name={f.icon} size={58} />
                {f.caption && !hideCaptions && (
                  <span className="font-display text-base text-ink-600">{f.caption}</span>
                )}
              </div>
            ))}
          </div>
          {visual.caption && !hideCaptions && (
            <span className="font-display text-lg text-ink-600">{visual.caption}</span>
          )}
        </div>
      )
    }

    default:
      return null
  }
}
