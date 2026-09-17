/* ============================================================
   Question builders
   Writing 200+ hand-typed questions is a bad idea, so lessons are
   assembled from these little factories. Each one guarantees a
   correct answer plus *near-miss* distractors, which is what
   actually teaches (option "±1" catches kids who guess).
   ============================================================ */
import type {
  BalloonStep,
  BuildWordStep,
  ChoiceStep,
  GameOption,
  MatchStep,
  NumberLineStep,
  OrderStep,
  PizzaStep,
  RaceStep,
  ShapeSpec,
  SortStep,
  Step,
  TapCountStep,
  TeachPage,
  ToneKey,
  Visual,
} from '../types'

let counter = 0
export function sid(prefix: string): string {
  counter += 1
  return `${prefix}-${counter}`
}

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice()
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function pickOne<T>(arr: readonly T[], notIn: readonly T[] = []): T {
  const usable = arr.filter((a) => !notIn.includes(a))
  const pool = usable.length ? usable : arr
  return pool[Math.floor(Math.random() * pool.length)]
}

/** Repeat an icon n times, in a shuffled "pile" order so it looks natural. */
export function repeat(icon: string, n: number): string[] {
  return Array.from({ length: Math.max(0, n) }, () => icon)
}

/* ------------------------------------------------------------
   Number options with sensible near-miss distractors
   ------------------------------------------------------------ */
function distractorPool(answer: number, min: number, max: number): number[] {
  const deltas = [1, -1, 2, -2, 3, -3, 10, -10, 4, -4, 5, -5]
  const out: number[] = []
  for (const d of deltas) {
    const v = answer + d
    if (v >= min && v <= max && v !== answer && !out.includes(v)) out.push(v)
  }
  return out
}

/**
 * Build the tiles for a "pick the number" question.
 * Distractors are chosen from close-by values, then shuffled.
 */
export function numberChoices(
  answer: number,
  opts: { count?: number; min?: number; max?: number; decoys?: number[] } = {},
): GameOption[] {
  const count = opts.count ?? 3
  const min = opts.min ?? Math.max(0, answer - 10)
  const max = opts.max ?? answer + 10
  const pool = shuffle([...(opts.decoys ?? []).filter((d) => d !== answer), ...distractorPool(answer, min, max)])
  const unique = pool.filter((v, i) => pool.indexOf(v) === i)
  const chosen = unique.slice(0, Math.max(1, count - 1))
  return shuffle([
    { id: sid('opt'), text: String(answer), correct: true },
    ...chosen.map((v) => ({ id: sid('opt'), text: String(v) })),
  ])
}

/** Build picture-option tiles where one is right. */
export function pictureChoices(
  correct: { icon: string; caption?: string },
  wrongs: { icon: string; caption?: string }[],
): GameOption[] {
  return shuffle([
    { id: sid('opt'), icon: correct.icon, caption: correct.caption, correct: true },
    ...wrongs.map((w) => ({ id: sid('opt'), icon: w.icon, caption: w.caption })),
  ])
}

/** Build word-option tiles where one is right. */
export function wordChoices(correct: string, wrongs: string[]): GameOption[] {
  return shuffle([
    { id: sid('opt'), text: correct, correct: true },
    ...wrongs.map((w) => ({ id: sid('opt'), text: w })),
  ])
}

/* ------------------------------------------------------------
   Step factories
   ------------------------------------------------------------ */

export function countStep(icon: string, n: number, range = 5): ChoiceStep {
  const items = repeat(icon, n)
  return {
    id: sid('count'),
    kind: 'choice',
    prompt: 'How many do you see?',
    say: 'Count them. How many do you see?',
    hint: 'Point at each one and count out loud: one, two, three…',
    explain: `There are ${n}. Count them one at a time, then stop.`,
    visual: { kind: 'icons', items, layout: 'grid', size: 'lg' },
    options: numberChoices(n, {
      count: 3,
      min: Math.max(0, n - range),
      max: n + range,
    }),
  }
}

export function tapCountStep(
  icon: string,
  n: number,
  target: number,
  opts: { prompt?: string; mode?: 'select' | 'collect' } = {},
): TapCountStep {
  return {
    id: sid('tap'),
    kind: 'tapCount',
    prompt: opts.prompt ?? `Tap ${target}!`,
    say: opts.prompt ?? `Tap exactly ${target}.`,
    hint: `Count as you tap. You need ${target}.`,
    explain: `${target} is the right amount. Count each one as you tap it.`,
    visual: { kind: 'icons', items: repeat(icon, n), layout: 'grid', size: 'lg' },
    target,
    mode: opts.mode ?? 'select',
  }
}

export function addStep(a: number, b: number, icon: string, opts: { max?: number } = {}): ChoiceStep {
  const max = opts.max ?? a + b + 4
  return {
    id: sid('add'),
    kind: 'choice',
    prompt: 'How many in all?',
    say: `${a} plus ${b}. How many in all?`,
    hint: 'Count every one of them, all together.',
    explain: `${a} and ${b} make ${a + b}. Count them all together to check.`,
    visual: {
      kind: 'equation',
      parts: [
        { icons: repeat(icon, a) },
        { text: '+' },
        { icons: repeat(icon, b) },
        { text: '=' },
        { text: '?' },
      ],
    },
    options: numberChoices(a + b, { count: 3, min: Math.max(0, a + b - 4), max }),
  }
}

export function subStep(a: number, b: number, icon: string): ChoiceStep {
  return {
    id: sid('sub'),
    kind: 'choice',
    prompt: 'How many are left?',
    say: `${a} take away ${b}. How many are left?`,
    hint: `Start with ${a} and cross out ${b} of them.`,
    explain: `${a} take away ${b} leaves ${a - b}. The crossed-out ones are gone.`,
    visual: {
      kind: 'equation',
      parts: [
        { icons: repeat(icon, a) },
        { text: '−' },
        { icons: repeat(icon, b), faded: true },
        { text: '=' },
        { text: '?' },
      ],
    },
    options: numberChoices(a - b, { count: 3, min: 0, max: a }),
  }
}

export function makeTenStep(a: number, target = 10): ChoiceStep {
  return {
    id: sid('ten'),
    kind: 'choice',
    prompt: `What goes with ${a} to make ${target}?`,
    say: `What goes with ${a} to make ${target}?`,
    hint: `Count the empty boxes in the frame.`,
    explain: `${a} and ${target - a} make ${target}. The empty boxes are the answer!`,
    visual: { kind: 'tenframe', filled: a, caption: `${a} and ? make ${target}` },
    options: numberChoices(target - a, { count: 3, min: 0, max: target }),
  }
}

export function countOnStep(from: number, delta: number, icon: string): ChoiceStep {
  const answer = from + delta
  return {
    id: sid('counton'),
    kind: 'choice',
    prompt: delta > 0 ? `Count on ${delta} from ${from}. Where do you land?` : `Count back ${-delta} from ${from}. Where do you land?`,
    say: `Count on ${delta} from ${from}. Where do you land?`,
    hint: 'Use your fingers, or hop along the number line.',
    explain: `Starting at ${from} and moving ${delta > 0 ? 'forward' : 'back'} ${Math.abs(delta)} lands you on ${answer}.`,
    visual: { kind: 'icons', items: repeat(icon, from), layout: 'grid', size: 'md', caption: `${from} so far…` },
    options: numberChoices(answer, { count: 3, min: 0, max: Math.max(answer + 3, from + 6) }),
  }
}

export function compareStep(
  a: number,
  b: number,
  emojiA: string,
  emojiB: string,
  mode: 'more' | 'fewer' = 'more',
): ChoiceStep {
  const aWins = mode === 'more' ? a > b : a < b
  return {
    id: sid('cmp'),
    kind: 'choice',
    prompt: `Tap the group with ${mode === 'more' ? 'MORE' : 'FEWER'}.`,
    say: `Tap the group with ${mode === 'more' ? 'more' : 'fewer'}.`,
    hint: 'Count both groups, then compare the numbers.',
    explain: `${a} and ${b} — ${mode === 'more' ? 'the bigger' : 'the smaller'} number is ${Math[mode === 'more' ? 'max' : 'min'](
      a,
      b,
    )}.`,
    options: shuffle([
      {
        id: sid('opt'),
        group: repeat(emojiA, a),
        caption: `${a}`,
        correct: aWins,
      },
      {
        id: sid('opt'),
        group: repeat(emojiB, b),
        caption: `${b}`,
        correct: !aWins,
      },
    ]),
    layout: 'grid-2',
  }
}

export function numberLineStep(answer: number, min: number, max: number, opts: { prompt?: string } = {}): NumberLineStep {
  return {
    id: sid('line'),
    kind: 'numberLine',
    prompt: opts.prompt ?? `Tap the number ${answer}.`,
    say: opts.prompt ?? `Find the number ${answer} and tap it.`,
    hint: 'Start at the left and count along the line.',
    explain: `${answer} is ${answer - min} hops from ${min}. Counting along the line gets you there.`,
    min,
    max,
    answer,
  }
}

export function matchStep(
  prompt: string,
  pairs: { left: string; right: string; leftLabel?: string; rightLabel?: string }[],
  explain?: string,
): MatchStep {
  return {
    id: sid('match'),
    kind: 'match',
    prompt,
    say: prompt,
    hint: 'Say both pictures out loud — do they go together?',
    explain,
    pairs,
  }
}

export function orderStep(
  prompt: string,
  items: { icon: string; label?: string; order: number }[],
  explain?: string,
): OrderStep {
  return {
    id: sid('order'),
    kind: 'order',
    prompt,
    say: prompt,
    hint: 'Think about what happens first, then next.',
    explain,
    items: items.map((i) => ({ ...i, id: sid('ord') })),
  }
}

export function buildWordStep(word: string, visual?: Visual, prompt?: string): BuildWordStep {
  const letters = word.split('')
  const extra = sample(
    'abcdefghijklmnopqrstuvwxyz'.split('').filter((l) => !letters.includes(l)),
    letters.length <= 3 ? 2 : 3,
  )
  return {
    id: sid('build'),
    kind: 'buildWord',
    prompt: prompt ?? 'Spell the word!',
    say: prompt ?? `Spell the word ${word}.`,
    hint: 'Say the word slowly and listen for each sound.',
    explain: `${word.toUpperCase()} is spelled ${letters.join(' - ')}.`,
    word,
    visual,
    tiles: shuffle([...letters, ...extra]),
  }
}

export function sortStep(
  prompt: string,
  bins: { id: string; label: string; icon: string; tone?: ToneKey }[],
  items: { icon: string; label?: string; bin: string }[],
  explain?: string,
): SortStep {
  return {
    id: sid('sort'),
    kind: 'sort',
    prompt,
    say: prompt,
    hint: 'Look at one picture at a time and ask yourself: which basket?',
    explain,
    bins,
    items: items.map((i) => ({ ...i, id: sid('item') })),
  }
}

/* ------------------------------------------------------------
   Shape + pattern helpers
   Shapes are drawn as real SVG geometry by <ShapeView>, so they
   do not need a picture icon at all.
   ------------------------------------------------------------ */
export function shapeStep(spec: ShapeSpec, wrongs: ShapeSpec[], explain?: string): ChoiceStep {
  return {
    id: sid('shape'),
    kind: 'choice',
    prompt: `Find the ${spec.shape}.`,
    say: `Find the ${spec.shape}.`,
    hint: 'Count the sides and corners.',
    explain: explain ?? `That is a ${spec.shape}.`,
    options: shuffle([
      { id: sid('opt'), shape: spec, caption: spec.shape, correct: true },
      ...wrongs.map((w) => ({ id: sid('opt'), shape: w, caption: w.shape })),
    ]),
  }
}

export function patternStep(core: string[], repeats: number, distractor: string): ChoiceStep {
  const shown: string[] = []
  for (let i = 0; i < repeats; i++) shown.push(...core)
  shown.push(...core.slice(0, Math.max(1, core.length - 1)))
  const answer = core[shown.length % core.length]
  const wrong1 = distractor === answer ? core.find((c) => c !== answer) ?? 'purpleBall' : distractor
  const wrong2 = core.find((c) => c !== answer && c !== wrong1) ?? 'yellowBall'
  return {
    id: sid('pattern'),
    kind: 'choice',
    prompt: 'What comes next?',
    say: 'Look at the pattern. What comes next?',
    hint: 'Say the pattern out loud: it repeats over and over.',
    explain: `The pattern repeats ${core.join(' then ')}. So ${answer} comes next!`,
    visual: { kind: 'icons', items: [...shown, 'question'], layout: 'row', size: 'xl' },
    options: pictureChoices({ icon: answer }, [{ icon: wrong1 }, { icon: wrong2 }]),
  }
}

export function storyStep(
  prompt: string,
  frames: { icon: string; caption?: string }[],
  options: GameOption[],
  explain?: string,
): ChoiceStep {
  return {
    id: sid('story'),
    kind: 'choice',
    prompt,
    say: prompt,
    hint: 'Look at every picture before you choose.',
    explain,
    visual: { kind: 'story', frames },
    options,
    layout: 'row',
  }
}

export function wordStep(prompt: string, words: string[], options: GameOption[], explain?: string): ChoiceStep {
  return {
    id: sid('word'),
    kind: 'choice',
    prompt,
    say: prompt,
    hint: 'Sound out each letter from left to right.',
    explain,
    visual: { kind: 'word', words },
    options,
    layout: 'row',
  }
}

export function pictureStep(prompt: string, icon: string, options: GameOption[], explain?: string): ChoiceStep {
  return {
    id: sid('pic'),
    kind: 'choice',
    prompt,
    say: prompt,
    hint: 'Say the word out loud, then look for the sound.',
    explain,
    visual: { kind: 'picture', icon, size: 'xl' },
    options,
    layout: 'row',
  }
}

/* ------------------------------------------------------------
   Play-step factories — the arcade games, folded into lessons
   ------------------------------------------------------------ */

/**
 * Balloon Pop: pop every balloon that shows the target.
 * `labels` is everything floating; `matches` says how many of
 * them are the target. Great for number, letter and word recognition.
 */
export function balloonStep(
  target: string,
  labels: string[],
  opts: { prompt?: string; say?: string; matches?: number; explain?: string } = {},
): BalloonStep {
  const matches = opts.matches ?? 3
  return {
    id: sid('balloon'),
    kind: 'balloonPop',
    prompt: opts.prompt ?? `Pop every balloon with the ${/^[0-9]+$/.test(target) ? 'number' : 'word'} ${target}!`,
    say: opts.say ?? `Pop every balloon with ${numberWord(+target) || target}!`,
    hint: 'Only pop the balloons that match. Tap them one at a time!',
    explain: opts.explain ?? `You popped all the ${target} balloons!`,
    target,
    labels,
    matches,
  }
}

/** Easiest version: numbers to 10, some matches. */
export function balloonNumberStep(target: number, opts: { max?: number; matches?: number } = {}): BalloonStep {
  const max = opts.max ?? 12
  const matches = opts.matches ?? 3
  const decoys = new Set<string>()
  while (decoys.size < 8 - matches) {
    const n = randInt(1, max)
    if (n !== target) decoys.add(String(n))
  }
  const labels = shuffle([...decoys, ...Array.from({ length: matches }, () => String(target))])
  return balloonStep(String(target), labels, {
    prompt: `Pop every balloon with the number ${target}!`,
    say: `Pop every balloon with the number ${numberWord(target)}!`,
    matches,
    explain: `You popped all the ${target} balloons!`,
  })
}

/**
 * Pizza Maker: the customer asks for `each` piece(s) of every topping.
 * Counting the toppings as they land is the hidden math lesson.
 */
export function pizzaStep(
  customer: string,
  toppings: { icon: string; name: string }[],
  opts: { each?: number; prompt?: string; say?: string; explain?: string } = {},
): PizzaStep {
  const each = opts.each ?? 1
  const names = toppings.map((t) => t.name).join(' and ')
  return {
    id: sid('pizza'),
    kind: 'pizza',
    prompt: opts.prompt ?? `Make ${customer}'s pizza: ${each} ${toppings[0]?.name ?? ''} and ${each} ${toppings[1]?.name ?? ''}!`,
    say: opts.say ?? `I am ${customer}. I want a pizza with ${each === 1 ? 'some' : each} ${names}!`,
    hint: each === 1 ? 'Put exactly what the customer asked for on the pizza — nothing extra!' : `Count carefully: ${each} of each topping.`,
    explain: opts.explain ?? `Perfect! ${customer} wanted exactly ${each === 1 ? 'one of each' : `${each} of each`} topping.`,
    customer,
    toppings,
    each,
  }
}

/**
 * Car Race: drive into the lane with the right answer.
 * `answer` and `decoys` are what the three lane signs show.
 */
export function raceStep(question: string, answer: string | number, decoys: (string | number)[] = [], opts: { say?: string; explain?: string } = {}): RaceStep {
  const a = String(answer)
  return {
    id: sid('race'),
    kind: 'race',
    prompt: opts.say ?? `${question} Drive to the right answer!`,
    say: opts.say ?? `${question} Drive to the right answer!`,
    hint: 'Say the problem out loud, then pick the lane with the answer.',
    explain: opts.explain ?? `${question} ${a}. Vroom, straight to the right lane!`,
    question,
    answer: a,
    decoys: decoys.map(String),
  }
}

/** A simple "a + b" race with two close decoys. */
export function raceAddStep(a: number, b: number, icon?: string): RaceStep {
  const sum = a + b
  const decoys = new Set<number>()
  while (decoys.size < 2) {
    const d = sum + (Math.random() < 0.5 ? -1 : 1) * randInt(1, 3)
    if (d > 0 && d !== sum) decoys.add(d)
  }
  void icon
  return raceStep(`${a} + ${b} = ?`, sum, [...decoys], {
    say: `What is ${numberWord(a)} plus ${numberWord(b)}? Drive to the right answer!`,
    explain: `${a} plus ${b} equals ${sum}. Vroom vroom!`,
  })
}

/* ------------------------------------------------------------
   Teach-page factories — the "watch me first" part of a lesson
   ------------------------------------------------------------ */

/** A single teach page: picture + headline + spoken line. */
export function teach(headline: string, say: string, icon?: string, caption?: string): TeachPage {
  return { headline, say, icon, caption }
}

/** A counting teach page: n of the same picture, counted out loud. */
export function teachCount(icon: string, n: number, thing?: string): TeachPage {
  const label = thing ?? icon
  return {
    headline: `Count the ${label}${n === 1 ? '' : 's'}!`,
    icon,
    icons: repeat(icon, n),
    say: `Let's count together! ${[...Array(n).keys()].map((i) => numberWord(i + 1)).join(', ')}. There are ${numberWord(n)} ${label}${n === 1 ? '' : 's'}!`,
    caption: `${n}`,
  }
}

/** An adding teach page: the story of a sum, shown with pictures. */
export function teachAdd(a: number, b: number, icon: string, thing?: string): TeachPage {
  const label = thing ?? icon
  return {
    headline: `${a} + ${b} = ${a + b}`,
    equation: { left: a, op: '+', right: b, answer: a + b, icon },
    say: `Watch! ${numberWord(a)} ${label}${a === 1 ? '' : 's'}, plus ${numberWord(b)} more, makes ${numberWord(a + b)} ${label}${a + b === 1 ? '' : 's'}. ${a} plus ${b} equals ${a + b}!`,
    caption: `${a} and ${b} make ${a + b}`,
  }
}

/** A subtracting teach page: take away, with fading pictures. */
export function teachSub(a: number, b: number, icon: string, thing?: string): TeachPage {
  const label = thing ?? icon
  return {
    headline: `${a} − ${b} = ${a - b}`,
    equation: { left: a, op: '−', right: b, answer: a - b, icon },
    say: `Watch! ${numberWord(a)} ${label}${a === 1 ? '' : 's'}, take away ${numberWord(b)}, leaves ${numberWord(a - b)}. ${a} minus ${b} equals ${a - b}!`,
    caption: `${a} take away ${b} leaves ${a - b}`,
  }
}

/** A shape teach page. */
export function teachShape(shape: ShapeSpec, headline: string, say: string): TeachPage {
  return { headline, say, shapes: [shape] }
}

const NUMBER_WORDS = [
  'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten',
  'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty',
]

export function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? String(n)
}

export type { Step }
