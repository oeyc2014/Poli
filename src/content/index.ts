/* ============================================================
   Poli content index — Grade 1
   ============================================================ */
import type { Lesson, Subject, SubjectId, Unit } from '../types'
import { math } from './math'
import { reading } from './reading'
import { science } from './science'
import { social } from './social'

export const GRADE = 1

export const SUBJECTS: Subject[] = [math, reading, science, social]

export const ALL_LESSONS: Lesson[] = SUBJECTS.flatMap((s) => s.units.flatMap((u) => u.lessons))

export const LESSON_COUNT_BY_SUBJECT: Record<SubjectId, number> = {
  math: math.units.flatMap((u) => u.lessons).length,
  reading: reading.units.flatMap((u) => u.lessons).length,
  science: science.units.flatMap((u) => u.lessons).length,
  social: social.units.flatMap((u) => u.lessons).length,
}

export const TOTAL_LESSONS = ALL_LESSONS.length

export function findLesson(id: string): Lesson | undefined {
  return ALL_LESSONS.find((l) => l.id === id)
}

export function findLessonContext(
  id: string,
):
  | { lesson: Lesson; unit: Unit; subject: Subject; lessonIndex: number; unitIndex: number; subjectIndex: number }
  | undefined {
  for (let si = 0; si < SUBJECTS.length; si++) {
    const subject = SUBJECTS[si]
    for (let ui = 0; ui < subject.units.length; ui++) {
      const unit = subject.units[ui]
      const li = unit.lessons.findIndex((l) => l.id === id)
      if (li >= 0) {
        return { lesson: unit.lessons[li], unit, subject, lessonIndex: li, unitIndex: ui, subjectIndex: si }
      }
    }
  }
  return undefined
}

export function subjectById(id: SubjectId): Subject | undefined {
  return SUBJECTS.find((s) => s.id === id)
}

/** Flat, ordered lesson list — used for "what's next" navigation. */
export const LESSON_ORDER: { lesson: Lesson; unit: Unit; subject: Subject }[] = SUBJECTS.flatMap((subject) =>
  subject.units.flatMap((unit) => unit.lessons.map((lesson) => ({ lesson, unit, subject }))),
)

export function nextLessonAfter(id: string): { lesson: Lesson; unit: Unit; subject: Subject } | null {
  const i = LESSON_ORDER.findIndex((x) => x.lesson.id === id)
  if (i < 0 || i + 1 >= LESSON_ORDER.length) return null
  return LESSON_ORDER[i + 1]
}

export function previousLessonBefore(id: string): { lesson: Lesson; unit: Unit; subject: Subject } | null {
  const i = LESSON_ORDER.findIndex((x) => x.lesson.id === id)
  if (i <= 0) return null
  return LESSON_ORDER[i - 1]
}

export { math, reading, science, social }
