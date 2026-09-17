/* ============================================================
   Symbols, subject badges and the coloured counters that the
   sorting and counting lessons need.
   ============================================================ */
import { Gloss, INK, P, Smile, Star, thin } from './parts'

/* ---------------- party / rewards ---------------- */

export const party = () => (
  <g>
    <path d="M14 88L40 30l30 30z" fill="#ff5fa2" {...P} />
    <path d="M26 60l20 20" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g fill="#ffc93c" stroke={INK} strokeWidth="3.4">
      <circle cx="62" cy="24" r="7" />
      <circle cx="84" cy="44" r="6" />
      <circle cx="76" cy="70" r="5" />
    </g>
    <g fill="#33c4ff" stroke={INK} strokeWidth="3.4">
      <rect x="72" y="14" width="12" height="12" rx="3" transform="rotate(20 78 20)" />
    </g>
  </g>
)

export const gift = () => (
  <g>
    <rect x="12" y="36" width="76" height="54" rx="8" fill="#9b5cff" {...P} />
    <rect x="42" y="36" width="16" height="54" fill="#ffc93c" />
    <rect x="8" y="24" width="84" height="16" rx="6" fill="#ffc93c" {...P} />
    <path d="M50 24Q34 24 32 12t14-2q6 6 4 14z" fill="#ff5fa2" {...P} />
    <path d="M50 24q16 0 18-12t-14-2q-6 6-4 14z" fill="#ff5fa2" {...P} />
  </g>
)

export const hundred = () => (
  <g>
    <circle cx="50" cy="52" r="38" fill="#ff5a3c" {...P} />
    <text x="50" y="70" textAnchor="middle" fontSize="40" fontWeight="700" fill="#ffffff" fontFamily="Baloo 2, Trebuchet MS, sans-serif">
      100
    </text>
  </g>
)

export const one = () => (
  <g>
    <circle cx="50" cy="52" r="38" fill="#33c4ff" {...P} />
    <text x="50" y="72" textAnchor="middle" fontSize="46" fontWeight="700" fill="#ffffff" fontFamily="Baloo 2, Trebuchet MS, sans-serif">
      1
    </text>
  </g>
)

export const numbers = () => (
  <g>
    <rect x="6" y="16" width="88" height="72" rx="14" fill="#ffc93c" {...P} />
    <g fill="#ffffff" stroke={INK} strokeWidth="3.6">
      <rect x="16" y="28" width="20" height="20" rx="5" />
      <rect x="40" y="28" width="20" height="20" rx="5" />
      <rect x="64" y="28" width="20" height="20" rx="5" />
      <rect x="16" y="56" width="20" height="20" rx="5" />
      <rect x="40" y="56" width="20" height="20" rx="5" />
      <rect x="64" y="56" width="20" height="20" rx="5" />
    </g>
    <g fill={INK} fontFamily="Baloo 2, Trebuchet MS, sans-serif" fontSize="14" fontWeight="700" textAnchor="middle">
      <text x="26" y="43">
        1
      </text>
      <text x="50" y="43">
        2
      </text>
      <text x="74" y="43">
        3
      </text>
      <text x="26" y="71">
        4
      </text>
      <text x="50" y="71">
        5
      </text>
      <text x="74" y="71">
        6
      </text>
    </g>
  </g>
)

export const ten = () => (
  <g>
    <circle cx="42" cy="52" r="34" fill="#9b5cff" {...P} />
    <circle cx="68" cy="52" r="26" fill="#ffc93c" {...P} />
    <text x="42" y="66" textAnchor="middle" fontSize="36" fontWeight="700" fill="#ffffff" fontFamily="Baloo 2, Trebuchet MS, sans-serif">
      1
    </text>
    <text x="68" y="64" textAnchor="middle" fontSize="32" fontWeight="700" fill={INK} fontFamily="Baloo 2, Trebuchet MS, sans-serif">
      0
    </text>
  </g>
)

export const abc = () => (
  <g>
    <rect x="6" y="18" width="88" height="68" rx="14" fill="#33c4ff" {...P} />
    <g fill="#ffffff" fontFamily="Baloo 2, Trebuchet MS, sans-serif" fontSize="30" fontWeight="700" textAnchor="middle">
      <text x="30" y="66">
        a
      </text>
      <text x="52" y="66">
        b
      </text>
      <text x="74" y="66">
        c
      </text>
    </g>
  </g>
)

export const capitalAbc = () => (
  <g>
    <rect x="6" y="18" width="88" height="68" rx="14" fill="#ff7a59" {...P} />
    <g fill="#ffffff" fontFamily="Baloo 2, Trebuchet MS, sans-serif" fontSize="30" fontWeight="700" textAnchor="middle">
      <text x="30" y="66">
        A
      </text>
      <text x="52" y="66">
        B
      </text>
      <text x="74" y="66">
        C
      </text>
    </g>
  </g>
)

export const minus = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#33c4ff" {...P} />
    <path d="M30 52h40" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" />
  </g>
)

export const plusBadge = () => (
  <g>
    <circle cx="50" cy="52" r="36" fill="#34d399" {...P} />
    <path d="M50 32v40M30 52h40" stroke="#ffffff" strokeWidth="11" strokeLinecap="round" />
  </g>
)

export const diamond = () => (
  <path d="M50 6l40 46-40 42L10 52z" fill="#33c4ff" {...P} />
)

export const downTriangle = () => (
  <path d="M50 88L10 24h80z" fill="#ff5fa2" {...P} />
)

export const microscope = () => (
  <g>
    <path d="M36 20h20v30H36z" fill="#8fa3bf" {...P} transform="rotate(18 46 35)" />
    <path d="M48 56l16 18" stroke={INK} strokeWidth="10" strokeLinecap="round" />
    <path d="M30 74h44a26 26 0 0 0-8-18" fill="none" stroke="#9b5cff" strokeWidth="8" strokeLinecap="round" />
    <rect x="16" y="82" width="68" height="10" rx="5" fill="#5a4a78" {...P} />
    <circle cx="60" cy="24" r="9" fill="#7ed8ff" {...P} />
  </g>
)

export const skip = () => (
  <g>
    <path d="M22 20l30 32-30 32z" fill="#9b5cff" {...P} />
    <path d="M56 20l30 32-30 32z" fill="#b98cff" {...P} />
  </g>
)

export const scale = () => (
  <g>
    <path d="M50 14v72" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M16 26h68" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M30 86h40" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <path d="M16 30L4 56h24z" fill="#ffc93c" {...thin} />
    <path d="M84 30L72 56h24z" fill="#33c4ff" {...thin} />
    <circle cx="50" cy="16" r="7" fill="#ff5a3c" {...thin} />
  </g>
)

export const endsWith = () => (
  <g>
    <path d="M28 20h44" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <path d="M50 20v56" stroke={INK} strokeWidth="8" strokeLinecap="round" />
    <path d="M50 76l-16 12M50 76l16 12" stroke="#ff5a3c" strokeWidth="8" strokeLinecap="round" />
  </g>
)

export const eyes = () => (
  <g>
    <ellipse cx="30" cy="52" rx="24" ry="28" fill="#ffffff" {...P} />
    <ellipse cx="72" cy="52" rx="24" ry="28" fill="#ffffff" {...P} />
    <circle cx="34" cy="54" r="12" fill={INK} />
    <circle cx="68" cy="54" r="12" fill={INK} />
    <circle cx="30" cy="48" r="4.4" fill="#ffffff" />
    <circle cx="64" cy="48" r="4.4" fill="#ffffff" />
  </g>
)

export const family = () => (
  <g>
    <circle cx="32" cy="34" r="13" fill="#ffc93c" {...P} />
    <path d="M14 82q0-24 18-24t18 24z" fill="#ff5fa2" {...P} />
    <circle cx="70" cy="38" r="10" fill="#33c4ff" {...P} />
    <path d="M56 82q0-20 14-20t14 20z" fill="#9b5cff" {...P} />
    <circle cx="50" cy="66" r="8" fill="#34d399" {...P} />
  </g>
)

export const clap = () => (
  <g fill="#ffc93c" stroke={INK} strokeWidth="4" strokeLinejoin="round">
    <path d="M22 40q-8 4-6 14l4 22q2 12 14 12h12q12 0 14-12l4-22q2-10-6-14-8-2-10 8-2-12-10-12t-10 12q-2-10-6-8z" />
  </g>
)

export const bathtub = () => (
  <g>
    <path d="M8 52h84v14a22 22 0 0 1-22 22H30A22 22 0 0 1 8 66z" fill="#ffffff" {...P} />
    <path d="M8 52h84v8H8z" fill="#33c4ff" />
    <path d="M24 52V26a12 12 0 0 1 24 0" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <g fill="#7ed8ff">
      <circle cx="42" cy="38" r="5" />
      <circle cx="58" cy="30" r="4" />
      <circle cx="72" cy="40" r="5.5" />
    </g>
  </g>
)

export const picture = () => (
  <g>
    <rect x="8" y="16" width="84" height="68" rx="10" fill="#ffffff" {...P} />
    <path d="M14 74l24-26 16 16 14-12 18 22z" fill="#34d399" {...thin} />
    <circle cx="34" cy="36" r="8" fill="#ffc93c" {...thin} />
  </g>
)

export const muscle = () => (
  <g>
    <path d="M20 30q22-14 36 4 12 16 24 14 10-2 10 10 0 16-20 20t-34-6Q20 60 20 30z" fill="#ff9ec7" {...P} />
    <path d="M34 40q14-4 22 8" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const school = () => (
  <g>
    <path d="M50 10l42 22-42 22L8 32z" fill="#ff5a3c" {...P} />
    <path d="M20 40v24q0 12 30 12t30-12V40" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <path d="M22 52v22a18 18 0 0 0 18 18h20" fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <rect x="74" y="36" width="8" height="24" rx="4" fill="#ffc93c" {...thin} />
    <path d="M78 62a8 8 0 0 0 0 16 8 8 0 0 0 0-16z" fill="#ffc93c" {...thin} />
  </g>
)

export const door = () => (
  <g>
    <rect x="20" y="10" width="60" height="84" rx="8" fill="#d9a065" {...P} />
    <rect x="30" y="22" width="40" height="30" rx="4" fill="#b3e8ff" {...thin} />
    <circle cx="66" cy="66" r="5" fill="#ffc93c" {...thin} />
  </g>
)

export const teddy = () => (
  <g>
    <circle cx="26" cy="28" r="13" fill="#d9a065" {...P} />
    <circle cx="74" cy="28" r="13" fill="#d9a065" {...P} />
    <circle cx="50" cy="40" r="24" fill="#eab27d" {...P} />
    <ellipse cx="50" cy="78" rx="26" ry="22" fill="#eab27d" {...P} />
    <g fill={INK}>
      <circle cx="42" cy="36" r="3.4" />
      <circle cx="58" cy="36" r="3.4" />
    </g>
    <ellipse cx="50" cy="48" rx="11" ry="8" fill="#fff6d6" {...thin} />
    <ellipse cx="50" cy="44" rx="4" ry="3" fill={INK} />
    <Smile x={50} y={50} w={6} depth={4} width={3} />
  </g>
)

export const pumpkin = () => (
  <g>
    <ellipse cx="50" cy="56" rx="38" ry="32" fill="#ff7a59" {...P} />
    <ellipse cx="50" cy="56" rx="20" ry="32" fill="#ffa928" />
    <path d="M50 24v-8q0-10 10-10" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
    <g fill="#413364">
      <path d="M32 50l14 6-14 6z" />
      <path d="M68 50l-14 6 14 6z" />
    </g>
    <path d="M36 72q14 10 28 0-6 10-14 10t-14-10z" fill="#413364" />
  </g>
)

export const cocoon = () => (
  <g>
    <path d="M50 8q22 0 22 34t-22 50Q28 76 28 42T50 8z" fill="#7ce8a8" {...P} />
    <g stroke={INK} strokeWidth="3.4" strokeLinecap="round">
      <path d="M32 34h36M34 50h32M38 64h24" />
    </g>
    <path d="M50 8q8 20 0 42-8-22 0-42z" fill="#b0f5d3" opacity="0.6" />
  </g>
)

export const fireworks = () => (
  <g stroke={INK} strokeWidth="3.4">
    <g fill="#ff5fa2">
      <circle cx="50" cy="46" r="10" />
    </g>
    <g stroke="#ffc93c" strokeWidth="6" strokeLinecap="round">
      <path d="M50 22V6M50 70v16M26 46H10M74 46h16M33 29L22 18M67 29l11-11M33 63L22 74M67 63l11 11" />
    </g>
    <g fill="#33c4ff" stroke="none">
      <circle cx="50" cy="6" r="5" />
      <circle cx="10" cy="46" r="5" />
      <circle cx="90" cy="46" r="5" />
      <circle cx="50" cy="90" r="5" />
      <circle cx="22" cy="18" r="4" />
      <circle cx="78" cy="18" r="4" />
      <circle cx="22" cy="74" r="4" />
      <circle cx="78" cy="74" r="4" />
    </g>
  </g>
)

export const scissors = () => (
  <g>
    <g fill="none" stroke={INK} strokeWidth="6" strokeLinecap="round">
      <path d="M28 14l32 44M72 14L40 58" />
    </g>
    <circle cx="26" cy="76" r="14" fill="#ff5fa2" {...P} />
    <circle cx="74" cy="76" r="14" fill="#ff5fa2" {...P} />
    <circle cx="26" cy="76" r="4" fill="#ffffff" />
    <circle cx="74" cy="76" r="4" fill="#ffffff" />
  </g>
)

export const gamepad = () => (
  <g>
    <path d="M30 30h40q20 0 24 22 4 24-10 28-10 2-16-8l-4-6H36l-4 6q-6 10-16 8Q2 76 6 52q4-22 24-22z" fill="#5a4a78" {...P} />
    <g fill="#ff5fa2">
      <rect x="24" y="48" width="16" height="7" rx="3.5" />
      <rect x="28.5" y="43.5" width="7" height="16" rx="3.5" />
    </g>
    <circle cx="70" cy="48" r="5" fill="#33c4ff" />
    <circle cx="80" cy="58" r="5" fill="#ffc93c" />
  </g>
)

export const paint = () => (
  <g>
    <path d="M50 8q36 0 36 30 0 16-14 16-10 0-10 10 0 12-16 12T14 52 30 12q8-4 20-4z" fill="#9b5cff" {...P} />
    <g fill="#ffc93c" stroke={INK} strokeWidth="3">
      <circle cx="34" cy="30" r="7" />
      <circle cx="54" cy="26" r="7" />
      <circle cx="28" cy="50" r="7" />
    </g>
    <circle cx="60" cy="60" r="7" fill="#ff5a3c" {...thin} />
  </g>
)

export const question = () => (
  <g>
    <circle cx="50" cy="52" r="38" fill="#ffc93c" {...P} />
    <path
      d="M36 40q0-14 14-14t14 12q0 10-12 14v8"
      fill="none"
      stroke={INK}
      strokeWidth="8"
      strokeLinecap="round"
    />
    <circle cx="52" cy="76" r="5.5" fill={INK} />
  </g>
)

/* ---------------- coloured counters ----------------
   Used for sorting by colour and for pattern games. */

function Ball({ fill, square }: { fill: string; square?: boolean }) {
  return square ? (
    <rect x="16" y="18" width="68" height="68" rx="14" fill={fill} {...P} />
  ) : (
    <g>
      <circle cx="50" cy="52" r="34" fill={fill} {...P} />
      <Gloss cx={38} cy={38} rx={10} ry={7} o={0.45} />
    </g>
  )
}

export const redBall = () => <Ball fill="#ff5a3c" />
export const blueBall = () => <Ball fill="#33c4ff" />
export const yellowBall = () => <Ball fill="#ffc93c" />
export const greenBall = () => <Ball fill="#34d399" />
export const orangeBall = () => <Ball fill="#ff7a59" />
export const purpleBall = () => <Ball fill="#9b5cff" />
export const blueSquare = () => <Ball fill="#33c4ff" square />
export const purpleSquare = () => <Ball fill="#9b5cff" square />
export const greenSquare = () => <Ball fill="#34d399" square />

export const diamondStar = () => <Star cx={50} cy={52} r={38} fill="#33c4ff" />
export const pinkStar = () => <Star cx={50} cy={52} r={38} fill="#ff5fa2" />
export const purpleStar = () => <Star cx={50} cy={52} r={38} fill="#9b5cff" />
export const greenStar = () => <Star cx={50} cy={52} r={38} fill="#34d399" />

export const baby = () => (
  <g>
    <circle cx="50" cy="62" r="26" fill="#ffe0c7" {...P} />
    <circle cx="50" cy="34" r="20" fill="#ffe0c7" {...P} />
    <path d="M32 28q2-14 18-14t18 14q-6-6-18-6t-18 6z" fill="#ffd166" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <circle cx="43" cy="34" r="2.6" fill={INK} />
    <circle cx="57" cy="34" r="2.6" fill={INK} />
    <path d="M44 42q6 5 12 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <ellipse cx="33" cy="41" rx="4.5" ry="3" fill="#ff9ec7" opacity="0.7" />
    <ellipse cx="67" cy="41" rx="4.5" ry="3" fill="#ff9ec7" opacity="0.7" />
    <path d="M40 58q10 8 20 0" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
  </g>
)
