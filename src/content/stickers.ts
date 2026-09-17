/* Spend-your-gems sticker shop — a little reward loop that isn't
   tied to more screen time. */

export type Sticker = {
  id: string
  icon: string
  name: string
  price: number
}

export const STICKERS: Sticker[] = [
  { id: 'st-sun', icon: 'sunHappy', name: 'Happy Sun', price: 5 },
  { id: 'st-rainbow', icon: 'rainbow', name: 'Rainbow', price: 8 },
  { id: 'st-rocket', icon: 'rocket', name: 'Rocket', price: 10 },
  { id: 'st-cupcake', icon: 'cupcake', name: 'Cupcake', price: 8 },
  { id: 'st-dino', icon: 'tRex', name: 'Dino Friend', price: 12 },
  { id: 'st-unicorn', icon: 'unicorn', name: 'Unicorn', price: 14 },
  { id: 'st-crown', icon: 'crown', name: 'Crown', price: 18 },
  { id: 'st-dragon', icon: 'dragon', name: 'Dragon', price: 20 },
  { id: 'st-planet', icon: 'planet', name: 'Planet', price: 16 },
  { id: 'st-fireworks', icon: 'fireworks', name: 'Fireworks', price: 22 },
  { id: 'st-treasure', icon: 'gem', name: 'Diamond', price: 25 },
  { id: 'st-trophy', icon: 'trophy', name: 'Golden Trophy', price: 30 },
]

export function stickerById(id: string): Sticker | undefined {
  return STICKERS.find((s) => s.id === id)
}
