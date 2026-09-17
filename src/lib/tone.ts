import type { ToneKey } from '../types'

/* Tailwind needs to see the full class strings at build time, so every
   tone is spelled out here instead of being built with string concat. */

export type Tone = {
  /** solid fill */
  solid: string
  /** soft pastel fill */
  soft: string
  /** text colour on white */
  text: string
  /** border colour */
  border: string
  /** gradient for hero surfaces */
  gradient: string
  /** shadow colour for the 3D button */
  shadow: string
  /** small chip / pill */
  chip: string
  /** progress bar fill */
  bar: string
  /** glow */
  glow: string
}

export const TONES: Record<ToneKey, Tone> = {
  sun: {
    solid: 'bg-sun-400',
    soft: 'bg-sun-100',
    text: 'text-sun-700',
    border: 'border-sun-500',
    gradient: 'from-sun-200 via-sun-300 to-sun-400',
    shadow: 'shadow-[0_4px_0_0_#a2691d]',
    chip: 'bg-sun-100 text-sun-700',
    bar: 'bg-sun-400',
    glow: 'shadow-[0_0_28px_rgba(245,198,92,0.6)]',
  },
  grape: {
    solid: 'bg-grape-400',
    soft: 'bg-grape-100',
    text: 'text-grape-700',
    border: 'border-grape-500',
    gradient: 'from-grape-200 via-grape-300 to-grape-400',
    shadow: 'shadow-[0_4px_0_0_#57437a]',
    chip: 'bg-grape-100 text-grape-700',
    bar: 'bg-grape-400',
    glow: 'shadow-[0_0_28px_rgba(169,143,219,0.6)]',
  },
  sky: {
    solid: 'bg-sky-400',
    soft: 'bg-sky-100',
    text: 'text-sky-700',
    border: 'border-sky-500',
    gradient: 'from-sky-200 via-sky-300 to-sky-400',
    shadow: 'shadow-[0_4px_0_0_#3a6884]',
    chip: 'bg-sky-100 text-sky-700',
    bar: 'bg-sky-400',
    glow: 'shadow-[0_0_28px_rgba(132,195,226,0.6)]',
  },
  grass: {
    solid: 'bg-grass-400',
    soft: 'bg-grass-100',
    text: 'text-grass-700',
    border: 'border-grass-500',
    gradient: 'from-grass-200 via-grass-300 to-grass-400',
    shadow: 'shadow-[0_4px_0_0_#3e6e53]',
    chip: 'bg-grass-100 text-grass-700',
    bar: 'bg-grass-400',
    glow: 'shadow-[0_0_28px_rgba(136,201,161,0.6)]',
  },
  berry: {
    solid: 'bg-berry-400',
    soft: 'bg-berry-100',
    text: 'text-berry-700',
    border: 'border-berry-500',
    gradient: 'from-berry-200 via-berry-300 to-berry-400',
    shadow: 'shadow-[0_4px_0_0_#8d4a67]',
    chip: 'bg-berry-100 text-berry-700',
    bar: 'bg-berry-400',
    glow: 'shadow-[0_0_28px_rgba(231,157,184,0.6)]',
  },
  coral: {
    solid: 'bg-coral-400',
    soft: 'bg-coral-100',
    text: 'text-coral-700',
    border: 'border-coral-500',
    gradient: 'from-coral-200 via-coral-300 to-coral-400',
    shadow: 'shadow-[0_4px_0_0_#98503d]',
    chip: 'bg-coral-100 text-coral-700',
    bar: 'bg-coral-400',
    glow: 'shadow-[0_0_28px_rgba(237,166,141,0.6)]',
  },
}

export const TONE_ORDER: ToneKey[] = ['sun', 'grape', 'sky', 'grass', 'berry', 'coral']

/** darker shade used for the 3D button shadow */
export const TONE_DARK: Record<ToneKey, string> = {
  sun: '#a2691d',
  grape: '#57437a',
  sky: '#3a6884',
  grass: '#3e6e53',
  berry: '#8d4a67',
  coral: '#98503d',
}

/** hex values for SVG / canvas use where Tailwind classes don't apply */
export const TONE_HEX: Record<ToneKey, string> = {
  sun: '#f5c65c',
  grape: '#a98fdb',
  sky: '#84c3e2',
  grass: '#88c9a1',
  berry: '#e79db8',
  coral: '#eda68d',
}

export function tone(key: ToneKey | undefined): Tone {
  return TONES[key ?? 'grape']
}
