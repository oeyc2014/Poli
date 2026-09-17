import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Settings } from '../types'
import { setHapticsEnabled, setMusicEnabled, sfx, unlockAudio } from './sound'
import { initSpeech, setAiVoice, setEngine, setPreferredVoiceName, setVoiceEnabled, warmAiVoice } from './speech'
import { applyTheme, themeById } from '../content/shop'
import { readStore, writeStore } from './storage'

const DEFAULTS: Settings = {
  sound: true,
  /* read every question out loud — essential for new readers */
  voice: true,
  /* very quiet background lullaby */
  music: false,
  bigText: false,
  /** hide extra words, show only pictures */
  pictureOnly: false,
  showHints: true,
  voiceName: '',
  /* the warm neural AI voice (Kokoro "Heart"), by default */
  voiceEngine: 'kokoro' as const,
  /** which Kokoro voice reads aloud — Heart is the friendliest */
  aiVoice: 'af_heart' as const,
  /* the classic mint look until something else is bought */
  themeId: 'classic',
  /* no accessories worn until they are bought in the shop */
  accessories: [] as string[],
  /* a darker, twinklier sky — nice at bedtime, and on bright tablets */
  nightMode: false,
  /* more bounces by default, because bouncing is the whole point */
  calmMotion: false,
  haptics: true,
}

/** only the on/off settings appear as toggles */
type BooleanSettingKey = {
  [K in keyof Settings]: Settings[K] extends boolean ? K : never
}[keyof Settings]

export type { BooleanSettingKey }

export const SETTING_INFO: { key: BooleanSettingKey; label: string; icon: string; blurb: string }[] = [
  { key: 'sound', label: 'Fun sounds', icon: 'bell', blurb: 'Pops, cheers and happy chimes' },
  { key: 'voice', label: 'Read to me', icon: 'speaker', blurb: 'Poli reads every question out loud' },
  { key: 'music', label: 'Background music', icon: 'musicNote', blurb: 'A very quiet, calm tune' },
  { key: 'bigText', label: 'Bigger text', icon: 'magnifier', blurb: 'Make all the words larger' },
  { key: 'pictureOnly', label: 'Pictures only', icon: 'picture', blurb: 'Hide the small words, keep the pictures' },
  { key: 'showHints', label: 'Hints', icon: 'bulb', blurb: 'Offer a gentle nudge after a wrong answer' },
  { key: 'nightMode', label: 'Cozy night', icon: 'moonSleep', blurb: 'A darker, twinklier sky for evening practice' },
  { key: 'calmMotion', label: 'Calm animations', icon: 'heart', blurb: 'Fewer bounces, for kids who find them distracting' },
  { key: 'haptics', label: 'Little buzzes', icon: 'hand', blurb: 'A gentle vibration on phones and tablets' },
]

type SettingsValue = {
  settings: Settings
  set: <K extends keyof Settings>(key: K, value: Settings[K]) => void
  toggle: (key: keyof Settings) => void
  toggleAccessory: (id: string) => void
  resetProfile: () => void
  activeTheme: ReturnType<typeof themeById>
}

const SettingsContext = createContext<SettingsValue | null>(null)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(() => ({ ...DEFAULTS, ...readStore('settings', {}) }))

  /* persist */
  useEffect(() => {
    writeStore('settings', settings)
  }, [settings])

  /* switch the engines on and off */
  useEffect(() => {
    sfx.setEnabled(settings.sound)
    setVoiceEnabled(settings.voice)
    setPreferredVoiceName(settings.voiceName || null)
    setEngine(settings.voiceEngine)
    setAiVoice(settings.aiVoice)
    setMusicEnabled(settings.music && settings.sound)
    setHapticsEnabled(settings.haptics)
  }, [settings.sound, settings.voice, settings.music, settings.voiceName, settings.voiceEngine, settings.aiVoice, settings.haptics])

  /* start fetching the AI voice model as soon as the app opens */
  useEffect(() => {
    if (settings.voice) warmAiVoice()
  }, [settings.voice])

  /* the colour theme bought in the shop */
  useEffect(() => {
    applyTheme(settings.themeId)
  }, [settings.themeId])

  /* the two themes, and the motion switch, live on <html> so plain CSS can see them */
  useEffect(() => {
    document.documentElement.dataset.theme = settings.nightMode ? 'night' : 'day'
  }, [settings.nightMode])

  useEffect(() => {
    document.documentElement.dataset.motion = settings.calmMotion ? 'calm' : 'fun'
  }, [settings.calmMotion])

  /* bigger text scales every rem-based size in the app */
  useEffect(() => {
    document.documentElement.style.fontSize = settings.bigText ? '18.5px' : '16px'
  }, [settings.bigText])

  /* unlock audio + load voices on the first interaction */
  useEffect(() => {
    initSpeech()
    const onFirst = () => {
      unlockAudio()
      initSpeech()
    }
    window.addEventListener('pointerdown', onFirst, { once: true })
    window.addEventListener('keydown', onFirst, { once: true })
    return () => {
      window.removeEventListener('pointerdown', onFirst)
      window.removeEventListener('keydown', onFirst)
    }
  }, [])

  const set = useCallback<SettingsValue['set']>((key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const toggleAccessory = useCallback<SettingsValue['toggleAccessory']>((id) => {
    setSettings((prev) => ({
      ...prev,
      accessories: prev.accessories.includes(id)
        ? prev.accessories.filter((a) => a !== id)
        : [...prev.accessories, id],
    }))
  }, [])

  const resetProfile = useCallback<SettingsValue['resetProfile']>(() => {
    setSettings((prev) => ({
      ...prev,
      themeId: DEFAULTS.themeId,
      accessories: [],
    }))
    applyTheme(DEFAULTS.themeId)
  }, [])

  const activeTheme = useMemo(() => themeById(settings.themeId), [settings.themeId])

  const toggle = useCallback((key: keyof Settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }))
  }, [])

  const value = useMemo<SettingsValue>(
    () => ({ settings, set, toggle, toggleAccessory, resetProfile, activeTheme }),
    [settings, set, toggle, toggleAccessory, resetProfile, activeTheme],
  )

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>
}

export function useSettings(): SettingsValue {
  const ctx = useContext(SettingsContext)
  if (!ctx) throw new Error('useSettings must be used inside <SettingsProvider>')
  return ctx
}
