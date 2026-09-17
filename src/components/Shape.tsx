import type { ShapeName, ShapeSpec } from '../types'

const COLORS = ['#ffc93c', '#33c4ff', '#34d399', '#ff5fa2', '#9b5cff', '#ff7a59']

function starPoints(cx: number, cy: number, outer: number, inner: number): string {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`)
  }
  return pts.join(' ')
}

function polyPoints(cx: number, cy: number, r: number, sides: number, rot = -Math.PI / 2): string {
  return Array.from({ length: sides }, (_, i) => {
    const a = rot + (i * 2 * Math.PI) / sides
    return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`
  }).join(' ')
}

export function ShapeView({ spec, size = 110 }: { spec: ShapeSpec; size?: number }) {
  const s = spec.size ?? size
  const fill = spec.color ?? COLORS[0]
  const stroke = 'rgba(43,33,64,0.92)'
  const c = 60
  const common = { fill, stroke, strokeWidth: 6, strokeLinejoin: 'round' as const }

  let body: React.ReactNode = null
  switch (spec.shape) {
    case 'circle':
      body = <circle cx={c} cy={c} r={46} {...common} />
      break
    case 'square':
      body = <rect x={c - 44} y={c - 44} width={88} height={88} rx={12} {...common} />
      break
    case 'rectangle':
      body = <rect x={c - 54} y={c - 30} width={108} height={60} rx={12} {...common} />
      break
    case 'oval':
      body = <ellipse cx={c} cy={c} rx={54} ry={34} {...common} />
      break
    case 'triangle':
      body = <polygon points={`${c},14 ${c + 50},106 ${c - 50},106`} {...common} />
      break
    case 'diamond':
      body = <polygon points={`${c},12 ${c + 48},${c} ${c},108 ${c - 48},${c}`} {...common} />
      break
    case 'hexagon':
      body = <polygon points={polyPoints(c, c, 52, 6)} {...common} />
      break
    case 'star':
      body = <polygon points={starPoints(c, c + 3, 54, 22)} {...common} />
      break
    case 'heart':
      body = (
        <path
          d="M60 106C24 82 12 62 12 46c0-18 12-30 28-30 10 0 17 5 20 12 3-7 10-12 20-12 16 0 28 12 28 30 0 16-12 36-48 60z"
          {...common}
        />
      )
      break
    default:
      body = <circle cx={c} cy={c} r={46} {...common} />
  }

  return (
    <svg viewBox="0 0 120 120" width={s} height={s} className={spec.rotated ? 'rotate-12' : ''} role="img" aria-label={spec.shape}>
      {body}
    </svg>
  )
}

export function shapeLabel(name: ShapeName): string {
  return name.charAt(0).toUpperCase() + name.slice(1)
}

export { COLORS as SHAPE_COLORS }
