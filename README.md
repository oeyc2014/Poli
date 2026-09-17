# Poli — 1st Grade Learning Games

A playful, game-first learning app for first graders. Built so a six-year-old who
**cannot read yet** can still use it alone: every question is spoken out loud, and
every answer is a picture before it is ever a word.

Poli the panda is the mascot, and **every picture in the app is hand-drawn SVG** —
there is not a single emoji or image file anywhere in it.

Think IXL / i-Ready structure (units → lessons → mastery stars) with the bright,
bouncy feel of CoolMathGames.

```bash
npm install
npm run dev      # http://localhost:5173
```

| Script | What it does |
| --- | --- |
| `npm run dev` | Dev server with hot reload |
| `npm run build` | Typecheck + production build into `dist/` |
| `npm run check:content` | Validates all 206 generated questions *and* every picture they name |
| `npm run verify` | Typecheck + content check + build (run before shipping) |

---

## What is in it

### Structure (Grade 1 only, 35 lessons, 206 mini-games)

| Subject | Units | Lessons |
| --- | --- | --- |
| **Math** | Numbers to 20 · Adding · Subtracting · Shapes, Patterns & Place Value | 16 |
| **Reading** | Letters & Sounds · Words · Reading Stories | 11 |
| **Science** | Living Things · Our World · How Things Work | 8 |

Each lesson is 5–8 short "mini-games" and awards 1–3 stars (3 = perfect, 2 = 70 %+,
1 = finished — so nobody ever walks away with nothing).

### Seven game engines

Every question is one of these, not a worksheet:

| Game | What the child does |
| --- | --- |
| **Choice** | Tap the right picture / word / number / shape |
| **Tap Count** | Tap exactly *N* things ("Give the bunny 6 cookies") |
| **Number Line** | Hop to the number on a number line |
| **Match** | Pair up animals and food, letters and sounds |
| **Order** | Put a life cycle or story in the right sequence |
| **Build Word** | Spell a word from picture + letter tiles |
| **Sort** | Tap a picture, then tap the basket it belongs in |

### Pictures > words

`src/components/Visual.tsx` is the heart of the app. A question carries a *visual* —
a row of pictures, two labelled baskets, an inline equation, real SVG shapes, a
ten-frame, or a picture story — and the words are only ever a caption.

### The artwork

Every picture — the ~190 curriculum subjects *and* the interface icons — is drawn
in code, in `src/icons/`. No image files, no icon font, no emoji.

```
src/icons/
├── parts.tsx     shared drawing primitives (animals, faces, produce, bodies)
├── animals.tsx  food.tsx  nature.tsx  things.tsx  misc.tsx
├── clothing.tsx  ui.tsx
└── index.tsx     the registry: ICONS, <Icon>, <AutoIcon>, hasIcon
```

`<Icon name="panda" size={64} />` renders one picture. Every icon shares the same
language — a 5 px dark outline, flat colours from the palette, a 100 × 100 viewBox —
so 190 drawings still look like one set. Because they are vector they stay crisp at
any size, from a 20 px stat pill to a 144 px banner watermark.

`<AutoIcon value="…" />` draws a picture when the value names a known icon and
otherwise prints it as text, which is how a tile can hold either a letter (`"B"`)
or the picture it stands for (the bear).

The registry is written out key by key rather than spread, so TypeScript refuses to
compile if two icon files ever claim the same name. `npm run check:content` closes
the other half of the gap: it walks all 206 questions and fails the build if any of
them names a picture that does not exist.

### Login, without a backend

Kid profiles live in `localStorage`; nothing is uploaded and no email is needed.

- Tap your animal buddy to sign in
- Optional 4-digit secret code per player (or for the Grown-ups area)
- Multiple kids on one device, each with their own progress, stars and badges

---

## Quality-of-life features

- **Read-to-me** — every prompt is spoken aloud (browser speech synthesis, free
  and offline) with a speaker button to hear it again, and a slower rate for early
  readers. Voices are ranked so the warmest one installed on the device wins, and
  the Grown-ups page has a **voice picker with a preview**
- **Gentle hints** after a wrong answer, and the answer is *shown and explained*
  after a second try instead of just marking it wrong
- **Explanations** — every question teaches *why*: "9 + 8 = 17. Trick: 9 borrowed
  1 from the 8 to make 10!"
- **Pictures-only mode** — hides the small text for pre-readers
- **Bigger text** mode, for kids who need it
- **Resume** — the home screen always offers the next lesson; a refresh keeps your place
- **Real browser Back button** support (hash routing)
- **Pause menu** — re-hear the question or leave the lesson
- **Auto-advance** on a correct answer so the flow stays snappy
- **Daily goal** with a progress ring
- **Day streaks**, **XP + 12 levels**, **gems**
- **15 badges** and a **sticker shop** to spend gems on
- **Grown-ups dashboard** — per-subject mastery, accuracy, minutes practised,
  a 7-day activity chart, and a "lessons worth revisiting" list
- Sound / voice / music toggles everywhere, plus **reduced-motion** support
- **Cozy night** theme — a darker, twinklier sky with a moon and stars for
  bedtime practice (or for bright tablets in a dim room)
- **Calm animations** switch — for kids who find the bouncing distracting, over
  and above the automatic `prefers-reduced-motion` support
- **Little buzzes** — a gentle vibration on phones and tablets when an answer
  lands, so feedback is felt as well as heard
- **Keyboard play** — press `1`–`9` to answer, `R` to hear the question again,
  `Enter` to move on. Each answer tile quietly shows its shortcut number
- **Surprise me!** on the home screen — jumps straight into a random lesson that
  is not mastered yet
- **Scroll to top** on every screen change, so a new lesson never opens halfway down
- Works on tablets and phones, with big 76 px+ tap targets

---

## How it is built

```
src/
├── content/          the curriculum
│   ├── builders.ts   question factories (see below)
│   ├── math.ts  reading.ts  science.ts  index.ts
│   ├── badges.ts  stickers.ts  avatars.ts
├── games/            the seven game engines + OptionTile
├── icons/            ~190 hand-drawn SVG pictures
├── components/       Visual, Shape, Mascot (animated SVG panda), Ui, TopBar,
│                     Confetti, BouncyText, TapRipple…
├── screens/          Profile, Home, Subject, Lesson, Results, Rewards, Parent
├── lib/              auth, progress, settings, sound (Web Audio), speech, storage
└── index.css         design tokens + ~45 keyframe animations
```

No animation library, no image assets, no audio files, no icon font. The panda and
all ~190 pictures are inline SVG, the 7 sound effects are synthesized with the Web
Audio API, and everything else is CSS keyframes.

Two Google fonts, both unapologetically chunky and rounded in the spirit of
CoolMathGames: **Fredoka** (geometric, very round, every weight) for almost
everything, and **Lilita One** (fat cartoon display) for the logo and the big
celebrating headlines. No Comic Sans anywhere — the fallback is the system rounded
face, so the app still looks like a kid's app even offline.

### Small touches that make it feel alive

Every picture is drawn in code, so the motion is too:

- **BouncyText** — headline letters hop in one at a time and then keep gently
  waving. Used for the logo, the welcome screen and every results screen, with a
  different bright colour per letter
- **TapRipple** — a coloured ring blooms out of whatever button you press
  (skipped entirely when Calm animations is on)
- **Pushable buttons** — every `.btn3d` lifts towards the cursor and squashes flat
  when pressed, and tappable cards hop and glow via `.card-hover`
- **Living scenery** — a sky that pans its gradient, morphing colour blobs,
  drifting clouds, hot-air balloons, gliding birds, and a moon with twinkling
  sparkles after dark
- **Candy-striped progress bars** that march along, stat pills that squash-pop
  whenever a number changes, and confetti that sways as it falls

### Authoring a lesson

Questions are *generated*, not hand-typed, which is what keeps 206 of them
consistent. `src/content/builders.ts` provides factories whose distractors are
deliberate near-misses (`n±1`, `n±2`), because that is what actually teaches:

```ts
{
  id: 'm-add-10',
  title: 'Add Within 10',
  icon: 'greenApple',
  blurb: 'Put two groups together',
  tone: 'grass',
  steps: [
    addStep(2, 3, 'greenApple'),   // a picture group + "How many in all?"
    tapCountStep('cookie', 7, 6),  // tap exactly 6
    makeTenStep(7),                // ten-frame
    numberLineStep(6, 1, 10),
  ],
}
```

### Keeping the content honest

Because lessons are generated, `npm run check:content` proves every question is
answerable before it ever reaches a child. It fails the build if a step has two
correct options, no correct option, two visually identical options, a spelling
target whose letters are not in the tile bag, a sort basket that could never be
filled, an order sequence with a gap, or a number-line answer off the line.

It also validates every picture name against the icon registry, so a renamed or
mistyped icon can never ship as a blank tile.

This checker has already caught one real bug (a *more/fewer* comparison where the
larger group was never marked correct).
