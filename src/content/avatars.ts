import type { Avatar } from '../types'

/* Cute animal buddies a kid can pick as their avatar. */

export type AvatarChoice = Avatar & { name: string }

export const AVATARS: AvatarChoice[] = [
  { icon: 'fox', color: '#ff8a3d', name: 'Fox' },
  { icon: 'panda', color: '#7f8c9b', name: 'Panda' },
  { icon: 'frog', color: '#57cc6a', name: 'Frog' },
  { icon: 'unicorn', color: '#c084fc', name: 'Unicorn' },
  { icon: 'octopus', color: '#f472b6', name: 'Octopus' },
  { icon: 'lion', color: '#fbbf24', name: 'Lion' },
  { icon: 'koala', color: '#94a3b8', name: 'Koala' },
  { icon: 'monkey', color: '#c2833f', name: 'Monkey' },
  { icon: 'tiger', color: '#fb923c', name: 'Tiger' },
  { icon: 'pig', color: '#f9a8d4', name: 'Pig' },
  { icon: 'penguin', color: '#38bdf8', name: 'Penguin' },
  { icon: 'bee', color: '#facc15', name: 'Bee' },
  { icon: 'owl', color: '#8b5cf6', name: 'Owl' },
  { icon: 'turtle', color: '#34d399', name: 'Turtle' },
  { icon: 'longneck', color: '#22d3ee', name: 'Dino' },
  { icon: 'whale', color: '#60a5fa', name: 'Whale' },
  { icon: 'tRex', color: '#4ade80', name: 'Rex' },
  { icon: 'octopus', color: '#fb7185', name: 'Inky' },
]

export function avatarFor(index: number): AvatarChoice {
  return AVATARS[index % AVATARS.length]
}
