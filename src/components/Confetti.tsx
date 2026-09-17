import { useEffect, useMemo } from 'react'
import { useState } from 'react'
import { Icon } from '../icons'

const PARTY = [
  'party',
  'star',
  'starGlow',
  'balloon',
  'sparkle',
  'medal',
  'sparkleSwirl',
  'lollipop',
  'fireworks',
  'rainbow',
  'gem',
  'donut',
]

/* ------------------------------------------------------------
   Confetti burst — rains Poli pictures down the screen
   ------------------------------------------------------------ */
export function Confetti({
  active,
  count = 44,
  duration = 3200,
  icons = PARTY,
}: {
  active: boolean
  count?: number
  duration?: number
  icons?: string[]
}) {
  const [show, setShow] = useState(active)
  useEffect(() => {
    if (!active) return
    setShow(true)
    const t = window.setTimeout(() => setShow(false), duration)
    return () => window.clearTimeout(t)
  }, [active, duration])

  const pieces = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        icon: icons[i % icons.length],
        left: Math.random() * 100,
        delay: Math.random() * 1.4,
        dur: 2.1 + Math.random() * 1.7,
        size: 22 + Math.random() * 26,
        tilt: Math.random() * 360,
        sway: 1.6 + Math.random() * 1.6,
      })),
    [count, icons],
  )

  if (!show) return null
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden" aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute top-0"
          style={{
            left: `${p.left}%`,
            animation: `poli-fall ${p.dur}s cubic-bezier(0.3,0.6,0.5,1) ${p.delay}s both`,
            transform: `rotate(${p.tilt}deg)`,
          }}
        >
          {/* an inner wobble makes each piece sway on the way down */}
          <span
            className="block"
            style={{
              animation: `poli-wobble ${p.sway}s ease-in-out infinite`,
              filter: 'drop-shadow(0 3px 3px rgba(43,33,64,0.22))',
            }}
          >
            <Icon name={p.icon} size={p.size} />
          </span>
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------
   Starburst — a ring of sparkles blasting out of a point
   ------------------------------------------------------------ */
export function Starburst({
  active,
  icon = 'sparkle',
  count = 12,
}: {
  active: boolean
  icon?: string
  count?: number
}) {
  if (!active) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-30" aria-hidden>
      {Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2
        const dist = 80 + Math.random() * 70
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2"
            style={{
              ['--bx' as string]: `${Math.cos(angle) * dist}px`,
              ['--by' as string]: `${Math.sin(angle) * dist}px`,
              animation: `poli-burst 0.9s ease-out ${i * 0.03}s both`,
            }}
          >
            <Icon name={icon} size={34} />
          </span>
        )
      })}
    </div>
  )
}

/* ------------------------------------------------------------
   Picture rain — used on the results screen
   ------------------------------------------------------------ */
export function IconRain({ icons, count = 18 }: { icons: string[]; count?: number }) {
  const drops = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        icon: icons[i % icons.length],
        left: Math.random() * 100,
        delay: Math.random() * 3,
        dur: 4 + Math.random() * 4,
        size: 22 + Math.random() * 22,
      })),
    [icons, count],
  )
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {drops.map((d) => (
        <span
          key={d.id}
          className="absolute top-0 opacity-70"
          style={{
            left: `${d.left}%`,
            animation: `poli-fall ${d.dur}s linear ${d.delay}s infinite`,
          }}
        >
          <Icon name={d.icon} size={d.size} />
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------
   The animated world behind everything.
   Day: a bright arcade sky — puffy clouds, balloons, a beaming
   sun and rolling green hills. Night: moon and twinkling stars.
   ------------------------------------------------------------ */
export function Scenery({ variant = 'day' }: { variant?: 'day' | 'sunset' | 'night' }) {
  const night = variant === 'night'
  const sky = night
    ? 'from-[#232c3a] via-[#33414f] to-[#4d5f6e]'
    : variant === 'sunset'
      ? 'from-[#ffe3ad] via-[#ffd3e8] to-[#e4d6ff]'
      : 'from-[#7ddcff] via-[#c3ecff] to-[#fff9ee]'

  return (
    <div
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-gradient-to-b ${sky}`}
      style={{ backgroundSize: '200% 200%', animation: 'poli-bg-pan 28s linear infinite alternate' }}
      aria-hidden
    >
      {/* soft colour blobs that morph and float */}
      {[
        { top: '-8%', left: '-6%', size: 340, color: night ? '#4d5f6e' : '#ffffff', delay: 0, opacity: night ? 0.3 : 0.6 },
        { top: '40%', left: '62%', size: 300, color: night ? '#5ea6c9' : '#fff1d6', delay: 4, opacity: night ? 0.2 : 0.5 },
        { top: '68%', left: '4%', size: 260, color: night ? '#66ae82' : '#c3ecff', delay: 8, opacity: night ? 0.22 : 0.5 },
      ].map((b, i) => (
        <div
          key={i}
          className="anim-blob absolute blur-[2px]"
          style={{
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            background: b.color,
            opacity: b.opacity,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* beaming sun by day, moon after dark */}
      {night ? (
        <div className="anim-float-drift absolute -right-8 top-2">
          <span
            className="absolute inset-0 rounded-full"
            style={{ boxShadow: '0 0 90px 26px rgba(255,246,214,0.35)' }}
          />
          <Icon name="fullMoon" size={128} />
          <span className="anim-twinkle absolute -left-6 top-4 opacity-80">
            <Icon name="sparkle" size={26} />
          </span>
          <span className="anim-twinkle absolute -left-12 top-16 opacity-70" style={{ animationDelay: '0.9s' }}>
            <Icon name="sparkle" size={18} />
          </span>
        </div>
      ) : (
        <div className="anim-float-lg absolute -right-6 -top-6">
          <span className="absolute inset-0 rounded-full" style={{ boxShadow: '0 0 110px 40px rgba(255,215,100,0.65)' }} />
          <Icon name="sunHappy" size={150} />
        </div>
      )}

      {/* big puffy clouds */}
      {[
        { top: '8%', dur: 58, size: 1, opacity: night ? 0.3 : 1 },
        { top: '20%', dur: 82, size: 0.72, opacity: night ? 0.24 : 0.85 },
        { top: '4%', dur: 100, size: 0.55, opacity: night ? 0.18 : 0.7 },
        { top: '30%', dur: 130, size: 0.9, opacity: night ? 0.16 : 0.6 },
      ].map((c, i) => (
        <div
          key={i}
          className="absolute"
          style={{
            top: c.top,
            opacity: c.opacity,
            filter: 'drop-shadow(0 6px 10px rgba(43,34,68,0.14))',
            animation: `poli-drift ${c.dur}s linear ${-i * 16}s infinite`,
          }}
        >
          <Icon name="cloud" size={92 * c.size} />
        </div>
      ))}

      {/* hot-air balloons climbing across the sky */}
      {!night &&
        [
          { delay: 0, dur: 74, top: '58%', size: 62 },
          { delay: 26, dur: 96, top: '70%', size: 42 },
        ].map((b, i) => (
          <div
            key={i}
            className="absolute"
            style={{ top: b.top, animation: `poli-balloon ${b.dur}s linear ${-b.delay}s infinite` }}
          >
            <span className="anim-wobble block" style={{ animationDuration: '3.6s' }}>
              <Icon name="balloon" size={b.size} />
            </span>
          </div>
        ))}

      {/* a couple of birds gliding the other way */}
      {['42%', '50%'].map((top, i) => (
        <div
          key={top}
          className="absolute"
          style={{ top, animation: `poli-drift ${70 + i * 26}s linear ${-i * 22}s infinite reverse` }}
        >
          <span className="anim-flap block" style={{ animationDuration: `${0.9 + i * 0.3}s` }}>
            <Icon name="bird" size={34 - i * 6} />
          </span>
        </div>
      ))}

      {/* a rainbow arc on bright days */}
      {!night && (
        <div className="absolute left-[6%] top-[16%] opacity-70">
          <Icon name="rainbow" size={110} />
        </div>
      )}

      {/* stars at night */}
      {night &&
        Array.from({ length: 22 }, (_, i) => (
          <span
            key={i}
            className="anim-twinkle absolute"
            style={{
              left: `${(i * 37) % 100}%`,
              top: `${(i * 53) % 62}%`,
              animationDelay: `${(i % 7) * 0.45}s`,
              animationDuration: `${2.2 + (i % 5) * 0.6}s`,
            }}
          >
            <Icon name="sparkle" size={8 + (i % 4) * 4} />
          </span>
        ))}

      {/* rolling hills */}
      <svg className="absolute -bottom-6 left-0 w-full" viewBox="0 0 1440 240" preserveAspectRatio="none" style={{ height: '30vh' }}>
        <path
          d="M0 120c180-70 300 40 480 10s300-90 480-40 300 80 480 40v120H0z"
          fill={night ? '#3b4d5c' : '#7deaa8'}
          opacity={night ? 0.5 : 0.9}
        />
        <path d="M0 170c200-50 320 30 520 10s320-70 480-30 260 60 440 30v70H0z" fill={night ? '#2f3f4c' : '#3ddc84'} />
        <path d="M0 208c240-30 360 20 560 6s340-40 520-16 220 30 360 16v40H0z" fill={night ? '#24323d' : '#16c26c'} />
      </svg>
    </div>
  )
}
