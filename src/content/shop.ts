/* ============================================================
   The Poli shop — things kids buy with the coins they earn.

   Two kinds of treasure:
   • accessories — little things their buddy can wear
   • themes — whole-app colour makeovers

   Everything is bought once and owned forever. Wearing and
   unwearing is free.
   ============================================================ */
import type { ToneKey } from '../types'

export type ShopKind = 'accessory' | 'theme'

export type ShopItem = {
  id: string
  kind: ShopKind
  name: string
  icon: string
  price: number
  /** for themes: the name of a CSS colour used for previews */
  swatch?: string
  /** which UI tone family the theme recolours — used for the preview chip */
  tone?: ToneKey
}

/* Accessories — worn by the avatar everywhere it appears. */
export const ACCESSORIES: ShopItem[] = [
  { id: 'ac-crown', kind: 'accessory', name: 'Royal Crown', icon: 'crown', price: 30 },
  { id: 'ac-party', kind: 'accessory', name: 'Party Hat', icon: 'party', price: 18 },
  { id: 'ac-bow', kind: 'accessory', name: 'Pink Bow', icon: 'bow', price: 15 },
  { id: 'ac-glasses', kind: 'accessory', name: 'Cool Shades', icon: 'sunglasses', price: 20 },
  { id: 'ac-cap', kind: 'accessory', name: 'Explorer Cap', icon: 'hat', price: 20 },
  { id: 'ac-scarf', kind: 'accessory', name: 'Cozy Scarf', icon: 'scarf', price: 22 },
]

/* Themes — whole-app colour makeovers (bubbles, sky, sunset). */
export const THEMES: ShopItem[] = [
  {
    id: 'classic',
    kind: 'theme',
    name: 'Classic Mint',
    icon: 'leafSingle',
    price: 0,
    swatch: '#88c9a1',
    tone: 'grass',
  },
  {
    id: 'bubbles',
    kind: 'theme',
    name: 'Bubbly Grape',
    icon: 'bubbles',
    price: 40,
    swatch: '#a98fdb',
    tone: 'grape',
  },
  {
    id: 'skyhigh',
    kind: 'theme',
    name: 'Sky High',
    icon: 'cloud',
    price: 40,
    swatch: '#84c3e2',
    tone: 'sky',
  },
  {
    id: 'sunny',
    kind: 'theme',
    name: 'Sunny Side',
    icon: 'sunHappy',
    price: 55,
    swatch: '#f5c65c',
    tone: 'sun',
  },
  {
    id: 'berry',
    kind: 'theme',
    name: 'Berry Sweet',
    icon: 'strawberry',
    price: 55,
    swatch: '#e79db8',
    tone: 'berry',
  },
  {
    id: 'sunset',
    kind: 'theme',
    name: 'Peach Sunset',
    icon: 'sunset',
    price: 70,
    swatch: '#eda68d',
    tone: 'coral',
  },
]

export const SHOP_ALL: ShopItem[] = [...ACCESSORIES, ...THEMES]

export function shopItemById(id: string): ShopItem | undefined {
  return SHOP_ALL.find((s) => s.id === id)
}

/* ============================================================
   Theme engine — recolours the whole app through CSS variables
   set on <html>, so every screen changes at once.
   ============================================================ */

type ThemeColors = {
  page: string
  accent: string
  accentSoft: string
  accentDeep: string
}

const THEME_COLORS: Record<string, ThemeColors> = {
  classic: { page: '#e8f4ec', accent: '#66ae82', accentSoft: '#d9eee1', accentDeep: '#3e6e53' },
  bubbles: { page: '#f0ecf9', accent: '#8a6fc1', accentSoft: '#e2d9f6', accentDeep: '#57437a' },
  skyhigh: { page: '#e9f3f9', accent: '#5ea6c9', accentSoft: '#d3eaf6', accentDeep: '#3a6884' },
  sunny: { page: '#faf3e4', accent: '#eda93c', accentSoft: '#fdedad', accentDeep: '#a2691d' },
  berry: { page: '#faf0f4', accent: '#d97ba0', accentSoft: '#f9dfe9', accentDeep: '#8d4a67' },
  sunset: { page: '#faf1ec', accent: '#e08464', accentSoft: '#fbe0d6', accentDeep: '#98503d' },
}

/** Paint the CSS variables a theme needs onto <html>. */
export function applyTheme(themeId: string): void {
  if (typeof document === 'undefined') return
  const colors = THEME_COLORS[themeId] ?? THEME_COLORS.classic
  const root = document.documentElement
  root.style.setProperty('--poli-page', colors.page)
  root.style.setProperty('--poli-accent', colors.accent)
  root.style.setProperty('--poli-accent-soft', colors.accentSoft)
  root.style.setProperty('--poli-accent-deep', colors.accentDeep)
  root.dataset.colorTheme = themeId
}

export function themeById(id: string): ShopItem {
  return THEMES.find((t) => t.id === id) ?? THEMES[0]
}
