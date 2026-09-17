/* ============================================================
   Everyday objects — vehicles, furniture, toys and tools.
   ============================================================ */
import { Gloss, INK, P, Smile, Star, thin } from './parts'

export const balloon = () => (
  <g>
    <path d="M50 12q26 0 26 28t-26 32q-26-4-26-32T50 12z" fill="#ff5fa2" {...P} />
    <path d="M50 72l-6 8h12z" fill="#c01d61" {...thin} />
    <path d="M50 80q6 8-2 12t2 8" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
    <Gloss cx={38} cy={32} rx={8} ry={11} o={0.5} rotate={-16} />
  </g>
)

export const rocket = () => (
  <g>
    <path d="M50 8q18 18 18 44H32q0-26 18-44z" fill="#ffffff" {...P} />
    <path d="M50 8q10 12 12 26H38q2-14 12-26z" fill="#ff5a3c" />
    <circle cx="50" cy="42" r="8" fill="#33c4ff" {...thin} />
    <path d="M32 44L18 62l14-2zM68 44l14 18-14-2z" fill="#ff5a3c" {...P} />
    <path d="M42 54h16l-8 14z" fill="#b9b3c9" {...thin} />
    <path d="M42 66q-6 12 8 22 14-10 8-22z" fill="#ffc93c" {...P} />
  </g>
)

export const car = () => (
  <g>
    <path d="M14 58l8-20q2-6 8-6h40q6 0 8 6l8 20z" fill="#ff5fa2" {...P} />
    <rect x="8" y="56" width="84" height="20" rx="9" fill="#ec2e7c" {...P} />
    <path d="M30 34h14v16H24zM56 34h12l7 16H56z" fill="#b3e8ff" {...thin} />
    <g fill="#413364" stroke={INK} strokeWidth="3">
      <circle cx="28" cy="78" r="10" />
      <circle cx="72" cy="78" r="10" />
    </g>
    <g fill="#b9b3c9">
      <circle cx="28" cy="78" r="3.4" />
      <circle cx="72" cy="78" r="3.4" />
    </g>
  </g>
)

export const bus = () => (
  <g>
    <rect x="10" y="20" width="80" height="52" rx="10" fill="#ffc93c" {...P} />
    <rect x="10" y="48" width="80" height="6" fill={INK} />
    <g fill="#b3e8ff" stroke={INK} strokeWidth="3">
      <rect x="18" y="28" width="18" height="15" rx="3" />
      <rect x="41" y="28" width="18" height="15" rx="3" />
      <rect x="64" y="28" width="18" height="15" rx="3" />
    </g>
    <g fill="#413364" stroke={INK} strokeWidth="3">
      <circle cx="28" cy="76" r="9" />
      <circle cx="72" cy="76" r="9" />
    </g>
  </g>
)

export const bicycle = () => (
  <g>
    <g fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round">
      <circle cx="24" cy="66" r="17" />
      <circle cx="76" cy="66" r="17" />
      <path d="M24 66l18-30h16l18 30M42 36H30M50 36l10 30M60 44h14" />
    </g>
    <path d="M42 34h16" stroke="#ff5a3c" strokeWidth="7" strokeLinecap="round" />
    <path d="M72 26h12" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const chair = () => (
  <g>
    <rect x="26" y="12" width="12" height="46" rx="6" fill="#d9a065" {...P} />
    <rect x="26" y="48" width="52" height="12" rx="6" fill="#c2833f" {...P} />
    <rect x="66" y="12" width="12" height="46" rx="6" fill="#d9a065" {...P} />
    <g stroke="#8b5a3c" strokeWidth="6" strokeLinecap="round">
      <path d="M32 60v28M72 60v28" />
    </g>
  </g>
)

export const house = () => (
  <g>
    <path d="M50 10L96 48H72v42H28V48H4z" fill="#ff9ec7" {...P} />
    <path d="M50 10L90 44H10z" fill="#ff5a3c" {...P} />
    <rect x="40" y="60" width="20" height="30" rx="4" fill="#8b5a3c" {...thin} />
    <circle cx="55" cy="76" r="2.6" fill="#ffc93c" />
    <rect x="20" y="56" width="14" height="14" rx="3" fill="#b3e8ff" {...thin} />
    <rect x="66" y="56" width="14" height="14" rx="3" fill="#b3e8ff" {...thin} />
  </g>
)

export const bed = () => (
  <g>
    <rect x="8" y="54" width="84" height="22" rx="8" fill="#ff9ec7" {...P} />
    <rect x="8" y="34" width="20" height="42" rx="8" fill="#c2833f" {...P} />
    <rect x="72" y="42" width="20" height="34" rx="8" fill="#c2833f" {...P} />
    <path d="M34 52q0-14 14-14h30q14 0 14 14z" fill="#ffffff" {...thin} />
    <ellipse cx="44" cy="40" rx="12" ry="8" fill="#7ed8ff" {...thin} />
    <path d="M20 76v8M84 76v8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const bowl = () => (
  <g>
    <path d="M12 44h76q0 34-38 34T12 44z" fill="#33c4ff" {...P} />
    <path d="M18 50q32 10 64 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    <ellipse cx="50" cy="44" rx="38" ry="9" fill="#7ed8ff" {...P} />
  </g>
)

export const backpack = () => (
  <g>
    <path d="M22 40q0-24 28-24t28 24v42a8 8 0 0 1-8 8H30a8 8 0 0 1-8-8z" fill="#4f7fd6" {...P} />
    <path d="M50 16v-6" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M32 58h36v20a6 6 0 0 1-6 6H38a6 6 0 0 1-6-6z" fill="#ffc93c" {...thin} />
    <rect x="22" y="34" width="56" height="10" rx="5" fill="#3a63ad" {...thin} />
  </g>
)

export const tv = () => (
  <g>
    <rect x="8" y="20" width="84" height="58" rx="10" fill="#5a4a78" {...P} />
    <rect x="16" y="28" width="68" height="42" rx="6" fill="#b3e8ff" stroke={INK} strokeWidth="3" />
    <path d="M38 42l16 7-16 7z" fill="#ff5a3c" />
    <path d="M34 78v10M66 78v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const book = () => (
  <g>
    <rect x="18" y="14" width="64" height="72" rx="7" fill="#9b5cff" {...P} />
    <rect x="30" y="14" width="52" height="72" rx="7" fill="#f2ecff" {...P} />
    <g stroke="#b9b3c9" strokeWidth="4" strokeLinecap="round">
      <path d="M40 34h32M40 46h32M40 58h20" />
    </g>
  </g>
)

export const notebook = () => (
  <g>
    <rect x="20" y="12" width="60" height="76" rx="7" fill="#ffe066" {...P} />
    <g stroke="#b9b3c9" strokeWidth="3.4" strokeLinecap="round">
      <path d="M34 30h32M34 44h32M34 58h32M34 72h18" />
    </g>
    <g stroke="#ff7a59" strokeWidth="5" strokeLinecap="round">
      <path d="M28 20v60" />
    </g>
  </g>
)

export const map = () => (
  <g>
    <path d="M10 26l26-12 28 12 26-12v58l-26 12-28-12-26 12z" fill="#b0f5d3" {...P} />
    <path d="M36 14v58M64 26v58" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <path d="M42 46l10-8 12 6" fill="none" stroke="#ff5a3c" strokeWidth="4.5" strokeLinecap="round" strokeDasharray="2 7" />
    <circle cx="66" cy="60" r="6" fill="#ff5a3c" {...thin} />
  </g>
)

export const pencil = () => (
  <g>
    <path d="M62 8l30 30-56 56-30 6 6-30z" fill="#ffc93c" {...P} />
    <path d="M62 8l30 30-10 10-30-30z" fill="#ff7a59" {...P} />
    <path d="M12 94l6-30 24 24z" fill="#d9a065" {...P} />
    <path d="M12 94l4-14 10 10z" fill="#413364" {...thin} />
  </g>
)

export const shield = () => (
  <g>
    <path d="M50 8l36 14v28q0 26-36 42Q14 76 14 50V22z" fill="#9b5cff" {...P} />
    <path d="M50 20l24 10v20q0 18-24 30-24-12-24-30V30z" fill="#ddc9ff" />
  </g>
)

export const ball = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#ffffff" {...P} />
    <path d="M50 18v68M16 52h68" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.2" />
    <path d="M34 26q22 12 22 34 0 16-12 26" fill="none" stroke="#ff5a3c" strokeWidth="6" strokeLinecap="round" />
    <path d="M66 26Q44 38 44 60q0 16 12 26" fill="none" stroke="#33c4ff" strokeWidth="6" strokeLinecap="round" />
  </g>
)

export const basketball = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#ffa928" {...P} />
    <g stroke={INK} strokeWidth="4" fill="none">
      <path d="M50 18v68M16 52h68" />
      <path d="M28 26q26 22 8 54M72 26q-26 22-8 54" />
    </g>
  </g>
)

export const volleyball = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#ffffff" {...P} />
    <g stroke="#ff5fa2" strokeWidth="5" fill="none">
      <path d="M50 18v68M16 52h68" />
      <path d="M26 30q30 20 12 50M74 30q-30 20-12 50" />
    </g>
  </g>
)

export const key = () => (
  <g>
    <circle cx="32" cy="34" r="20" fill="#ffc93c" {...P} />
    <circle cx="32" cy="34" r="7" fill="#fff6d6" {...thin} />
    <path d="M42 48l34 34" stroke={INK} strokeWidth="12" strokeLinecap="round" />
    <path d="M42 48l34 34" stroke="#ffc93c" strokeWidth="7" strokeLinecap="round" />
    <path d="M64 70l-8 8M72 78l-8 8" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const spoon = () => (
  <g>
    <ellipse cx="50" cy="28" rx="17" ry="22" fill="#c3ccd8" {...P} />
    <ellipse cx="50" cy="28" rx="8" ry="12" fill="#e9e4f5" />
    <path d="M50 50v42" stroke={INK} strokeWidth="13" strokeLinecap="round" />
    <path d="M50 50v42" stroke="#c3ccd8" strokeWidth="8" strokeLinecap="round" />
  </g>
)

export const boat = () => (
  <g>
    <path d="M50 12l10 46H40z" fill="#ffffff" {...P} />
    <path d="M54 26l24 32H54z" fill="#ff5a3c" {...P} />
    <path d="M46 26L22 58h24z" fill="#99e5ff" {...P} />
    <path d="M10 58h80l-12 22H22z" fill="#8b5a3c" {...P} />
    <path d="M4 88q10-6 20 0t20 0 20 0 20 0" fill="none" stroke="#33c4ff" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const hammer = () => (
  <g>
    <rect x="20" y="14" width="46" height="20" rx="6" fill="#8fa3bf" {...P} />
    <path d="M66 18l18 6-4 14-16-6z" fill="#6b7d99" {...P} />
    <rect x="44" y="32" width="12" height="54" rx="6" fill="#d9a065" {...P} />
  </g>
)

export const lifeRing = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#ff7a59" {...P} />
    <circle cx="50" cy="52" r="16" fill="#ffffff" {...P} />
    <g fill="#ffffff" stroke={INK} strokeWidth="3.4">
      <rect x="42" y="16" width="16" height="16" rx="4" />
      <rect x="42" y="72" width="16" height="16" rx="4" />
      <rect x="14" y="44" width="16" height="16" rx="4" />
      <rect x="70" y="44" width="16" height="16" rx="4" />
    </g>
  </g>
)

export const magnifier = () => (
  <g>
    <circle cx="42" cy="42" r="28" fill="#ddf4ff" {...P} />
    <circle cx="42" cy="42" r="20" fill="#b3e8ff" opacity="0.7" />
    <path d="M62 62l26 26" stroke={INK} strokeWidth="14" strokeLinecap="round" />
    <path d="M62 62l26 26" stroke="#9b5cff" strokeWidth="8" strokeLinecap="round" />
    <path d="M30 30q8-8 18-4" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const brick = () => (
  <g>
    <rect x="10" y="20" width="80" height="24" rx="5" fill="#ff7a59" {...P} />
    <rect x="10" y="42" width="38" height="24" rx="5" fill="#dd3216" {...P} />
    <rect x="52" y="42" width="38" height="24" rx="5" fill="#ff7a59" {...P} />
    <rect x="10" y="64" width="80" height="24" rx="5" fill="#ff7a59" {...P} />
    <path d="M10 32h80" stroke={INK} strokeWidth="3.4" opacity="0.3" />
  </g>
)

export const abacus = () => (
  <g>
    <rect x="12" y="14" width="76" height="72" rx="8" fill="#d9a065" {...P} />
    <g stroke={INK} strokeWidth="3.4">
      <path d="M12 38h76M12 62h76" />
    </g>
    <g stroke={INK} strokeWidth="4">
      <path d="M30 16v68M50 16v68M70 16v68" />
    </g>
    <g fill="#ff5a3c" stroke={INK} strokeWidth="3">
      <circle cx="24" cy="26" r="8" />
      <circle cx="44" cy="26" r="8" />
      <circle cx="64" cy="26" r="8" />
    </g>
    <g fill="#33c4ff" stroke={INK} strokeWidth="3">
      <circle cx="36" cy="50" r="8" />
      <circle cx="56" cy="50" r="8" />
      <circle cx="76" cy="50" r="8" />
    </g>
  </g>
)

export const puzzle = () => (
  <g>
    <path
      d="M16 16h26a10 10 0 1 0 16 0h26v26a10 10 0 1 0 0 16v26H58a10 10 0 1 0-16 0H16V58a10 10 0 1 0 0-16z"
      fill="#9b5cff"
      {...P}
    />
    <path d="M16 16h26v20H16z" fill="#ddc9ff" opacity="0.55" />
  </g>
)

export const kite = () => (
  <g>
    <path d="M50 6l28 30-28 34L22 36z" fill="#ff5fa2" {...P} />
    <path d="M50 6v64M22 36h56" stroke={INK} strokeWidth="3.4" opacity="0.45" />
    <path d="M50 70q8 10-2 14t2 10" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
  </g>
)

export const clock = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#ffffff" {...P} />
    <circle cx="50" cy="52" r="29" fill="#fff6d6" />
    <g stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M50 30v22M50 52l16 8" />
    </g>
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M50 24v5M50 75v5M22 52h5M73 52h5" />
    </g>
    <circle cx="50" cy="52" r="4" fill={INK} />
  </g>
)

export const basket = () => (
  <g>
    <path d="M14 44h72l-8 40H22z" fill="#d9a065" {...P} />
    <g stroke="#8b5a3c" strokeWidth="3.4" strokeLinecap="round">
      <path d="M24 52v26M36 52v26M50 52v26M64 52v26M76 52v26" />
      <path d="M16 62h68M18 74h64" />
    </g>
    <path d="M28 44q0-22 22-22t22 22" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const gem = () => (
  <g>
    <path d="M50 8l34 26-34 58L16 34z" fill="#33c4ff" {...P} />
    <path d="M50 8l34 26H16z" fill="#7ed8ff" {...P} />
    <path d="M50 8v26M50 34L34 66M50 34l16 32" stroke={INK} strokeWidth="3.4" opacity="0.6" />
    <path d="M30 22l10-6" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const trophy = () => (
  <g>
    <path d="M28 12h44v22q0 26-22 26T28 34z" fill="#ffc93c" {...P} />
    <path d="M28 18H14v10q0 16 16 18" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M72 18h14v10q0 16-16 18" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <path d="M44 60h12v14H44z" fill="#ffc93c" {...P} />
    <path d="M30 74h40v12H30z" fill="#f28000" {...P} />
    <Star cx={50} cy={34} r={12} fill="#fff6d6" />
  </g>
)

export const medal = () => (
  <g>
    <path d="M30 8l20 30-14 6L22 22z" fill="#ff5fa2" {...P} />
    <path d="M70 8L50 38l14 6 14-22z" fill="#33c4ff" {...P} />
    <circle cx="50" cy="62" r="28" fill="#ffc93c" {...P} />
    <Star cx={50} cy={62} r={16} fill="#fff6d6" />
  </g>
)

export const crown = () => (
  <g>
    <path d="M12 34l14 20 24-32 24 32 14-20-6 46H18z" fill="#ffc93c" {...P} />
    <path d="M18 66h64v10H18z" fill="#f28000" />
    <g fill="#ff5a3c" stroke={INK} strokeWidth="3">
      <circle cx="32" cy="60" r="5" />
      <circle cx="50" cy="56" r="5" />
      <circle cx="68" cy="60" r="5" />
    </g>
  </g>
)

export const target = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#ff5a3c" {...P} />
    <circle cx="50" cy="52" r="24" fill="#ffffff" {...thin} />
    <circle cx="50" cy="52" r="12" fill="#ff5a3c" {...thin} />
    <circle cx="50" cy="52" r="4" fill={INK} />
  </g>
)

export const compass = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#ffe066" {...P} />
    <circle cx="50" cy="52" r="28" fill="#fff6d6" {...thin} />
    <path d="M64 34L44 60l-8-8z" fill="#ff5a3c" {...thin} />
    <path d="M36 70l20-26 8 8z" fill="#33c4ff" {...thin} />
    <circle cx="50" cy="52" r="4" fill={INK} />
  </g>
)

export const chart = () => (
  <g>
    <rect x="10" y="14" width="80" height="72" rx="10" fill="#ffffff" {...P} />
    <g fill="#34d399" stroke={INK} strokeWidth="3.4">
      <rect x="22" y="48" width="14" height="26" rx="4" />
      <rect x="43" y="34" width="14" height="40" rx="4" />
      <rect x="64" y="56" width="14" height="18" rx="4" />
    </g>
    <path d="M18 26h64" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.25" />
  </g>
)

export const lightbulb = () => (
  <g>
    <path d="M50 8a26 26 0 0 1 16 46v10H34V54A26 26 0 0 1 50 8z" fill="#ffe066" {...P} />
    <rect x="34" y="64" width="32" height="10" rx="4" fill="#c3ccd8" {...P} />
    <rect x="38" y="76" width="24" height="9" rx="4" fill="#9aa7b8" {...P} />
    <path d="M40 40q10-8 20 0" fill="none" stroke="#f28000" strokeWidth="4.5" strokeLinecap="round" />
    <g stroke="#ffc93c" strokeWidth="5" strokeLinecap="round">
      <path d="M50 0v-0M12 18l6 6M88 18l-6 6M50 46v8" />
    </g>
  </g>
)

export const flashlight = () => (
  <g>
    <path d="M24 14h52l-10 26v48a6 6 0 0 1-6 6H40a6 6 0 0 1-6-6V40z" fill="#ffc93c" {...P} />
    <path d="M24 14h52l-4 10H28z" fill="#ff7a59" {...thin} />
    <path d="M34 26l18 0" stroke="#fff6d6" strokeWidth="6" strokeLinecap="round" />
    <path d="M40 74h20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g stroke="#ffe066" strokeWidth="5" strokeLinecap="round">
      <path d="M50 8V0M22 10l-5-6M78 10l5-6" />
    </g>
  </g>
)

export const candle = () => (
  <g>
    <rect x="34" y="34" width="32" height="54" rx="7" fill="#fff6d6" {...P} />
    <g stroke="#ffc93c" strokeWidth="4" strokeLinecap="round">
      <path d="M40 46h6M54 46h6M40 60h6M54 60h6" />
    </g>
    <ellipse cx="50" cy="34" rx="16" ry="5" fill="#ffe066" {...thin} />
    <path d="M50 6q10 10 4 18-4 5-10 0-6-8 6-18z" fill="#ffa928" {...P} />
    <path d="M50 14q5 6 2 10-3 3-6 0-3-4 4-10z" fill="#ff5a3c" />
  </g>
)

export const phone = () => (
  <g>
    <rect x="24" y="6" width="52" height="88" rx="12" fill="#5a4a78" {...P} />
    <rect x="30" y="16" width="40" height="64" rx="6" fill="#b3e8ff" stroke={INK} strokeWidth="3.4" />
    <circle cx="50" cy="88" r="4" fill="#b9b3c9" />
    <g fill="#33c4ff">
      <rect x="36" y="24" width="28" height="6" rx="3" />
      <rect x="36" y="36" width="18" height="6" rx="3" />
    </g>
  </g>
)

export const musicNote = () => (
  <g>
    <path d="M42 62V22l34-8v40" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="34" cy="66" rx="14" ry="11" fill="#9b5cff" {...P} transform="rotate(-18 34 66)" />
    <ellipse cx="68" cy="56" rx="14" ry="11" fill="#9b5cff" {...P} transform="rotate(-18 68 56)" />
  </g>
)

export const headphones = () => (
  <g>
    <path d="M16 60V50a34 34 0 0 1 68 0v10" fill="none" stroke={INK} strokeWidth="9" strokeLinecap="round" />
    <rect x="6" y="52" width="22" height="34" rx="10" fill="#ff5fa2" {...P} />
    <rect x="72" y="52" width="22" height="34" rx="10" fill="#ff5fa2" {...P} />
  </g>
)

export const mic = () => (
  <g>
    <rect x="36" y="8" width="28" height="44" rx="14" fill="#5a4a78" {...P} />
    <g stroke={INK} strokeWidth="3.4" strokeLinecap="round">
      <path d="M42 22h16M42 32h16" />
    </g>
    <path d="M24 44v6a26 26 0 0 0 52 0v-6" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M50 76v16M32 92h36" stroke={INK} strokeWidth="6" strokeLinecap="round" />
  </g>
)

export const lock = () => (
  <g>
    <path d="M30 44V32a20 20 0 0 1 40 0v12" fill="none" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <rect x="18" y="42" width="64" height="50" rx="12" fill="#ffc93c" {...P} />
    <circle cx="50" cy="62" r="8" fill={INK} />
    <path d="M50 68v12" stroke={INK} strokeWidth="7" strokeLinecap="round" />
  </g>
)

export const hat = () => (
  <g>
    <path d="M22 40h56v34H22z" fill="#413364" {...P} />
    <path d="M10 74h80v10H10z" fill="#4a3d63" {...P} />
    <path d="M22 62h56v8H22z" fill="#ff5a3c" />
    <path d="M22 40h56v4H22z" fill="#ff5a3c" opacity="0.7" />
  </g>
)

export const candy = () => (
  <g>
    <circle cx="50" cy="52" r="24" fill="#ff5fa2" {...P} />
    <path d="M28 40L8 26l4 22-4 22 20-14z" fill="#ff9ec7" {...P} />
    <path d="M72 40l20-14-4 22 4 22-20-14z" fill="#ff9ec7" {...P} />
    <path d="M40 42q10 6 0 20" fill="none" stroke="#fff6d6" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 40q10 6 0 24" fill="none" stroke="#fff6d6" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const cube = () => (
  <g>
    <path d="M50 10l36 20v40L50 90 14 70V30z" fill="#ffc93c" {...P} />
    <path d="M50 10l36 20-36 20-36-20z" fill="#ffe066" {...P} />
    <path d="M50 50v40L14 70V30z" fill="#f28000" {...P} />
    <Smile x={50} y={58} w={9} depth={7} />
    <g fill={INK}>
      <circle cx="42" cy="40" r="3.4" />
      <circle cx="58" cy="40" r="3.4" />
    </g>
  </g>
)
