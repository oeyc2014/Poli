import { useEffect, useState } from 'react'
import { Btn, Panel, Stars } from '../components/Ui'
import { Confetti } from '../components/Confetti'
import Mascot from '../components/Mascot'
import { BouncyText } from '../components/BouncyText'
import { Icon } from '../icons'
import type { LessonOutcome } from '../lib/progress'
import { speak } from '../lib/speech'
import { haptic, sfx } from '../lib/sound'
import type { Lesson } from '../types'
import { badgeById } from '../content/badges'

const PRAISE = ['Amazing!', 'Wow!', 'Great job!', 'You did it!', 'Superstar!', 'Fantastic!']

export function ResultsScreen({
  outcome,
  lesson,
  onHome,
  onReplay,
  onNext,
  nextLesson,
}: {
  outcome: LessonOutcome
  lesson: Lesson
  onHome: () => void
  onReplay: () => void
  onNext: () => void
  nextLesson: Lesson | null
}) {
  const [showStars, setShowStars] = useState(0)
  /* chosen once — otherwise the headline would change as the stars pop in */
  const [praise] = useState(() => PRAISE[Math.floor(Math.random() * PRAISE.length)])
  const perfect = outcome.stars >= 3
  const accuracy = outcome.total === 0 ? 0 : Math.round((outcome.correct / outcome.total) * 100)

  useEffect(() => {
    sfx.win()
    speak(`${praise} You finished ${lesson.title}!`, { rate: 0.92 })
    /* reveal the stars one at a time so the moment lands */
    const timers = Array.from({ length: outcome.stars }, (_, i) =>
      window.setTimeout(() => {
        setShowStars(i + 1)
        sfx.star()
        haptic(18)
      }, 500 + i * 480),
    )
    if (outcome.newBadges.length) {
      timers.push(
        window.setTimeout(() => sfx.badge(), 700 + outcome.stars * 480),
      )
    }
    return () => timers.forEach(window.clearTimeout)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [])

  const earnedBadges = outcome.newBadges.map((b) => badgeById(b.id)).filter(Boolean)

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-16">
      <Confetti active count={60} duration={5200} />

      <div className="text-center">
        <Mascot size={150} mood={perfect ? 'cheer' : 'wow'} wave className="mx-auto" />
        <BouncyText
          as="h1"
          text={praise}
          rainbow
          stagger={0.07}
          delay={0.15}
          className="mt-1 font-party text-5xl text-pop sm:text-7xl"
        />
        <p className="mt-1 font-display text-xl text-ink-700">You finished “{lesson.title}”</p>
      </div>

      {/* stars */}
      <Panel pad="lg" className="mt-5 text-center">
        <div className="flex justify-center">
          <Stars value={showStars} size={72} animate />
        </div>
        <p className="mt-3 flex items-center justify-center gap-2 font-display text-2xl font-bold text-ink-900">
          {perfect && <Icon name="trophy" size={32} />}
          {perfect ? 'ALL THREE STARS!' : outcome.stars === 2 ? 'Two stars — so close!' : 'You earned a star!'}
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { icon: 'check', label: 'Right', value: `${outcome.correct}/${outcome.total}` },
            { icon: 'target', label: 'Accuracy', value: `${accuracy}%` },
            { icon: 'sparkle', label: 'XP', value: `+${outcome.xpGained}` },
            { icon: 'coin', label: 'Coins', value: `+${outcome.gemsGained}` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center rounded-2xl border-[3px] border-ink-900/15 bg-cream-100 p-3">
              <Icon name={s.icon} size={34} />
              <div className="font-display text-2xl font-bold text-ink-900">{s.value}</div>
              <div className="font-display text-sm text-ink-500">{s.label}</div>
            </div>
          ))}
        </div>

        {outcome.leveledUp && (
          <div className="mt-4 rounded-2xl border-[3px] border-grape-500 bg-grape-100 p-3 anim-tada">
            <p className="flex items-center justify-center gap-2 font-display text-2xl font-bold text-grape-700">
              <Icon name="rainbow" size={34} />
              LEVEL UP! You are Level {outcome.level}!
            </p>
          </div>
        )}
      </Panel>

      {/* new badges */}
      {earnedBadges.length > 0 && (
        <Panel pad="md" className="mt-4 anim-bounce-in">
          <h2 className="flex items-center gap-2 font-display text-2xl text-ink-900">
            <Icon name="gift" size={32} />
            New badges unlocked!
          </h2>
          <div className="mt-3 flex flex-wrap gap-3">
            {earnedBadges.map((b) => (
              <div
                key={b!.id}
                className="flex items-center gap-3 rounded-2xl border-[3px] border-sun-500 bg-sun-100 p-3 anim-tada"
              >
                <Icon name={b!.icon} size={48} />
                <div>
                  <p className="font-display text-xl font-bold text-ink-900">{b!.name}</p>
                  <p className="text-sm text-ink-600">{b!.blurb}</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      )}

      {/* encouragement */}
      <Panel pad="md" className="mt-4 flex items-center gap-3">
        <Icon name="bulb" size={42} />
        <p className="font-display text-lg text-ink-700">
          {perfect
            ? 'Perfect score! Try the next lesson to keep your streak going.'
            : accuracy >= 70
              ? 'Nice work! Play again to turn those last ones into stars.'
              : 'Good effort! Every try makes your brain stronger. Play again?'}
        </p>
      </Panel>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {nextLesson && (
          <Btn tone="grass" size="xl" className="anim-ring" icon={<Icon name="play" size={30} color="currentColor" />} onClick={onNext}>
            Next: {nextLesson.title}
          </Btn>
        )}
        <Btn tone="sun" size="lg" icon={<Icon name="refresh" size={26} color="currentColor" />} onClick={onReplay}>
          Play again
        </Btn>
        <Btn tone="white" variant="outline" size="lg" icon={<Icon name="house" size={26} />} onClick={onHome}>
          Home
        </Btn>
      </div>
    </div>
  )
}
