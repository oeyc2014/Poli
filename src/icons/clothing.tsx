/* ============================================================
   Clothes and things you eat or drink when it is hot or cold.
   ============================================================ */
import { INK, P, thin } from './parts'

export const coat = () => (
  <g>
    <path d="M30 22l20-8 20 8 18 12-10 16-6-4v42H28V46l-6 4-10-16z" fill="#ff7a59" {...P} />
    <path d="M50 14v74" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <path d="M38 22l12 12 12-12" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g fill="#ffc93c" stroke={INK} strokeWidth="3">
      <circle cx="50" cy="46" r="4" />
      <circle cx="50" cy="62" r="4" />
    </g>
    <rect x="34" y="70" width="14" height="10" rx="3" fill="#dd3216" {...thin} />
    <rect x="52" y="70" width="14" height="10" rx="3" fill="#dd3216" {...thin} />
  </g>
)

export const shorts = () => (
  <g>
    <path d="M24 24h52v20H24z" fill="#33c4ff" {...P} />
    <path d="M24 44h22v40H28a4 4 0 0 1-4-4z" fill="#33c4ff" {...P} />
    <path d="M54 44h22v36a4 4 0 0 1-4 4H54z" fill="#33c4ff" {...P} />
    <path d="M24 30h52" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <path d="M46 44h8" stroke={INK} strokeWidth="4" />
  </g>
)

export const swimsuit = () => (
  <g>
    <path d="M32 22q18 8 36 0l6 14q-10 8-2 18-8 22-22 22T28 54q8-10-2-18z" fill="#ff5fa2" {...P} />
    <path d="M40 40q10 8 20 0" fill="none" stroke="#c01d61" strokeWidth="4" strokeLinecap="round" />
    <g stroke="#fff6d6" strokeWidth="4" strokeLinecap="round">
      <path d="M34 62q8 6 16 0M52 62q8 6 16 0" />
    </g>
  </g>
)

export const sunglasses = () => (
  <g>
    <path d="M14 34h72" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M22 34q28-6 56 0" fill="none" stroke={INK} strokeWidth="5" />
    <path d="M20 34h26l-4 18q-16 4-22-6-2-6 0-12z" fill="#33c4ff" {...P} />
    <path d="M80 34H54l4 18q16 4 22-6 2-6 0-12z" fill="#33c4ff" {...P} />
    <path d="M32 42l8 6" stroke="#ddf4ff" strokeWidth="5" strokeLinecap="round" />
    <path d="M68 42l-8 6" stroke="#ddf4ff" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const mitten = () => (
  <g>
    <path d="M34 30h32v14h-32z" fill="#ff5fa2" {...P} />
    <path d="M34 44h32v26a14 14 0 0 1-14 14h-4a14 14 0 0 1-14-14z" fill="#ff5fa2" {...P} />
    <path d="M66 46q14-4 14 6t-14 8z" fill="#ff9ec7" {...P} />
    <path d="M34 36h32" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g stroke="#fff6d6" strokeWidth="4" strokeLinecap="round">
      <path d="M44 58v20M56 58v20M50 58v20" />
    </g>
  </g>
)

export const scarf = () => (
  <g>
    <path d="M22 26q28 14 56 0 6 16-4 22-24 10-48 0-10-6-4-22z" fill="#9b5cff" {...P} />
    <path d="M40 46l-6 42h16l-2-30z" fill="#9b5cff" {...P} />
    <g stroke="#ddc9ff" strokeWidth="4" strokeLinecap="round">
      <path d="M38 62h10M38 74h10M38 86h10" />
    </g>
    <g stroke="#ffc93c" strokeWidth="5" strokeLinecap="round">
      <path d="M36 44l-4 10M50 48v10M64 44l4 10" />
    </g>
  </g>
)

export const hotDrink = () => (
  <g>
    <path d="M22 36h44v36a14 14 0 0 1-14 14H36a14 14 0 0 1-14-14z" fill="#ff7a59" {...P} />
    <path d="M66 44h10a10 10 0 0 1 0 22h-10" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <ellipse cx="44" cy="36" rx="22" ry="7" fill="#8b5a3c" {...thin} />
    <g stroke="#e9e4f5" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M36 26q6-8 0-14M50 24q6-8 0-14" />
    </g>
  </g>
)

export const soup = () => (
  <g>
    <path d="M12 44h76q0 34-38 34T12 44z" fill="#ff5a3c" {...P} />
    <ellipse cx="50" cy="44" rx="38" ry="10" fill="#ffa928" {...P} />
    <g fill="#ffc93c">
      <circle cx="38" cy="42" r="4" />
      <circle cx="58" cy="48" r="4" />
      <circle cx="50" cy="36" r="4" />
    </g>
    <g stroke="#e9e4f5" strokeWidth="5" strokeLinecap="round" fill="none">
      <path d="M34 30q6-8 0-14M52 28q6-8 0-14" />
    </g>
  </g>
)
