/* ============================================================
   Animals, birds, bugs and sea creatures.
   Almost everything here is one of the four shared bodies with
   different colours and extras, which is what keeps 40 animals
   looking like one family.
   ============================================================ */
import { Bird, Bug, DotEyes, Eyes, Gloss, hair, INK, P, Quadruped, Sea, Smile, thin } from './parts'

/* ---------------- four-legged friends ---------------- */

export const cat = () => (
  <Quadruped fur="#ffa928" furLight="#ffc266" ear="pointy" earInner="#ff9ec7" tail="curl" snout="round" snoutColor="#ffd9a0" />
)

export const dog = () => (
  <Quadruped fur="#c2833f" furLight="#d9a065" ear="floppy" tail="bushy" snout="long" snoutColor="#f0d6b4" belly="#f0d6b4" />
)

export const fox = () => (
  <Quadruped
    fur="#ff7a59"
    furLight="#ffa48a"
    ear="pointy"
    earInner="#3a3050"
    tail="bushy"
    tailColor="#ff7a59"
    snout="long"
    snoutColor="#fff6d6"
    belly="#fff6d6"
  />
)

export const bear = () => (
  <Quadruped fur="#a0744a" furLight="#b98d61" ear="round" earInner="#7a5636" tail="none" snout="round" snoutColor="#e6c9a8" belly="#e6c9a8" />
)

export const panda = () => (
  <Quadruped
    fur="#ffffff"
    furLight="#ffffff"
    ear="round"
    earFill="#3a3050"
    tail="none"
    snout="round"
    snoutColor="#f2ecff"
    eyeGap={12}
    faceOverlay={
      <g fill="#413364">
        <ellipse cx="40" cy="43" rx="10" ry="12" transform="rotate(-14 40 43)" />
        <ellipse cx="60" cy="43" rx="10" ry="12" transform="rotate(14 60 43)" />
      </g>
    }
  />
)

export const koala = () => (
  <Quadruped
    fur="#9aa7b8"
    furLight="#b6c1cf"
    ear="none"
    tail="none"
    snout="flat"
    snoutColor="#3a3050"
    nose="#413364"
    muzzle={
      <g fill="#b6c1cf" stroke={INK} strokeWidth="5" strokeLinejoin="round">
        <circle cx="26" cy="30" r="14" />
        <circle cx="74" cy="30" r="14" />
      </g>
    }
    faceOverlay={<circle cx="50" cy="56" r="7" fill="#413364" />}
  />
)

export const lion = () => (
  <Quadruped
    fur="#ffc93c"
    furLight="#ffdd85"
    ear="round"
    earInner="#f28000"
    tail="thin"
    tailColor="#ffc93c"
    snout="round"
    snoutColor="#fff2c9"
    belly="#fff2c9"
    muzzle={<LionMane />}
  />
)

function LionMane() {
  const petals = Array.from({ length: 12 }, (_, i) => {
    const a = (i / 12) * Math.PI * 2
    return { x: 50 + Math.cos(a) * 27, y: 36 + Math.sin(a) * 27 }
  })
  return (
    <g fill="#f28000" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      {petals.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="12" />
      ))}
    </g>
  )
}

export const tiger = () => (
  <Quadruped
    fur="#ff9f43"
    furLight="#ffbd7a"
    ear="round"
    earInner="#c25f00"
    tail="thin"
    tailColor="#ff9f43"
    snout="round"
    snoutColor="#fff6d6"
    belly="#fff6d6"
    faceOverlay={
      <g stroke="#413364" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M44 24l-5 9M56 24l5 9M50 22v11" />
      </g>
    }
    children={
      <g stroke="#413364" strokeWidth="4" strokeLinecap="round">
        <path d="M28 52v6M72 52v6M30 62v6M70 62v6" />
      </g>
    }
  />
)

export const cow = () => (
  <Quadruped
    fur="#ffffff"
    furLight="#e9e4f5"
    ear="floppy"
    tail="thin"
    tailColor="#ffffff"
    snout="flat"
    snoutColor="#ff9ec7"
    nose="#c01d61"
    faceOverlay={
      <g fill="#3a3050">
        <ellipse cx="30" cy="26" rx="11" ry="9" />
        <ellipse cx="70" cy="52" rx="9" ry="12" />
      </g>
    }
    muzzle={
      <g fill="#e9e4f5" stroke={INK} strokeWidth="5" strokeLinejoin="round">
        <path d="M32 12q-8-8-14-4 2 8 12 8z" />
        <path d="M68 12q8-8 14-4-2 8-12 8z" />
      </g>
    }
  />
)

export const pig = () => (
  <Quadruped
    fur="#ff9ec7"
    furLight="#ffc2da"
    ear="pointy"
    earInner="#ec2e7c"
    tail="curl"
    tailColor="#ff9ec7"
    snout="flat"
    snoutColor="#ec2e7c"
    nose="#8f1247"
    belly="#ffc2da"
  />
)

export const monkey = () => (
  <Quadruped
    fur="#c2833f"
    furLight="#dcab74"
    ear="none"
    tail="thin"
    tailColor="#c2833f"
    snout="round"
    snoutColor="#f0d6b4"
    belly="#f0d6b4"
    muzzle={
      <g fill="#dcab74" stroke={INK} strokeWidth="5" strokeLinejoin="round">
        <circle cx="24" cy="36" r="11" />
        <circle cx="76" cy="36" r="11" />
      </g>
    }
  />
)

export const squirrel = () => (
  <Quadruped
    fur="#d38b4a"
    furLight="#eab27d"
    ear="pointy"
    earInner="#a8632c"
    tail="bushy"
    tailColor="#d38b4a"
    snout="round"
    snoutColor="#fff6d6"
    belly="#fff6d6"
  />
)

export const mouse = () => (
  <Quadruped
    fur="#b9b3c9"
    furLight="#d5d0e0"
    ear="round"
    earInner="#ff9ec7"
    headR={21}
    tail="thin"
    tailColor="#b9b3c9"
    snout="round"
    snoutColor="#ffc2da"
  />
)

export const rabbit = () => (
  <Quadruped
    fur="#ffffff"
    furLight="#e9e4f5"
    ear="none"
    tail="none"
    snout="round"
    snoutColor="#ffd9e6"
    nose="#ff5fa2"
    eyeGap={11}
    muzzle={
      <g>
        <g stroke={INK} strokeWidth="5" strokeLinejoin="round" fill="#ffffff">
          <ellipse cx="40" cy="16" rx="7" ry="22" />
          <ellipse cx="60" cy="16" rx="7" ry="22" />
        </g>
        <g fill="#ff9ec7">
          <ellipse cx="40" cy="17" rx="3.4" ry="15" />
          <ellipse cx="60" cy="17" rx="3.4" ry="15" />
        </g>
      </g>
    }
  />
)

export const unicorn = () => (
  <Quadruped
    fur="#f2ecff"
    furLight="#ffffff"
    ear="pointy"
    earInner="#ff9ec7"
    tail="bushy"
    tailColor="#9b5cff"
    snout="long"
    snoutColor="#fff6d6"
    muzzle={
      <g>
        <path d="M50 12l6-14 6 16z" fill="#ffc93c" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M30 16q12-10 22-6-2-10-12-10-10 0-10 16z" fill="#9b5cff" stroke={INK} strokeWidth="4" />
      </g>
    }
  />
)

export const dragon = () => (
  <Quadruped
    fur="#34d399"
    furLight="#7ce8a8"
    ear="none"
    tail="bushy"
    tailColor="#34d399"
    snout="flat"
    snoutColor="#b0f5d3"
    belly="#ffe066"
    muzzle={
      <g fill="#ffe066" stroke={INK} strokeWidth="4" strokeLinejoin="round">
        <path d="M36 20l-6-14 10 6z" />
        <path d="M64 20l6-14-10 6z" />
      </g>
    }
    faceOverlay={
      <g fill="#413364">
        <circle cx="38" cy="30" r="3" />
        <circle cx="62" cy="30" r="3" />
      </g>
    }
    children={
      <g stroke="#059669" strokeWidth="4" strokeLinecap="round">
        <path d="M34 58l-4 8M66 58l4 8" />
      </g>
    }
  />
)

/* ---------------- birds ---------------- */

export const bird = () => <Bird kind="song" body="#33c4ff" wing="#0ea5e9" belly="#ddf4ff" beak="#ffa928" />

export const hen = () => <Bird kind="hen" body="#ff7a59" wing="#dd3216" belly="#ffc8b8" beak="#ffa928" />

export const rooster = () => <Bird kind="rooster" body="#ff5a3c" wing="#dd3216" belly="#ffc8b8" beak="#ffc93c" />

export const chick = () => <Bird kind="chick" body="#ffe066" wing="#ffc93c" belly="#fff6d6" beak="#ffa928" />

export const duck = () => (
  <Bird kind="duck" body="#ffe066" wing="#ffc93c" belly="#fff6d6" beak="#ff7a59" eyeGap={10} />
)

export const eagle = () => (
  <Bird kind="eagle" body="#8b6f4e" wing="#5f4630" belly="#e6c9a8" beak="#ffc93c" crest="#ffffff" />
)

export const penguin = () => (
  <Bird kind="penguin" body="#3a3050" wing="#413364" belly="#ffffff" beak="#ffa928" eyeGap={9} />
)

export const owl = () => <Bird kind="owl" body="#9b5cff" wing="#7c3aed" belly="#ddc9ff" beak="#ffa928" eyeGap={9} />

/* ---------------- bugs ---------------- */

export const bee = () => <Bug kind="bee" body="#ffc93c" accent="#413364" wing="#ddf4ff" />

export const ladybug = () => <Bug kind="ladybug" body="#ff5a3c" accent="#413364" wing="#ddf4ff" />

export const butterfly = () => <Bug kind="butterfly" body="#9b5cff" accent="#ff5fa2" />

export const ant = () => <Bug kind="ant" body="#413364" accent="#5a4a78" />

export const worm = () => <Bug kind="worm" body="#ff9ec7" accent="#c01d61" />

export const caterpillar = () => <Bug kind="caterpillar" body="#34d399" accent="#ffc93c" />

/* ---------------- sea creatures ---------------- */

export const fish = () => <Sea kind="fish" body="#33c4ff" accent="#0284c7" fin="#ffc93c" />

export const shark = () => <Sea kind="shark" body="#8fa3bf" accent="#e9e4f5" fin="#6b7d99" />

export const whale = () => <Sea kind="whale" body="#4f7fd6" accent="#ddf4ff" fin="#3a63ad" />

export const dolphin = () => <Sea kind="dolphin" body="#7ed8ff" accent="#0284c7" fin="#33c4ff" />

/* ---------------- one-offs ---------------- */

export const frog = () => (
  <g>
    <g fill="#34d399" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      <rect x="14" y="60" width="13" height="22" rx="6" />
      <rect x="73" y="60" width="13" height="22" rx="6" />
    </g>
    <ellipse cx="50" cy="60" rx="30" ry="24" fill="#34d399" {...P} />
    <ellipse cx="50" cy="66" rx="18" ry="14" fill="#b0f5d3" />
    {/* big eyes sitting on top of the head */}
    <circle cx="34" cy="30" r="15" fill="#ffffff" {...P} />
    <circle cx="66" cy="30" r="15" fill="#ffffff" {...P} />
    <circle cx="34" cy="32" r="7" fill={INK} />
    <circle cx="66" cy="32" r="7" fill={INK} />
    <circle cx="31" cy="29" r="2.6" fill="#fff" />
    <circle cx="63" cy="29" r="2.6" fill="#fff" />
    <Smile x={50} y={56} w={15} depth={11} />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M72 86l8-4M78 92l8-2" />
    </g>
    <Gloss cx={36} cy={52} rx={9} ry={5} o={0.4} />
  </g>
)

export const elephant = () => (
  <g>
    <g fill="#9aa7b8" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      <rect x="24" y="66" width="14" height="20" rx="7" />
      <rect x="62" y="66" width="14" height="20" rx="7" />
    </g>
    <ellipse cx="50" cy="62" rx="29" ry="23" fill="#9aa7b8" {...P} />
    <ellipse cx="50" cy="68" rx="16" ry="13" fill="#c3ccd8" />
    {/* big flappy ears */}
    <ellipse cx="18" cy="46" rx="15" ry="19" fill="#b6c1cf" {...P} />
    <ellipse cx="82" cy="46" rx="15" ry="19" fill="#b6c1cf" {...P} />
    <circle cx="50" cy="36" r="24" fill="#9aa7b8" {...P} />
    {/* trunk */}
    <path d="M50 50q-2 20 6 28 7 7 12 0" fill="none" stroke="#9aa7b8" strokeWidth="15" strokeLinecap="round" />
    <path d="M50 50q-2 20 6 28 7 7 12 0" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <Eyes x1={39} x2={61} y={34} r={7} />
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M34 24q6-6 12-3M66 24q-6-6-12-3" />
    </g>
    <Gloss cx={38} cy={22} rx={9} ry={6} o={0.45} />
  </g>
)

export const turtle = () => (
  <g>
    <g fill="#7ce8a8" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      <ellipse cx="18" cy="72" rx="9" ry="7" />
      <ellipse cx="32" cy="76" rx="9" ry="7" />
      <ellipse cx="82" cy="72" rx="9" ry="7" />
      <ellipse cx="68" cy="76" rx="9" ry="7" />
    </g>
    {/* shell */}
    <path d="M12 70q0-30 38-30t38 30z" fill="#10b981" {...P} />
    <path d="M24 66q4-18 26-18t26 18z" fill="#b0f5d3" {...thin} />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round">
      <path d="M50 40v26M34 46l-6 20M66 46l6 20" />
    </g>
    {/* head */}
    <circle cx="82" cy="52" r="13" fill="#7ce8a8" {...P} />
    <DotEyes x1={78} x2={87} y={50} r={2.6} />
    <Smile x={84} y={57} w={4} depth={3} width={2.6} />
  </g>
)

export const octopus = () => (
  <g>
    <g stroke="#ec2e7c" strokeWidth="12" strokeLinecap="round" fill="none">
      <path d="M24 66q-8 12 0 18M38 70q-6 12 2 16M62 70q6 12-2 16M76 66q8 12 0 18" />
    </g>
    <g stroke={INK} strokeWidth="4" strokeLinecap="round" fill="none">
      <path d="M24 66q-8 12 0 18M38 70q-6 12 2 16M62 70q6 12-2 16M76 66q8 12 0 18" opacity="0.001" />
    </g>
    <ellipse cx="50" cy="48" rx="34" ry="30" fill="#ff5fa2" {...P} />
    <Eyes x1={38} x2={62} y={44} r={9} />
    <Smile x={50} y={58} w={10} depth={7} />
    <BlushDots />
    <Gloss cx={34} cy={30} rx={11} ry={7} o={0.4} />
  </g>
)

function BlushDots() {
  return (
    <g fill="#c01d61" opacity="0.45">
      <ellipse cx="24" cy="56" rx="7" ry="4" />
      <ellipse cx="76" cy="56" rx="7" ry="4" />
    </g>
  )
}

export const tRex = () => (
  <g>
    <path d="M74 62q10-2 12-12 8 6 4 18-3 8-14 8z" fill="#4ade80" {...P} />
    <path d="M18 62q10-24 34-22" fill="none" stroke="#4ade80" strokeWidth="20" strokeLinecap="round" />
    <path d="M18 62q10-24 34-22" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="52" cy="58" rx="26" ry="24" fill="#4ade80" {...P} />
    <ellipse cx="54" cy="64" rx="15" ry="13" fill="#b0f5d3" />
    {/* head */}
    <path d="M46 40q-24-6-30 6-4 12 14 14 14 2 18 2z" fill="#4ade80" {...P} />
    <g fill="#ffffff" stroke={INK} strokeWidth="3.2" strokeLinejoin="round">
      <path d="M22 52l4 5 4-5zM32 54l4 5 4-5z" />
    </g>
    <circle cx="40" cy="34" r="7" fill="#ffffff" {...thin} />
    <circle cx="41" cy="35" r="3.2" fill={INK} />
    <g stroke="#059669" strokeWidth="4" strokeLinecap="round">
      <path d="M58 36l-2-9M70 40l3-9" />
    </g>
    {/* legs */}
    <g fill="#4ade80" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      <path d="M38 74l-4 14h16l-2-14z" />
      <path d="M64 74l-2 14h14l-2-14z" />
    </g>
    <Gloss cx={40} cy={46} rx={8} ry={5} o={0.35} />
  </g>
)

export const longneck = () => (
  <g>
    <path d="M20 60q-10 8-6 20 4-6 10-6t8-6z" fill="#22d3ee" {...P} />
    <ellipse cx="38" cy="62" rx="24" ry="19" fill="#22d3ee" {...P} />
    <ellipse cx="38" cy="66" rx="14" ry="11" fill="#b3e8ff" />
    <path
      d="M48 52q4-24 12-32 6-6 12 0 5 8-2 12-6 3-10 22z"
      fill="#22d3ee"
      {...P}
    />
    <circle cx="70" cy="24" r="13" fill="#22d3ee" {...P} />
    <DotEyes x1={66} x2={76} y={21} r={3} />
    <Smile x={74} y={30} w={4} depth={3} width={2.6} />
    <g fill="#67e8f9" stroke={INK} strokeWidth="4" strokeLinejoin="round">
      <path d="M62 12l-4-9 8 3z" />
    </g>
    <g fill="#22d3ee" stroke={INK} strokeWidth="5" strokeLinejoin="round">
      <path d="M26 76l-3 12h14l-2-12z" />
      <path d="M46 78l-2 10h12l-2-10z" />
    </g>
    <g stroke="#0891b2" strokeWidth="3.4" strokeLinecap="round">
      <path d="M60 56q6 4 10 0" />
    </g>
    <Gloss cx={34} cy={56} rx={9} ry={5} o={0.35} />
  </g>
)

export const pawPrints = () => (
  <g fill={INK}>
    <ellipse cx="32" cy="38" rx="9" ry="12" />
    <ellipse cx="52" cy="30" rx="9" ry="12" />
    <ellipse cx="72" cy="38" rx="9" ry="12" />
    <ellipse cx="86" cy="56" rx="9" ry="12" />
    <ellipse cx="50" cy="72" rx="25" ry="20" />
  </g>
)

export const bone = () => (
  <g>
    <path
      d="M22 38a10 10 0 1 1 12 10h32a10 10 0 1 1 12-10 10 10 0 0 1-8 22H30a10 10 0 0 1-8-22z"
      fill="#fff6d6"
      {...P}
    />
    <ellipse cx="50" cy="52" rx="10" ry="6" fill="#ffd98a" opacity="0.7" />
  </g>
)

export const horn = () => (
  <g>
    <path d="M30 74q-6-30 20-44 26 14 20 44-20 14-40 0z" fill="#ffe066" {...P} />
    <path d="M34 62q16-20 32 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
    <path d="M36 48q14-16 28 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
  </g>
)

export const egg = () => <ellipse cx="50" cy="54" rx="27" ry="34" fill="#fff6d6" {...P} />

export const horse = () => (
  <Quadruped
    fur="#c2833f"
    furLight="#dcab74"
    ear="pointy"
    earInner="#a8632c"
    tail="thin"
    tailColor="#5a4a78"
    snout="long"
    snoutColor="#f0d6b4"
    belly="#f0d6b4"
    faceOverlay={
      <g stroke="#5a4a78" strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M58 20l14-6" />
      </g>
    }
  />
)

export const spider = () => (
  <g>
    <g fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round">
      <path d="M36 52l-16-10M36 60l-18 2M38 68l-14 12M42 74l-6 12" />
      <path d="M64 52l16-10M64 60l18 2M62 68l14 12M58 74l6 12" />
    </g>
    <ellipse cx="50" cy="64" rx="22" ry="18" fill="#5a4a78" {...P} />
    <circle cx="50" cy="38" r="15" fill="#6b5b96" {...P} />
    <DotEyes x1={44} x2={56} y={36} r={3.4} />
    <Smile x={50} y={44} w={5} depth={3} width={2.6} />
    <Gloss cx={44} cy={56} rx={8} ry={5} o={0.3} />
  </g>
)

export const fly = () => (
  <g>
    <ellipse cx="32" cy="30" rx="14" ry="9" fill="#ddf4ff" {...hair} transform="rotate(-30 32 30)" />
    <ellipse cx="68" cy="30" rx="14" ry="9" fill="#ddf4ff" {...hair} transform="rotate(30 68 30)" />
    <g stroke={INK} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M44 26q-4-8-10-9M56 26q4-8 10-9" />
    </g>
    <ellipse cx="50" cy="58" rx="22" ry="24" fill="#7d6f99" {...P} />
    <ellipse cx="50" cy="38" r="13" fill="#a89bbd" {...P} />
    <g stroke="#f9409a" strokeWidth="4" fill="none" strokeLinecap="round">
      <path d="M36 48l28 0M36 58l28 0M38 68l24 0" opacity="0.6" />
    </g>
    <DotEyes x1={45} x2={55} y={36} r={3} fill="#f9409a" />
    <Smile x={50} y={44} w={4} depth={3} width={2.4} />
    <Gloss cx={42} cy={50} rx={7} ry={4} o={0.35} />
  </g>
)

