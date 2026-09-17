import { useEffect, useState } from 'react'
import { useSettings } from '../lib/settings'

/* ============================================================
   TapRipple — a colourful ring blooms out of every button press.

   Purely decorative (pointer-events: none), attached only to
   anything that is actually tappable, and skipped entirely when
   the Calm animations setting is on.
   ============================================================ */

const COLORS = ['#ff5a3c', '#ffa928', '#34d399', '#33c4ff', '#7c3aed', '#ff5fa2']

/** Only these really are "a button" — no ripple anywhere else. */
const TAPPABLE = 'button, a, [role="switch"], [role="button"]'

type Ripple = { id: number; x: number; y: number; color: string; size: number }

export function TapRipple() {
  const { settings } = useSettings()
  const [ripples, setRipples] = useState<Ripple[]>([])

  useEffect(() => {
    /* Respect the same switches the CSS does. */
    if (settings.calmMotion) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let nextId = 0
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest?.(TAPPABLE)) return

      const id = nextId++
      const size = 54 + Math.random() * 22
      const ripple: Ripple = {
        id,
        x: e.clientX,
        y: e.clientY,
        size,
        color: COLORS[id % COLORS.length],
      }
      setRipples((prev) => [...prev, ripple])
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id))
      }, 620)
    }

    window.addEventListener('pointerdown', onDown, { passive: true })
    return () => window.removeEventListener('pointerdown', onDown)
  }, [settings.calmMotion])

  if (ripples.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden" aria-hidden>
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: 'absolute',
            left: r.x - r.size / 2,
            top: r.y - r.size / 2,
            width: r.size,
            height: r.size,
            borderRadius: '50%',
            border: `4px solid ${r.color}`,
            animation: 'poli-ring 0.6s cubic-bezier(0.22, 1.2, 0.36, 1) both',
          }}
        />
      ))}
    </div>
  )
}
