/* ============================================================
   Curriculum integrity check
   Lessons are assembled from generators, so it is worth proving
   that every generated question is actually answerable and
   unambiguous — and that every picture it points at exists.
   Run with:  npm run check:content
   ============================================================ */
import { ALL_LESSONS, SUBJECTS, TOTAL_LESSONS } from '../src/content'
import { AVATARS } from '../src/content/avatars'
import { BADGES } from '../src/content/badges'
import { STICKERS } from '../src/content/stickers'
import { SETTING_INFO } from '../src/lib/settings'
import { hasIcon } from '../src/icons'
import type { Step } from '../src/types'

const problems: string[] = []
const seenLessonIds = new Set<string>()

function fail(where: string, msg: string): void {
  problems.push(`${where}: ${msg}`)
}

/** Every picture the app draws is named in the icon registry — or it is not. */
function icon(where: string, name: string, what: string): void {
  if (!hasIcon(name)) fail(where, `${what} uses unknown picture "${name}"`)
}

/** `likeThisButTypo` — a camelCase word that failed the exact icon lookup. */
function looksLikeIconName(value: string): boolean {
  return /^[a-z]+[A-Z]/.test(value)
}

/** What the child sees on an answer tile, as a comparable string. */
function fingerprint(option: {
  text?: string
  caption?: string
  icon?: string
  group?: string[]
  shape?: { shape: string; color?: string }
}): string {
  if (option.text) return `text:${option.text}`
  if (option.caption) return `caption:${option.caption}`
  if (option.icon) return `icon:${option.icon}`
  if (option.group) return `group:${option.group.join('')}`
  if (option.shape) return `shape:${option.shape.shape}:${option.shape.color ?? ''}`
  return 'EMPTY'
}

function checkStep(where: string, step: Step, stepIds: Set<string>): void {
  if (stepIds.has(step.id)) fail(where, `duplicate step id "${step.id}"`)
  stepIds.add(step.id)

  if (!('prompt' in step) || !step.prompt || !step.prompt.trim()) {
    fail(where, `step ${step.id} (${step.kind}) has no prompt`)
  }

  switch (step.kind) {
    case 'choice': {
      if (step.options.length < 2) fail(where, `step ${step.id} has fewer than 2 options`)
      const correct = step.options.filter((o) => o.correct)
      if (correct.length !== 1) {
        fail(where, `step ${step.id} has ${correct.length} correct options (expected exactly 1)`)
      }
      const ids = new Set(step.options.map((o) => o.id))
      if (ids.size !== step.options.length) fail(where, `step ${step.id} has duplicate option ids`)
      /* fingerprint of what the child actually SEES on each tile */
      const labels = step.options.map(fingerprint)
      if (new Set(labels).size !== labels.length) {
        fail(where, `step ${step.id} has two visually identical options: ${labels.join(' | ')}`)
      }
      for (const o of step.options) {
        if (!o.text && !o.icon && !o.shape && !o.group) {
          fail(where, `step ${step.id} has an empty option`)
        }
        if (o.icon) icon(where, o.icon, `step ${step.id} option`)
        o.group?.forEach((n) => icon(where, n, `step ${step.id} option group`))
      }
      break
    }

    case 'tapCount': {
      if (!step.visual?.items?.length) fail(where, `step ${step.id} has no items to tap`)
      if (step.target < 1) fail(where, `step ${step.id} target is ${step.target}`)
      if (step.target > step.visual.items.length) {
        fail(where, `step ${step.id} asks for ${step.target} taps but only has ${step.visual.items.length} items`)
      }
      break
    }

    case 'numberLine': {
      if (step.answer < step.min || step.answer > step.max) {
        fail(where, `step ${step.id} answer ${step.answer} is outside ${step.min}..${step.max}`)
      }
      if (step.max - step.min < 2) fail(where, `step ${step.id} number line is too short`)
      break
    }

    case 'match': {
      if (step.pairs.length < 2) fail(where, `step ${step.id} has fewer than 2 pairs`)
      const lefts = step.pairs.map((p) => p.left)
      const rights = step.pairs.map((p) => p.right)
      if (new Set(lefts).size !== lefts.length) fail(where, `step ${step.id} has duplicate left tiles`)
      if (new Set(rights).size !== rights.length) fail(where, `step ${step.id} has duplicate right tiles`)
      /* a pair is either a picture name or a short label like "A" — a typo in an
         icon name shows up as an odd camelCase word rendered as tiny text */
      for (const p of step.pairs) {
        for (const side of ['left', 'right'] as const) {
          const value = p[side]
          if (!hasIcon(value) && looksLikeIconName(value)) {
            fail(where, `step ${step.id} pair ${side} "${value}" is not a known picture`)
          }
        }
      }
      break
    }

    case 'order': {
      const orders = step.items.map((i) => i.order).sort((a, b) => a - b)
      const expected = Array.from({ length: step.items.length }, (_, i) => i + 1)
      if (orders.join(',') !== expected.join(',')) {
        fail(where, `step ${step.id} orders are ${orders.join(',')} (expected ${expected.join(',')})`)
      }
      if (step.items.length < 2) fail(where, `step ${step.id} has fewer than 2 items`)
      step.items.forEach((i) => icon(where, i.icon, `step ${step.id} order item`))
      break
    }

    case 'buildWord': {
      if (step.word.length < 2) fail(where, `step ${step.id} word "${step.word}" is too short`)
      const tiles = step.tiles ?? []
      const need = step.word.split('')
      if (tiles.length === 0) fail(where, `step ${step.id} has no letter tiles`)
      /* every needed letter must be available (counting duplicates) */
      const pool = [...tiles]
      for (const letter of need) {
        const at = pool.indexOf(letter)
        if (at < 0) fail(where, `step ${step.id} cannot spell "${step.word}" — missing "${letter}" in ${tiles.join('')}`)
        else pool.splice(at, 1)
      }
      if (/[A-Z]/.test(step.word)) fail(where, `step ${step.id} word "${step.word}" should be lowercase`)
      break
    }

    case 'sort': {
      if (step.bins.length < 2) fail(where, `step ${step.id} has fewer than 2 bins`)
      if (step.items.length < 2) fail(where, `step ${step.id} has fewer than 2 items`)
      const binIds = new Set(step.bins.map((b) => b.id))
      for (const item of step.items) {
        if (!binIds.has(item.bin)) fail(where, `step ${step.id} item "${item.icon}" targets unknown bin "${item.bin}"`)
        icon(where, item.icon, `step ${step.id} sort item`)
      }
      for (const bin of step.bins) {
        icon(where, bin.icon, `step ${step.id} bin`)
        if (!step.items.some((i) => i.bin === bin.id)) {
          fail(where, `step ${step.id} bin "${bin.label}" would always be empty`)
        }
      }
      const pictures = step.items.map((i) => i.icon)
      if (new Set(pictures).size !== pictures.length) {
        fail(where, `step ${step.id} has duplicate item pictures`)
      }
      break
    }

    case 'balloonPop': {
      if (!step.target) fail(where, `step ${step.id} has no target`)
      if (!step.labels.length) fail(where, `step ${step.id} has no balloons`)
      const matches = step.labels.filter((l) => l === step.target).length
      if (matches === 0) {
        fail(where, `step ${step.id} target "${step.target}" is not among the balloon labels`)
      } else if ((step.matches ?? 3) !== matches) {
        fail(where, `step ${step.id} says ${step.matches ?? 3} matches but labels carry ${matches}`)
      }
      if (step.labels.length > 15) fail(where, `step ${step.id} has too many balloons (${step.labels.length})`)
      break
    }

    case 'pizza': {
      if (!step.toppings.length) fail(where, `step ${step.id} has no toppings`)
      const shelfIcons = (step.shelf ?? [
        'mushroom',
        'cheese',
        'pepper',
        'olive',
        'pineapple',
        'basil',
      ]).map((t) => (typeof t === 'string' ? t : t.icon))
      for (const t of step.toppings) {
        icon(where, t.icon, `step ${step.id} topping`)
        if (!shelfIcons.includes(t.icon)) {
          fail(where, `step ${step.id} topping "${t.icon}" is not on the shelf`)
        }
      }
      if (shelfIcons.length < step.toppings.length) {
        fail(where, `step ${step.id} shelf is smaller than the order`)
      }
      if (step.each !== undefined && step.each < 1) fail(where, `step ${step.id} asks for ${step.each} of each topping`)
      break
    }

    case 'race': {
      if (!step.question) fail(where, `step ${step.id} has no question`)
      if (!step.answer) fail(where, `step ${step.id} has no answer`)
      if (step.decoys.length !== 2) {
        fail(where, `step ${step.id} needs exactly 2 decoys (has ${step.decoys.length})`)
      }
      if (step.decoys.includes(step.answer)) {
        fail(where, `step ${step.id} has the answer among its decoys`)
      }
      if (new Set(step.decoys).size !== step.decoys.length) {
        fail(where, `step ${step.id} has duplicate decoys`)
      }
      break
    }

    default:
      fail(where, 'unknown step kind')
  }

  /* every visual must carry at least one picture — and name it correctly */
  const visual = 'visual' in step ? step.visual : undefined
  if (visual) {
    switch (visual.kind) {
      case 'picture':
        icon(where, visual.icon, `step ${step.id} picture`)
        break
      case 'icons':
        if (!visual.items.length) fail(where, `step ${step.id} has an empty picture visual`)
        visual.items.forEach((n) => icon(where, n, `step ${step.id} visual`))
        break
      case 'groups':
        if (visual.groups.some((g) => !g.icons.length)) fail(where, `step ${step.id} has an empty group`)
        visual.groups.forEach((g) => g.icons.forEach((n) => icon(where, n, `step ${step.id} group`)))
        break
      case 'equation':
        if (!visual.parts.length) fail(where, `step ${step.id} has an empty equation`)
        visual.parts.forEach((p) => p.icons?.forEach((n) => icon(where, n, `step ${step.id} equation`)))
        break
      case 'shapes':
        if (!visual.shapes.length) fail(where, `step ${step.id} has no shapes`)
        break
      case 'story':
        if (!visual.frames.length) fail(where, `step ${step.id} has no story frames`)
        visual.frames.forEach((f) => icon(where, f.icon, `step ${step.id} story frame`))
        break
      case 'word':
        if (!visual.words.length) fail(where, `step ${step.id} has no words`)
        break
      default:
        break
    }
  }
}

/* ---------------- run ---------------- */
let stepCount = 0
const kindCounts: Record<string, number> = {}

for (const subject of SUBJECTS) {
  icon('subject', subject.icon, subject.name)
  const subjectLessons = subject.units.flatMap((u) => u.lessons)
  if (subjectLessons.length < 15) {
    fail(`subject ${subject.id}`, `only ${subjectLessons.length} lessons (minimum 15)`)
  }
  for (const unit of subject.units) {
    icon(`${subject.id}/${unit.id}`, unit.icon, unit.title)
    for (const lesson of unit.lessons) {
      const where = `${subject.id}/${unit.id}/${lesson.id}`
      if (seenLessonIds.has(lesson.id)) fail(where, 'duplicate lesson id')
      seenLessonIds.add(lesson.id)

      if (!lesson.title) fail(where, 'lesson has no title')
      if (!lesson.icon) fail(where, 'lesson has no picture')
      else icon(where, lesson.icon, 'lesson')
      if (!lesson.blurb) fail(where, 'lesson has no blurb')
      if (lesson.steps.length < 3) fail(where, `only ${lesson.steps.length} steps`)

      /* every lesson needs a "watch and learn" part */
      if (!lesson.teach || lesson.teach.length < 1) {
        fail(where, `lesson has no teach pages (watch & learn part)`)
      } else {
        lesson.teach.forEach((page, ti) => {
          if (!page.headline) fail(where, `teach page ${ti + 1} has no headline`)
          if (!page.say) fail(where, `teach page ${ti + 1} has nothing to say`)
          if (page.icon) icon(where, page.icon, `teach page ${ti + 1}`)
          page.icons?.forEach((n) => icon(where, n, `teach page ${ti + 1} icons`))
        })
      }

      const stepIds = new Set<string>()
      lesson.steps.forEach((s, i) => {
        stepCount += 1
        kindCounts[s.kind] = (kindCounts[s.kind] ?? 0) + 1
        checkStep(`${where} #${i + 1}`, s, stepIds)
      })
    }
  }
}

/* rewards, avatars and settings are picture-driven too */
AVATARS.forEach((a) => icon('avatars', a.icon, a.name))
BADGES.forEach((b) => icon('badges', b.icon, b.name))
STICKERS.forEach((s) => icon('stickers', s.icon, s.name))
SETTING_INFO.forEach((s) => icon('settings', s.icon, s.label))

/* ---------------- report ---------------- */
console.log(`Subjects: ${SUBJECTS.length}`)
for (const s of SUBJECTS) {
  const lessons = s.units.flatMap((u) => u.lessons)
  console.log(`  ${s.name.padEnd(8)} ${s.units.length} units · ${lessons.length} lessons`)
}
console.log(`Total lessons: ${TOTAL_LESSONS} · total mini-games: ${stepCount}`)
console.log('Game mix:', JSON.stringify(kindCounts, null, 0))

if (ALL_LESSONS.length !== TOTAL_LESSONS) {
  problems.push(`ALL_LESSONS (${ALL_LESSONS.length}) does not match TOTAL_LESSONS (${TOTAL_LESSONS})`)
}

if (problems.length) {
  console.error(`\n❌ ${problems.length} problem(s):`)
  for (const p of problems.slice(0, 40)) console.error('  - ' + p)
  if (problems.length > 40) console.error(`  …and ${problems.length - 40} more`)
  process.exit(1)
}

console.log('\n✅ All lessons, questions and pictures are valid.')
