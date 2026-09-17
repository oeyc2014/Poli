/* ============================================================
   Poli read-to-me — now with a real AI voice
   ------------------------------------------------------------
   Poli talks with "Kokoro" (kokoro-js), a tiny neural TTS model
   that runs entirely inside the browser. No API key, no server,
   free forever (Apache-2.0). The model (~45 MB q8) downloads
   once on first use, is cached by the browser, and then every
   phrase after that is instant. It sounds warm and human —
   nothing like the old robot voice.

   Engines:
   • "kokoro" (default) — the neural AI voice. Falls back to the
     device voice automatically while the model is still loading,
     or if the browser cannot run it (very old devices).
   • "device" — the classic built-in speech synthesis, with
     aggressive ranking so the least robotic installed voice wins.

   Generation happens off the main thread via a Web Worker
   (transformers.js runs its WASM there), and finished clips are
   cached in memory + localStorage as data: URLs, so repeated
   phrases cost nothing.
   ============================================================ */
import { useEffect, useState } from 'react'

export type VoiceEngine = 'kokoro' | 'device'

/** Which neural voice reads to the kids (af_heart = warm "Heart"). */
export type AiVoiceId = 'af_heart' | 'af_bella' | 'af_nicole' | 'am_fenrir' | 'am_puck' | 'bf_emma'

const DEFAULT_VOICE: AiVoiceId = 'af_heart'
const DEFAULT_SPEED = 0.94

let voiceEnabled = true
let engine: VoiceEngine = 'kokoro'
let aiVoice: AiVoiceId = DEFAULT_VOICE
let preferredName: string | null = null
let cachedVoices: SpeechSynthesisVoice[] = []
let primed = false

const listeners = new Set<(v: SpeechSynthesisVoice[]) => void>()

export function speechSupported(): boolean {
  return typeof window !== 'undefined' && ('speechSynthesis' in window || 'Audio' in window)
}

/* ============================================================
   Kokoro neural voice — Web Worker pipeline
   ============================================================ */

type ClipJob = { id: number; text: string; voice: AiVoiceId; speed: number }
type WorkerOut =
  | { type: 'ready' }
  | { type: 'error'; message: string }
  | { type: 'clip'; id: number; dataUrl: string | null }
  | { type: 'progress'; pct: number }

let worker: Worker | null = null
let workerReady = false
let workerBroken = false
let jobSeq = 0
const pendingJobs = new Map<number, { resolve: (v: string | null) => void; text: string }>()
const inflightByPhrase = new Map<string, Promise<string | null>>()

function spawnWorker(): Worker | null {
  if (worker) return worker
  if (workerBroken) return null
  if (typeof window === 'undefined' || typeof Worker === 'undefined') return null
  try {
    worker = new Worker(new URL('./ttsWorker.ts', import.meta.url), { type: 'module' })
    worker.addEventListener('message', (ev: MessageEvent<WorkerOut>) => {
      const msg = ev.data
      if (msg.type === 'ready') {
        workerReady = true
      } else if (msg.type === 'error') {
        workerBroken = true
        workerReady = false
        worker?.terminate()
        worker = null
      } else if (msg.type === 'clip') {
        const job = pendingJobs.get(msg.id)
        pendingJobs.delete(msg.id)
        if (job?.resolve) job.resolve(msg.dataUrl)
      }
    })
    worker.addEventListener('error', () => {
      workerBroken = true
      workerReady = false
      worker?.terminate()
      worker = null
    })
  } catch {
    workerBroken = true
    worker = null
  }
  return worker
}

/** Ask the worker to synthesise one phrase; resolves to a data: URL. */
function kokoroClip(text: string, speed = DEFAULT_SPEED): Promise<string | null> {
  const clean = text.trim()
  if (!clean || clean.length > 300) return Promise.resolve(null)
  const w = spawnWorker()
  if (!w) return Promise.resolve(null)
  const id = ++jobSeq
  return new Promise<string | null>((resolve) => {
    pendingJobs.set(id, { resolve, text: clean })
    try {
      w.postMessage({ id, text: clean, voice: aiVoice, speed } satisfies ClipJob)
    } catch {
      pendingJobs.delete(id)
      resolve(null)
    }
    /* never hang the flow forever */
    window.setTimeout(() => {
      if (pendingJobs.has(id)) {
        pendingJobs.delete(id)
        resolve(null)
      }
    }, 45000)
  })
}

/** Cached, deduped version of kokoroClip. */
function clipFor(text: string, speed = DEFAULT_SPEED): Promise<string | null> {
  const key = `${aiVoice}:${speed}:${text.trim()}`
  const hit = memoryCache[key]
  if (hit) return Promise.resolve(hit)
  const inflight = inflightByPhrase.get(key)
  if (inflight) return inflight
  const job = kokoroClip(text, speed).then((clip) => {
    inflightByPhrase.delete(key)
    if (clip) memoryCache[key] = clip
    return clip
  })
  inflightByPhrase.set(key, job)
  return job
}

/** Split text into natural short phrases (Kokoro sounds best on 1-2 sentences). */
function phrase(text: string): string[] {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?:])\s+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Warm the model up right away so the first spoken line is quick. */
export function warmAiVoice(): void {
  const w = spawnWorker()
  if (!w || workerReady) return
  void clipFor("Hi, I'm Poli! Let's learn and play.").then(() => {
    if (workerReady) listeners.forEach((fn) => fn(rankedVoices()))
  })
}

export function aiVoiceReady(): boolean {
  return workerReady
}

export function setAiVoice(v: AiVoiceId): void {
  aiVoice = v
}

export function getAiVoice(): AiVoiceId {
  return aiVoice
}

/* ============================================================
   In-memory clip cache (localStorage would blow past its quota)
   ============================================================ */

const memoryCache: Record<string, string> = {}

/* ============================================================
   Device voice ranking (the fallback, and the "device" engine)
   ============================================================ */

/** Voices we know sound warm and human-ish, best first. */
const GREAT = [
  'aria',
  'jenny',
  'ava',
  'emma',
  'libby',
  'sonia',
  'michelle',
  'natasha',
  'clara',
  'google us english',
  'google uk english female',
  'samantha',
  'allison',
  'susan',
  'joanna',
  'salli',
  'kendra',
  'zira',
  'hazel',
  'karen',
  'moira',
  'tessa',
  'serena',
  'fiona',
  'amelie',
  'catherine',
]

/** Markers that indicate a modern, non-robotic engine. */
const MODERN = ['natural', 'neural', 'online', 'premium', 'enhanced', 'siri', 'eloquence']

/** Robotic / novelty voices to avoid unless nothing else exists. */
const AVOID = [
  'david',
  'mark',
  'george',
  'james',
  'ryan',
  'guy',
  'albert',
  'zarvox',
  'bad news',
  'good news',
  'bells',
  'boing',
  'bubbles',
  'cellos',
  'jester',
  'organ',
  'superstar',
  'trinoids',
  'whisper',
  'wobble',
  'bahh',
  'deranged',
  'hysterical',
  'bruce',
  'fred',
  'junior',
  'ralph',
  'kathy',
  'princess',
  'vicki',
  'agnes',
  'victoria',
]

export function rankVoice(v: SpeechSynthesisVoice): number {
  const lang = (v.lang || '').toLowerCase().replace('_', '-')
  if (!lang.startsWith('en')) return -1

  let score = 0
  if (lang === 'en-us' || lang === 'en_us') score += 30
  else if (lang.startsWith('en-gb')) score += 20
  else score += 10

  const name = v.name.toLowerCase()

  if (MODERN.some((m) => name.includes(m))) score += 45
  const greatIndex = GREAT.findIndex((g) => name.includes(g))
  if (greatIndex >= 0) score += 40 - greatIndex
  if (v.localService) score += 6
  else score += 2
  if (AVOID.some((a) => name.includes(a))) score -= 55
  if (/female|woman|girl|zira|aria|jenny|samantha|karen|moira/.test(name)) score += 12

  return score
}

export function getVoices(): SpeechSynthesisVoice[] {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return []
  const all = window.speechSynthesis.getVoices()
  if (all.length) cachedVoices = all
  return cachedVoices
}

/** English voices, best first. */
export function rankedVoices(): SpeechSynthesisVoice[] {
  return getVoices()
    .filter((v) => rankVoice(v) > 0)
    .sort((a, b) => rankVoice(b) - rankVoice(a))
}

export function bestVoice(): SpeechSynthesisVoice | null {
  return rankedVoices()[0] ?? getVoices()[0] ?? null
}

export function setPreferredVoiceName(name: string | null): void {
  preferredName = name
}

export function setEngine(next: VoiceEngine): void {
  engine = next
}

export function getEngine(): VoiceEngine {
  return engine
}

function activeVoice(): SpeechSynthesisVoice | null {
  const voices = getVoices()
  if (preferredName) {
    const found = voices.find((v) => v.name === preferredName)
    if (found) return found
  }
  return bestVoice()
}

/** React hook for the settings picker. */
export function useVoices(): SpeechSynthesisVoice[] {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>(() => rankedVoices())
  useEffect(() => {
    const update = () => setVoices(rankedVoices())
    update()
    listeners.add(update)
    const timers = [120, 400, 900, 1800].map((ms) => window.setTimeout(update, ms))
    return () => {
      listeners.delete(update)
      timers.forEach(window.clearTimeout)
    }
  }, [])
  return voices
}

export function initSpeech(): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  if (!primed) {
    primed = true
    speechSynthesis.onvoiceschanged = () => {
      getVoices()
      listeners.forEach((fn) => fn(rankedVoices()))
    }
  }
  getVoices()
}

/* ============================================================
   Speaking
   ============================================================ */

export function setVoiceEnabled(on: boolean): void {
  voiceEnabled = on
  if (!on) stopSpeaking()
}

export function isVoiceEnabled(): boolean {
  return voiceEnabled
}

export function stopSpeaking(): void {
  stopChain()
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
  try {
    window.speechSynthesis.cancel()
  } catch {
    /* ignore */
  }
}

export type SpeakOptions = {
  rate?: number
  pitch?: number
  /** restart from the beginning even if something is already talking */
  interrupt?: boolean
  onDone?: () => void
}

export function speak(text: string, opts: SpeakOptions = {}): void {
  const clean = text.trim()
  if (!voiceEnabled || !speechSupported() || !clean) {
    opts.onDone?.()
    return
  }
  if (opts.interrupt !== false) stopSpeaking()

  /* the AI voice is a "kokoro"-engine device with the neural voice set */
  const wantAi = engine === 'kokoro' && !workerBroken

  if (wantAi) {
    const lines = phrase(clean)
    void Promise.all(lines.map((l) => clipFor(l, opts.rate ?? DEFAULT_SPEED))).then((clips) => {
      if (!voiceEnabled) return
      const usable = clips.filter((c): c is string => c !== null)
      if (!usable.length) {
        /* model still loading or failed — speak with the device voice so the
           kid always hears the question, and keep warming the AI voice */
        warmAiVoice()
        speakDevice(clean, opts)
        return
      }
      playChain(usable, { onDone: opts.onDone })
    })
    return
  }

  speakDevice(clean, opts)
}

function speakDevice(text: string, opts: SpeakOptions = {}): void {
  if (!('speechSynthesis' in window) || !text.trim()) {
    opts.onDone?.()
    return
  }
  try {
    const voice = activeVoice()
    const lines = phrase(text)
    const basePitch = opts.pitch ?? 1.05
    const baseRate = opts.rate ? opts.rate * 1.1 : 0.95

    let done = 0
    const finish = () => {
      done += 1
      if (done >= lines.length) opts.onDone?.()
    }

    lines.forEach((line, i) => {
      const u = new SpeechSynthesisUtterance(line)
      if (voice) u.voice = voice
      u.lang = voice?.lang ?? 'en-US'
      u.rate = baseRate
      u.pitch = basePitch + (i % 2 === 0 ? 0 : 0.04)
      u.volume = 1
      if (opts.onDone) {
        u.onend = finish
        u.onerror = finish
      }
      window.speechSynthesis.speak(u)
    })
  } catch {
    opts.onDone?.()
  }
}

/** Very slow, for sounding out words. */
export function speakSlowly(text: string): void {
  speak(text, { rate: 0.72 })
}

/** Preview a device voice from the settings picker. */
export function previewVoice(voiceName: string, sample = "Hi! I'm Poli. Let's play and learn together!"): void {
  const previous = preferredName
  const previousEngine = engine
  preferredName = voiceName
  engine = 'device'
  speak(sample, { interrupt: true })
  window.setTimeout(() => {
    preferredName = previous
    engine = previousEngine
  }, 200)
}

/** Hear the current AI voice with the app's standard sample. */
export function previewAi(sample = "Hi! I'm Poli. Let's play and learn together!"): void {
  const previousEngine = engine
  engine = 'kokoro'
  speak(sample, { interrupt: true, rate: DEFAULT_SPEED })
  window.setTimeout(() => {
    engine = previousEngine
  }, 200)
}

/* ============================================================
   <audio>-element playback chain
   ============================================================ */

let chainAudio: HTMLAudioElement | null = null
let chainStop: (() => void) | null = null
let chainDone: (() => void) | null = null

function stopChain(): void {
  chainStop?.()
}

/** Play clips one after another through an <audio> element. */
function playChain(clips: string[], opts: { onDone?: () => void }): void {
  stopChain()

  const audio = chainAudio ?? new Audio()
  chainAudio = audio

  const finish = () => {
    chainStop = null
    chainDone = null
    opts.onDone?.()
  }
  chainDone = finish

  let i = 0
  let cancelled = false

  const next = () => {
    if (cancelled) return
    if (i >= clips.length) {
      finish()
      return
    }
    const clip = clips[i++]!
    audio.src = clip
    audio.onended = next
    audio.onerror = next
    audio.play().catch(() => {
      if (!cancelled) window.setTimeout(next, 40)
    })
  }

  chainStop = () => {
    cancelled = true
    audio.onended = null
    audio.onerror = null
    audio.pause()
    chainStop = null
    const done = chainDone
    chainDone = null
    /* the caller's onDone still fires once so flows never hang */
    done?.()
  }

  next()
}
