import { useState } from 'react'
import { Modal, Toggle } from './Ui'
import { AvatarBubble } from './AvatarBubble'
import { SETTING_INFO, useSettings } from '../lib/settings'
import { aiVoiceReady, previewAi, previewVoice, speechSupported, useVoices } from '../lib/speech'
import type { AiVoiceId } from '../lib/speech'
import { sfx } from '../lib/sound'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'
import { ACCESSORIES, THEMES } from '../content/shop'
import { AVATARS } from '../content/avatars'
import { Icon } from '../icons'

type Tab = 'profile' | 'learning' | 'voice'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'profile', label: 'Profile', icon: 'smiley' },
  { id: 'learning', label: 'Learning', icon: 'book' },
  { id: 'voice', label: 'Voice', icon: 'speaker' },
]

/* ============================================================
   Profile tab — name, buddy, colour theme, accessories
   ============================================================ */
function ProfileTab() {
  const { user, updateUser } = useAuth()
  const { settings, set, toggleAccessory, activeTheme } = useSettings()
  const { progress, ownedItems, level } = useProgress()
  const [name, setName] = useState(user?.name ?? '')

  const saveName = () => {
    const clean = name.trim().slice(0, 16)
    if (!user || !clean || clean === user.name) return
    updateUser(user.id, { name: clean })
    sfx.correct()
  }

  const ownedAccessories = ACCESSORIES.filter((a) => ownedItems.includes(a.id))
  const ownedThemes = THEMES.filter((t) => t.id === 'classic' || ownedItems.includes(t.id))

  return (
    <div className="flex flex-col gap-4">
      {/* identity card */}
      <div className="flex items-center gap-4 rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <AvatarBubble
          icon={user?.avatar.icon ?? 'smiley'}
          color={user?.avatar.color ?? '#fff'}
          accessories={settings.accessories}
          size={72}
          className="anim-float"
        />
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl font-bold text-ink-900">{user?.name ?? 'Friend'}</p>
          <p className="flex items-center gap-1.5 text-sm text-ink-500">
            <Icon name="coin" size={18} /> {progress.gems} coins ·{' '}
            <Icon name="medal" size={18} /> Level {level}
          </p>
        </div>
      </div>

      {/* name editor */}
      <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <p className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <Icon name="pencil" size={24} color="#525464" />
          Name
        </p>
        <div className="flex gap-2">
          <input
            value={name}
            maxLength={16}
            onChange={(e) => setName(e.target.value)}
            onBlur={saveName}
            onKeyDown={(e) => e.key === 'Enter' && saveName()}
            placeholder="Type a new name"
            className="min-w-0 flex-1 rounded-xl border-[2.5px] border-ink-900/40 bg-white px-3 py-2 font-display text-lg text-ink-900 placeholder:text-ink-300"
          />
          <button
            onClick={saveName}
            className="rounded-xl border-[2.5px] border-ink-900/70 bg-mint-200 px-4 font-display font-bold text-ink-900 hover:bg-mint-300"
          >
            Save
          </button>
        </div>
      </div>

      {/* buddy picker */}
      <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <p className="mb-2 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <Icon name="pawPrints" size={24} />
          Your buddy
        </p>
        <div className="grid grid-cols-6 gap-2 sm:grid-cols-9">
          {AVATARS.map((a, i) => {
            const chosen = user?.avatar.icon === a.icon
            return (
              <button
                key={i}
                aria-label={a.name}
                aria-pressed={chosen}
                onClick={() => {
                  if (!user) return
                  updateUser(user.id, { avatar: { icon: a.icon, color: a.color } })
                  sfx.pop()
                }}
                className={`grid aspect-square place-items-center rounded-xl border-[2.5px] transition-transform hover:scale-105 ${
                  chosen ? 'border-ink-900 bg-white ring-2 ring-mint-400' : 'border-ink-900/15 bg-white'
                }`}
              >
                <Icon name={a.icon} size={40} />
              </button>
            )
          })}
        </div>
      </div>

      {/* colour theme */}
      <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <p className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <Icon name="paint" size={24} />
          App colour
        </p>
        <p className="mb-2 text-sm text-ink-500">
          New colours come from the shop — you own{' '}
          {ownedThemes.filter((t) => t.id !== 'classic').length} extra.
        </p>
        <div className="flex flex-wrap gap-2">
          {ownedThemes.map((t) => (
            <button
              key={t.id}
              aria-label={t.name}
              aria-pressed={settings.themeId === t.id}
              onClick={() => {
                set('themeId', t.id)
                sfx.pop()
              }}
              className={`flex items-center gap-2 rounded-xl border-[2.5px] px-3 py-1.5 font-display font-bold transition-transform hover:scale-105 ${
                settings.themeId === t.id ? 'border-ink-900 ring-2 ring-mint-400' : 'border-ink-900/15'
              }`}
            >
              <span className="h-5 w-5 rounded-full border-2 border-ink-900/40" style={{ background: t.swatch }} />
              {t.name}
            </button>
          ))}
        </div>
      </div>

      {/* accessories */}
      <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <p className="mb-1 flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <Icon name="partyTiny" size={24} />
          Accessories
        </p>
        <p className="mb-2 text-sm text-ink-500">Tap to put on or take off. Buy more in the shop.</p>
        {ownedAccessories.length === 0 ? (
          <p className="rounded-xl bg-white p-3 text-sm text-ink-500">
            No accessories yet — earn coins in lessons and visit the shop!
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {ownedAccessories.map((a) => {
              const worn = settings.accessories.includes(a.id)
              return (
                <button
                  key={a.id}
                  aria-pressed={worn}
                  onClick={() => {
                    toggleAccessory(a.id)
                    sfx.tap()
                  }}
                  className={`flex items-center gap-2 rounded-xl border-[2.5px] px-3 py-1.5 font-display font-bold transition-transform hover:scale-105 ${
                    worn ? 'border-ink-900 ring-2 ring-mint-400' : 'border-ink-900/15'
                  }`}
                >
                  <Icon name={a.icon} size={22} />
                  {a.name}
                </button>
              )
            })}
          </div>
        )}
        <p className="mt-2 flex items-center gap-1.5 text-sm text-ink-400">
          Wearing: {settings.accessories.length} · Theme: {activeTheme.name}
        </p>
      </div>
    </div>
  )
}

/* ============================================================
   Learning tab — the classic toggles
   ============================================================ */
function LearningTab() {
  const { settings, toggle, set } = useSettings()

  return (
    <div className="flex flex-col gap-3">
      {SETTING_INFO.map((info) => (
        <div
          key={info.key}
          className="flex items-center gap-3 rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-3"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border-[2.5px] border-ink-900/70 bg-white">
            <Icon name={info.icon} size={28} color="#525464" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="font-display text-lg font-semibold text-ink-900">{info.label}</p>
            <p className="text-sm text-ink-500">{info.blurb}</p>
          </div>
          <Toggle on={settings[info.key]} onChange={() => toggle(info.key)} label={info.label} />
        </div>
      ))}

      <button
        onClick={() => {
          set('sound', true)
          set('voice', true)
          set('music', false)
          set('bigText', false)
          set('pictureOnly', false)
          set('showHints', true)
          set('nightMode', false)
          set('calmMotion', false)
          set('haptics', true)
        }}
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-2xl border-[2.5px] border-ink-900/15 bg-white py-3 font-display text-lg text-ink-500 hover:bg-cream-100"
      >
        <Icon name="refresh" size={20} color="currentColor" />
        Put learning settings back to normal
      </button>
    </div>
  )
}

/* ============================================================
   Voice tab — AI voice picker + device voice fallback
   ============================================================ */

/** The neural AI voices, with kid-friendly nicknames. */
const AI_VOICES: { id: AiVoiceId; name: string; blurb: string }[] = [
  { id: 'af_heart', name: 'Heart', blurb: 'Warm and friendly — the classic Poli voice' },
  { id: 'af_bella', name: 'Bella', blurb: 'Bright and bouncy storyteller' },
  { id: 'af_nicole', name: 'Nicole', blurb: 'Soft and gentle, great for bedtime' },
  { id: 'am_fenrir', name: 'Fenrir', blurb: 'A big friendly storyteller voice' },
  { id: 'am_puck', name: 'Puck', blurb: 'Playful and a little silly' },
  { id: 'bf_emma', name: 'Emma', blurb: 'A cosy British accent' },
]

function VoiceTab() {
  const { settings, set } = useSettings()
  const voices = useVoices()
  const ready = aiVoiceReady()

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <p className="flex items-center gap-2 font-display text-lg font-bold text-ink-900">
          <Icon name="mic" size={24} />
          Poli&apos;s AI voice
        </p>
        <p className="mt-1 text-sm text-ink-500">
          A real neural voice that runs right here on your device — free, and nothing like a robot.
          {ready ? ' It is ready to read!' : ' It is still warming up the first time — give it a few seconds.'}
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {AI_VOICES.map((v) => (
            <button
              key={v.id}
              onClick={() => {
                set('aiVoice', v.id)
                sfx.tap()
                previewAi(`Hi! I am ${v.name}. Let's learn and play!`)
              }}
              className={`flex items-center gap-3 rounded-xl border-[2.5px] p-3 text-left transition-colors ${
                settings.aiVoice === v.id ? 'border-ink-900 bg-mint-100' : 'border-ink-900/15 bg-white hover:bg-cream-100'
              }`}
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border-[2.5px] border-ink-900/60 bg-grape-100 font-display text-lg font-bold text-grape-600">
                {v.name.slice(0, 1)}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-display text-base font-bold text-ink-900">{v.name}</span>
                <span className="block truncate text-xs text-ink-500">{v.blurb}</span>
              </span>
              <span className="shrink-0">
                <Icon name="play" size={20} color="#7d6f99" />
              </span>
            </button>
          ))}
        </div>
        <button
          onClick={() => previewAi()}
          className="btn3d mt-3 w-full !rounded-xl bg-sun-300 !py-2.5 font-display text-base font-bold text-ink-900"
          style={{ ['--btn-shadow' as string]: '#c2540a' }}
        >
          <Icon name="speaker" size={22} color="currentColor" /> Hear Poli say hello
        </button>
      </div>

      <button
        onClick={() => {
          set('voiceEngine', settings.voiceEngine === 'device' ? 'kokoro' : 'device')
          sfx.tap()
          if (settings.voiceEngine === 'kokoro') {
            const best = voices[0]
            if (best) previewVoice(best.name)
          } else {
            previewAi()
          }
        }}
        className={`flex items-center gap-3 rounded-2xl border-[2.5px] p-3 text-left transition-colors ${
          settings.voiceEngine === 'device' ? 'border-ink-900 bg-mint-100' : 'border-ink-900/15 bg-white hover:bg-cream-100'
        }`}
      >
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border-[2.5px] border-ink-900/60 bg-white">
          <Icon name="phone" size={24} />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-lg font-bold text-ink-900">Use this device&apos;s voice instead</span>
          <span className="block text-sm text-ink-500">
            {settings.voiceEngine === 'device' ? 'Currently using the device voice — tap to go back to the AI voice' : 'Works offline — pick one below'}
          </span>
        </span>
      </button>

      {settings.voiceEngine === 'device' && <VoicePicker />}
    </div>
  )
}

function VoicePicker() {
  const { settings, set } = useSettings()
  const voices = useVoices()

  if (!speechSupported() || !('speechSynthesis' in window)) return null

  const auto = voices[0]

  return (
    <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
      <div className="flex items-center gap-2">
        <Icon name="speaker" size={34} color="#525464" />
        <div>
          <p className="font-display text-lg font-bold text-ink-900">Which voice reads to you?</p>
          <p className="text-sm text-ink-500">Try a few and keep the one you like best.</p>
        </div>
      </div>

      {voices.length === 0 ? (
        <p className="mt-3 rounded-2xl bg-coral-100 p-3 text-sm text-ink-700">
          No reading voices were found on this device yet. They often finish loading a few seconds
          after the page opens — try reopening this panel.
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-2">
          <button
            onClick={() => {
              set('voiceName', '')
              sfx.tap()
              if (auto) previewVoice(auto.name, 'This is the voice Poli picked for you!')
            }}
            className={`flex items-center gap-3 rounded-2xl border-[2.5px] p-3 text-left transition-colors ${
              settings.voiceName === ''
                ? 'border-ink-900 bg-grass-100'
                : 'border-ink-900/15 bg-cream-100 hover:bg-cream-200'
            }`}
          >
            <span className="grid h-10 w-10 place-items-center rounded-xl border-[2.5px] border-ink-900/40 bg-white">
              <Icon name="sparkle" size={24} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-display text-lg font-bold text-ink-900">Best available</span>
              <span className="block truncate text-sm text-ink-500">{auto ? auto.name : 'none found'}</span>
            </span>
            {settings.voiceName === '' && (
              <span className="shrink-0 rounded-full border-[2.5px] border-ink-900/60 bg-grass-300 px-2 py-0.5 font-display text-xs font-bold">
                USING
              </span>
            )}
          </button>

          <div className="max-h-64 overflow-y-auto pr-1">
            <div className="flex flex-col gap-2">
              {voices.slice(0, 20).map((v) => {
                const chosen = settings.voiceName === v.name
                return (
                  <div
                    key={v.name}
                    className={`flex items-center gap-2 rounded-2xl border-[2.5px] p-2 ${
                      chosen ? 'border-ink-900 bg-grass-100' : 'border-ink-900/15 bg-cream-100'
                    }`}
                  >
                    <button
                      onClick={() => {
                        set('voiceName', v.name)
                        sfx.pop()
                        previewVoice(v.name)
                      }}
                      className="min-w-0 flex-1 px-1 text-left"
                    >
                      <span className="block truncate font-display text-base font-bold text-ink-900">{v.name}</span>
                      <span className="block text-xs text-ink-500">
                        {v.lang}
                        {v.localService ? '' : ' · online'}
                        {chosen ? ' · in use' : ''}
                      </span>
                    </button>
                    <button
                      onClick={() => previewVoice(v.name)}
                      aria-label={`Hear ${v.name}`}
                      className="btn3d shrink-0 !px-3 !py-2"
                      style={{ ['--btn-shadow' as string]: '#aaacb8' }}
                    >
                      <Icon name="play" size={20} color="#41424f" />
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          <p className="text-xs text-ink-400">
            Tip: voices marked “natural” or “online” sound the least robotic. On Windows, Edge and
            Chrome can use different voice packs, so it is worth trying both.
          </p>
        </div>
      )}
    </div>
  )
}

/* ============================================================
   The panel
   ============================================================ */
export function SettingsPanel({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [tab, setTab] = useState<Tab>('profile')

  return (
    <Modal open={open} onClose={onClose} title="Settings" wide>
      <div className="mb-4 flex gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              setTab(t.id)
              sfx.tap()
            }}
            aria-pressed={tab === t.id}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl border-[2.5px] px-3 py-2 font-display text-lg font-bold transition-colors ${
              tab === t.id ? 'border-ink-900 bg-mint-200 text-ink-900' : 'border-ink-900/15 bg-cream-50 text-ink-500 hover:bg-cream-100'
            }`}
          >
            <Icon name={t.icon} size={24} />
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'profile' && <ProfileTab />}
      {tab === 'learning' && <LearningTab />}
      {tab === 'voice' && <VoiceTab />}
    </Modal>
  )
}
