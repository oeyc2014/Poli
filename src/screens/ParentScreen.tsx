import { useEffect, useState } from 'react'
import { Bar, Btn, IconBtn, Panel, Stars, Toggle } from '../components/Ui'
import { SETTING_INFO, useSettings } from '../lib/settings'
import { useProgress, XP_PER_LEVEL, levelFromXp, levelTitle } from '../lib/progress'
import { useAuth } from '../lib/auth'
import { SUBJECTS, TOTAL_LESSONS } from '../content'
import { BADGES } from '../content/badges'
import { Icon } from '../icons'
import { sfx } from '../lib/sound'
import { speak } from '../lib/speech'
import { todayKey, dayOffset } from '../lib/storage'

/* ------------------------------------------------------------
   A keypad gate so little fingers can't wander in here
   ------------------------------------------------------------ */
function PinGate({ onPass }: { onPass: () => void }) {
  const { parentPin } = useAuth()
  const [entry, setEntry] = useState('')
  const [shake, setShake] = useState(false)

  useEffect(() => {
    if (parentPin) speak('Grown-ups area. Please type the code.', { rate: 0.95 })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const press = (d: string) => {
    if (entry.length >= 4) return
    const next = entry + d
    setEntry(next)
    sfx.tap()
    if (next.length === 4) {
      window.setTimeout(() => {
        if (next === parentPin) onPass()
        else {
          setShake(true)
          sfx.wrong()
          window.setTimeout(() => {
            setShake(false)
            setEntry('')
          }, 600)
        }
      }, 150)
    }
  }

  return (
    <div className="mx-auto w-full max-w-md px-4 py-10">
      <Panel pad="lg" className="flex flex-col items-center gap-4">
        <Icon name="lock" size={84} color="#6b6480" />
        <h1 className="font-display text-3xl text-ink-900">Grown-ups only</h1>
        <p className="font-display text-lg text-ink-500">Type the 4-digit code</p>
        <div className={`flex gap-3 ${shake ? 'anim-shake' : ''}`}>
          {[0, 1, 2, 3].map((i) => (
            <span
              key={i}
              className={`grid h-14 w-12 place-items-center rounded-2xl border-4 font-display text-3xl ${
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
              className="btn3d min-h-[58px] bg-white text-2xl"
              style={{ ['--btn-shadow' as string]: '#aaacb8' }}
            >
              {d}
            </button>
          ))}
          <button
            onClick={() => setEntry((e) => e.slice(0, -1))}
            className="btn3d min-h-[58px] bg-ink-100"
            style={{ ['--btn-shadow' as string]: '#848795' }}
          >
            <Icon name="back" size={22} color="#41424f" />
          </button>
          <button
            onClick={() => press('0')}
            className="btn3d min-h-[58px] bg-white text-2xl"
            style={{ ['--btn-shadow' as string]: '#aaacb8' }}
          >
            0
          </button>
          <button
            onClick={() => setEntry('')}
            className="btn3d min-h-[58px] bg-ink-100 text-xl"
            style={{ ['--btn-shadow' as string]: '#848795' }}
          >
            C
          </button>
        </div>
      </Panel>
    </div>
  )
}

/* ------------------------------------------------------------
   Dashboard
   ------------------------------------------------------------ */
export function ParentScreen() {
  const { parentPin, setParentPin, user, users, deleteUser } = useAuth()
  const [passed, setPassed] = useState(!parentPin)
  const { settings, toggle } = useSettings()
  const progress = useProgress()
  const [newPin, setNewPin] = useState('')
  const [confirmReset, setConfirmReset] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (!passed) return <PinGate onPass={() => setPassed(true)} />

  const today = todayKey()
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const key = dayOffset(today, -(6 - i))
    return { key, log: progress.progress.days[key] }
  })
  const weekMinutes = last7.reduce((s, d) => s + (d.log?.minutes ?? 0), 0)
  const weekLessons = last7.reduce((s, d) => s + (d.log?.lessons ?? 0), 0)
  const level = levelFromXp(progress.progress.xp)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20">
      <div className="flex flex-wrap items-center gap-3">
        <Icon name="family" size={62} />
        <div>
          <h1 className="font-display text-4xl font-bold text-ink-900">Grown-ups</h1>
          <p className="font-display text-lg text-ink-500">
            Progress report for {user?.name ?? 'this player'} · Grade 1
          </p>
        </div>
      </div>

      {/* headline numbers */}
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">          {[
          { icon: 'school', label: 'Lessons finished', value: `${progress.completedLessons}/${TOTAL_LESSONS}` },
          { icon: 'target', label: 'Accuracy', value: `${progress.accuracy}%` },
          { icon: 'star', label: 'Stars earned', value: `${progress.totalStars}/${progress.maxStars}` },
          { icon: 'fire', label: 'Day streak', value: `${progress.progress.streak}` },
        ].map((s) => (
          <Panel key={s.label} pad="sm" className="flex flex-col items-center text-center">
            <Icon name={s.icon} size={36} />
            <div className="font-display text-2xl font-bold text-ink-900">{s.value}</div>
            <div className="font-display text-xs text-ink-500">{s.label}</div>
          </Panel>
        ))}
      </div>

      {/* per subject */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="book" size={30} />
          Progress by subject
        </h2>
        <div className="mt-3 flex flex-col gap-4">
          {SUBJECTS.map((s) => {
            const d = progress.subjectDone[s.id]
            const lessons = s.units.flatMap((u) => u.lessons)
            const stars = lessons.reduce((sum, l) => sum + (progress.progress.lessons[l.id]?.stars ?? 0), 0)
            const perfect = lessons.filter((l) => (progress.progress.lessons[l.id]?.stars ?? 0) >= 3).length
            return (
              <div key={s.id}>
                <div className="flex flex-wrap items-center gap-2">
                  <Icon name={s.icon} size={30} />
                  <span className="font-display text-xl font-semibold text-ink-900">{s.name}</span>
                  <span className="ml-auto flex items-center gap-1.5 font-display text-base text-ink-500">
                    {d.done}/{d.total} lessons
                    <Icon name="star" size={16} /> {stars}/{d.total * 3}
                    <Icon name="trophy" size={16} /> {perfect} perfect
                  </span>
                </div>
                <div className="mt-1.5">
                  <Bar value={d.done} max={d.total} tone={s.tone} height={18} />
                </div>
                <p className="mt-1 text-xs text-ink-400">Skills: {s.strands.join(' · ')}</p>
              </div>
            )
          })}
        </div>
      </Panel>

      {/* last 7 days */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="calendar" size={30} />
          This week
        </h2>
        <p className="text-sm text-ink-500">
          {weekLessons} lesson{weekLessons === 1 ? '' : 's'} · about {weekMinutes} minute
          {weekMinutes === 1 ? '' : 's'} of practice
        </p>
        <div className="mt-3 flex items-end justify-between gap-2">
          {last7.map((d, i) => {
            const n = d.log?.lessons ?? 0
            const h = Math.min(100, n * 26) + 6
            return (
              <div key={d.key} className="flex flex-1 flex-col items-center gap-1">
                <span className="font-display text-sm text-ink-500">{n > 0 ? n : ''}</span>
                <span
                  className={`anim-bar-grow w-full rounded-t-xl border-[3px] border-ink-900/70 ${
                    n > 0 ? 'bg-grass-400' : 'bg-ink-100'
                  }`}
                  style={{ height: h, animationDelay: `${i * 0.07}s` }}
                />
                <span className="font-display text-xs text-ink-400">{d.key.slice(8)}</span>
              </div>
            )
          })}
        </div>
      </Panel>

      {/* misconceptions / tough spots */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="search" size={30} color="#3b2f5e" />
          Lessons worth revisiting
        </h2>
        {Object.keys(progress.progress.lessons).length === 0 ? (
          <p className="mt-2 font-display text-lg text-ink-500">
            No lessons played yet — pick a subject from the home screen to begin.
          </p>
        ) : (
          <ul className="mt-2 flex flex-col gap-2">
            {Object.entries(progress.progress.lessons)
              .filter(([, r]) => r.stars < 3)
              .sort((a, b) => a[1].stars - b[1].stars)
              .slice(0, 5)
              .map(([id, r]) => {
                const found = SUBJECTS.flatMap((s) => s.units.flatMap((u) => u.lessons)).find((l) => l.id === id)
                return (
                  <li key={id} className="flex items-center gap-3 rounded-2xl bg-cream-100 p-3">
                    <Icon name={found?.icon ?? 'book'} size={34} />
                    <span className="flex-1 font-display text-lg text-ink-800">{found?.title ?? id}</span>
                    <Stars value={r.stars} size={20} />
                    <span className="font-display text-sm text-ink-500">
                      {r.bestCorrect}/{r.total} best
                    </span>
                  </li>
                )
              })}
            {Object.values(progress.progress.lessons).every((r) => r.stars >= 3) && (
              <li className="flex items-center gap-2 font-display text-lg text-grass-700">
                <Icon name="trophy" size={28} />
                Every lesson played so far has 3 stars. Wonderful!
              </li>
            )}
          </ul>
        )}
      </Panel>

      {/* badges */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="medal" size={32} />
          Badges ({progress.progress.badges.length}/{BADGES.length})
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {BADGES.map((b) => {
            const got = progress.progress.badges.includes(b.id)
            return (
              <span
                key={b.id}
                title={b.blurb}
                className={`flex items-center gap-1.5 rounded-full border-[3px] px-3 py-1 font-display text-sm ${
                  got ? 'border-sun-600 bg-sun-200 text-ink-900' : 'border-ink-900/20 bg-white text-ink-400'
                }`}
              >
                <span style={{ filter: got ? 'none' : 'grayscale(1)' }}>
                  <Icon name={b.icon} size={22} />
                </span>
                {got ? b.name : '???'}
              </span>
            )
          })}
        </div>
      </Panel>

      {/* XP */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="sparkle" size={30} />
          Level &amp; XP
        </h2>
        <p className="font-display text-lg text-ink-600">
          Level {level} · {levelTitle(level)} — {progress.progress.xp} XP total
        </p>
        <div className="mt-2">
          <Bar value={progress.progress.xp % XP_PER_LEVEL} max={XP_PER_LEVEL} tone="grape" height={20} />
        </div>
      </Panel>

      {/* settings */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="gear" size={30} color="#3b2f5e" />
          App settings
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          {SETTING_INFO.map((info) => (
            <div key={info.key} className="flex items-center gap-3 rounded-2xl bg-cream-100 p-3">
              <Icon name={info.icon} size={28} color="#3b2f5e" />
              <div className="min-w-0 flex-1">
                <p className="font-display text-lg text-ink-900">{info.label}</p>
                <p className="text-xs text-ink-500">{info.blurb}</p>
              </div>
              <Toggle on={settings[info.key]} onChange={() => toggle(info.key)} label={info.label} />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-2 rounded-2xl bg-cream-100 p-3">
          <Icon name="target" size={28} />
          <span className="flex-1 font-display text-lg text-ink-900">Daily goal: {progress.progress.dailyGoal} lessons</span>
          <div className="flex gap-1">
            {[1, 2, 3, 5].map((n) => (
              <button
                key={n}
                onClick={() => {
                  progress.setDailyGoal(n)
                  sfx.tap()
                }}
                className={`h-10 w-10 rounded-xl border-[3px] font-display text-lg font-bold ${
                  progress.progress.dailyGoal === n
                    ? 'border-ink-900 bg-grass-400 text-white'
                    : 'border-ink-900/30 bg-white text-ink-600'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      {/* security + data */}
      <Panel pad="md" className="mt-4">
        <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
          <Icon name="key" size={30} />
          Code &amp; data
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <input
            value={newPin}
            inputMode="numeric"
            maxLength={4}
            placeholder="4-digit code"
            onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
            className="w-40 rounded-xl border-[2.5px] border-ink-900/40 bg-white px-3 py-2 font-display text-xl tracking-[0.3em]"
          />
          <Btn
            tone="sky"
            size="sm"
            onClick={() => {
              if (newPin.length === 4) {
                setParentPin(newPin)
                setNewPin('')
                sfx.correct()
              } else {
                sfx.wrong()
              }
            }}
          >
            Save code
          </Btn>
          {parentPin && (
            <Btn tone="white" variant="outline" size="sm" onClick={() => setParentPin(null)}>
              Remove code
            </Btn>
          )}
        </div>
        <p className="mt-2 text-xs text-ink-500">
          The code keeps the Grown-ups area out of little hands. It is stored only on this device.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Btn
            tone="coral"
            size="sm"
            icon={<Icon name="refresh" size={22} color="currentColor" />}
            onClick={() => setConfirmReset(true)}
          >
            Reset progress
          </Btn>
          {users.length > 1 && user && (
            <Btn
              tone="coral"
              variant="outline"
              size="sm"
              icon={<Icon name="trash" size={22} color="currentColor" />}
              onClick={() => setConfirmDelete(true)}
            >
              Remove this player
            </Btn>
          )}
        </div>

        {confirmReset && (
          <div className="mt-3 rounded-2xl border-4 border-coral-400 bg-coral-100 p-3">
            <p className="font-display text-lg text-ink-900">
              Reset all stars, badges and XP for {user?.name}? This cannot be undone.
            </p>
            <div className="mt-2 flex gap-2">
              <Btn
                tone="coral"
                size="sm"
                onClick={() => {
                  progress.resetProgress()
                  setConfirmReset(false)
                }}
              >
                Yes, reset
              </Btn>
              <Btn tone="white" variant="outline" size="sm" onClick={() => setConfirmReset(false)}>
                Cancel
              </Btn>
            </div>
          </div>
        )}

        {confirmDelete && user && (
          <div className="mt-3 rounded-2xl border-4 border-coral-400 bg-coral-100 p-3">
            <p className="font-display text-lg text-ink-900">
              Delete {user.name}&apos;s profile and all their progress?
            </p>
            <div className="mt-2 flex gap-2">
              <Btn
                tone="coral"
                size="sm"
                onClick={() => {
                  deleteUser(user.id)
                  setConfirmDelete(false)
                }}
              >
                Yes, delete
              </Btn>
              <Btn tone="white" variant="outline" size="sm" onClick={() => setConfirmDelete(false)}>
                Cancel
              </Btn>
            </div>
          </div>
        )}
      </Panel>

      <p className="mt-5 text-center text-xs text-ink-400">
        Poli stores everything in this browser only. Nothing is uploaded, and no account is required.
      </p>

      <div className="mt-4 flex justify-center">
        <IconBtn label="top" size={44} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <Icon name="up" size={22} color="currentColor" />
        </IconBtn>
      </div>
    </div>
  )
}
