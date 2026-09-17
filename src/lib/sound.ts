/* ============================================================
   Poli sound engine
   All effects are synthesized with the Web Audio API, so there
   are zero audio assets to download and everything stays tiny.
   Every sound is short, soft and encouraging — a wrong answer
   gets a gentle "try again" bloop, never a scary buzz.
   ============================================================ */

type Ctx = AudioContext & { poliMaster?: GainNode }

let ctx: Ctx | null = null
let master: GainNode | null = null
let enabled = true
let musicOn = false

/* ---------------- note helpers ---------------- */

const A4 = 440
function midiToFreq(midi: number): number {
  return A4 * Math.pow(2, (midi - 69) / 12)
}

/** C major-ish friendly scale, MIDI numbers */
const N = {
  C4: 60,
  D4: 62,
  E4: 64,
  F4: 65,
  G4: 67,
  A4: 69,
  B4: 71,
  C5: 72,
  D5: 74,
  E5: 76,
  G5: 79,
  A5: 81,
  C6: 84,
  E6: 88,
  G6: 91,
}

function ensure(): Ctx | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC: typeof AudioContext | undefined =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    try {
      ctx = new AC() as Ctx
      master = ctx.createGain()
      master.gain.value = 0.5
      master.connect(ctx.destination)
    } catch {
      return null
    }
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

/** Warm up the audio graph from a user gesture. */
export function unlockAudio(): void {
  ensure()
}

/* ---------------- haptics ----------------
   A short buzz on phones and tablets makes a tap feel like it
   landed. Silently does nothing anywhere else. */

let hapticsOn = true

export function setHapticsEnabled(on: boolean): void {
  hapticsOn = on
}

/**
 * @param pattern a length in ms, or an on/off pattern like [14, 50, 14]
 */
export function haptic(pattern: number | number[] = 16): void {
  if (!hapticsOn || typeof navigator === 'undefined') return
  if (typeof navigator.vibrate !== 'function') return
  try {
    navigator.vibrate(pattern)
  } catch {
    /* some browsers refuse without a gesture — harmless */
  }
}

type ToneOpts = {
  freq: number
  at?: number
  dur?: number
  type?: OscillatorType
  gain?: number
  slideTo?: number
  attack?: number
}

function tone(o: ToneOpts): void {
  const c = ensure()
  if (!c || !master || !enabled) return
  const t0 = c.currentTime + (o.at ?? 0)
  const dur = o.dur ?? 0.16
  const osc = c.createOscillator()
  const g = c.createGain()
  osc.type = o.type ?? 'sine'
  osc.frequency.setValueAtTime(o.freq, t0)
  if (o.slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(40, o.slideTo), t0 + dur)
  const peak = (o.gain ?? 0.2) * 0.9
  const attack = o.attack ?? 0.012
  g.gain.setValueAtTime(0.0001, t0)
  g.gain.exponentialRampToValueAtTime(peak, t0 + attack)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  osc.connect(g)
  g.connect(master)
  osc.start(t0)
  osc.stop(t0 + dur + 0.05)
}

function noise(o: { at?: number; dur?: number; gain?: number; from?: number; to?: number }): void {
  const c = ensure()
  if (!c || !master || !enabled) return
  const t0 = c.currentTime + (o.at ?? 0)
  const dur = o.dur ?? 0.3
  const frames = Math.floor(c.sampleRate * dur)
  const buffer = c.createBuffer(1, frames, c.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < frames; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / frames)
  const src = c.createBufferSource()
  src.buffer = buffer
  const filter = c.createBiquadFilter()
  filter.type = 'bandpass'
  filter.Q.value = 1.1
  filter.frequency.setValueAtTime(o.from ?? 700, t0)
  filter.frequency.exponentialRampToValueAtTime(Math.max(60, o.to ?? 2600), t0 + dur)
  const g = c.createGain()
  g.gain.setValueAtTime(o.gain ?? 0.16, t0)
  g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur)
  src.connect(filter)
  filter.connect(g)
  g.connect(master)
  src.start(t0)
}

function arpeggio(notes: number[], o: { gap?: number; dur?: number; gain?: number; type?: OscillatorType } = {}): void {
  const gap = o.gap ?? 0.075
  notes.forEach((n, i) => {
    tone({
      freq: midiToFreq(n),
      at: i * gap,
      dur: o.dur ?? 0.2,
      gain: o.gain ?? 0.16,
      type: o.type ?? 'triangle',
    })
  })
}

/* ---------------- the kit ---------------- */

export const sfx = {
  click(): void {
    tone({ freq: 760, dur: 0.07, type: 'sine', gain: 0.16, slideTo: 1180 })
  },
  tap(): void {
    tone({ freq: 520, dur: 0.06, type: 'triangle', gain: 0.14, slideTo: 880 })
  },
  pop(): void {
    tone({ freq: 340, dur: 0.09, type: 'sine', gain: 0.19, slideTo: 1020 })
  },
  select(): void {
    tone({ freq: midiToFreq(N.E5), dur: 0.1, type: 'triangle', gain: 0.15 })
  },
  unselect(): void {
    tone({ freq: midiToFreq(N.C5), dur: 0.09, type: 'triangle', gain: 0.11 })
  },
  correct(): void {
    arpeggio([N.C5, N.E5, N.G5, N.C6], { gap: 0.062, dur: 0.22, gain: 0.15 })
    tone({ freq: midiToFreq(N.C6), at: 0.26, dur: 0.34, gain: 0.09, type: 'sine' })
  },
  wrong(): void {
    /* soft and bouncy, never harsh */
    tone({ freq: midiToFreq(N.G4), dur: 0.13, type: 'sine', gain: 0.13 })
    tone({ freq: midiToFreq(N.E4), at: 0.12, dur: 0.2, type: 'sine', gain: 0.11 })
  },
  star(): void {
    tone({ freq: 1400, dur: 0.1, type: 'sine', gain: 0.1 })
    tone({ freq: 2100, at: 0.045, dur: 0.16, type: 'sine', gain: 0.07 })
  },
  coin(): void {
    tone({ freq: midiToFreq(N.E6), dur: 0.06, type: 'square', gain: 0.07 })
    tone({ freq: midiToFreq(N.B4), at: 0.05, dur: 0.22, type: 'square', gain: 0.06 })
  },
  whoosh(): void {
    noise({ dur: 0.26, gain: 0.11, from: 400, to: 2400 })
  },
  drop(): void {
    noise({ dur: 0.16, gain: 0.09, from: 1800, to: 300 })
    tone({ freq: 190, dur: 0.12, type: 'sine', gain: 0.13 })
  },
  win(): void {
    arpeggio([N.C5, N.E5, N.G5, N.C6, N.E6, N.G6], { gap: 0.085, dur: 0.3, gain: 0.15 })
    arpeggio([N.C6, N.E6], { gap: 0.1, dur: 0.5, gain: 0.08 })
    noise({ at: 0.5, dur: 0.7, gain: 0.07, from: 1200, to: 5200 })
  },
  badge(): void {
    arpeggio([N.G4, N.A4, N.C5, N.D5, N.E5, N.G5], { gap: 0.055, dur: 0.26, gain: 0.14 })
    noise({ at: 0.3, dur: 0.5, gain: 0.06, from: 2000, to: 6000 })
  },
  streak(): void {
    arpeggio([N.E5, N.G5, N.A5, N.C6], { gap: 0.05, dur: 0.2, gain: 0.12 })
  },
  tick(): void {
    tone({ freq: 1250, dur: 0.035, type: 'square', gain: 0.05 })
  },
  cheer(): void {
    noise({ dur: 1.1, gain: 0.09, from: 500, to: 3600 })
    arpeggio([N.C5, N.D5, N.E5, N.G5, N.A5, N.C6, N.E6], { gap: 0.07, dur: 0.4, gain: 0.12 })
  },
  setEnabled(on: boolean): void {
    enabled = on
    if (!on) stopMusic()
  },
  isEnabled(): boolean {
    return enabled
  },
}

/* ---------------- gentle background music ----------------
   A slow, soft pentatonic lullaby loop. Deliberately quiet —
   it should feel like a friendly room, not a soundtrack. */

let musicTimer: number | null = null

const LULLABY = [N.C5, N.E5, N.G5, N.E5, N.A4, N.C5, N.E5, N.D5, N.G4, N.B4, N.D5, N.G5, N.F4, N.A4, N.C5, N.E5]

function musicStep(index: number): void {
  if (!enabled || !musicOn) return
  const note = LULLABY[index % LULLABY.length]
  tone({ freq: midiToFreq(note), dur: 1.1, gain: 0.035, type: 'sine', attack: 0.22 })
  if (index % 4 === 0) {
    tone({ freq: midiToFreq(note - 24), dur: 1.9, gain: 0.028, type: 'sine', attack: 0.3 })
  }
}

export function startMusic(): void {
  if (musicOn) return
  musicOn = true
  let i = 0
  musicStep(0)
  musicTimer = window.setInterval(() => {
    i += 1
    musicStep(i)
  }, 1150)
}

export function stopMusic(): void {
  musicOn = false
  if (musicTimer !== null) {
    window.clearInterval(musicTimer)
    musicTimer = null
  }
}

export function setMusicEnabled(on: boolean): void {
  if (on) startMusic()
  else stopMusic()
}
