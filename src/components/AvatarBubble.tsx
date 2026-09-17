import { Icon } from '../icons'
import { ACCESSORIES, shopItemById } from '../content/shop'
import type { ShopItem } from '../content/shop'

/* ============================================================
   AvatarBubble — the kid's buddy, dressed in whatever they
   bought and equipped in the shop.

   Accessories render as small icons perched around the bubble:
   hats up top, glasses on the face, scarves below.
   ============================================================ */

const HATS = ['ac-crown', 'ac-party', 'ac-cap']
const FACE = ['ac-glasses']
const NECK = ['ac-scarf']

export function AvatarBubble({
  icon,
  color,
  accessories = [],
  size = 64,
  className = '',
}: {
  icon: string
  color: string
  accessories?: string[]
  size?: number
  className?: string
}) {
  const worn = accessories
    .map((id) => shopItemById(id))
    .filter((a): a is ShopItem => a !== undefined && a.kind === 'accessory')

  /* scale accessory size with the bubble */
  const s = (n: number) => Math.round((n / 64) * size)

  const hat = worn.find((a) => HATS.includes(a.id))
  const face = worn.find((a) => FACE.includes(a.id))
  const neck = worn.find((a) => NECK.includes(a.id))

  return (
    <span
      className={`relative inline-grid shrink-0 place-items-center rounded-full border-[3px] border-ink-900 ${className}`}
      style={{ width: size, height: size, background: color }}
    >
      <Icon name={icon} size={s(46)} />
      {hat && (
        <span
          className="anim-float pointer-events-none absolute"
          style={{ top: -s(16), right: -s(8), animationDuration: '5s' }}
        >
          <Icon name={hat.icon} size={s(30)} />
        </span>
      )}
      {face && (
        <span className="pointer-events-none absolute" style={{ top: s(26), left: s(10) }}>
          <Icon name={face.icon} size={s(44)} />
        </span>
      )}
      {neck && (
        <span className="pointer-events-none absolute" style={{ bottom: -s(14), left: -s(6) }}>
          <Icon name={neck.icon} size={s(38)} />
        </span>
      )}
    </span>
  )
}

/** All accessories the kid currently owns but is not wearing. */
export function spareAccessories(worn: string[]): string[] {
  return ACCESSORIES.filter((a) => !worn.includes(a.id)).map((a) => a.id)
}
