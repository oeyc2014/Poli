/* ============================================================
   Tasty things — used constantly by the counting and adding
   lessons, so the shapes here are chunky and instantly countable.
   ============================================================ */
import { Gloss, INK, P, Smile, thin } from './parts'

export const apple = () => (
  <g>
    <path d="M50 30q-8-6-18-4Q16 30 16 52t18 32q8 4 16-2 8 6 16 2 18-10 18-32T66 26q-10-2-16 4z" fill="#ff5a3c" {...P} />
    <path d="M50 30q-2-14 8-20 6 10-8 20z" fill="#34d399" {...P} />
    <path d="M50 26v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <Gloss cx={32} cy={44} rx={7} ry={10} o={0.5} rotate={-20} />
  </g>
)

export const greenApple = () => (
  <g>
    <path d="M50 30q-8-6-18-4Q16 30 16 52t18 32q8 4 16-2 8 6 16 2 18-10 18-32T66 26q-10-2-16 4z" fill="#7ce8a8" {...P} />
    <path d="M50 30q-2-14 8-20 6 10-8 20z" fill="#34d399" {...P} />
    <path d="M50 26v10" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <Gloss cx={32} cy={44} rx={7} ry={10} o={0.55} rotate={-20} />
  </g>
)

export const cookie = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#d9a065" {...P} />
    <circle cx="50" cy="52" r="27" fill="#eab27d" />
    <g fill="#8b5a3c">
      <circle cx="38" cy="42" r="5" />
      <circle cx="62" cy="46" r="5.5" />
      <circle cx="46" cy="66" r="5" />
      <circle cx="66" cy="66" r="4" />
      <circle cx="30" cy="58" r="3.6" />
    </g>
    <Gloss cx={34} cy={32} rx={9} ry={6} o={0.4} />
  </g>
)

export const strawberry = () => (
  <g>
    <path d="M50 88q-28-16-30-38-2-16 12-18 10-2 18 4 8-6 18-4 14 2 12 18-2 22-30 38z" fill="#ff5a3c" {...P} />
    <g fill="#ffc93c">
      <circle cx="40" cy="48" r="2.6" />
      <circle cx="58" cy="52" r="2.6" />
      <circle cx="48" cy="62" r="2.6" />
      <circle cx="64" cy="40" r="2.6" />
      <circle cx="34" cy="60" r="2.6" />
    </g>
    <path d="M26 30q10-12 24-12t24 12q-12 8-24 8t-24-8z" fill="#34d399" {...P} />
    <path d="M50 22v10" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const banana = () => (
  <g>
    <path
      d="M20 30q4 42 42 52 16 4 22-8 4-10-10-14Q44 54 40 30q-2-10-12-10t-8 10z"
      fill="#ffe066"
      {...P}
    />
    <path d="M24 32q6 34 40 44" fill="none" stroke="#f28000" strokeWidth="3.4" strokeLinecap="round" opacity="0.7" />
    <path d="M20 30q-2-10 8-10" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const grapes = () => (
  <g>
    <path d="M50 26V14" stroke="#059669" strokeWidth="5" strokeLinecap="round" />
    <path d="M50 24q10-10 20-6-6 10-20 6z" fill="#34d399" {...thin} />
    <g fill="#9b5cff" stroke={INK} strokeWidth="3.6">
      <circle cx="36" cy="40" r="11" />
      <circle cx="64" cy="40" r="11" />
      <circle cx="50" cy="46" r="11" />
      <circle cx="36" cy="62" r="11" />
      <circle cx="64" cy="62" r="11" />
      <circle cx="50" cy="72" r="11" />
    </g>
    <Gloss cx={32} cy={35} rx={5} ry={4} o={0.5} />
  </g>
)

export const blueberry = () => (
  <g>
    <circle cx="50" cy="54" r="30" fill="#4f7fd6" {...P} />
    <path d="M50 26q-8 4-10 10M50 26q8 4 10 10" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <Gloss cx={38} cy={42} rx={8} ry={6} o={0.45} />
  </g>
)

export const donut = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#d9a065" {...P} />
    <circle cx="50" cy="52" r="30" fill="#ff5fa2" />
    <circle cx="50" cy="52" r="11" fill="#fff6d6" {...thin} />
    <g fill="#ffe066">
      <rect x="34" y="30" width="9" height="4" rx="2" transform="rotate(24 38 32)" />
      <rect x="60" y="34" width="9" height="4" rx="2" transform="rotate(-30 64 36)" />
      <rect x="40" y="70" width="9" height="4" rx="2" transform="rotate(12 44 72)" />
      <rect x="64" y="66" width="9" height="4" rx="2" transform="rotate(48 68 68)" />
      <rect x="26" y="52" width="9" height="4" rx="2" transform="rotate(70 30 54)" />
      <rect x="70" y="50" width="9" height="4" rx="2" transform="rotate(-70 74 52)" />
    </g>
    <g fill="#33c4ff">
      <circle cx="44" cy="36" r="3.4" />
      <circle cx="62" cy="52" r="3.4" />
      <circle cx="44" cy="68" r="3.4" />
    </g>
  </g>
)

export const pizza = () => (
  <g>
    <path d="M50 16L88 82H12z" fill="#ffc93c" {...P} />
    <path d="M50 30l24 44H26z" fill="#ff7a59" />
    <g fill="#c01d61">
      <circle cx="46" cy="52" r="5" />
      <circle cx="60" cy="68" r="4.4" />
      <circle cx="36" cy="70" r="4.4" />
    </g>
    <g fill="#10b981">
      <circle cx="62" cy="52" r="3.4" />
      <circle cx="42" cy="66" r="3.4" />
    </g>
  </g>
)

export const carrot = () => (
  <g>
    <path d="M46 26q22 2 26 16 4 14-16 30Q42 86 34 78 24 68 30 48q4-14 16-22z" fill="#ff7a59" {...P} />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M44 44l8-2M40 56l8-2M38 68l8-2" />
    </g>
    <path d="M44 26q-12-14-6-20 10 2 12 16z" fill="#34d399" {...P} />
    <path d="M50 24q2-16 12-16 4 10-6 20z" fill="#34d399" {...P} />
  </g>
)

export const cheese = () => (
  <g>
    <path d="M14 66l58-30 20 14v22z" fill="#ffc93c" {...P} />
    <path d="M14 66l58-30v52z" fill="#f28000" {...P} />
    <g fill="#ffa928">
      <circle cx="36" cy="66" r="6" />
      <circle cx="56" cy="60" r="5" />
      <circle cx="26" cy="76" r="4" />
    </g>
  </g>
)

export const honey = () => (
  <g>
    <path d="M26 34h48v44a8 8 0 0 1-8 8H34a8 8 0 0 1-8-8z" fill="#ffc93c" {...P} />
    <rect x="22" y="24" width="56" height="12" rx="6" fill="#f28000" {...P} />
    <ellipse cx="50" cy="60" rx="15" ry="12" fill="#f28000" opacity="0.85" />
    <path d="M50 50l7 8-7 8-7-8z" fill="#fff6d6" {...thin} />
  </g>
)

export const lemon = () => (
  <g>
    <ellipse cx="50" cy="54" rx="33" ry="25" fill="#ffe04d" {...P} transform="rotate(-18 50 54)" />
    <path d="M14 42l-8-6M86 66l8 6" stroke="#ffe04d" strokeWidth="10" strokeLinecap="round" fill="none" transform="rotate(-18 50 54)" />
    <ellipse cx="42" cy="46" rx="10" ry="6" fill="#fff6b8" opacity="0.85" transform="rotate(-18 42 46)" />
  </g>
)

export const pepper = () => (
  <g>
    <path d="M50 22q-4-8 2-12 8-2 10 6" fill="#3ddc84" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
    <path d="M50 26q-24 2-26 30-2 26 26 30 28-4 26-30-2-28-26-30z" fill="#e02a76" {...P} />
    <path d="M40 34q-8 10-8 26" fill="none" stroke="#ffffff" strokeWidth="5" strokeLinecap="round" opacity="0.5" />
  </g>
)

export const olive = () => (
  <g>
    <ellipse cx="50" cy="54" rx="28" ry="30" fill="#16a34a" {...P} />
    <ellipse cx="50" cy="50" rx="10" ry="12" fill="#f7f0e6" {...thin} />
    <ellipse cx="42" cy="38" rx="7" ry="5" fill="#ffffff" opacity="0.4" transform="rotate(-24 42 38)" />
  </g>
)

export const pineapple = () => (
  <g>
    <path d="M50 6l-6 10h12zM38 10l-2 12 10-6zM62 10l2 12-10-6zM30 18l2 12 8-8zM70 18l-2 12-8-8z" fill="#3ddc84" stroke={INK} strokeWidth="3.5" strokeLinejoin="round" />
    <ellipse cx="50" cy="60" rx="26" ry="32" fill="#ffd166" {...P} />
    <g stroke="#f28000" strokeWidth="3" strokeLinecap="round">
      <path d="M32 42l30 34M38 34l30 40M30 56l26 30M62 42l-30 34M56 34l-30 40M70 56l-26 30" opacity="0.6" />
    </g>
    <ellipse cx="40" cy="44" rx="7" ry="5" fill="#fff6b8" opacity="0.7" transform="rotate(-20 40 44)" />
  </g>
)

export const basil = () => (
  <g>
    <path d="M50 88q-30-24-16-52 8-16 16-20 8 4 16 20 14 28-16 52z" fill="#16c26c" {...P} />
    <path d="M50 22v60" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <path d="M50 42l-12-8M50 56l12-8M50 70l-12-8" stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity="0.6" />
  </g>
)

export const bamboo = () => (
  <g>
    <rect x="42" y="12" width="16" height="76" rx="8" fill="#7ce8a8" {...P} />
    <g stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M42 34h16M42 56h16M42 78h16" />
    </g>
    <path d="M42 30q-16-6-20-18 16 2 20 14z" fill="#34d399" {...P} />
    <path d="M58 52q16-8 20-20-16 2-20 14z" fill="#34d399" {...P} />
  </g>
)

export const milk = () => (
  <g>
    <path d="M38 20h24v10l8 12v44a6 6 0 0 1-6 6H36a6 6 0 0 1-6-6V42l8-12z" fill="#ffffff" {...P} />
    <path d="M30 42h40v14H30z" fill="#33c4ff" />
    <rect x="34" y="12" width="32" height="10" rx="5" fill="#33c4ff" {...thin} />
    <path d="M50 62q8 0 8 8t-8 8-8-8 8-8z" fill="#33c4ff" opacity="0.5" />
  </g>
)

export const soda = () => (
  <g>
    <path d="M34 24h32l-4 58a6 6 0 0 1-6 6H44a6 6 0 0 1-6-6z" fill="#ff5fa2" {...P} />
    <rect x="30" y="16" width="40" height="10" rx="5" fill="#c01d61" {...P} />
    <g fill="#fff6d6" opacity="0.9">
      <circle cx="46" cy="52" r="3" />
      <circle cx="58" cy="64" r="3" />
      <circle cx="48" cy="74" r="3" />
    </g>
    <path d="M62 20l10-14" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const lollipop = () => (
  <g>
    <path d="M50 62v30" stroke="#fff6d6" strokeWidth="8" strokeLinecap="round" />
    <path d="M50 62v30" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <circle cx="50" cy="44" r="32" fill="#ff5fa2" {...P} />
    <path
      d="M50 44q0-20 18-20 18 0 14 16-4 14-18 10-10-2-14-6z"
      fill="#fff6d6"
      opacity="0.9"
    />
  </g>
)

export const iceCream = () => (
  <g>
    <path d="M30 46h40l-20 42z" fill="#d9a065" {...P} />
    <circle cx="38" cy="38" r="15" fill="#ff9ec7" {...P} />
    <circle cx="62" cy="38" r="15" fill="#7ed8ff" {...P} />
    <circle cx="50" cy="26" r="15" fill="#ffe066" {...P} />
    <circle cx="50" cy="14" r="6" fill="#ff5a3c" {...P} />
  </g>
)

export const cupcake = () => (
  <g>
    <path d="M28 50h44l-6 34a6 6 0 0 1-6 5H40a6 6 0 0 1-6-5z" fill="#ff9ec7" {...P} />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M40 54l-2 30M50 54v30M60 54l2 30" />
    </g>
    <path d="M24 50q0-16 14-16 2-12 12-12t12 12q14 0 14 16z" fill="#fff6d6" {...P} />
    <circle cx="50" cy="14" r="6" fill="#ff5a3c" {...P} />
  </g>
)

export const mushroom = () => (
  <g>
    <path d="M40 52h20v28a10 10 0 0 1-20 0z" fill="#fff6d6" {...P} />
    <path d="M50 14c22 0 38 14 38 30H12c0-16 16-30 38-30z" fill="#ff5a3c" {...P} />
    <g fill="#fff6d6">
      <circle cx="34" cy="32" r="6" />
      <circle cx="62" cy="28" r="7" />
      <circle cx="74" cy="38" r="4.4" />
    </g>
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M44 66h12" />
    </g>
  </g>
)

export const cake = () => (
  <g>
    <path d="M18 56h64v24a6 6 0 0 1-6 6H24a6 6 0 0 1-6-6z" fill="#ffc93c" {...P} />
    <path d="M18 66h64v8H18z" fill="#ff5fa2" />
    <path d="M18 56q16 8 32 0t32 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M50 40v16" />
    </g>
    <path d="M50 26q6 6 0 14-6-8 0-14z" fill="#ffa928" {...thin} />
  </g>
)

export const seed = () => (
  <g>
    <path d="M50 84q-24 0-30-22Q14 40 32 22q12-10 22 4 10-14 22-4 18 18 12 40-6 22-30 22z" fill="#8b5a3c" {...P} />
    <path d="M50 78q-14 0-18-14 10-8 18 4 8-12 18-4-4 14-18 14z" fill="#a9744a" />
    <path d="M50 26v52" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
    <Gloss cx={36} cy={40} rx={7} ry={5} o={0.3} />
  </g>
)

export const leaf = () => (
  <g>
    <path d="M22 78Q12 40 44 20q20-12 34-2 4 30-20 52-18 16-36 8z" fill="#34d399" {...P} />
    <path d="M26 74Q38 44 70 26" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M40 62l-12-2M48 52l-12-4M58 42l-12-6M46 56l4 12M56 46l6 12" />
    </g>
  </g>
)

export const berry = () => (
  <g>
    <circle cx="50" cy="56" r="26" fill="#c01d61" {...P} />
    <circle cx="40" cy="46" r="13" fill="#ec2e7c" />
    <Gloss cx={40} cy={44} rx={7} ry={5} o={0.5} />
    <path d="M50 30v-10M50 24l12-8M50 24l-12-8" stroke="#059669" strokeWidth="5" strokeLinecap="round" fill="none" />
  </g>
)

export const popcorn = () => (
  <g>
    <path d="M26 44h48l-6 40H32z" fill="#ff5fa2" {...P} />
    <g fill="#fff6d6" stroke={INK} strokeWidth="3.6">
      <circle cx="34" cy="36" r="11" />
      <circle cx="50" cy="28" r="12" />
      <circle cx="66" cy="36" r="11" />
    </g>
    <g stroke="#ff5fa2" strokeWidth="4" strokeLinecap="round">
      <path d="M38 52v28M50 52v28M62 52v28" />
    </g>
  </g>
)

export const SmileFace = () => (
  <g>
    <circle cx="50" cy="52" r="34" fill="#ffc93c" {...P} />
    <Smile x={50} y={54} w={16} depth={12} />
    <g fill={INK}>
      <circle cx="38" cy="42" r="4.4" />
      <circle cx="62" cy="42" r="4.4" />
    </g>
  </g>
)
