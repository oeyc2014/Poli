import { useEffect, useState } from 'react'
import Mascot from '../components/Mascot'
import { Btn, IconBtn, Panel } from '../components/Ui'
import { BouncyText } from '../components/BouncyText'
import { Icon } from '../icons'
import { AVATARS } from '../content/avatars'
import { useAuth } from '../lib/auth'
import { sfx, unlockAudio } from '../lib/sound'
import { speak } from '../lib/speech'
import type { User } from '../types'

/* ------------------------------------------------------------
   Step-by-step onboarding for a brand new player
   ------------------------------------------------------------ */
function CreatePlayer({ onDone }: { onDone: () => void }) {
  const { createUser } = useAuth()
  const [name, setName] = useState('')
  const [avatarIndex, setAvatarIndex] = useState(0)
  const [pinMode, setPinMode] = useState(false)
  const [pin, setPin] = useState('')
  const [busy, setBusy] = useState(false)

  const chosen = AVATARS[avatarIndex]

  useEffect(() => {
    speak('Welcome to Poli! What is your name?', { rate: 0.9 })
  }, [])

  const start = () => {
    if (busy) return
    setBusy(true)
    sfx.win()
    createUser({ name: name.trim() || 'Friend', avatar: { icon: chosen.icon, color: chosen.color }, pin })
    speak(`Yay! Let's learn, ${name.trim() || 'friend'}!`, { rate: 0.92 })
    window.setTimeout(onDone, 420)
  }

  return (
    <div className="mx-auto w-full max-w-xl px-4 py-6">
      <div className="flex flex-col items-center">
        <Mascot size={150} mood="cheer" wave />
        <BouncyText
          as="h1"
          text="Welcome to Poli!"
          rainbow
          stagger={0.04}
          className="mt-2 text-center font-party text-5xl text-pop sm:text-6xl"
        />
        <p className="mt-2 text-center font-display text-xl text-ink-700">Let&apos;s make your player</p>
      </div>

      <Panel className="mt-6 flex flex-col gap-5" pad="lg">
        {/* name */}
        <div>
          <label htmlFor="kid-name" className="mb-2 flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
            <Icon name="pencil" size={26} color="#3b2f5e" />
            What is your name?
          </label>
          <input
            id="kid-name"
            value={name}
            maxLength={16}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name"
            className="w-full rounded-2xl border-[3px] border-ink-900/60 bg-cream-100 px-4 py-3 font-display text-2xl text-ink-900 placeholder:text-ink-300 focus:bg-white"
            onFocus={() => unlockAudio()}
          />
        </div>

        {/* avatar */}
        <div>
          <p className="mb-2 flex items-center gap-2 font-display text-xl font-semibold text-ink-900">
            <Icon name="pawPrints" size={28} />
            Pick your buddy
          </p>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
            {AVATARS.map((a, i) => (
              <button
                key={i}
                onClick={() => {
                  setAvatarIndex(i)
                  sfx.pop()
                }}
                aria-label={a.name}
                aria-pressed={i === avatarIndex}
                className={`grid aspect-square place-items-center rounded-2xl border-[3px] transition-all ${
                  i === avatarIndex
                    ? 'scale-105 border-ink-900 bg-white ring-2 ring-mint-400'
                    : 'border-ink-900/20 bg-white/70 hover:scale-105'
                }`}
                style={{ animation: `poli-pop 0.4s ease ${i * 0.025}s both` }}
              >
                <Icon name={a.icon} size={54} />
              </button>
            ))}
          </div>
        </div>

        {/* optional pin */}
        {!pinMode ? (
          <button
            onClick={() => {
              setPinMode(true)
              sfx.tap()
            }}
            className="flex items-center gap-2 self-start rounded-xl px-2 py-1 font-display text-base text-ink-500 underline decoration-dotted"
          >
            <Icon name="lock" size={22} color="#656878" />
            Add a secret 4-digit code (for grown-ups)
          </button>
        ) : (
          <div className="rounded-2xl border-[2.5px] border-ink-900/15 bg-cream-100 p-3">
            <div className="flex items-center gap-3">
              <Icon name="lock" size={26} color="#656878" />
              <input
                value={pin}
                inputMode="numeric"
                maxLength={4}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="4 digits (or leave blank)"
                className="flex-1 rounded-xl border-[2.5px] border-ink-900/40 bg-white px-3 py-2 font-display text-xl tracking-[0.4em]"
              />
              <IconBtn label="Remove code" size={44} onClick={() => { setPin(''); setPinMode(false) }}>
                <Icon name="close" size={20} color="currentColor" />
              </IconBtn>
            </div>
          </div>
        )}

        <Btn tone="grass" size="xl" full icon={<Icon name="rocket" size={32} />} onClick={start} disabled={busy}>
          Let&apos;s play!
        </Btn>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------
   PIN pad
   ------------------------------------------------------------ */
function PinPad({ user, onCancel, onOk }: { user: User; onCancel: () => void; onOk: () => void }) {
  const [entry, setEntry] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    speak(`Hi ${user.name}! Type your secret code.`, { rate: 0.9 })
  }, [user.name])

  const press = (d: string) => {
    if (entry.length >= 4) return
    const next = entry + d
    setEntry(next)
    sfx.tap()
    if (next.length === 4) {
      window.setTimeout(() => {
        if (next === user.pin) {
          onOk()
        } else {
          setShake(true)
          sfx.wrong()
          window.setTimeout(() => {
            setShake(false)
            setEntry('')
          }, 600)
        }
      }, 180)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-8">
      <Panel className="flex flex-col items-center gap-4" pad="lg">
        <span className="anim-bob">
          <Icon name={user.avatar.icon} size={84} />
        </span>
        <h2 className="font-display text-3xl text-ink-900">Hi {user.name}!</h2>
        <p className="flex items-center gap-2 font-display text-lg text-ink-500">
          Type your secret code
          <Icon name="lock" size={22} color="#6b6480" />
        </p>

        <div className={`flex gap-3 ${shake ? 'anim-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`grid h-14 w-12 place-items-center rounded-2xl border-[3px] font-display text-3xl ${
                entry.length > i ? 'border-grape-600 bg-grape-200' : 'border-ink-900/40 bg-white'
              }`}
            >
              {entry.length > i ? '●' : ''}
            </span>
          ))}
        </div>

        <div className="grid w-full grid-cols-3 gap-2">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((d) => (
            <button
              key={d}
              onClick={() => press(d)}
              className="btn3d min-h-[62px] bg-white text-2xl text-ink-900"
              style={{ ['--btn-shadow' as string]: '#aaacb8' }}
            >
              {d}
            </button>
          ))}
          <button
            onClick={onCancel}
            className="btn3d min-h-[62px] bg-ink-100 text-ink-700"
            style={{ ['--btn-shadow' as string]: '#848795' }}
          >
            <Icon name="back" size={24} color="#41424f" />
          </button>
          <button
            onClick={() => press('0')}
            className="btn3d min-h-[62px] bg-white text-2xl text-ink-900"
            style={{ ['--btn-shadow' as string]: '#aaacb8' }}
          >
            0
          </button>
          <button
            onClick={() => setEntry((e) => e.slice(0, -1))}
            className="btn3d min-h-[62px] bg-ink-100 text-ink-700"
            style={{ ['--btn-shadow' as string]: '#848795' }}
          >
            <Icon name="trash" size={24} color="#41424f" />
          </button>
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------
   Main profile screen
   ------------------------------------------------------------ */
export function ProfileScreen({ onGrownUps }: { onGrownUps: () => void }) {
  const { users, login } = useAuth()
  const [pinUser, setPinUser] = useState<User | null>(null)
  const [creating, setCreating] = useState(users.length === 0)

  useEffect(() => {
    if (!creating && users.length > 0) speak('Who is playing?', { rate: 0.9 })
  }, [creating, users.length])

  if (pinUser) {
    return (
      <PinPad
        user={pinUser}
        onCancel={() => setPinUser(null)}
        onOk={() => {
          sfx.win()
          login(pinUser.id)
        }}
      />
    )
  }

  if (creating) {
    return (
      <CreatePlayer
        onDone={() => {
          if (users.length > 0) setCreating(false)
        }}
      />
    )
  }

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-6">
      <div className="flex flex-col items-center">
        <Mascot size={132} mood="happy" className="anim-float" />
        <BouncyText
          as="h1"
          text="Poli"
          rainbow
          stagger={0.11}
          className="mt-1 font-party text-7xl text-pop"
        />
        <p className="mt-1 flex items-center gap-2 font-display text-xl text-ink-700">
          <Icon name="gamepad" size={28} color="#3b2f5e" />
          1st Grade Learning Games
        </p>
      </div>

      <h2 className="mt-8 text-center font-display text-3xl text-ink-900">Who is playing?</h2>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {users.map((u, i) => (
          <button
            key={u.id}
            onClick={() => {
              unlockAudio()
              if (u.pin) {
                setPinUser(u)
              } else {
                sfx.win()
                login(u.id)
              }
            }}
            className="card3d card-hover flex flex-col items-center gap-2 !rounded-[2rem] bg-white p-4"
            style={{ animation: `poli-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.07}s backwards` }}
          >
            <span
              className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-ink-900 anim-float"
              style={{ background: u.avatar.color }}
            >
              <Icon name={u.avatar.icon} size={66} />
            </span>
            <span className="font-display text-2xl font-bold text-ink-900">{u.name}</span>
            <span className="flex items-center gap-1 text-sm text-ink-400">
              {u.pin ? (
                <>
                  <Icon name="lock" size={16} color="#9a93ad" />
                  has a code
                </>
              ) : (
                'tap to play'
              )}
            </span>
          </button>
        ))}

        <button
          onClick={() => {
            setCreating(true)
            sfx.pop()
          }}
          className="card3d card-hover flex flex-col items-center justify-center gap-2 !rounded-[2rem] border-dashed bg-white/70 p-4"
          style={{ animation: 'poli-pop 0.5s ease 0.3s backwards' }}
        >
          <span className="grid h-24 w-24 place-items-center rounded-full border-[3px] border-dashed border-ink-900/40">
            <Icon name="plus" size={52} color="#848795" />
          </span>
          <span className="font-display text-xl text-ink-500">New player</span>
        </button>
      </div>

      <div className="mt-10 flex justify-center">
        <Btn tone="white" size="md" variant="outline" icon={<Icon name="family" size={26} />} onClick={onGrownUps}>
          Grown-ups
        </Btn>
      </div>
    </div>
  )
}
