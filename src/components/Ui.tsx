import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useEffect, useRef } from 'react'
import type { ToneKey } from '../types'
import { TONE_DARK, tone as toneOf } from '../lib/tone'
import { sfx } from '../lib/sound'
import { speak, stopSpeaking } from '../lib/speech'
import { useSettings } from '../lib/settings'
import { Icon } from '../icons'

/* ------------------------------------------------------------
   Buttons — chunky, pushable, satisfying
   ------------------------------------------------------------ */
export type BtnTone = ToneKey | 'white'

type BtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  tone?: BtnTone
  variant?: 'solid' | 'white' | 'outline' | 'mint'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  icon?: ReactNode
  full?: boolean
  silent?: boolean
}

const SIZES: Record<NonNullable<BtnProps['size']>, string> = {
  sm: 'px-4 py-2 text-base rounded-2xl',
  md: 'px-6 py-3 text-xl rounded-3xl',
  lg: 'px-8 py-4 text-2xl rounded-[1.6rem]',
  xl: 'px-10 py-6 text-3xl rounded-[1.9rem]',
}

export function Btn({
  tone = 'grape',
  variant = 'solid',
  size = 'md',
  icon,
  full,
  silent,
  className = '',
  children,
  onClick,
  disabled,
  ...rest
}: BtnProps) {
  /* tone="white" means "plain white button" — the most common choice here */
  const t = tone === 'white' ? null : toneOf(tone)
  const variantClass =
    variant === 'outline'
      ? 'bg-white/70 text-ink-900'
      : variant === 'mint'
        ? 'bg-gradient-to-b from-grass-300 to-grass-500 text-white'
        : t
          ? `bg-gradient-to-b ${t.gradient} text-white`
          : 'bg-white text-ink-900'
  const shadow = variant === 'mint' ? TONE_DARK.grass : t ? TONE_DARK[tone as ToneKey] : '#aaacb8'

  return (
    <button
      {...rest}
      disabled={disabled}
      className={`btn3d ${SIZES[size]} ${variantClass} ${full ? 'w-full' : ''} ${className}`}
      style={{ ...rest.style, ['--btn-shadow' as string]: shadow }}
      onClick={(e) => {
        if (!silent) sfx.click()
        onClick?.(e)
      }}
    >
      {icon && <span className="leading-none">{icon}</span>}
      <span>{children}</span>
    </button>
  )
}

type IconBtnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string
  tone?: BtnTone
  active?: boolean
  size?: number
}

export function IconBtn({ label, tone = 'white', active, size = 52, className = '', children, onClick, ...rest }: IconBtnProps) {
  const t = tone === 'white' ? null : toneOf(tone)
  return (
    <button
      {...rest}
      aria-label={label}
      title={label}
      style={{ width: size, height: size, ['--btn-shadow' as string]: t ? TONE_DARK[tone as ToneKey] : '#aaacb8' }}
      className={`btn3d shrink-0 p-0 text-[1.4rem] ${
        t ? `bg-gradient-to-b ${t.gradient} text-white` : 'bg-white text-ink-900'
      } ${active ? 'ring-4 ring-sun-400' : ''} ${className}`}
      onClick={(e) => {
        sfx.tap()
        onClick?.(e)
      }}
    >
      <span className="leading-none">{children}</span>
    </button>
  )
}

/** Re-hear the question button — pinned next to every prompt. */
export function SpeakBtn({ text, size = 56 }: { text: string; size?: number }) {
  const { settings } = useSettings()
  return (
    <IconBtn
      label="Read it to me"
      tone={settings.voice ? 'sky' : 'white'}
      size={size}
      onClick={() => {
        if (!settings.voice) return
        stopSpeaking()
        speak(text, { rate: 0.88 })
      }}
    >
      <Icon name={settings.voice ? 'speaker' : 'speakerOff'} size={size * 0.5} color="currentColor" />
    </IconBtn>
  )
}

/* ------------------------------------------------------------
   Surfaces
   ------------------------------------------------------------ */
export function Panel({
  children,
  className = '',
  tone,
  pad = 'md',
}: {
  children: ReactNode
  className?: string
  tone?: ToneKey
  pad?: 'none' | 'sm' | 'md' | 'lg'
}) {
  const padding = { none: '', sm: 'p-3', md: 'p-5', lg: 'p-7' }[pad]
  return (
    <div className={`card3d ${tone ? toneOf(tone).soft : 'bg-white'} ${padding} ${className}`}>{children}</div>
  )
}

export function Chip({ children, tone = 'grape', className = '' }: { children: ReactNode; tone?: ToneKey; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-[3px] border-ink-900/80 px-3 py-1 font-display text-sm font-semibold ${toneOf(tone).soft} ${toneOf(tone).text} ${className}`}
    >
      {children}
    </span>
  )
}

/* ------------------------------------------------------------
   Stars
   ------------------------------------------------------------ */
export function Stars({
  value,
  max = 3,
  size = 30,
  animate = false,
}: {
  value: number
  max?: number
  size?: number
  animate?: boolean
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${value} of ${max} stars`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          style={{
            animation: animate && i < value ? `poli-blossom 0.55s cubic-bezier(0.34,1.56,0.64,1) ${0.18 * i}s both` : undefined,
            filter: i < value ? 'drop-shadow(0 2px 0 rgba(0,0,0,0.25))' : 'grayscale(1) opacity(0.32)',
          }}
          className="leading-none"
        >
          <Icon name="star" size={size} />
        </span>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------
   Progress bar with a shimmer
   ------------------------------------------------------------ */
export function Bar({
  value,
  max = 100,
  tone = 'grass',
  height = 22,
  showShimmer = true,
  className = '',
}: {
  value: number
  max?: number
  tone?: ToneKey
  height?: number
  showShimmer?: boolean
  className?: string
}) {
  const pct = max <= 0 ? 0 : Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className={`relative w-full overflow-hidden rounded-full border-[2.5px] border-ink-900/70 bg-ink-100/70 ${className}`}
      style={{ height }}
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`relative h-full rounded-full bg-gradient-to-b ${toneOf(tone).gradient} transition-[width] duration-700 ease-out`}
        style={{ width: `${pct}%` }}
      >
        {/* gentle stripes march along the fill so progress always looks alive */}
        {showShimmer && pct > 6 && <span className="bar-stripes absolute inset-0 rounded-full opacity-60" />}
        {showShimmer && pct > 6 && (
          <span className="absolute inset-y-0 left-0 w-10 bg-white/60 blur-[3px]" style={{ animation: 'poli-shimmer 2.4s ease-in-out infinite' }} />
        )}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   Toggle switch
   ------------------------------------------------------------ */
export function Toggle({ on, onChange, label }: { on: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={() => {
        sfx.tap()
        onChange(!on)
      }}
      className={`relative h-10 w-[4.5rem] shrink-0 rounded-full border-[3px] border-ink-900 transition-colors duration-200 ${
        on ? 'bg-mint-400' : 'bg-ink-200'
      }`}
    >
      <span
        className={`absolute top-0.5 h-7 w-7 rounded-full border-[2.5px] border-ink-900 bg-white transition-all duration-200 ${
          on ? 'left-[2.1rem]' : 'left-0.5'
        }`}
      />
      <span className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
        <span className={`grid h-5 w-5 place-items-center rounded-full bg-white/90 ${on ? 'opacity-100' : 'opacity-0'}`}>
          <Icon name="check" size={12} color="#3e6e53" />
        </span>
        <span className={`grid h-5 w-5 place-items-center rounded-full bg-white/90 ${on ? 'opacity-0' : 'opacity-100'}`}>
          <Icon name="cross" size={11} color="#98503d" />
        </span>
      </span>
    </button>
  )
}

/* ------------------------------------------------------------
   Modal
   ------------------------------------------------------------ */
export function Modal({
  open,
  onClose,
  children,
  title,
  wide,
  closable = true,
}: {
  open: boolean
  onClose: () => void
  children: ReactNode
  title?: string
  wide?: boolean
  closable?: boolean
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && closable) onClose()
    }
    window.addEventListener('keydown', onKey)
    ref.current?.focus()
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, closable])

  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-3 sm:items-center sm:p-6">
      <button
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-ink-900/45 backdrop-blur-sm anim-fade"
        onClick={() => closable && onClose()}
      />
      <div
        ref={ref}
        tabIndex={-1}
        className={`anim-bounce-in relative w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} card3d max-h-[92vh] overflow-y-auto bg-white p-5 sm:p-7`}
      >
        {(title || closable) && (
          <div className="mb-4 flex items-start justify-between gap-3">
            {title && <h2 className="font-display text-2xl text-ink-900 sm:text-3xl">{title}</h2>}
            {closable && (
              <IconBtn label="Close" size={46} onClick={onClose} className="ml-auto">
                <Icon name="close" size={22} color="currentColor" />
              </IconBtn>
            )}
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------
   Reward floater — "+20 XP" rising off the screen
   ------------------------------------------------------------ */
export function Floater({ children, tone = 'sun' }: { children: ReactNode; tone?: ToneKey }) {
  return (
    <div
      className={`pointer-events-none font-display text-2xl font-bold ${toneOf(tone).text}`}
      style={{ animation: 'poli-rise 1.5s ease-out both' }}
    >
      {children}
    </div>
  )
}
