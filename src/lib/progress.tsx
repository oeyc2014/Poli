/* ============================================================
   Poli progress engine
   Stars, XP, levels, day streaks, gems, badges and stickers —
   all stored locally per kid profile.
   ============================================================ */
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import type { DayLog, Lesson, LessonResult, Progress, SubjectId, Unit } from '../types'
import { ALL_LESSONS, SUBJECTS } from '../content'
import { BADGES, type Badge, type BadgeStats } from '../content/badges'
import { stickerById } from '../content/stickers'
import { shopItemById } from '../content/shop'
import { useAuth } from './auth'
import { dayOffset, readStore, todayKey, writeStore } from './storage'

export const XP_PER_LEVEL = 200
const LEVEL_TITLES = [
  'Hatchling',
  'Explorer',
  'Adventurer',
  'Trailblazer',
  'Star Catcher',
  'Word Wizard',
  'Number Hero',
  'Champion',
  'Legend',
  'Superstar',
  'Grand Master',
  'Galaxy Brain',
]

export type LessonOutcome = {
  lessonId: string
  stars: number
  correct: number
  total: number
  xpGained: number
  gemsGained: number
  newBadges: Badge[]
  leveledUp: boolean
  level: number
  isNewBest: boolean
  previousBestStars: number
}

export function emptyProgress(): Progress {
  return {
    lessons: {},
    xp: 0,
    gems: 0,
    badges: [],
    streak: 0,
    bestStreak: 0,
    lastPlayedDay: null,
    dailyGoal: 2,
    totalCorrect: 0,
    totalWrong: 0,
    days: {},
    lastLessonId: null,
    unlockedStickers: [],
    ownedItems: [],
  }
}

export function levelFromXp(xp: number): number {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1)
}

export function levelTitle(level: number): string {
  return LEVEL_TITLES[Math.min(level - 1, LEVEL_TITLES.length - 1)]
}

export function starsFor(correct: number, total: number): number {
  if (total <= 0) return 0
  const ratio = correct / total
  if (correct === total) return 3
  if (ratio >= 0.7) return 2
  return 1
}

function withFreshStreak(p: Progress): Progress {
  if (!p.lastPlayedDay) return p
  const today = todayKey()
  const yesterday = dayOffset(today, -1)
  if (p.lastPlayedDay === today || p.lastPlayedDay === yesterday) return p
  return { ...p, streak: 0 }
}

type ProgressValue = {
  progress: Progress
  totalStars: number
  maxStars: number
  completedLessons: number
  perfectLessons: number
  level: number
  levelName: string
  xpIntoLevel: number
  subjectDone: Record<SubjectId, { done: number; total: number }>
  accuracy: number
  todayLog: DayLog
  resultFor: (lessonId: string) => LessonResult | undefined
  recordLesson: (args: {
    lesson: Lesson
    correct: number
    total: number
    minutes: number
    usedHint: boolean
  }) => LessonOutcome
  resetProgress: () => void
  buySticker: (stickerId: string) => boolean
  buyShopItem: (itemId: string) => boolean
  /** ids of accessories + themes bought in the shop */
  ownedItems: string[]
  setDailyGoal: (n: number) => void
  /** next unfinished lesson in the recommended order */
  nextUp: { lesson: Lesson; unit: Unit; subjectId: SubjectId } | null
}

const ProgressContext = createContext<ProgressValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const key = user ? `progress.${user.id}` : 'progress.guest'
  const [progress, setProgress] = useState<Progress>(emptyProgress)
  const loadedFor = useRef<string | null>(null)

  useEffect(() => {
    if (loadedFor.current === key) return
    loadedFor.current = key
    const stored = readStore<Progress | null>(key, null)
    setProgress(stored ? withFreshStreak({ ...emptyProgress(), ...stored }) : emptyProgress())
  }, [key])

  const persist = useCallback(
    (next: Progress) => {
      setProgress(next)
      writeStore(key, next)
    },
    [key],
  )

  /* ---------- derived ---------- */

  const derived = useMemo(() => {
    const results = progress.lessons
    let totalStars = 0
    let completed = 0
    let perfect = 0
    for (const l of ALL_LESSONS) {
      const r = results[l.id]
      if (!r) continue
      totalStars += r.stars
      completed += 1
      if (r.stars >= 3) perfect += 1
    }
    const subjectDone = Object.fromEntries(
      SUBJECTS.map((s) => {
        const lessons = s.units.flatMap((u) => u.lessons)
        const done = lessons.filter((l) => results[l.id]).length
        return [s.id, { done, total: lessons.length }]
      }),
    ) as Record<SubjectId, { done: number; total: number }>

    const level = levelFromXp(progress.xp)
    const answered = progress.totalCorrect + progress.totalWrong
    return {
      totalStars,
      maxStars: ALL_LESSONS.length * 3,
      completedLessons: completed,
      perfectLessons: perfect,
      level,
      levelName: levelTitle(level),
      xpIntoLevel: progress.xp % XP_PER_LEVEL,
      subjectDone,
      accuracy: answered === 0 ? 0 : Math.round((progress.totalCorrect / answered) * 100),
    }
  }, [progress])

  const recordLesson = useCallback<ProgressValue['recordLesson']>(
    ({ lesson, correct, total, minutes }) => {
      const stars = starsFor(correct, total)
      const prev = progress.lessons[lesson.id]
      const previousBestStars = prev?.stars ?? 0
      const isNewBest = stars > previousBestStars

      const xpGained = correct * 10 + stars * 20 + (stars === 3 ? 25 : 0)
      const gemsGained = stars * 3 + (stars === 3 ? 2 : 0)

      const today = todayKey()
      const yesterday = dayOffset(today, -1)
      let streak = progress.streak
      if (progress.lastPlayedDay !== today) {
        streak = progress.lastPlayedDay === yesterday ? progress.streak + 1 : 1
      }
      if (streak === 0) streak = 1

      const dayLog: DayLog = progress.days[today] ?? {
        lessons: 0,
        correct: 0,
        wrong: 0,
        minutes: 0,
      }

      const next: Progress = {
        ...progress,
        lessons: {
          ...progress.lessons,
          [lesson.id]: {
            stars: Math.max(stars, previousBestStars),
            bestCorrect: Math.max(correct, prev?.bestCorrect ?? 0),
            total,
            attempts: (prev?.attempts ?? 0) + 1,
            lastPlayed: Date.now(),
          },
        },
        xp: progress.xp + xpGained,
        gems: progress.gems + gemsGained,
        streak,
        bestStreak: Math.max(progress.bestStreak, streak),
        lastPlayedDay: today,
        totalCorrect: progress.totalCorrect + correct,
        totalWrong: progress.totalWrong + Math.max(0, total - correct),
        lastLessonId: lesson.id,
        days: {
          ...progress.days,
          [today]: {
            lessons: dayLog.lessons + 1,
            correct: dayLog.correct + correct,
            wrong: dayLog.wrong + Math.max(0, total - correct),
            minutes: dayLog.minutes + minutes,
          },
        },
      }

      /* ---- badges ---- */
      const nextLevel = levelFromXp(next.xp)
      const stats: BadgeStats = {
        progress: next,
        totalStars: derived.totalStars + (stars - previousBestStars),
        completedLessons: derived.completedLessons + (prev ? 0 : 1),
        perfectLessons: derived.perfectLessons + (stars === 3 && previousBestStars < 3 ? 1 : 0),
        subjectDone: derived.subjectDone,
        level: nextLevel,
      }
      const newBadges = BADGES.filter((b) => !next.badges.includes(b.id) && b.check(stats))
      if (newBadges.length) next.badges = [...next.badges, ...newBadges.map((b) => b.id)]

      persist(next)

      return {
        lessonId: lesson.id,
        stars,
        correct,
        total,
        xpGained,
        gemsGained,
        newBadges,
        leveledUp: nextLevel > derived.level,
        level: nextLevel,
        isNewBest,
        previousBestStars,
      }
    },
    [derived, persist, progress],
  )

  const resetProgress = useCallback(() => {
    persist(emptyProgress())
  }, [persist])

  const buySticker = useCallback<ProgressValue['buySticker']>(
    (stickerId) => {
      const sticker = stickerById(stickerId)
      if (!sticker) return false
      if (progress.unlockedStickers.includes(stickerId)) return false
      if (progress.gems < sticker.price) return false
      persist({
        ...progress,
        gems: progress.gems - sticker.price,
        unlockedStickers: [...progress.unlockedStickers, stickerId],
      })
      return true
    },
    [persist, progress],
  )

  const buyShopItem = useCallback<ProgressValue['buyShopItem']>(
    (itemId) => {
      const item = shopItemById(itemId)
      if (!item) return false
      if (progress.ownedItems.includes(itemId)) return false
      if (progress.gems < item.price) return false
      persist({
        ...progress,
        gems: progress.gems - item.price,
        ownedItems: [...progress.ownedItems, itemId],
      })
      return true
    },
    [persist, progress],
  )

  const setDailyGoal = useCallback<ProgressValue['setDailyGoal']>(
    (n) => {
      persist({ ...progress, dailyGoal: Math.max(1, Math.min(10, n)) })
    },
    [persist, progress],
  )

  const nextUp = useMemo(() => {
    for (const subject of SUBJECTS) {
      for (const unit of subject.units) {
        for (const lesson of unit.lessons) {
          const r = progress.lessons[lesson.id]
          if (!r || r.stars < 3) return { lesson, unit, subjectId: subject.id }
        }
      }
    }
    const first = SUBJECTS[0].units[0].lessons[0]
    return { lesson: first, unit: SUBJECTS[0].units[0], subjectId: SUBJECTS[0].id }
  }, [progress])

  const value = useMemo<ProgressValue>(
    () => ({
      progress,
      ...derived,
      todayLog: progress.days[todayKey()] ?? { lessons: 0, correct: 0, wrong: 0, minutes: 0 },
      resultFor: (id: string) => progress.lessons[id],
      recordLesson,
      resetProgress,
      buySticker,
      buyShopItem,
      ownedItems: progress.ownedItems,
      setDailyGoal,
      nextUp,
    }),
    [progress, derived, recordLesson, resetProgress, buySticker, buyShopItem, setDailyGoal, nextUp],
  )

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>
}

export function useProgress(): ProgressValue {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used inside <ProgressProvider>')
  return ctx
}
