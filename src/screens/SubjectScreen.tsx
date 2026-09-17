import type { Subject } from '../types'
import { Bar, Panel, Stars } from '../components/Ui'
import { useProgress } from '../lib/progress'
import { tone as toneOf } from '../lib/tone'
import { sfx } from '../lib/sound'
import { TOTAL_LESSONS } from '../content'
import { Icon } from '../icons'

/** The path winds left/right so it reads like a treasure map. */
const OFFSETS = [0, 1, 2, 2, 1, 0, 0, 1, 2, 2, 1, 0]

export function SubjectScreen({ subject, onPlayLesson }: { subject: Subject; onPlayLesson: (id: string) => void }) {
  const { progress, subjectDone } = useProgress()
  const t = toneOf(subject.tone)
  const allLessons = subject.units.flatMap((u) => u.lessons)
  const done = allLessons.filter((l) => progress.lessons[l.id]).length
  const stars = allLessons.reduce((s, l) => s + (progress.lessons[l.id]?.stars ?? 0), 0)

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20">
      {/* subject banner */}
      <div className={`relative mb-6 overflow-hidden rounded-[2rem] border-[4px] border-ink-900 bg-gradient-to-br p-5 shadow-[0_8px_0_0_rgba(43,34,68,0.85)] ${t.gradient}`}>
        <span className="absolute -right-8 -top-10 opacity-20 select-none">
          <Icon name={subject.icon} size={150} />
        </span>
        <div className="relative">
          <h1 className="flex items-center gap-2 font-party text-4xl text-white text-pop sm:text-5xl">
            <Icon name={subject.icon} size={54} />
            {subject.name}
          </h1>
          <p className="font-display text-lg font-semibold text-white/95">{subject.tagline}</p>
          <div className="mt-3 flex max-w-md items-center gap-3">
            <Bar value={done} max={allLessons.length} tone="sun" height={20} />
            <span className="flex shrink-0 items-center gap-1 font-display text-base font-bold text-white">
              <Icon name="star" size={20} /> {stars}/{allLessons.length * 3}
            </span>
          </div>
        </div>
      </div>

      {subject.units.map((unit, uIdx) => {
        const unitDone = unit.lessons.filter((l) => progress.lessons[l.id]).length
        return (
          <section key={unit.id} className="mb-8">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className={`anim-bob grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-ink-900 shadow-[0_4px_0_0_rgba(43,34,68,0.85)] ${toneOf(unit.tone).solid}`}>
                <Icon name={unit.icon} size={40} />
              </span>
              <div>
                <p className="font-display text-sm font-bold uppercase tracking-wide text-ink-400">
                  Unit {uIdx + 1} · {unitDone}/{unit.lessons.length} done
                </p>
                <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl">{unit.title}</h2>
              </div>
            </div>

            {/* winding path */}
            <div className="relative">
              <div className="absolute bottom-6 left-0 right-0 top-6 -z-10 mx-auto w-4 rounded-full border-[2.5px] border-ink-900/30 bg-white/60" />
              <div className="flex flex-col items-center gap-4">
                {unit.lessons.map((lesson, lIdx) => {
                  const res = progress.lessons[lesson.id]
                  const offset = OFFSETS[(uIdx * 3 + lIdx) % OFFSETS.length]
                  const isNext = !res
                  return (
                    <div
                      key={lesson.id}
                      className="flex w-full"
                      style={{
                        justifyContent: offset === 0 ? 'center' : offset === 1 ? 'flex-start' : 'flex-end',
                        paddingLeft: offset === 1 ? '4%' : 0,
                        paddingRight: offset === 2 ? '4%' : 0,
                        animation: `poli-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) ${lIdx * 0.08}s both`,
                      }}
                    >
                      <button
                        onClick={() => {
                          sfx.whoosh()
                          onPlayLesson(lesson.id)
                        }}
                        className={`card3d card-hover group flex w-full max-w-[30rem] items-center gap-3 p-3 text-left ${
                          isNext ? 'anim-glow' : ''
                        }`}
                      >
                        <span
                          className={`grid h-20 w-20 shrink-0 place-items-center rounded-3xl border-[3px] border-ink-900 text-4xl ${
                            res ? toneOf(lesson.tone).solid : 'bg-white'
                          }`}
                        >
                          <span className={isNext ? 'anim-bob' : ''}>
                            <Icon name={lesson.icon} size={52} />
                          </span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center gap-2">
                            <span className="truncate font-display text-xl font-bold text-ink-900">{lesson.title}</span>
                            {isNext && (
                              <span className="anim-jiggle shrink-0 rounded-full border-[3px] border-ink-900 bg-sun-300 px-2 py-0.5 font-display text-xs font-bold text-ink-900">
                                NEXT
                              </span>
                            )}
                          </span>
                          <span className="block truncate text-sm text-ink-500">{lesson.blurb}</span>
                          <span className="mt-1 flex items-center gap-2">
                            <Stars value={res?.stars ?? 0} size={20} />
                            {res && res.stars >= 3 && <Icon name="trophy" size={18} />}
                          </span>
                        </span>
                        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-[3px] border-ink-900 bg-grass-400 transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6">
                          <Icon name="play" size={22} color="#ffffff" />
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        )
      })}

      <Panel pad="sm" className="mt-6 text-center">
        <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 font-display text-lg text-ink-600">
          <Icon name="school" size={26} />
          <span>
            {subject.name} has {allLessons.length} lessons in 1st grade.{' '}
            {done === allLessons.length ? 'You finished them all!' : `${allLessons.length - done} to go!`}
          </span>
          {done === allLessons.length && <Icon name="trophy" size={26} />}
          <span className="block w-full text-sm text-ink-400">
            Grade 1 · {TOTAL_LESSONS} lessons in total
          </span>
        </p>
      </Panel>

      <p className="mt-6 text-center font-display text-base text-ink-400">
        {subjectDone[subject.id].total} lessons built for 1st grade
      </p>
    </div>
  )
}
