/* ============================================================
   Poli icon kit — shared drawing parts
   Every icon is drawn inside a 100 × 100 box with the same
   ingredients: a 5px ink outline, flat bright fills, rounded
   corners and a friendly face. Body types are generated from
   parameters so cats, dogs, foxes and bears all feel like they
   come from the same toy box.
   ============================================================ */
import type { ReactNode } from 'react'

export const INK = '#413364'
export const SW = 4

export const P = {
  stroke: INK,
  strokeWidth: SW,
  strokeLinejoin: 'round' as const,
  strokeLinecap: 'round' as const,
}

export const thin = { ...P, strokeWidth: 2.8 }
export const hair = { ...P, strokeWidth: 2.2 }

/* ------------------------------------------------------------
   Faces
   ------------------------------------------------------------ */

/** Two white eyes with BIG sparkly pupils — the friendly look. */
export function Eyes({
  x1 = 40,
  x2 = 60,
  y = 44,
  r = 8,
  look = 0,
  lookY = 1,
  dark,
}: {
  x1?: number
  x2?: number
  y?: number
  r?: number
  look?: number
  lookY?: number
  /** set for creatures painted white, where the sclera must be dark */
  dark?: boolean
}) {
  const sclera = dark ? INK : '#ffffff'
  const pupil = dark ? '#ffffff' : INK
  return (
    <g>
      <circle cx={x1} cy={y} r={r} fill={sclera} {...thin} />
      <circle cx={x2} cy={y} r={r} fill={sclera} {...thin} />
      <circle cx={x1 + look} cy={y + lookY} r={r * 0.62} fill={pupil} />
      <circle cx={x2 + look} cy={y + lookY} r={r * 0.62} fill={pupil} />
      <circle cx={x1 + look + r * 0.26} cy={y + lookY - r * 0.34} r={r * 0.2} fill={sclera} />
      <circle cx={x2 + look + r * 0.26} cy={y + lookY - r * 0.34} r={r * 0.2} fill={sclera} />
    </g>
  )
}

/** Simple solid dots — for very small or very simple creatures. */
export function DotEyes({ x1 = 40, x2 = 60, y = 44, r = 4.5, fill = INK }) {
  return (
    <g fill={fill}>
      <circle cx={x1} cy={y} r={r} />
      <circle cx={x2} cy={y} r={r} />
    </g>
  )
}

export function Smile({
  x = 50,
  y = 60,
  w = 11,
  depth = 8,
  stroke = INK,
  width = 4,
}: {
  x?: number
  y?: number
  w?: number
  depth?: number
  stroke?: string
  width?: number
}) {
  return (
    <path
      d={`M${x - w} ${y}q${w} ${depth} ${w * 2} 0`}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
    />
  )
}

export function Frown({ x = 50, y = 64, w = 9, lift = 7 }: { x?: number; y?: number; w?: number; lift?: number }) {
  return (
    <path d={`M${x - w} ${y}q${w} ${-lift} ${w * 2} 0`} fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  )
}

export function Blush({ x1 = 27, x2 = 73, y = 56, rx = 8, ry = 5, color = '#ff9ec7' }) {
  return (
    <g fill={color} opacity="0.62">
      <ellipse cx={x1} cy={y} rx={rx} ry={ry} />
      <ellipse cx={x2} cy={y} rx={rx} ry={ry} />
    </g>
  )
}

/** Soft white gloss blob used to make surfaces feel rounded. */
export function Gloss({ cx = 34, cy = 30, rx = 16, ry = 11, o = 0.5, rotate = -28 }) {
  return <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="#fff" opacity={o} transform={`rotate(${rotate} ${cx} ${cy})`} />
}

/* ------------------------------------------------------------
   Body generators
   ------------------------------------------------------------ */

export type EarKind = 'pointy' | 'round' | 'small' | 'floppy' | 'none'
export type TailKind = 'bushy' | 'curl' | 'thin' | 'none'

/**
 * Four-legged friend. One body, many animals — the colours,
 * ears, tail and extras decide whether it reads as a cat,
 * a fox, a bear or a cow.
 */
export function Quadruped({
  fur,
  furLight,
  ear = 'pointy',
  earInner = '#ff9ec7',
  tail = 'curl',
  tailColor,
  snout,
  snoutColor = '#fff6d6',
  nose = INK,
  belly,
  muzzle,
  faceOverlay,
  children,
  headCy = 36,
  headR = 23,
  eyeY = headCy + 5,
  eyeGap = 10,
  look = 0,
  earFill,
}: {
  fur: string
  furLight?: string
  ear?: EarKind
  earInner?: string
  tail?: TailKind
  tailColor?: string
  snout?: 'round' | 'long' | 'flat'
  snoutColor?: string
  nose?: string
  belly?: string
  /** drawn behind the head (manes, hoods) */
  muzzle?: ReactNode
  /** drawn on the head but underneath the eyes (panda patches, tiger stripes) */
  faceOverlay?: ReactNode
  children?: ReactNode
  headCy?: number
  headR?: number
  eyeY?: number
  eyeGap?: number
  look?: number
  /** overrides the ear colour (panda) */
  earFill?: string
}) {
  const tc = tailColor ?? fur
  return (
    <g>
      {/* tail behind the body */}
      {tail === 'bushy' && (
        <path d={`M78 74q16-4 14-20 10 16-2 26-6 5-12 2z`} fill={tc} {...P} />
      )}
      {tail === 'curl' && (
        <path d="M78 76q18 0 15-18-1-8-9-7 7 2 6 9-1 8-12 8z" fill={tc} {...P} />
      )}
      {tail === 'thin' && <path d="M78 74q16-2 18-18" fill="none" stroke={tc} strokeWidth="7" strokeLinecap="round" />}

      {/* legs */}
      <g fill={furLight ?? fur} stroke={INK} strokeWidth={SW} strokeLinejoin="round">
        <rect x="28" y="66" width="13" height="22" rx="6" />
        <rect x="59" y="66" width="13" height="22" rx="6" />
      </g>

      {/* body */}
      <ellipse cx="50" cy="62" rx="27" ry="22" fill={fur} {...P} />
      {belly && <ellipse cx="50" cy="67" rx="16" ry="14" fill={belly} />}

      {/* arms */}
      <g fill={furLight ?? fur} stroke={INK} strokeWidth={SW} strokeLinejoin="round">
        <rect x="20" y="52" width="11" height="18" rx="5.5" />
        <rect x="69" y="52" width="11" height="18" rx="5.5" />
      </g>

      {/* ears */}
      {ear === 'pointy' && (
        <g fill={fur} {...P}>
          <path d={`M${50 - headR + 3} ${headCy - 12}l-4-17 16 10z`} />
          <path d={`M${50 + headR - 3} ${headCy - 12}l4-17-16 10z`} />
        </g>
      )}
      {ear === 'round' && (
        <g fill={earFill ?? fur} {...P}>
          <circle cx={50 - headR + 5} cy={headCy - 15} r="9" />
          <circle cx={50 + headR - 5} cy={headCy - 15} r="9" />
        </g>
      )}
      {ear === 'small' && (
        <g fill={furLight ?? fur} {...P}>
          <circle cx={50 - headR + 2} cy={headCy - 16} r="7" />
          <circle cx={50 + headR - 2} cy={headCy - 16} r="7" />
        </g>
      )}
      {ear === 'floppy' && (
        <g fill={fur} stroke={INK} strokeWidth={SW} strokeLinejoin="round">
          <ellipse cx={50 - headR - 2} cy={headCy + 2} rx="8" ry="15" />
          <ellipse cx={50 + headR + 2} cy={headCy + 2} rx="8" ry="15" />
        </g>
      )}

      {/* head */}
      {muzzle}
      <circle cx="50" cy={headCy} r={headR} fill={fur} {...P} />
      {faceOverlay}

      {/* ear inners, drawn after the head so they read clearly */}
      {ear === 'pointy' && (
        <g fill={earInner}>
          <path d={`M${50 - headR + 5} ${headCy - 14}l-3-11 10 7z`} />
          <path d={`M${50 + headR - 5} ${headCy - 14}l3-11-10 7z`} />
        </g>
      )}

      {/* snout */}
      {snout === 'round' && <ellipse cx="50" cy={eyeY + 14} rx="14" ry="10" fill={snoutColor} {...thin} />}
      {snout === 'long' && (
        <g>
          <ellipse cx="50" cy={eyeY + 16} rx="12" ry="11" fill={snoutColor} {...thin} />
          <ellipse cx="50" cy={eyeY + 15} rx="5" ry="4" fill={nose} />
        </g>
      )}
      {snout === 'flat' && <ellipse cx="50" cy={eyeY + 13} rx="15" ry="9" fill={snoutColor} {...thin} />}

      <Eyes x1={50 - eyeGap} x2={50 + eyeGap} y={eyeY} r={7} look={look} />
      <Smile x={50} y={eyeY + (snout === 'flat' ? 20 : 15)} w={9} depth={6} />
      <Blush />
      {children}
      <Gloss cx={36} cy={headCy - 12} rx={9} ry={6} o={0.5} />
    </g>
  )
}

export type BirdKind = 'song' | 'hen' | 'rooster' | 'duck' | 'eagle' | 'chick' | 'penguin' | 'owl'

/** Bird family — songbird, chicken, duck, eagle, penguin and owl. */
export function Bird({
  kind = 'song',
  body,
  wing,
  beak = '#ffa928',
  belly = '#fff6d6',
  crest,
  eyeGap = 9,
  children,
}: {
  kind?: BirdKind
  body: string
  wing?: string
  beak?: string
  belly?: string
  crest?: string
  eyeGap?: number
  children?: ReactNode
}) {
  const w = wing ?? body
  return (
    <g>
      {/* tail feathers */}
      {(kind === 'song' || kind === 'rooster' || kind === 'eagle') && (
        <path d="M66 62l22-9-4 13 7 3-23 5z" fill={w} {...P} />
      )}
      {kind === 'hen' && <path d="M64 64l20-6-3 12 6 2-21 4z" fill={w} {...P} />}
      {kind === 'duck' && <path d="M64 60l18-12 3 14 8-2-12 14z" fill={w} {...P} />}

      {/* feet */}
      {kind === 'penguin' ? (
        <g fill={beak} {...P}>
          <ellipse cx="38" cy="88" rx="10" ry="6" />
          <ellipse cx="62" cy="88" rx="10" ry="6" />
        </g>
      ) : (
        <g stroke={beak} strokeWidth="5" strokeLinecap="round" fill="none">
          <path d="M40 82v8M36 90h8M40 90l-4 4M40 90l4 4" />
          <path d="M60 82v8M56 90h8M60 90l-4 4M60 90l4 4" />
        </g>
      )}

      {/* body */}
      {kind === 'penguin' ? (
        <ellipse cx="50" cy="58" rx="30" ry="32" fill={body} {...P} />
      ) : (
        <ellipse cx="50" cy="58" rx="27" ry="28" fill={body} {...P} />
      )}

      {/* belly */}
      <ellipse cx="50" cy="64" rx={kind === 'penguin' ? 19 : 16} ry={kind === 'penguin' ? 21 : 17} fill={belly} />

      {/* wing */}
      <ellipse cx={kind === 'penguin' ? 24 : 26} cy="60" rx="9" ry="17" fill={w} {...thin} />

      {/* crest / comb / horn */}
      {kind === 'rooster' && (
        <path d="M42 24q4-10 9-3 5-8 9 2 4-6 6 4z" fill="#ff5a3c" {...P} />
      )}
      {kind === 'hen' && <path d="M44 26q5-9 10 0 5-7 7 3z" fill="#ff5a3c" {...P} />}
      {kind === 'chick' && <path d="M46 26q4-8 8 0z" fill={crest ?? '#ffc93c'} {...thin} />}
      {kind === 'eagle' && <path d="M38 30l12-14 12 14z" fill={crest ?? '#fff'} {...thin} />}

      {/* head */}
      <circle cx="50" cy={kind === 'duck' ? 30 : 33} r={kind === 'owl' ? 25 : 21} fill={body} {...P} />

      {/* beak */}
      {kind === 'duck' ? (
        <g>
          <ellipse cx="50" cy="49" rx="14" ry="7" fill={beak} {...thin} />
          <path d="M38 49h24" {...hair} />
        </g>
      ) : (
        <path d="M50 42l8 8-8 7-8-7z" fill={beak} {...thin} />
      )}

      {/* eyes — owls get the big round goggles */}
      {kind === 'owl' ? (
        <g>
          <circle cx={50 - eyeGap - 3} cy="34" r="11" fill="#fff" {...thin} />
          <circle cx={50 + eyeGap + 3} cy="34" r="11" fill="#fff" {...thin} />
          <circle cx={50 - eyeGap - 3} cy="35" r="5" fill={INK} />
          <circle cx={50 + eyeGap + 3} cy="35" r="5" fill={INK} />
        </g>
      ) : (
        <Eyes x1={50 - eyeGap} x2={50 + eyeGap} y={kind === 'duck' ? 31 : 34} r={6.5} look={0} lookY={0.8} />
      )}

      {children}
      <Gloss cx={38} cy={22} rx={9} ry={6} o={0.5} />
    </g>
  )
}

export type BugKind = 'bee' | 'ladybug' | 'butterfly' | 'ant' | 'worm' | 'caterpillar'

/** Little crawlers and fliers. */
export function Bug({
  kind = 'bee',
  body,
  accent = INK,
  wing = '#ddf4ff',
  children,
}: {
  kind?: BugKind
  body: string
  accent?: string
  wing?: string
  children?: ReactNode
}) {
  if (kind === 'butterfly') {
    return (
      <g>
        <path d="M48 50Q20 24 16 42q-4 20 30 14z" fill={body} {...P} />
        <path d="M52 50q28-26 32-8 4 20-30 14z" fill={body} {...P} />
        <path d="M48 54Q26 66 22 78q6 12 26-18z" fill={accent} {...P} />
        <path d="M52 54q22 12 26 24-6 12-26-18z" fill={accent} {...P} />
        <ellipse cx="50" cy="55" rx="5" ry="18" fill={accent} {...thin} />
        <path d="M46 40q-8-12-14-14M54 40q8-12 14-14" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <DotEyes x1={47} x2={53} y={37} r={3} />
        <Smile x={50} y={43} w={4} depth={3} width={2.6} />
      </g>
    )
  }

  if (kind === 'worm') {
    return (
      <g>
        <path d="M18 74q10-12 22-4t22-4" fill="none" stroke={body} strokeWidth="17" strokeLinecap="round" />
        <path d="M18 74q10-12 22-4t22-4" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 9" />
        <DotEyes x1={72} x2={82} y={62} r={3.4} />
        <Smile x={77} y={69} w={5} depth={4} width={2.6} />
      </g>
    )
  }

  if (kind === 'caterpillar') {
    return (
      <g>
        <circle cx="22" cy="66" r="11" fill={body} {...P} />
        <circle cx="42" cy="70" r="11" fill={accent} {...P} />
        <circle cx="62" cy="66" r="11" fill={body} {...P} />
        <circle cx="80" cy="58" r="13" fill={body} {...P} />
        <path d="M76 46q-6-10-12-11M84 46q6-10 12-11" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
        <DotEyes x1={75} x2={85} y={58} r={3.4} />
        <Smile x={80} y={65} w={5} depth={4} width={2.6} />
        <g stroke={INK} strokeWidth="3" strokeLinecap="round">
          <path d="M22 76v6M42 80v6M62 76v6" />
        </g>
      </g>
    )
  }

  if (kind === 'ant') {
    return (
      <g>
        <circle cx="26" cy="62" r="10" fill={body} {...P} />
        <circle cx="45" cy="58" r="8" fill={body} {...P} />
        <circle cx="63" cy="54" r="11" fill={accent} {...P} />
        <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
          <path d="M26 72l-6 10M26 72l2 12M26 72l10 9M45 66l-8 12M45 66l6 12M45 66l14 8" />
          <path d="M58 44q-8-10-14-9M68 44q8-10 14-9" />
        </g>
        <DotEyes x1={59} x2={68} y={53} r={3} />
        <Smile x={63} y={59} w={4} depth={3} width={2.4} />
      </g>
    )
  }

  /* bee and ladybug share a striped bug body */
  const stripes = kind === 'bee' ? accent : INK
  return (
    <g>
      {/* wings */}
      <ellipse cx="34" cy="34" rx="13" ry="9" fill={wing} {...hair} transform="rotate(-24 34 34)" />
      <ellipse cx="66" cy="34" rx="13" ry="9" fill={wing} {...hair} transform="rotate(24 66 34)" />

      {/* legs */}
      <g stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none">
        <path d="M36 72l-6 8M50 76v8M64 72l6 8" />
      </g>

      {/* body */}
      <ellipse cx="50" cy="58" rx="27" ry="24" fill={body} {...P} />
      {kind === 'bee' ? (
        <g stroke={stripes} strokeWidth="8" fill="none">
          <path d="M36 42v32M50 38v40M64 42v32" />
        </g>
      ) : (
        <g fill={stripes}>
          <circle cx="38" cy="48" r="5" />
          <circle cx="62" cy="48" r="5" />
          <circle cx="50" cy="70" r="5" />
        </g>
      )}

      <Eyes x1={41} x2={59} y={54} r={7} look={0} lookY={0.8} />
      <Smile x={50} y={64} w={8} depth={5} />
      {children}
      <Gloss cx={36} cy={44} rx={9} ry={6} o={0.45} />
    </g>
  )
}

export type SeaKind = 'fish' | 'shark' | 'whale' | 'dolphin'

/** Things that swim. */
export function Sea({
  kind = 'fish',
  body,
  accent,
  fin,
  children,
}: {
  kind?: SeaKind
  body: string
  accent?: string
  fin?: string
  children?: ReactNode
}) {
  const f = fin ?? accent ?? body
  return (
    <g>
      {kind === 'dolphin' ? (
        <g>
          <path d="M20 58q14-26 40-24 20 2 22 18-2 16-22 18-26 2-40-12z" fill={body} {...P} />
          <path d="M84 52l10-12 2 16z" fill={f} {...P} />
          <path d="M50 34l8-14 6 12z" fill={f} {...P} />
        </g>
      ) : kind === 'whale' ? (
        <g>
          <path d="M14 58q6-26 36-26t38 20q-4 22-38 22T14 58z" fill={body} {...P} />
          <path d="M84 50q10-2 12-12 4 14-6 22-6 4-8-2z" fill={f} {...P} />
          <ellipse cx="40" cy="66" rx="22" ry="9" fill={accent ?? '#fff'} opacity="0.85" />
        </g>
      ) : (
        <g>
          {/* tail */}
          <path d="M12 50q0-0 8-14 2 12 8 14-6 2-8 14-8-14-8-14z" fill={f} {...P} />
          <path
            d={
              kind === 'shark'
                ? "M18 54q10-24 40-24t30 20q-16 18-46 16-16-2-24-12z"
                : "M22 52q10-22 38-22t32 22q-10 20-38 20T22 52z"
            }
            fill={body}
            {...P}
          />
          {kind === 'shark' && <path d="M52 30l10-16 8 14z" fill={f} {...P} />}
          <path d="M56 66q10 4 18 0" fill="none" stroke={accent ?? INK} strokeWidth="4" strokeLinecap="round" />
        </g>
      )}

      <Eyes
        x1={kind === 'dolphin' ? 58 : 40}
        x2={kind === 'dolphin' ? 72 : 56}
        y={kind === 'whale' ? 46 : kind === 'dolphin' ? 52 : 48}
        r={6}
        look={0}
        lookY={0.8}
      />
      <Smile x={kind === 'dolphin' ? 46 : 30} y={kind === 'whale' ? 60 : 62} w={7} depth={5} />
      {children}
      <Gloss cx={34} cy={44} rx={10} ry={5} o={0.4} rotate={-12} />
    </g>
  )
}

/* ------------------------------------------------------------
   Handy shapes
   ------------------------------------------------------------ */

export function Star({ cx = 50, cy = 52, r = 32, fill = '#ffc93c' }: { cx?: number; cy?: number; r?: number; fill?: string }) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const rad = i % 2 === 0 ? r : r * 0.45
    const a = (Math.PI / 5) * i - Math.PI / 2
    pts.push(`${cx + rad * Math.cos(a)},${cy + rad * Math.sin(a)}`)
  }
  return <polygon points={pts.join(' ')} fill={fill} {...P} />
}

export function Heart({ cx = 50, cy = 54, s = 1, fill = '#ff5fa2' }: { cx?: number; cy?: number; s?: number; fill?: string }) {
  return (
    <path
      d={`M${cx} ${cy + 26 * s}C${cx - 32 * s} ${cy + 4 * s} ${cx - 30 * s} ${cy - 20 * s} ${cx - 12 * s} ${cy - 20 * s}c${8 * s} 0 ${12 * s} ${5 * s} ${12 * s} ${10 * s} 0-${5 * s} ${4 * s}-${10 * s} ${12 * s}-${10 * s} ${18 * s} 0 ${20 * s} ${24 * s} ${12 * s} ${46 * s}z`}
      fill={fill}
      {...P}
    />
  )
}

/** A circle with a strong outline — the base of many icons. */
export function Ball({ cx = 50, cy = 52, r = 30, fill, children }: { cx?: number; cy?: number; r?: number; fill: string; children?: ReactNode }) {
  return (
    <g>
      <circle cx={cx} cy={cy} r={r} fill={fill} {...P} />
      {children}
    </g>
  )
}

/** Rounded rectangle helper. */
export function R({
  x,
  y,
  w,
  h,
  r = 8,
  fill,
  stroke = true,
}: {
  x: number
  y: number
  w: number
  h: number
  r?: number
  fill: string
  stroke?: boolean
}) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} {...(stroke ? P : {})} />
}
