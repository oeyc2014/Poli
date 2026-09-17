import { useEffect } from 'react'
import { Bar, Btn, Panel, Stars } from '../components/Ui'
import Mascot from '../components/Mascot'
import { BouncyText } from '../components/BouncyText'
import { Icon } from '../icons'
import { ALL_LESSONS, SUBJECTS, TOTAL_LESSONS } from '../content'
import type { Lesson, SubjectId } from '../types'
import { useProgress } from '../lib/progress'
import { useAuth } from '../lib/auth'
import { tone as toneOf } from '../lib/tone'
import { sfx } from '../lib/sound'
import { speak } from '../lib/speech'
import { todayKey } from '../lib/storage'

function GoalRing({ done, goal }: { done: number; goal: number }) {
  const pct = Math.min(1, goal === 0 ? 0 : done / goal)
  const r = 34
  const c = 2 * Math.PI * r
  return (
    <div className="relative grid h-[92px] w-[92px] shrink-0 place-items-center">
      <svg viewBox="0 0 84 84" className="absolute inset-0 h-full w-full -rotate-90">
        <circle cx="42" cy="42" r={r} fill="none" stroke="rgba(52,52,62,0.12)" strokeWidth="9" />
        <circle
          cx="42"
          cy="42"
          r={r}
          fill="none"
          stroke="var(--poli-accent, #66ae82)"
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct)}
          style={{ transition: 'stroke-dashoffset 900ms ease-out' }}
        />
      </svg>
      <span className="relative font-display text-xl font-bold text-ink-900">
        {done}/{goal}
      </span>
      {pct >= 1 && (
        <span className="absolute -right-2 -top-1 anim-tada">
          <Icon name="party" size={28} />
        </span>
      )}
    </div>
  )
}

function SubjectCard({
  subjectId,
  name,
  icon,
  tagline,
  done,
  total,
  stars,
  maxStars,
  onOpen,
  index,
}: {
  subjectId: SubjectId
  name: string
  icon: string
  tagline: string
  done: number
  total: number
  stars: number
  maxStars: number
  onOpen: () => void
  index: number
}) {
  const subj = SUBJECTS.find((s) => s.id === subjectId)!
  const t = toneOf(subj.tone)
  const finished = total > 0 && done >= total

  return (
    <button
      onClick={onOpen}
      className="card3d card-hover group relative flex flex-col items-start gap-3 overflow-hidden p-5 text-left"
      /* "backwards" (not "both") so the card is free to hop on hover afterwards */
      style={{ animation: `poli-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${0.08 * index}s backwards` }}
    >
      <span className={`absolute -right-6 -top-6 h-28 w-28 rounded-full opacity-20 ${t.solid}`} />
      <span className="anim-float">
        <Icon name={icon} size={84} />
      </span>
      <span className="font-display text-3xl font-bold text-ink-900">{name}</span>
      <span className="-mt-2 text-base text-ink-500">{tagline}</span>

      <div className="mt-1 w-full">
        <div className="mb-1 flex items-center justify-between font-display text-sm text-ink-500">
          <span>
            {done} of {total} lessons
          </span>
          <span className="flex items-center gap-1">
            <Icon name="star" size={18} /> {stars}/{maxStars}
          </span>
        </div>
        <Bar value={done} max={total} tone={subj.tone} height={18} />
      </div>

      <span className="mt-1 flex w-full items-center gap-2">
        <span className={`flex items-center gap-1 rounded-full border-[2.5px] border-ink-900/70 px-3 py-1 font-display text-sm font-semibold ${t.chip}`}>
          {finished ? (
            <>
              <Icon name="trophy" size={18} />
              All done!
            </>
          ) : (
            <>
              <Icon name="play" size={16} color="currentColor" />
              Keep going
            </>
          )}
        </span>
        {finished && <Stars value={3} size={20} />}
      </span>
    </button>
  )
}

export function HomeScreen({
  onOpenSubject,
  onPlayLesson,
  onOpenRewards,
  onOpenGrownUps,
  onOpenMenu,
}: {
  onOpenSubject: (id: SubjectId) => void
  onPlayLesson: (lessonId: string) => void
  onOpenRewards: () => void
  onOpenGrownUps: () => void
  onOpenMenu: () => void
}) {
  const { user } = useAuth()
  const { progress, totalStars, maxStars, completedLessons, perfectLessons, subjectDone, nextUp, level, levelName, xpIntoLevel, accuracy } =
    useProgress()

  const todayLessons = progress.days[todayKey()]?.lessons ?? 0

  useEffect(() => {
    const hour = new Date().getHours()
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
    speak(`${greeting}, ${user?.name ?? 'friend'}! Tap a subject to play.`, { rate: 0.92 })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const continueLesson: Lesson = nextUp?.lesson ?? SUBJECTS[0].units[0].lessons[0]
  const continueStars = progress.lessons[continueLesson.id]?.stars ?? 0

  /* "Surprise me!" — grab a lesson at random, preferring ones not yet mastered */
  const playSurprise = () => {
    const unfinished = ALL_LESSONS.filter((l) => (progress.lessons[l.id]?.stars ?? 0) < 3)
    const pool = unfinished.length > 0 ? unfinished : ALL_LESSONS
    const pick = pool[Math.floor(Math.random() * pool.length)]
    sfx.whoosh()
    onPlayLesson(pick.id)
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-4 pb-16">
      {/* hero */}
      <section className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:items-end">
        <Mascot size={140} mood={completedLessons === 0 ? 'cheer' : 'happy'} wave />
        <div className="text-center sm:text-left">
          <BouncyText
            as="h1"
            text={`Hi, ${user?.name ?? 'friend'}!`}
            className="font-party text-4xl text-pop-sm sm:text-5xl"
            rainbow
          />
          <p className="font-display text-xl font-semibold text-ink-700">
            Level {level} · <span className="font-bold text-grass-600">{levelName}</span>
          </p>
        </div>
        <div className="sm:ml-auto">
          <Panel pad="sm" className="flex items-center gap-3">
            <GoalRing done={todayLessons} goal={progress.dailyGoal} />
            <div className="pr-2">
              <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-ink-900">
                <Icon name="target" size={22} /> Today&apos;s goal
              </p>
              <p className="text-sm text-ink-500">
                {todayLessons >= progress.dailyGoal
                  ? 'Goal reached — amazing!'
                  : `${progress.dailyGoal - todayLessons} more lesson${progress.dailyGoal - todayLessons === 1 ? '' : 's'} to go`}
              </p>
            </div>
          </Panel>
        </div>
      </section>

      {/* XP bar */}
      <Panel pad="sm" className="mt-4 flex items-center gap-3">
        <span className="anim-heartbeat">
          <Icon name="sparkle" size={26} />
        </span>
        <Bar value={xpIntoLevel} max={200} tone="grass" height={20} />
        <span className="shrink-0 font-display text-base text-ink-500">{xpIntoLevel}/200 XP</span>
      </Panel>

      {/* continue card */}
      <section className="mt-6">
        <h2 className="mb-3 flex items-center gap-2 font-display text-2xl text-ink-800">
          <Icon name="play" size={24} color="#525464" />
          Pick up where you left off
        </h2>
        <div
          className="card3d relative overflow-hidden p-5"
          style={{ background: 'var(--poli-accent, #66ae82)', borderColor: 'var(--poli-accent-deep, #3e6e53)' }}
        >
          <div className="relative flex flex-wrap items-center gap-4">
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-3xl border-[3px] border-ink-900 bg-white/95 anim-float">
              <Icon name={continueLesson.icon} size={68} />
            </span>
            <div className="min-w-[10rem] flex-1">
              <p className="font-display text-sm text-white/90">{nextUp?.unit.title}</p>
              <h3 className="font-display text-3xl font-bold text-white text-pop-sm">{continueLesson.title}</h3>
              <p className="font-display text-base text-white/95">{continueLesson.blurb}</p>
              <div className="mt-2">
                <Stars value={continueStars} size={24} />
              </div>
            </div>
            <Btn
              tone="white"
              size="xl"
              className="anim-ring"
              icon={<Icon name="play" size={30} color="currentColor" />}
              onClick={() => {
                sfx.whoosh()
                onPlayLesson(continueLesson.id)
              }}
            >
              Play!
            </Btn>
          </div>
        </div>
      </section>

      {/* subjects */}
      <section className="mt-8">
        <h2 className="mb-3 flex items-center gap-2 font-display text-2xl text-ink-800">
          <Icon name="rocket" size={34} />
          Choose a subject
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SUBJECTS.map((s, i) => {
            const d = subjectDone[s.id]
            const lessonStars = s.units
              .flatMap((u) => u.lessons)
              .reduce((sum, l) => sum + (progress.lessons[l.id]?.stars ?? 0), 0)
            return (
              <SubjectCard
                key={s.id}
                index={i}
                subjectId={s.id}
                name={s.name}
                icon={s.icon}
                tagline={s.tagline}
                done={d.done}
                total={d.total}
                stars={lessonStars}
                maxStars={d.total * 3}
                onOpen={() => onOpenSubject(s.id)}
              />
            )
          })}
        </div>
      </section>

      {/* rewards strip */}
      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <button
          onClick={onOpenRewards}
          className="card3d card-hover flex items-center gap-4 bg-gradient-to-br from-sun-100 to-sun-300 p-5 text-left"
        >
          <span className="anim-bob">
            <Icon name="medal" size={64} />
          </span>
          <span className="flex-1">
            <span className="block font-display text-2xl font-bold text-ink-900">My Stickers &amp; Badges</span>
            <span className="block text-sm text-ink-700">
              {progress.badges.length} badges · {progress.unlockedStickers.length} stickers
            </span>
          </span>
          <span className="shrink-0">
            <Icon name="next" size={26} color="#525464" />
          </span>
        </button>

        <Panel className="flex items-center gap-4" pad="md">
          <Icon name="chart" size={44} />
          <div className="flex-1">
            <p className="font-display text-xl font-semibold text-ink-900">My progress</p>
            <p className="flex flex-wrap items-center gap-x-1.5 text-sm text-ink-500">
              <Icon name="star" size={16} /> {totalStars}/{maxStars} stars ·
              <Icon name="target" size={16} /> {accuracy}% right ·
              <Icon name="trophy" size={16} /> {perfectLessons} perfect
            </p>
            <div className="mt-2">
              <Bar value={completedLessons} max={TOTAL_LESSONS} tone="grass" height={16} />
            </div>
          </div>
        </Panel>
      </section>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Btn tone="sun" variant="solid" size="md" icon={<Icon name="sparkleSwirl" size={28} />} onClick={playSurprise}>
          Surprise me!
        </Btn>
        <Btn tone="white" variant="outline" size="md" icon={<Icon name="family" size={26} />} onClick={onOpenGrownUps}>
          Grown-ups
        </Btn>
        <Btn tone="white" variant="outline" size="md" icon={<Icon name="backpack" size={26} />} onClick={onOpenMenu}>
          My stuff
        </Btn>
      </div>

      <p className="mt-4 text-center text-sm text-ink-400">
        Tip: press <kbd className="rounded-md border-2 border-ink-900/15 bg-white/80 px-1.5 font-display">1</kbd>–
        <kbd className="rounded-md border-2 border-ink-900/15 bg-white/80 px-1.5 font-display">9</kbd> to answer with the keyboard,
        or <kbd className="rounded-md border-2 border-ink-900/15 bg-white/80 px-1.5 font-display">R</kbd> to hear the question again.
      </p>
    </div>
  )
}
