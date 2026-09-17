/* ============================================================
   Interface icons.
   These use currentColor so one icon works on a white button,
   a purple button or a yellow badge without any extra props.
   ============================================================ */

type Props = { color?: string }

export const gear = ({ color = 'currentColor' }: Props) => (
  <g stroke={color} strokeWidth="7" fill="none" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="50" cy="52" r="15" />
    <path d="M50 8v12M50 84v12M14 52H2M98 52H86M24 22l8 9M76 82l-8-9M76 22l-8 9M24 82l8-9" />
  </g>
)

export const bell = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <path d="M50 6a8 8 0 0 1 8 8v2a26 26 0 0 1 18 25v16l6 10H18l6-10V41a26 26 0 0 1 18-25v-2a8 8 0 0 1 8-8z" />
    <path d="M38 74h24a12 12 0 0 1-24 0z" />
  </g>
)

export const bellOff = ({ color = 'currentColor' }: Props) => (
  <g>
    <g fill={color} opacity="0.38">
      <path d="M50 6a8 8 0 0 1 8 8v2a26 26 0 0 1 18 25v16l6 10H18l6-10V41a26 26 0 0 1 18-25v-2a8 8 0 0 1 8-8z" />
      <path d="M38 74h24a12 12 0 0 1-24 0z" />
    </g>
    <path d="M16 16l68 68" stroke={color} strokeWidth="9" strokeLinecap="round" />
  </g>
)

export const speaker = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <path d="M14 36h16l22-20v72L30 68H14z" />
    <g fill="none" stroke={color} strokeWidth="7" strokeLinecap="round">
      <path d="M66 36q12 16 0 32M80 24q20 28 0 56" />
    </g>
  </g>
)

export const speakerOff = ({ color = 'currentColor' }: Props) => (
  <g>
    <path d="M14 36h16l22-20v72L30 68H14z" fill={color} />
    <path d="M68 38l24 28M92 38L68 66" stroke={color} strokeWidth="8" strokeLinecap="round" />
  </g>
)

export const bulb = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <path d="M50 6a28 28 0 0 1 16 51v9H34v-9A28 28 0 0 1 50 6z" />
    <rect x="34" y="70" width="32" height="10" rx="4" />
    <rect x="39" y="84" width="22" height="9" rx="4" />
  </g>
)

export const check = ({ color = 'currentColor' }: Props) => (
  <path d="M16 54l22 22 46-50" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" strokeLinejoin="round" />
)

export const cross = ({ color = 'currentColor' }: Props) => (
  <path d="M22 22l56 56M78 22L22 78" fill="none" stroke={color} strokeWidth="14" strokeLinecap="round" />
)

export const play = ({ color = 'currentColor' }: Props) => (
  <path d="M26 14l56 38-56 38z" fill={color} />
)

export const pause = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <rect x="22" y="14" width="18" height="72" rx="7" />
    <rect x="60" y="14" width="18" height="72" rx="7" />
  </g>
)

export const back = ({ color = 'currentColor' }: Props) => (
  <path d="M60 16L26 50l34 34" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
)

export const next = ({ color = 'currentColor' }: Props) => (
  <path d="M40 16l34 34-34 34" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
)

export const up = ({ color = 'currentColor' }: Props) => (
  <path d="M50 84V22M24 48l26-26 26 26" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
)

export const close = ({ color = 'currentColor' }: Props) => (
  <path d="M26 26l48 48M74 26L26 74" fill="none" stroke={color} strokeWidth="12" strokeLinecap="round" />
)

export const plus = ({ color = 'currentColor' }: Props) => (
  <path d="M50 20v64M18 52h64" fill="none" stroke={color} strokeWidth="13" strokeLinecap="round" />
)

export const flame = ({ color = 'currentColor' }: Props) => (
  <path
    d="M50 4q22 24 22 42a22 22 0 0 1-44 0q0-11 7-20-2 11 4 15-4-20 11-37z"
    fill={color}
  />
)

export const hand = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <rect x="20" y="40" width="12" height="34" rx="6" />
    <rect x="34" y="26" width="12" height="48" rx="6" />
    <rect x="48" y="20" width="12" height="54" rx="6" />
    <rect x="62" y="32" width="12" height="42" rx="6" />
    <path d="M20 62q0 30 27 30t30-30q0-10-8-8-6 2-6 10-4-16-10-14-6 2-4 12-4-10-10-8-4 2-4 10-3-8-9-6-6 2-6 4z" />
  </g>
)

export const heart = ({ color = 'currentColor' }: Props) => (
  <path
    d="M50 88C16 66 6 50 6 36a22 22 0 0 1 44-8 22 22 0 0 1 44 8c0 14-10 30-44 52z"
    fill={color}
  />
)

export const calendar = ({ color = 'currentColor' }: Props) => (
  <g>
    <rect x="8" y="18" width="84" height="72" rx="12" fill="none" stroke={color} strokeWidth="8" />
    <path d="M8 42h84" stroke={color} strokeWidth="8" />
    <path d="M28 8v18M72 8v18" stroke={color} strokeWidth="9" strokeLinecap="round" />
    <g fill={color}>
      <circle cx="30" cy="58" r="5" />
      <circle cx="50" cy="58" r="5" />
      <circle cx="70" cy="58" r="5" />
      <circle cx="30" cy="74" r="5" />
      <circle cx="50" cy="74" r="5" />
    </g>
  </g>
)

export const trash = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <rect x="18" y="28" width="64" height="66" rx="10" />
    <rect x="10" y="16" width="80" height="12" rx="6" />
    <rect x="38" y="6" width="24" height="10" rx="5" />
  </g>
)

export const refresh = ({ color = 'currentColor' }: Props) => (
  <g fill="none" stroke={color} strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
    <path d="M84 50a34 34 0 1 1-11-25" />
    <path d="M86 12v22H64" />
  </g>
)

export const person = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <circle cx="50" cy="30" r="19" />
    <path d="M12 92q0-30 38-30t38 30z" />
  </g>
)

export const smiley = ({ color = 'currentColor' }: Props) => (
  <g>
    <circle cx="50" cy="52" r="40" fill="none" stroke={color} strokeWidth="9" />
    <g fill={color}>
      <circle cx="36" cy="40" r="6" />
      <circle cx="64" cy="40" r="6" />
    </g>
    <path d="M30 62q20 18 40 0" fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
  </g>
)

export const search = ({ color = 'currentColor' }: Props) => (
  <g>
    <circle cx="42" cy="42" r="28" fill="none" stroke={color} strokeWidth="11" />
    <path d="M64 64l24 24" stroke={color} strokeWidth="13" strokeLinecap="round" />
  </g>
)

export const dots = ({ color = 'currentColor' }: Props) => (
  <g fill={color}>
    <circle cx="22" cy="52" r="9" />
    <circle cx="50" cy="52" r="9" />
    <circle cx="78" cy="52" r="9" />
  </g>
)

