/* ============================================================
   POLI — Core types
   Everything is picture-first: a "visual" is the main event,
   words are the caption.
   ============================================================ */

export type SubjectId = 'math' | 'reading' | 'science' | 'social'

export type ToneKey = 'sun' | 'grape' | 'sky' | 'grass' | 'berry' | 'coral'

export type ShapeName =
  | 'circle'
  | 'square'
  | 'triangle'
  | 'rectangle'
  | 'oval'
  | 'star'
  | 'heart'
  | 'diamond'
  | 'hexagon'

export type ShapeSpec = {
  shape: ShapeName
  color?: string
  size?: number
  rotated?: boolean
}

/* ------------------------------------------------------------
   Visuals — the pictures
   ------------------------------------------------------------ */
export type Visual =
  /** A single hero picture, e.g. a big elephant */
  | { kind: 'picture'; icon: string; caption?: string; size?: 'md' | 'lg' | 'xl' }
  /** A row / grid / pile of pictures used for counting & patterns */
  | {
      kind: 'icons'
      items: string[]
      layout?: 'row' | 'grid' | 'pile'
      size?: 'md' | 'lg' | 'xl'
      caption?: string
    }
  /** Two or more labelled baskets, each holding pictures */
  | {
      kind: 'groups'
      groups: { label?: string; icons: string[]; tone?: ToneKey }[]
      caption?: string
    }
  /** A big inline equation made of numbers / picture groups */
  | {
      kind: 'equation'
      parts: {
        icons?: string[]
        text?: string
        tone?: ToneKey
        /** drawn faint + struck through ("taken away") */
        faded?: boolean
      }[]
      caption?: string
    }
  /** Geometric shapes to look at */
  | { kind: 'shapes'; shapes: ShapeSpec[]; caption?: string }
  /** A ten-frame with counters dropped in */
  | { kind: 'tenframe'; filled: number; caption?: string }
  /** Big colourful words to read */
  | { kind: 'word'; words: string[]; caption?: string }
  /** A picture story: several pictures in a row, optionally labelled */
  | {
      kind: 'story'
      frames: { icon: string; caption?: string }[]
      caption?: string
    }

/* ------------------------------------------------------------
   Answer options for "choose the answer" games
   ------------------------------------------------------------ */
export type GameOption = {
  id: string
  icon?: string
  text?: string
  shape?: ShapeSpec
  /** a mini group of pictures shown inside the tile */
  group?: string[]
  /** small word under the picture */
  caption?: string
  correct?: boolean
}

/* ------------------------------------------------------------
   Steps — each one is a mini game
   ------------------------------------------------------------ */
type StepBase = {
  id: string
  /** spoken aloud by the read-to-me voice (defaults to prompt) */
  say?: string
  /** gentle nudge after a wrong answer */
  hint?: string
  /** the friendly "why" shown after answering, right or wrong */
  explain?: string
}

export type ChoiceStep = StepBase & {
  kind: 'choice'
  prompt: string
  visual?: Visual
  options: GameOption[]
  layout?: 'row' | 'grid-2' | 'grid-3' | 'stack'
  /** hide the words, show only pictures (great for pre-readers) */
  pictureOnly?: boolean
}

export type TapCountStep = StepBase & {
  kind: 'tapCount'
  prompt: string
  visual: Extract<Visual, { kind: 'icons' }>
  /** how many the child must tap */
  target: number
  /** do the tapped ones look different? (selecting) vs eating them */
  mode?: 'select' | 'collect'
}

export type NumberLineStep = StepBase & {
  kind: 'numberLine'
  prompt: string
  min: number
  max: number
  answer: number
  step?: number
}

export type MatchStep = StepBase & {
  kind: 'match'
  prompt: string
  pairs: { left: string; right: string; leftLabel?: string; rightLabel?: string }[]
}

export type OrderStep = StepBase & {
  kind: 'order'
  prompt: string
  items: { id: string; icon: string; label?: string; order: number }[]
}

export type BuildWordStep = StepBase & {
  kind: 'buildWord'
  prompt: string
  word: string
  visual?: Visual
  /** letters offered as tiles (defaults to letters of the word) */
  tiles?: string[]
}

export type SortStep = StepBase & {
  kind: 'sort'
  prompt: string
  bins: { id: string; label: string; icon: string; tone?: ToneKey }[]
  items: { id: string; icon: string; label?: string; bin: string }[]
}

/* ------------------------------------------------------------
   Play-style mini games — the arcade games, folded into lessons.
   Each one still reports a single correct / not-correct answer
   through the same flow as every other step.
   ------------------------------------------------------------ */

/** Balloon Pop — pop every balloon that matches the target. */
export type BalloonStep = StepBase & {
  kind: 'balloonPop'
  prompt: string
  /** what the matching balloons show ("7", "cat", "A"…) */
  target: string
  /** the words spoken when the round appears */
  say: string
  /** what every balloon shows, including a few matches */
  labels: string[]
  /** how many balloons carry the target (defaults to 3) */
  matches?: number
}

/** Pizza Maker — bake the pizza a customer ordered. */
export type PizzaStep = StepBase & {
  kind: 'pizza'
  prompt: string
  /** customer name shown on the order ticket */
  customer: string
  /** the toppings the customer wants, e.g. ['mushroom','cheese'] */
  toppings: { icon: string; name: string }[]
  /** toppings offered on the shelf (defaults to the classic six) */
  shelf?: { icon: string; name: string }[]
  /** a little math twist: the customer wants N of each topping */
  each?: number
}

/** Car Race — drive into the lane with the right answer. */
export type RaceStep = StepBase & {
  kind: 'race'
  prompt: string
  /** the question shown on the sign, e.g. "7 + 5 = ?" */
  question: string
  /** the correct answer on one lane */
  answer: string
  /** the wrong answers on the other lanes */
  decoys: string[]
}

export type Step =
  | ChoiceStep
  | TapCountStep
  | NumberLineStep
  | MatchStep
  | OrderStep
  | BuildWordStep
  | SortStep
  | BalloonStep
  | PizzaStep
  | RaceStep

/** A picture in the icon set ("" is never valid — see hasIcon). */
export type IconRef = string

/* ------------------------------------------------------------
   Teach pages — the "watch and learn" part of a lesson.
   Each page shows a picture with a headline and a sentence the
   panda reads aloud. Kids just watch — nothing to tap.
   ------------------------------------------------------------ */
export type TeachPage = {
  /** big friendly words over the picture */
  headline: string
  /** the picture that carries the meaning */
  icon?: string
  /** optional extra picture row (counting, groups) */
  icons?: string[]
  /** a big inline equation, e.g. 2 + 3 = 5 */
  equation?: { left: number; op: '+' | '−'; right: number; answer: number; icon?: string }
  /** what the panda says out loud */
  say: string
  /** small words under the picture */
  caption?: string
  /** shapes to look at */
  shapes?: ShapeSpec[]
}

/* ------------------------------------------------------------
   Lessons, units, subjects
   ------------------------------------------------------------ */
export type Lesson = {
  id: string
  title: string
  /** the picture that represents this lesson in the map */
  icon: string
  blurb: string
  tone: ToneKey
  /** the "watch and learn" pages shown before the practice games */
  teach: TeachPage[]
  steps: Step[]
}

export type Unit = {
  id: string
  title: string
  icon: string
  tone: ToneKey
  lessons: Lesson[]
}

export type Subject = {
  id: SubjectId
  name: string
  icon: string
  tagline: string
  tone: ToneKey
  /** Skill strands shown on the parent report */
  strands: string[]
  units: Unit[]
}

/* ------------------------------------------------------------
   Progress
   ------------------------------------------------------------ */
export type LessonResult = {
  stars: number
  bestCorrect: number
  total: number
  attempts: number
  lastPlayed: number
}

export type DayLog = {
  lessons: number
  correct: number
  wrong: number
  minutes: number
}

export type Progress = {
  lessons: Record<string, LessonResult>
  xp: number
  gems: number
  badges: string[]
  streak: number
  bestStreak: number
  lastPlayedDay: string | null
  dailyGoal: number
  totalCorrect: number
  totalWrong: number
  days: Record<string, DayLog>
  lastLessonId: string | null
  unlockedStickers: string[]
  /** accessories + themes bought from the shop */
  ownedItems: string[]
}

export type Avatar = {
  icon: string
  color: string
}

export type User = {
  id: string
  name: string
  avatar: Avatar
  pin: string
  grade: number
  createdAt: number
  isGrownUp?: boolean
}

export type Settings = {
  sound: boolean
  voice: boolean
  music: boolean
  bigText: boolean
  pictureOnly: boolean
  showHints: boolean
  /** name of the chosen speech voice ('' = pick the best one automatically) */
  voiceName: string
  /** which voice engine reads aloud — 'kokoro' is the neural AI voice */
  voiceEngine: 'kokoro' | 'device'
  /** which neural AI voice reads aloud ('af_heart' sounds warmest) */
  aiVoice: 'af_heart' | 'af_bella' | 'af_nicole' | 'am_fenrir' | 'am_puck' | 'bf_emma'
  /** the colour theme bought in the shop ('classic' = default) */
  themeId: string
  /** accessories worn by the avatar, bought in the shop */
  accessories: string[]
  /** a warmer, twinkly dark sky for bedtime practice */
  nightMode: boolean
  /** fewer, gentler animations for kids who find the zoomies distracting */
  calmMotion: boolean
  /** a tiny buzz on tablets and phones when an answer lands */
  haptics: boolean
}
