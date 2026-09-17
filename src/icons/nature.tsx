/* ============================================================
   Sky, weather, plants and the great outdoors.
   ============================================================ */
import { Gloss, INK, P, Smile, Star, thin } from './parts'

/* ---------------- sky ---------------- */

export const sun = () => (
  <g>
    <g stroke="#f28000" strokeWidth="6" strokeLinecap="round">
      <path d="M50 6v10M50 84v10M6 50h10M84 50h10M19 19l7 7M74 74l7 7M81 19l-7 7M26 74l-7 7" />
    </g>
    <circle cx="50" cy="50" r="24" fill="#ffc93c" {...P} />
    <Gloss cx={42} cy={42} rx={9} ry={7} o={0.55} />
  </g>
)

export const sunHappy = () => (
  <g>
    <g stroke="#f28000" strokeWidth="6" strokeLinecap="round">
      <path d="M50 6v10M50 84v10M6 50h10M84 50h10M19 19l7 7M74 74l7 7M81 19l-7 7M26 74l-7 7" />
    </g>
    <circle cx="50" cy="50" r="24" fill="#ffc93c" {...P} />
    <Smile x={50} y={50} w={13} depth={10} />
    <g fill={INK}>
      <circle cx="41" cy="42" r="3.6" />
      <circle cx="59" cy="42" r="3.6" />
    </g>
    <g fill="#ff9ec7" opacity="0.6">
      <ellipse cx="33" cy="50" rx="6" ry="4" />
      <ellipse cx="67" cy="50" rx="6" ry="4" />
    </g>
  </g>
)

export const moon = () => (
  <path d="M62 10q-28 8-28 40t28 40Q30 88 22 52 30 16 62 10z" fill="#ffc93c" {...P} />
)

export const moonSleep = () => (
  <g>
    <path d="M62 10q-28 8-28 40t28 40Q30 88 22 52 30 16 62 10z" fill="#b98cff" {...P} />
    <g fill={INK} opacity="0.5">
      <circle cx="42" cy="40" r="3.4" />
      <circle cx="52" cy="56" r="2.6" />
      <circle cx="38" cy="60" r="3" />
    </g>
  </g>
)

export const star = () => <Star />

export const starGlow = () => (
  <g>
    <path d="M50 4l6 22h22l-18 14 7 22-17-14-17 14 7-22L22 26h22z" fill="#ffc93c" opacity="0.45" />
    <Star />
  </g>
)

export const sparkle = () => (
  <g>
    <path d="M50 12q6 22 30 28-24 6-30 28-6-22-30-28 24-6 30-28z" fill="#ffe066" {...P} />
    <path d="M80 60q3 10 14 13-11 3-14 13-3-10-14-13 11-3 14-13z" fill="#ffc93c" {...thin} />
  </g>
)

export const sparkleSwirl = () => (
  <g fill="none" stroke="#b98cff" strokeWidth="5" strokeLinecap="round">
    <path d="M28 34q14-14 30-4" />
    <path d="M74 62q-14 14-30 4" />
    <circle cx="50" cy="50" r="7" fill="#ffc93c" stroke={INK} strokeWidth="4" />
  </g>
)

export const cloud = () => (
  <path
    d="M26 72q-14 0-14-13t14-13q2-18 20-18 14 0 18 12 16-4 20 10 12 0 12 11t-12 11z"
    fill="#ffffff"
    {...P}
  />
)

export const cloudRain = () => (
  <g>
    <path d="M26 60q-14 0-14-13t14-13q2-18 20-18 14 0 18 12 16-4 20 10 12 0 12 11t-12 11z" fill="#b9b3c9" {...P} />
    <g stroke="#33c4ff" strokeWidth="6" strokeLinecap="round">
      <path d="M30 72l-5 12M50 72l-5 12M70 72l-5 12" />
    </g>
  </g>
)

export const cloudSnow = () => (
  <g>
    <path d="M26 56q-14 0-14-13t14-13q2-18 20-18 14 0 18 12 16-4 20 10 12 0 12 11t-12 11z" fill="#e9e4f5" {...P} />
    <g fill="#7ed8ff" stroke={INK} strokeWidth="3">
      <circle cx="28" cy="76" r="6" />
      <circle cx="50" cy="82" r="6" />
      <circle cx="72" cy="76" r="6" />
    </g>
  </g>
)

export const snowflake = () => (
  <g stroke="#33c4ff" strokeWidth="6" strokeLinecap="round" fill="none">
    <path d="M50 8v84M12 30l76 40M12 70l76-40" />
    <g strokeWidth="5">
      <path d="M50 24l-10-8M50 24l10-8M50 76l-10 8M50 76l10 8" />
      <path d="M24 40l-12-1M24 40l1-12M76 60l12 1M76 60l-1 12" />
      <path d="M24 60l-12 1M24 60l1 12M76 40l12-1M76 40l-1-12" />
    </g>
  </g>
)

export const snowman = () => (
  <g>
    <circle cx="50" cy="76" r="21" fill="#ffffff" {...P} />
    <circle cx="50" cy="44" r="16" fill="#ffffff" {...P} />
    <g fill={INK}>
      <circle cx="50" cy="72" r="2.6" />
      <circle cx="50" cy="82" r="2.6" />
      <circle cx="44" cy="42" r="2.6" />
      <circle cx="56" cy="42" r="2.6" />
    </g>
    <path d="M50 48l9 4-9 4z" fill="#ffa928" {...thin} />
    <path d="M40 28h20v6H40z" fill="#413364" {...thin} />
    <path d="M34 30h32" stroke="#ff5a3c" strokeWidth="7" strokeLinecap="round" />
    <path d="M30 60l-14-10M70 60l14-10" stroke="#8b5a3c" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const rainbow = () => (
  <g fill="none" strokeWidth="8" strokeLinecap="round">
    <path d="M8 78q0-46 42-46t42 46" stroke="#ff5a3c" />
    <path d="M19 78q0-35 31-35t31 35" stroke="#ffc93c" />
    <path d="M30 78q0-24 20-24t20 24" stroke="#34d399" />
    <path d="M41 78q0-13 9-13t9 13" stroke="#33c4ff" />
  </g>
)

export const sunrise = () => (
  <g>
    <g stroke="#f28000" strokeWidth="5.5" strokeLinecap="round">
      <path d="M50 14v10M16 40l8 6M84 40l-8 6M6 62h10M84 62h10" />
    </g>
    <path d="M20 66a30 30 0 0 1 60 0z" fill="#ffc93c" {...P} />
    <path d="M4 78h92" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <g stroke="#34d399" strokeWidth="5" strokeLinecap="round">
      <path d="M22 70l-6-6M78 70l6-6" />
    </g>
  </g>
)

export const sunset = () => (
  <g>
    <path d="M20 66a30 30 0 0 1 60 0z" fill="#ff7a59" {...P} />
    <path d="M4 78h92" stroke={INK} strokeWidth="6" strokeLinecap="round" />
    <g stroke="#ffc93c" strokeWidth="5.5" strokeLinecap="round">
      <path d="M50 12v12M14 30l8 8M86 30l-8 8" />
    </g>
    <circle cx="50" cy="24" r="8" fill="#ffc93c" {...thin} />
  </g>
)

export const earth = () => (
  <g>
    <circle cx="50" cy="52" r="38" fill="#33c4ff" {...P} />
    <g fill="#34d399" stroke={INK} strokeWidth="3.4" strokeLinejoin="round">
      <path d="M20 34q12-10 22-2 8 6 2 14-10 10-22 4-6-10-2-16z" />
      <path d="M56 42q14-8 24 2 4 12-8 16-16 4-20-8-2-6 4-10z" />
      <path d="M34 72q10-6 18 2-4 10-14 8-6-4-4-10z" />
    </g>
    <Gloss cx={34} cy={28} rx={12} ry={8} o={0.35} />
  </g>
)

export const weather = () => (
  <g>
    <circle cx="38" cy="34" r="17" fill="#ffc93c" {...P} />
    <g stroke="#f28000" strokeWidth="5" strokeLinecap="round">
      <path d="M38 8v8M8 34h8M15 12l6 6M61 12l-6 6" />
    </g>
    <path d="M50 76q-14 0-14-12t14-12q2-14 18-14 14 0 17 10 13-2 15 10 4 12-9 18z" fill="#ffffff" {...P} />
    <g stroke="#33c4ff" strokeWidth="5.5" strokeLinecap="round">
      <path d="M52 82l-4 10M70 82l-4 10" />
    </g>
  </g>
)

export const thermometer = () => (
  <g>
    <rect x="42" y="12" width="16" height="56" rx="8" fill="#ffffff" {...P} />
    <circle cx="50" cy="74" r="14" fill="#ff5a3c" {...P} />
    <rect x="46" y="34" width="8" height="34" fill="#ff5a3c" />
    <g stroke={INK} strokeWidth="3.4" strokeLinecap="round">
      <path d="M60 24h10M60 34h7M60 44h10" />
    </g>
  </g>
)

/* ---------------- water, fire, ice ---------------- */

export const waterDrop = () => (
  <g>
    <path d="M50 10q22 30 22 46a22 22 0 0 1-44 0q0-16 22-46z" fill="#33c4ff" {...P} />
    <Gloss cx={40} cy={46} rx={6} ry={10} o={0.6} rotate={-12} />
  </g>
)

export const wave = () => (
  <g fill="none" stroke="#33c4ff" strokeWidth="8" strokeLinecap="round">
    <path d="M6 44q11-14 22 0t22 0 22 0 22 0" />
    <path d="M6 64q11-14 22 0t22 0 22 0 22 0" />
    <path d="M6 84q11-14 22 0t22 0 22 0 22 0" opacity="0.55" />
  </g>
)

export const fire = () => (
  <g>
    <path d="M50 8q20 22 20 38a20 20 0 0 1-40 0q0-10 6-18-2 10 4 14-4-18 10-34z" fill="#ff5a3c" {...P} />
    <path d="M50 46q9 11 9 20a9 9 0 0 1-18 0q0-9 9-20z" fill="#ffc93c" />
  </g>
)

export const iceCube = () => (
  <g>
    <rect x="16" y="24" width="68" height="56" rx="12" fill="#b3e8ff" {...P} />
    <path d="M30 38l12 10-12 10z" fill="#ffffff" opacity="0.85" />
    <path d="M30 38v20M64 60h12M52 44v20" stroke="#7ed8ff" strokeWidth="4" strokeLinecap="round" />
    <Gloss cx={34} cy={36} rx={12} ry={7} o={0.6} rotate={-16} />
  </g>
)

/* ---------------- earth and plants ---------------- */

export const rock = () => (
  <g>
    <path d="M18 74q-8-22 10-34 20-14 40-4 18 8 14 26-4 16-30 18-26 2-34-6z" fill="#9aa7b8" {...P} />
    <path d="M30 62q8-14 26-16" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" opacity="0.35" />
    <ellipse cx="34" cy="48" rx="9" ry="6" fill="#b6c1cf" />
  </g>
)

export const log = () => (
  <g>
    <rect x="14" y="34" width="72" height="38" rx="14" fill="#8b5a3c" {...P} />
    <ellipse cx="24" cy="53" rx="10" ry="19" fill="#d9a065" {...P} />
    <g fill="none" stroke="#a9744a" strokeWidth="3.4">
      <ellipse cx="24" cy="53" rx="5" ry="10" />
    </g>
    <g stroke="#6b4226" strokeWidth="3.4" strokeLinecap="round">
      <path d="M46 40v26M60 40v26M74 40v26" />
    </g>
  </g>
)

export const tree = () => (
  <g>
    <rect x="43" y="56" width="14" height="34" rx="6" fill="#8b5a3c" {...P} />
    <circle cx="50" cy="34" r="24" fill="#34d399" {...P} />
    <circle cx="26" cy="52" r="17" fill="#34d399" {...P} />
    <circle cx="74" cy="52" r="17" fill="#34d399" {...P} />
    <g fill="#7ce8a8">
      <circle cx="42" cy="26" r="8" />
      <circle cx="66" cy="42" r="6" />
      <circle cx="28" cy="46" r="6" />
    </g>
  </g>
)

export const sprout = () => (
  <g>
    <path d="M50 88V44" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
    <path d="M50 56q-24 0-26-22 24-2 26 22z" fill="#7ce8a8" {...P} />
    <path d="M50 62q24 0 26-22-24-2-26 22z" fill="#34d399" {...P} />
    <path d="M18 88h64" stroke="#8b5a3c" strokeWidth="8" strokeLinecap="round" />
  </g>
)

export const leaves = () => (
  <g>
    <path d="M22 76Q14 44 42 26q18-10 30-2 4 26-16 44-16 14-34 8z" fill="#34d399" {...P} />
    <path d="M68 74Q60 48 78 34q14-10 20 0 2 22-12 34-10 8-18 6z" fill="#7ce8a8" {...P} />
    <path d="M26 72Q36 48 62 32" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
  </g>
)

export const leafSingle = () => (
  <g>
    <path d="M26 80Q14 40 46 20q22-12 34 0 2 30-22 50-18 14-32 10z" fill="#34d399" {...P} />
    <path d="M30 76Q40 42 72 26" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const sunflower = () => (
  <g>
    <path d="M50 52v38" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
    <path d="M50 68q-16-4-18-16 16 0 18 16z" fill="#34d399" {...P} />
    <g fill="#ffc93c" stroke={INK} strokeWidth="4" strokeLinejoin="round">
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2
        return <ellipse key={i} cx={50 + Math.cos(a) * 20} cy={36 + Math.sin(a) * 20} rx="9" ry="12" transform={`rotate(${(a * 180) / Math.PI + 90} ${50 + Math.cos(a) * 20} ${36 + Math.sin(a) * 20})`} />
      })}
    </g>
    <circle cx="50" cy="36" r="13" fill="#8b5a3c" {...thin} />
  </g>
)

export const blossom = () => (
  <g>
    <g fill="#ff9ec7" stroke={INK} strokeWidth="4" strokeLinejoin="round">
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2
        return <circle key={i} cx={50 + Math.cos(a) * 17} cy={48 + Math.sin(a) * 17} r="14" />
      })}
    </g>
    <circle cx="50" cy="48" r="11" fill="#ffe066" {...thin} />
    <path d="M50 76q-14-10-4-18" fill="#34d399" {...thin} />
  </g>
)

export const tulip = () => (
  <g>
    <path d="M50 46v42" stroke="#059669" strokeWidth="7" strokeLinecap="round" />
    <path d="M50 66q-18-4-20-18 18 0 20 18z" fill="#34d399" {...P} />
    <path d="M30 40q0-22 10-22 4 0 10 12 6-12 10-12 10 0 10 22t-20 22-20-22z" fill="#ff5fa2" {...P} />
    <path d="M42 24q4 8 8 6t8-6" fill="none" stroke="#c01d61" strokeWidth="3.4" strokeLinecap="round" />
  </g>
)

export const mapleLeaf = () => (
  <g>
    <path
      d="M50 8l8 16 10-8-2 16 16-4-10 16 16 6-16 8 8 12-18-4-2 16-10-12-10 12-2-16-18 4 8-12-16-8 16-6-10-16 16 4-2-16 10 8z"
      fill="#ff7a59"
      {...P}
    />
    <path d="M50 46v42" stroke="#8b5a3c" strokeWidth="5" strokeLinecap="round" />
  </g>
)

export const hills = () => (
  <g>
    <path d="M4 78q20-40 44-6 16 22 48-8v30H4z" fill="#34d399" {...P} />
    <path d="M4 84q26-22 50 4 14 12 42-4v12H4z" fill="#7ce8a8" {...P} />
    <circle cx="74" cy="26" r="12" fill="#ffc93c" {...P} />
    <path d="M22 42q10-10 20 0-10 12-20 0z" fill="#ffffff" {...thin} />
  </g>
)

export const beach = () => (
  <g>
    <rect x="4" y="60" width="92" height="26" fill="#ffe066" rx="4" />
    <path d="M4 60q24-10 46 0t46 0v-8H4z" fill="#ffc93c" />
    <circle cx="76" cy="24" r="13" fill="#ffc93c" {...P} />
    <path d="M6 58q22-14 44-2" fill="none" stroke="#33c4ff" strokeWidth="6" strokeLinecap="round" />
    <path d="M20 56V30" stroke="#8b5a3c" strokeWidth="5" strokeLinecap="round" />
    <g fill="#10b981" stroke={INK} strokeWidth="3.4" strokeLinejoin="round">
      <path d="M20 32q-12-10-2-18 8 4 6 14z" />
      <path d="M20 32q12-10 2-18-8 4-6 14z" />
    </g>
  </g>
)

export const planet = () => (
  <g>
    <circle cx="50" cy="50" r="26" fill="#ffa928" {...P} />
    <path d="M28 26q-16 4-18 14-2 12 22 22 24 10 40 6 12-4 12-14" fill="none" stroke="#b98cff" strokeWidth="8" strokeLinecap="round" />
    <g fill="#ff7a59">
      <ellipse cx="42" cy="42" rx="8" ry="5" />
      <ellipse cx="60" cy="62" rx="10" ry="6" />
    </g>
    <Gloss cx={38} cy={34} rx={8} ry={5} o={0.4} />
  </g>
)

export const hole = () => (
  <g>
    <ellipse cx="50" cy="66" rx="40" ry="22" fill="#8b5a3c" {...P} />
    <ellipse cx="50" cy="64" rx="27" ry="13" fill="#413364" />
    <ellipse cx="50" cy="62" rx="27" ry="13" fill="#4a3d63" />
    <path d="M50 60q10 0 10 6" fill="none" stroke="#7c6d99" strokeWidth="3" strokeLinecap="round" />
  </g>
)

export const nest = () => (
  <g>
    <path d="M8 54q42-18 84 0-4 30-42 30T8 54z" fill="#a9744a" {...P} />
    <g stroke="#8b5a3c" strokeWidth="3.4" strokeLinecap="round">
      <path d="M18 60q32-8 64 2M22 70q28-6 56 0M30 78q20-4 40 0" />
    </g>
    <g fill="#7ed8ff" stroke={INK} strokeWidth="4">
      <ellipse cx="36" cy="46" rx="11" ry="13" />
      <ellipse cx="62" cy="46" rx="11" ry="13" />
    </g>
  </g>
)

export const fullMoon = () => (
  <g>
    <circle cx="50" cy="50" r="30" fill="#ffe066" {...P} />
    <g fill="#ffc93c">
      <circle cx="40" cy="40" r="7" />
      <circle cx="62" cy="56" r="9" />
      <circle cx="46" cy="64" r="5" />
    </g>
    <Gloss cx={36} cy={34} rx={10} ry={7} o={0.5} />
  </g>
)

export const wind = () => (
  <g fill="none" stroke="#7ed8ff" strokeWidth="7" strokeLinecap="round">
    <path d="M8 34h44q12 0 12-10t-12-10q-8 0-10 6" />
    <path d="M8 54h60q14 0 14 12t-14 12q-10 0-12-8" />
    <path d="M8 74h30" />
  </g>
)

/* ---------------- body and extra pieces ---------------- */

export const nose = () => (
  <g>
    <path d="M36 26q0 26 8 38 6 8 14 0 8-12 8-38" fill="#ffbe98" {...P} />
    <ellipse cx="50" cy="70" rx="12" ry="9" fill="#ff9e73" {...thin} />
    <circle cx="46" cy="69" r="2.2" fill={INK} />
    <circle cx="54" cy="69" r="2.2" fill={INK} />
    <path d="M46 78q4 3 8 0" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    <path d="M24 44q-6 4-4 10M76 44q6 4 4 10" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
  </g>
)

export const ear = () => (
  <g>
    <path d="M34 66q-10-8-8-26 3-26 26-26 24 0 26 28 1 18-10 26-8 6-10 16-3 10-12 8-10-2-8-14" fill="#ffbe98" {...P} />
    <path d="M40 54q-6-10 0-20 7-10 16-4 8 6 6 18-2 10-8 14" fill="none" stroke={INK} strokeWidth="3.4" strokeLinecap="round" />
  </g>
)
