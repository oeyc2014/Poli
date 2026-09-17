/* ============================================================
   Poli — the mascot.
   A hand-drawn inline SVG panda: chubby, glossy and extra cuddly.
   She can blink, wave, change mood, and holds a heart balloon.
   ============================================================ */

export type Mood = 'happy' | 'cheer' | 'think' | 'oops' | 'sleep' | 'wow'

type Props = {
  size?: number
  mood?: Mood
  className?: string
  /** wave the right paw */
  wave?: boolean
}

const INK = '#413364'
const BLACK = '#332a4e'
const BLACK_SOFT = '#453a66'
const PINK = '#ff8fc0'
const PINK_DEEP = '#f9409a'

export default function Mascot({ size = 128, mood = 'happy', className = '', wave = false }: Props) {
  const bounce = mood === 'cheer' ? 'anim-bob' : mood === 'wow' ? 'anim-jelly' : mood === 'sleep' ? '' : 'anim-float'
  const asleep = mood === 'sleep'
  const eyesOpen = !asleep

  /* where the pupils look */
  const look = mood === 'think' ? { x: 3.5, y: -2.5 } : mood === 'oops' ? { x: 0, y: 2.5 } : mood === 'wow' ? { x: 0, y: -1 } : { x: 0, y: 1.5 }
  const pupilR = mood === 'wow' ? 7.5 : 6

  return (
    <svg
      viewBox="0 0 200 212"
      width={size}
      height={(size * 212) / 200}
      className={`${bounce} ${className}`}
      role="img"
      aria-label="Poli the panda"
    >
      <defs>
        <radialGradient id="pandaShine" cx="0.34" cy="0.22" r="0.6">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="pandaFur" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#ece5fb" />
        </linearGradient>
        <radialGradient id="balloonGrad" cx="0.35" cy="0.3" r="0.75">
          <stop offset="0" stopColor="#ff9fc9" />
          <stop offset="1" stopColor={PINK_DEEP} />
        </radialGradient>
      </defs>

      {/* floor shadow */}
      <ellipse cx="100" cy="203" rx="52" ry="8" fill={INK} opacity="0.16" />

      {/* ---------- feet (big and squishy) ---------- */}
      <g>
        <ellipse cx="70" cy="190" rx="21" ry="13" fill={BLACK} stroke={INK} strokeWidth="4.5" />
        <ellipse cx="130" cy="190" rx="21" ry="13" fill={BLACK} stroke={INK} strokeWidth="4.5" />
        <ellipse cx="66" cy="187" rx="8" ry="4" fill={BLACK_SOFT} />
        <ellipse cx="126" cy="187" rx="8" ry="4" fill={BLACK_SOFT} />
      </g>

      {/* ---------- heart balloon string ---------- */}
      <g>
        <path
          d="M168 42q6 26-2 52-6 20 2 34"
          fill="none"
          stroke={INK}
          strokeWidth="3"
          strokeLinecap="round"
          className={asleep ? '' : 'anim-wobble'}
          style={{ animationDuration: '3.4s', transformOrigin: '170px 40px' }}
        />
        <path
          d="M170 12c-11-14-34-4-30 13 2 10 14 20 28 26 14-6 27-16 29-26 4-17-17-27-27-13z"
          fill="url(#balloonGrad)"
          stroke={INK}
          strokeWidth="4"
          className={asleep ? '' : 'anim-float'}
          style={{ animationDuration: '3.6s' }}
        />
        <ellipse cx="161" cy="17" rx="6" ry="4" fill="#ffffff" opacity="0.75" transform="rotate(-24 161 17)" />
      </g>

      {/* ---------- body (chubby!) ---------- */}
      <ellipse cx="100" cy="155" rx="48" ry="44" fill="url(#pandaFur)" stroke={INK} strokeWidth="5" />
      <ellipse cx="100" cy="164" rx="27" ry="25" fill="#fff" opacity="0.9" />

      {/* left arm hugging the belly */}
      <g transform="rotate(-16 54 148)">
        <ellipse cx="54" cy="150" rx="15" ry="25" fill={BLACK} stroke={INK} strokeWidth="4.5" />
        <ellipse cx="50" cy="168" rx="7" ry="6" fill={BLACK_SOFT} />
      </g>

      {/* right arm (waves) */}
      <g
        className={wave ? 'anim-flap' : ''}
        style={{ transformOrigin: '148px 128px', animationDirection: 'reverse' }}
      >
        <g transform="rotate(18 146 150)">
          <ellipse cx="146" cy="152" rx="15" ry="25" fill={BLACK} stroke={INK} strokeWidth="4.5" />
          <ellipse cx="151" cy="170" rx="7" ry="6" fill={BLACK_SOFT} />
        </g>
      </g>

      {/* ---------- ears (fluffy with inner glow) ---------- */}
      <circle cx="50" cy="33" r="23" fill={BLACK} stroke={INK} strokeWidth="5" />
      <circle cx="50" cy="34" r="12" fill={BLACK_SOFT} />
      <circle cx="45" cy="26" r="5" fill="#6b5b96" opacity="0.85" />
      <circle cx="150" cy="33" r="23" fill={BLACK} stroke={INK} strokeWidth="5" />
      <circle cx="150" cy="34" r="12" fill={BLACK_SOFT} />
      <circle cx="145" cy="26" r="5" fill="#6b5b96" opacity="0.85" />

      {/* ---------- head (big!) ---------- */}
      <circle cx="100" cy="80" r="60" fill="url(#pandaFur)" stroke={INK} strokeWidth="5.5" />

      {/* eye patches — bigger, tilted, hugging the eyes */}
      <ellipse cx="75" cy="76" rx="22" ry="27" fill={BLACK} transform="rotate(-12 75 76)" />
      <ellipse cx="125" cy="76" rx="22" ry="27" fill={BLACK} transform="rotate(12 125 76)" />

      {/* ---------- eyes (big and sparkly) ---------- */}
      {eyesOpen ? (
        <g>
          {[
            { cx: 76, cy: 78 },
            { cx: 124, cy: 78 },
          ].map((e, i) => (
            <g key={i}>
              <circle cx={e.cx} cy={e.cy} r={12.5} fill="#ffffff" />
              <circle cx={e.cx + look.x} cy={e.cy + look.y} r={pupilR + 1.5} fill={INK} />
              <circle cx={e.cx + look.x} cy={e.cy + look.y} r={pupilR} fill="#4a3f63" />
              <circle cx={e.cx + look.x - 2.4} cy={e.cy + look.y - 3} r={3} fill="#ffffff" />
              <circle cx={e.cx + look.x + 2.6} cy={e.cy + look.y + 3.2} r={1.6} fill="#ffffff" opacity="0.9" />
            </g>
          ))}
        </g>
      ) : (
        <g stroke="#ffffff" strokeWidth="4" strokeLinecap="round" fill="none">
          <path d="M67 80q9 7 18 0" />
          <path d="M115 80q9 7 18 0" />
        </g>
      )}

      {/* eyebrows */}
      {mood === 'think' && (
        <g stroke={INK} strokeWidth="4.5" strokeLinecap="round">
          <path d="M59 50l24 7" />
        </g>
      )}
      {mood === 'oops' && (
        <g stroke={INK} strokeWidth="4.5" strokeLinecap="round">
          <path d="M59 52l22 8" />
          <path d="M141 52l-22 8" />
        </g>
      )}
      {mood === 'cheer' && (
        <g stroke={INK} strokeWidth="5" strokeLinecap="round">
          <path d="M60 48q12-9 24-2" />
          <path d="M140 48q-12-9-24-2" />
        </g>
      )}

      {/* ---------- nose + mouth ---------- */}
      <path d="M92 98q8-6 16 0 4 3.5-1.5 7l-6.5 5.5-6.5-5.5q-5.5-3.5-1.5-7z" fill={INK} />
      <ellipse cx="97" cy="101" rx="2.6" ry="1.8" fill="#6b5b96" />

      {mood === 'cheer' || mood === 'wow' ? (
        <g>
          <path d="M100 112q-16 0-16 10.5t16 10.5 16-10.5-16-10.5z" fill="#e02a76" stroke={INK} strokeWidth="4" />
          <path d="M90 128q10 7 20 0" fill={PINK_DEEP} />
          <path d="M87 118q-5-4-3-8M113 118q5-4 3-8" stroke={INK} strokeWidth="3.4" strokeLinecap="round" fill="none" />
        </g>
      ) : mood === 'oops' ? (
        <g>
          <path d="M91 118q9-7 18 0" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : mood === 'sleep' ? (
        <path d="M93 116h14" fill="none" stroke={INK} strokeWidth="4" strokeLinecap="round" />
      ) : (
        <path d="M88 112q12 13 24 0" fill="none" stroke={INK} strokeWidth="4.5" strokeLinecap="round" />
      )}

      {/* blush — big and rosy */}
      <ellipse cx="40" cy="101" rx="12" ry="8" fill={PINK} opacity="0.65" />
      <ellipse cx="160" cy="101" rx="12" ry="8" fill={PINK} opacity="0.65" />
      <ellipse cx="44" cy="100" rx="4" ry="2.6" fill="#ffffff" opacity="0.5" />
      <ellipse cx="156" cy="100" rx="4" ry="2.6" fill="#ffffff" opacity="0.5" />

      {/* glossy highlight */}
      <ellipse cx="100" cy="72" rx="58" ry="60" fill="url(#pandaShine)" pointerEvents="none" opacity="0.55" />

      {/* belly heart — her little signature */}
      <path
        d="M100 160c-9-9-21-3-18 6 2 6 10 11 18 15 8-4 16-9 18-15 3-9-9-15-18-6z"
        fill={PINK}
        opacity="0.85"
      />

      {/* graduation cap — she is a proud learning panda */}
      <g transform="translate(100 12)">
        <path d="M-28 6L0-9 28 6 0 21z" fill="#ffd166" stroke={INK} strokeWidth="4" />
        <path d="M-28 6l4 12q24 10 48 0l4-12" fill="#ffb703" stroke={INK} strokeWidth="4" strokeLinejoin="round" />
        <path d="M21 8v14" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <circle cx="21" cy="26" r="5" fill="#f9409a" stroke={INK} strokeWidth="3" />
        <circle cx="21" cy="26" r="1.8" fill="#ffffff" opacity="0.8" />
      </g>

      {mood === 'cheer' && (
        <g className="anim-wiggle">
          <path d="M18 46l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#ffd166" stroke={INK} strokeWidth="3" />
          <path d="M176 78l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#7deaa8" stroke={INK} strokeWidth="3" />
          <circle cx="186" cy="36" r="5" fill="#7ddcff" stroke={INK} strokeWidth="3" />
        </g>
      )}

      {mood === 'sleep' && (
        <g className="font-display" fill="#7d6f99" fontSize="20" fontWeight="700">
          <text x="168" y="44">
            z
          </text>
          <text x="182" y="30">
            z
          </text>
        </g>
      )}
    </svg>
  )
}
