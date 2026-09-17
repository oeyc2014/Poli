import { Fragment } from 'react'
import type { CSSProperties, ElementType } from 'react'

/* ============================================================
   BouncyText — headline text where every letter hops into place
   and then keeps gently waving.

   Splitting a word into letters would normally scramble what a
   screen reader says, so the letters are hidden from assistive
   tech and the real string is exposed once, behind the scenes.
   ============================================================ */

/** Warm, high-contrast colours for the "rainbow" mode — softened to match the calm palette. */
const PARTY_COLORS = ['#e08464', '#eda93c', '#d1a52a', '#66ae82', '#5ea6c9', '#8a6fc1', '#d97ba0']

type Props = {
  text: string
  className?: string
  /** give every letter its own bright colour */
  rainbow?: boolean
  /** seconds between letter landings */
  stagger?: number
  /** seconds before the first letter lands */
  delay?: number
  /** keep the letters waving once they have landed */
  wave?: boolean
  as?: ElementType
}

export function BouncyText({
  text,
  className = '',
  rainbow = false,
  stagger = 0.055,
  delay = 0,
  wave = true,
  as: Tag = 'span',
}: Props) {
  const words = text.split(' ')
  /* the counter runs across the whole string so the wave ripples through words */
  let index = 0

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, wi) => (
          <Fragment key={wi}>
            {wi > 0 ? ' ' : null}
            <span className="inline-block whitespace-nowrap">
              {[...word].map((char) => {
                const i = index++
                const start = delay + i * stagger
                const style: CSSProperties = {
                  color: rainbow ? PARTY_COLORS[i % PARTY_COLORS.length] : undefined,
                  animation: [
                    `poli-letter-pop 0.55s cubic-bezier(0.34,1.56,0.64,1) ${start}s both`,
                    wave ? `poli-letter-wave 2.6s ease-in-out ${start + 0.7}s infinite` : null,
                  ]
                    .filter(Boolean)
                    .join(', '),
                }
                return (
                  <span key={i} className="bouncy-letter" style={style}>
                    {char}
                  </span>
                )
              })}
            </span>
          </Fragment>
        ))}
      </span>
    </Tag>
  )
}
