import { INK, P, Star, thin } from './parts'

/* ============================================================
   Coin — the currency kids earn by finishing lessons.
   Drawn like the rest of the kit: flat gold, ink outline.
   ============================================================ */
export const coin = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#f5c65c" {...P} />
    <circle cx="50" cy="52" r="26" fill="#fbe09a" {...thin} />
    <Star cx={50} cy={52} r={14} fill="#f5c65c" />
    <path d="M28 34l8-8" stroke="#fff6d9" strokeWidth="6" strokeLinecap="round" />
  </g>
)

/* Small accessories designed to sit on top of an avatar bubble. */

export const bow = () => (
  <g>
    <path d="M50 52Q30 30 18 40q-6 12 10 16-12 8-4 16 12 8 26-16z" fill="#e79db8" {...P} />
    <path d="M50 52q20-22 32-12 6 12-10 16 12 8 4 16-12 8-26-16z" fill="#e79db8" {...P} />
    <circle cx="50" cy="52" r="8" fill="#d97ba0" {...P} />
  </g>
)

export const bubbles = () => (
  <g>
    <circle cx="36" cy="40" r="16" fill="#b3dcf0" opacity="0.9" {...thin} />
    <circle cx="64" cy="30" r="10" fill="#d3eaf6" opacity="0.9" {...thin} />
    <circle cx="68" cy="58" r="14" fill="#b3dcf0" opacity="0.9" {...thin} />
    <circle cx="34" cy="68" r="9" fill="#d3eaf6" opacity="0.9" {...thin} />
    <path d="M28 32a10 10 0 0 1 8-6" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none" />
    <path d="M60 52a8 8 0 0 1 6-5" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" fill="none" />
  </g>
)

/** A little crown sized to perch on the avatar bubble. */
export const crownTiny = () => (
  <g>
    <path d="M20 74l-4-36 18 14 16-24 16 24 18-14-4 36z" fill="#f5c65c" {...P} />
    <circle cx="50" cy="34" r="5" fill="#e79db8" {...thin} />
  </g>
)

export const partyTiny = () => (
  <g>
    <path d="M50 12L76 78H24z" fill="#e79db8" {...P} />
    <path d="M38 46h24M32 62h36" stroke="#fff6d9" strokeWidth="5" strokeLinecap="round" />
    <circle cx="50" cy="10" r="6" fill="#f5c65c" {...P} />
  </g>
)

export const capTiny = () => (
  <g>
    <path d="M22 56q0-30 28-30t28 30z" fill="#5ea6c9" {...P} />
    <path d="M78 56q22 0 24 10H50v-10z" fill="#4a86a8" {...P} />
    <circle cx="50" cy="22" r="5" fill="#f5c65c" {...thin} />
  </g>
)

export const scarfTiny = () => (
  <g>
    <path d="M18 40q32 16 64 0-2 18-10 20-22 8-44 0-8-2-10-20z" fill="#e79db8" {...P} />
    <path d="M40 58l-4 30h18l-2-26z" fill="#d97ba0" {...P} />
    <path d="M26 48h48" stroke="#fceff4" strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const glassesTiny = () => (
  <g>
    <path d="M14 38h72" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M22 40h24l-3 14q-14 4-20-4-3-5-1-10z" fill="#34343e" {...P} />
    <path d="M78 40H54l3 14q14 4 20-4 3-5 1-10z" fill="#34343e" {...P} />
    <path d="M30 46l6 4" stroke="#aab0bd" strokeWidth="4" strokeLinecap="round" />
  </g>
)

export { INK }
