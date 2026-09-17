import type { Progress, SubjectId } from '../types'

export type BadgeStats = {
  progress: Progress
  totalStars: number
  completedLessons: number
  perfectLessons: number
  subjectDone: Record<SubjectId, { done: number; total: number }>
  level: number
}

export type Badge = {
  id: string
  name: string
  icon: string
  blurb: string
  /** how rare it feels — drives the celebration size */
  tier: 'bronze' | 'silver' | 'gold'
  check: (s: BadgeStats) => boolean
}

export const BADGES: Badge[] = [
  {
    id: 'hello-world',
    name: 'First Steps',
    icon: 'party',
    blurb: 'Finish your very first lesson',
    tier: 'bronze',
    check: (s) => s.completedLessons >= 1,
  },
  {
    id: 'three-stars',
    name: 'Perfect!',
    icon: 'star',
    blurb: 'Get all 3 stars on a lesson',
    tier: 'bronze',
    check: (s) => s.perfectLessons >= 1,
  },
  {
    id: 'star-15',
    name: 'Star Collector',
    icon: 'starGlow',
    blurb: 'Collect 15 stars',
    tier: 'silver',
    check: (s) => s.totalStars >= 15,
  },
  {
    id: 'star-40',
    name: 'Sky Full of Stars',
    icon: 'sparkle',
    blurb: 'Collect 40 stars',
    tier: 'gold',
    check: (s) => s.totalStars >= 40,
  },
  {
    id: 'streak-3',
    name: 'Three in a Row',
    icon: 'fire',
    blurb: 'Play 3 days in a row',
    tier: 'bronze',
    check: (s) => s.progress.streak >= 3 || s.progress.bestStreak >= 3,
  },
  {
    id: 'streak-7',
    name: 'Week of Wow',
    icon: 'rocket',
    blurb: 'Play 7 days in a row',
    tier: 'gold',
    check: (s) => s.progress.streak >= 7 || s.progress.bestStreak >= 7,
  },
  {
    id: 'math-whiz',
    name: 'Number Ninja',
    icon: 'numbers',
    blurb: 'Finish every Math lesson',
    tier: 'gold',
    check: (s) => s.subjectDone.math.done >= s.subjectDone.math.total && s.subjectDone.math.total > 0,
  },
  {
    id: 'bookworm',
    name: 'Bookworm',
    icon: 'book',
    blurb: 'Finish every Reading lesson',
    tier: 'gold',
    check: (s) =>
      s.subjectDone.reading.done >= s.subjectDone.reading.total && s.subjectDone.reading.total > 0,
  },
  {
    id: 'little-scientist',
    name: 'Little Scientist',
    icon: 'microscope',
    blurb: 'Finish every Science lesson',
    tier: 'gold',
    check: (s) =>
      s.subjectDone.science.done >= s.subjectDone.science.total && s.subjectDone.science.total > 0,
  },
  {
    id: 'perfect-5',
    name: 'Super Speller',
    icon: 'trophy',
    blurb: 'Get 3 stars on 5 lessons',
    tier: 'silver',
    check: (s) => s.perfectLessons >= 5,
  },
  {
    id: 'correct-100',
    name: '100 Club',
    icon: 'hundred',
    blurb: 'Answer 100 questions',
    tier: 'silver',
    check: (s) => s.progress.totalCorrect >= 100,
  },
  {
    id: 'goal-getter',
    name: 'Goal Getter',
    icon: 'target',
    blurb: 'Reach your daily goal',
    tier: 'bronze',
    check: (s) => {
      const today = new Date()
      const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(
        today.getDate(),
      ).padStart(2, '0')}`
      return (s.progress.days[key]?.lessons ?? 0) >= s.progress.dailyGoal
    },
  },
  {
    id: 'level-5',
    name: 'Rising Star',
    icon: 'rainbow',
    blurb: 'Reach Level 5',
    tier: 'silver',
    check: (s) => s.level >= 5,
  },
  {
    id: 'level-10',
    name: 'Legend',
    icon: 'crown',
    blurb: 'Reach Level 10',
    tier: 'gold',
    check: (s) => s.level >= 10,
  },
  {
    id: 'half-way',
    name: 'Halfway Hero',
    icon: 'compass',
    blurb: 'Finish half of all 1st grade lessons',
    tier: 'silver',
    check: (s) => {
      const total = Object.values(s.subjectDone).reduce((a, b) => a + b.total, 0)
      const done = Object.values(s.subjectDone).reduce((a, b) => a + b.done, 0)
      return total > 0 && done >= Math.ceil(total / 2)
    },
  },
  {
    id: 'champion',
    name: '1st Grade Champion',
    icon: 'medal',
    blurb: 'Finish every single 1st grade lesson',
    tier: 'gold',
    check: (s) =>
      Object.values(s.subjectDone).every((v) => v.total > 0 && v.done >= v.total),
  },
]

export function badgeById(id: string): Badge | undefined {
  return BADGES.find((b) => b.id === id)
}
