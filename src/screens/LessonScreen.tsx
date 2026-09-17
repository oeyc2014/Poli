import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { Lesson, TeachPage } from '../types'
import { Btn, IconBtn, Modal, Panel, SpeakBtn } from '../components/Ui'
import { Confetti, Starburst } from '../components/Confetti'
import Mascot from '../components/Mascot'
import { Icon } from '../icons'
import { VisualView } from '../components/Visual'
import { GameHost } from '../games'
import { tone as toneOf } from '../lib/tone'
import { haptic, sfx } from '../lib/sound'
import { speak, stopSpeaking } from '../lib/speech'
import { useSettings } from '../lib/settings'

type Phase = 'intro' | 'teach' | 'play'

/* ============================================================
   One "watch and learn" page — big picture, big words, the panda
   reads it aloud. Nothing to tap except moving on.
   ============================================================ */
function TeachCard({
  page,
  index,
  total,
  tone,
  onNext,
  onLast,
}: {
  page: TeachPage
  index: number
  total: number
  tone: string
  onNext: () => void
  onLast: () => void
}) {
  const { settings } = useSettings()
  const isLast = index + 1 >= total

  /* read the page aloud when it appears */
  useEffect(() => {
    speak(`${page.headline}. ${page.say}`, { rate: 0.9 })
    return () => stopSpeaking()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [index])

  const replay = () => speak(`${page.headline}. ${page.say}`, { rate: 0.9 })

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col px-4">
      {/* dots */}
      <div className="mb-4 flex items-center justify-center gap-2">
        {Array.from({ length: total }, (_, i) => (
          <span
            key={i}
            className={`h-3 rounded-full border-2 border-ink-900 transition-all duration-300 ${
              i === index ? 'w-8 bg-sun-400' : i < index ? 'w-3 bg-grass-400' : 'w-3 bg-white'
            }`}
          />
        ))}
      </div>

      <Panel pad="lg" className="relative overflow-hidden text-center">
        <Starburst active={false} icon="sparkle" />

        {/* big headline */}
        <h2 className={`mx-auto max-w-xl font-display font-bold leading-tight text-ink-900 ${settings.bigText ? 'text-3xl' : 'text-2xl sm:text-3xl'}`}>
          {page.headline}
        </h2>

        {/* the picture */}
        {page.icon && (
          <div className="mt-5 flex justify-center">
            <span className="anim-float inline-block">
              <Icon name={page.icon} size={130} />
            </span>
          </div>
        )}

        {/* optional picture row (counting pages) */}
        {page.icons && page.icons.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-1">
            {page.icons.map((e, i) => (
              <span
                key={i}
                className="grid h-12 w-12 place-items-center rounded-2xl border-[3px] border-ink-900/15 bg-cream-50"
                style={{ animation: `poli-pop 0.4s cubic-bezier(0.34,1.56,0.64,1) ${Math.min(i * 0.18, 1.6)}s both` }}
              >
                <Icon name={e} size={34} />
              </span>
            ))}
          </div>
        )}

        {/* optional equation row */}
        {page.equation && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <EquationParts eq={page.equation} />
          </div>
        )}

        {/* optional shapes */}
        {page.shapes && (
          <div className="mt-5 flex justify-center gap-3">
            <VisualView visual={{ kind: 'shapes', shapes: page.shapes }} />
          </div>
        )}

        {/* caption */}
        {page.caption && (
          <p className="mt-4 inline-block rounded-full border-[3px] border-ink-900 bg-sun-300 px-4 py-1 font-display text-xl font-bold text-ink-900">
            {page.caption}
          </p>
        )}

        {/* what the panda says */}
        <div className={`mt-5 flex items-start gap-3 rounded-3xl border-[3px] border-ink-900/15 p-4 text-left ${tone}`}>
          <Mascot size={72} mood="think" className="shrink-0" />
          <div className="min-w-0 flex-1">
            <p className={`font-note leading-snug text-ink-800 ${settings.bigText ? 'text-2xl' : 'text-xl'}`}>{page.say}</p>
          </div>
          <IconBtn label="Read it again" tone="sky" size={44} onClick={replay}>
            <Icon name="speaker" size={20} color="currentColor" />
          </IconBtn>
        </div>
      </Panel>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-3 pb-6">
        {!isLast ? (
          <Btn tone="grape" size="xl" className="anim-ring" icon={<Icon name="next" size={28} color="currentColor" />} onClick={onNext}>
            Next
          </Btn>
        ) : (
          <Btn tone="grass" size="xl" className="anim-ring" icon={<Icon name="play" size={28} color="currentColor" />} onClick={onLast}>
            Let&apos;s play!
          </Btn>
        )}
      </div>
    </div>
  )
}

/** Little equation chips: [3 apples] + [2 apples] = 5 */
function EquationParts({ eq }: { eq: NonNullable<TeachPage['equation']> }) {
  const chip = (n: number, faded = false) => (
    <span
      className={`flex items-center gap-1 rounded-2xl border-[3px] border-ink-900 bg-white px-2.5 py-1.5 ${faded ? 'opacity-45 grayscale' : ''}`}
      style={{ animation: 'poli-bounce-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both' }}
    >
      <span className="font-display text-2xl font-bold text-ink-900">{n}</span>
      {eq.icon && (
        <span className="flex flex-wrap">
          {Array.from({ length: Math.min(n, 6) }, (_, i) => (
            <Icon key={i} name={eq.icon!} size={26} />
          ))}
        </span>
      )}
    </span>
  )
  return (
    <>
      {chip(eq.left)}
      <span className="font-display text-4xl font-bold text-grape-500">{eq.op}</span>
      {chip(eq.right, true)}
      <span className="font-display text-4xl font-bold text-grape-500">=</span>
      <span className="grid h-14 w-14 place-items-center rounded-2xl border-[3px] border-ink-900 bg-grass-300 font-display text-3xl font-bold text-ink-900">
        {eq.answer}
      </span>
    </>
  )
}

export function LessonScreen({
  lesson,
  onExit,
  onFinish,
}: {
  lesson: Lesson
  onExit: () => void
  /** correct = number of first-try correct steps */
  onFinish: (r: { correct: number; total: number; minutes: number }) => void
}) {
  const { settings } = useSettings()
  const [phase, setPhase] = useState<Phase>('intro')
  const [teachIndex, setTeachIndex] = useState(0)
  const [stepIndex, setStepIndex] = useState(0)
  const [attempts, setAttempts] = useState<boolean[]>([])
  const [correctCount, setCorrectCount] = useState(0)
  const [hintOn, setHintOn] = useState(false)
  const [cheering, setCheering] = useState(false)
  const [paused, setPaused] = useState(false)

  const resultsRef = useRef<boolean[]>([])
  const startedRef = useRef<number>(Date.now())
  const advancingRef = useRef(false)

  const step = lesson.steps[stepIndex]
  const t = toneOf(lesson.tone)

  const mistakes = attempts.filter((a) => !a).length
  const solved = attempts.length > 0 && attempts[attempts.length - 1]
  const reveal = !solved && mistakes >= 2
  const finished = solved || reveal

  const progress = useMemo(
    () => (stepIndex + (finished ? 1 : 0)) / lesson.steps.length,
    [stepIndex, finished, lesson.steps.length],
  )

  /* ---------- read the prompt out loud ---------- */
  useEffect(() => {
    if (phase !== 'play' || !step) return
    const text = step.say ?? ('prompt' in step ? step.prompt : '')
    if (text) speak(text, { rate: 0.88 })
    return () => stopSpeaking()
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [stepIndex, phase])

  useEffect(() => {
    if (phase === 'intro') speak(`${lesson.title}. ${lesson.blurb}!`, { rate: 0.9 })
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [phase])

  /* ---------- advance ---------- */
  const advance = useCallback(() => {
    if (advancingRef.current) return
    advancingRef.current = true
    window.setTimeout(() => {
      advancingRef.current = false
    }, 250)

    const firstTry = solved && attempts.length === 1
    resultsRef.current = [...resultsRef.current, firstTry]
    if (firstTry) setCorrectCount((c) => c + 1)

    const isLast = stepIndex + 1 >= lesson.steps.length
    if (isLast) {
      const correct = resultsRef.current.filter(Boolean).length
      const minutes = Math.max(1, Math.round((Date.now() - startedRef.current) / 60000))
      stopSpeaking()
      onFinish({ correct, total: lesson.steps.length, minutes })
      return
    }
    setStepIndex((i) => i + 1)
    setAttempts([])
    setHintOn(false)
    setCheering(false)
  }, [attempts.length, lesson.steps.length, onFinish, solved, stepIndex])

  /* ---------- celebrate + auto-advance ---------- */
  useEffect(() => {
    if (!solved) return
    sfx.correct()
    haptic([10, 30, 10])
    setCheering(true)
    const timer = window.setTimeout(advance, 1500)
    return () => window.clearTimeout(timer)
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [solved, stepIndex])

  /* ---------- gentle "show me" tone when the answer appears ---------- */
  useEffect(() => {
    if (reveal && step?.explain) {
      sfx.streak()
      speak(step.explain, { rate: 0.86 })
    }
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, [reveal])

  const handleAnswer = (correct: boolean) => {
    if (finished) return
    setAttempts((prev) => [...prev, correct])
    if (correct) {
      haptic(16)
    } else {
      haptic([12, 45, 12])
      sfx.wrong()
      if (settings.showHints) setHintOn(true)
    }
  }

  /* ---------- keyboard shortcuts ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'play') return
      const text = step && ('say' in step ? (step.say ?? (step as { prompt: string }).prompt) : '')
      if (e.key === 'Enter' && finished) {
        e.preventDefault()
        advance()
      }
      if (e.key.toLowerCase() === 'r' && text) {
        speak(text, { rate: 0.88 })
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [advance, finished, phase, step])

  /* ================= INTRO ================= */
  if (phase === 'intro') {
    return (
      <div className="mx-auto flex w-full max-w-2xl flex-col items-center px-4 py-6">
        <div className={`card3d w-full overflow-hidden border-[3px] border-ink-900 bg-gradient-to-br p-6 text-center ${t.gradient}`}>
          <Mascot size={150} mood="cheer" wave className="mx-auto" />
          <h1 className="font-party text-4xl text-ink-900 text-pop-sm sm:text-5xl">{lesson.title}</h1>
          <p className="mt-1 font-display text-xl font-semibold text-ink-800">{lesson.blurb}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full border-[3px] border-ink-900 bg-white/95 px-3 py-1 font-display text-base font-bold text-ink-900">
              <Icon name="eyes" size={22} />
              Watch &amp; learn
            </span>
            <span className="flex items-center gap-1.5 rounded-full border-[3px] border-ink-900 bg-white/95 px-3 py-1 font-display text-base font-bold text-ink-900">
              <Icon name="gamepad" size={22} />
              {lesson.steps.length} games
            </span>
            <span className="flex items-center gap-1.5 rounded-full border-[3px] border-ink-900 bg-white/95 px-3 py-1 font-display text-base font-bold text-ink-900">
              <Icon name="star" size={22} />
              Get 3 stars
            </span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Btn
              tone="sun"
              size="xl"
              className="anim-ring"
              icon={<Icon name="play" size={30} color="currentColor" />}
              onClick={() => {
                sfx.whoosh()
                startedRef.current = Date.now()
                if (lesson.teach.length > 0) {
                  setTeachIndex(0)
                  setPhase('teach')
                } else {
                  setPhase('play')
                }
              }}
            >
              Start
            </Btn>
            <Btn
              tone="white"
              variant="outline"
              size="xl"
              icon={<Icon name="back" size={26} color="currentColor" />}
              onClick={onExit}
            >
              Not now
            </Btn>
          </div>
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-center font-display text-base text-ink-700">
          <Icon name="speaker" size={24} color="#4a3f63" />
          Tip: tap the speaker any time to hear the question again.
        </p>
      </div>
    )
  }

  /* ================= WATCH & LEARN ================= */
  if (phase === 'teach' && lesson.teach.length > 0) {
    return (
      <TeachCard
        key={lesson.teach[teachIndex].headline}
        page={lesson.teach[teachIndex]}
        index={teachIndex}
        total={lesson.teach.length}
        tone={t.soft}
        onNext={() => {
          sfx.whoosh()
          setTeachIndex((i) => i + 1)
        }}
        onLast={() => {
          sfx.whoosh()
          stopSpeaking()
          setPhase('play')
        }}
      />
    )
  }

  if (!step) return null

  /* ================= PRACTICE ================= */
  const promptText = step.say ?? ('prompt' in step ? step.prompt : '')

  return (
    <div className="mx-auto w-full max-w-3xl px-3 pb-28 sm:px-4">
      <Confetti active={cheering} count={26} duration={1800} />

      {/* progress header */}
      <div className="sticky top-0 z-20 -mx-3 mb-3 border-b-4 border-ink-900/10 glass px-3 py-2 sm:-mx-4 sm:px-4">
        <div className="flex items-center gap-2">
          <IconBtn label="Pause" tone="white" size={46} onClick={() => setPaused(true)}>
            <Icon name="pause" size={24} color="currentColor" />
          </IconBtn>
          <div className="flex flex-1 items-center gap-1">
            {lesson.steps.map((s, i) => (
              <span
                key={s.id}
                className={`h-3 flex-1 rounded-full border-2 border-ink-900/25 ${
                  i < stepIndex ? 'bg-grass-400' : i === stepIndex ? 'bg-sun-400 anim-glow' : 'bg-white/70'
                }`}
              />
            ))}
          </div>
          <span className="shrink-0 font-display text-base font-bold text-ink-700">
            {stepIndex + 1}/{lesson.steps.length}
          </span>
          <span className="hidden shrink-0 items-center gap-1 rounded-full border-[3px] border-ink-900 bg-sun-300 px-2 py-0.5 font-display text-base font-bold text-ink-900 sm:flex">
            <Icon name="star" size={20} />
            {correctCount}
          </span>
        </div>
      </div>

      {/* question card */}
      <Panel pad="md" className="relative overflow-hidden">
        <Starburst active={cheering} icon="sparkle" />

        {/* prompt */}
        <div className="flex items-start gap-3">
          <SpeakBtn text={promptText} size={54} />
          <h2
            className={`flex-1 pt-1 font-display font-bold leading-snug text-ink-900 ${
              settings.bigText || settings.pictureOnly ? 'text-2xl' : 'text-xl sm:text-2xl'
            } ${settings.pictureOnly ? 'sr-only' : ''}`}
          >
            {step.prompt}
          </h2>
          <IconBtn
            label="Show me a hint"
            tone={hintOn ? 'sun' : 'white'}
            size={46}
            onClick={() => setHintOn((h) => !h)}
            disabled={!settings.showHints || !step.hint}
          >
            <Icon name="bulb" size={24} color="currentColor" />
          </IconBtn>
        </div>

        {settings.pictureOnly && (
          <div className="mt-3 flex justify-center">
            <SpeakBtn text={promptText} size={64} />
          </div>
        )}

        {/* hint */}
        {hintOn && step.hint && (
          <div className="mt-3 flex items-start gap-2 rounded-2xl border-[3px] border-sun-500 bg-sun-100 p-3 anim-down">
            <Icon name="bulb" size={30} />
            <p className="font-display text-lg font-semibold text-ink-800">{step.hint}</p>
          </div>
        )}

        {/* picture */}
        {'visual' in step && step.visual && (
          <div className="my-5 flex justify-center">
            <VisualView visual={step.visual} hideCaptions={settings.pictureOnly} />
          </div>
        )}

        {/* the game — keyed by step id so two questions in a row that use the
            same game type never share a half-finished answer */}
        <div className="mt-4">
          <GameHost
            key={step.id}
            step={step}
            onAnswer={handleAnswer}
            mistakes={mistakes}
            reveal={reveal}
            hideCaptions={settings.pictureOnly}
          />
        </div>

        {/* feedback */}
        {solved && (
          <div className="mt-5 flex items-center justify-center gap-3 rounded-3xl border-[3px] border-grass-600 bg-grass-100 p-4 anim-bounce-in">
            <Mascot size={64} mood="cheer" />
            <div>
              <p className="flex items-center gap-2 font-display text-2xl font-bold text-grass-700">
                <Icon name="party" size={28} />
                {settings.showHints && mistakes > 0 ? 'You got it!' : 'Perfect!'}
              </p>
              {step.explain && <p className="font-display text-base text-ink-700">{step.explain}</p>}
            </div>
          </div>
        )}

        {reveal && !solved && (
          <div className="mt-5 rounded-3xl border-[3px] border-sun-500 bg-sun-100 p-4 anim-up">
            <div className="flex items-center gap-3">
              <Mascot size={60} mood="think" />
              <div>
                <p className="flex items-center gap-2 font-display text-xl font-bold text-ink-900">
                  <Icon name="eyes" size={26} />
                  Let&apos;s look together
                </p>
                {step.explain && <p className="font-display text-base text-ink-700">{step.explain}</p>}
              </div>
            </div>
            <div className="mt-3 flex justify-center">
              <Btn tone="grass" size="lg" icon={<Icon name="next" size={26} color="currentColor" />} onClick={advance}>
                Next
              </Btn>
            </div>
          </div>
        )}

        {!finished && (
          <p className="mt-4 flex items-center justify-center gap-2 text-center font-display text-base text-ink-400">
            <Icon name={mistakes > 0 ? 'muscle' : 'hand'} size={24} />
            {mistakes > 0 ? 'Look again — you can do it!' : 'Tap your answer'}
          </p>
        )}
      </Panel>

      {/* progress bar footer */}
      <div className="mt-4 flex items-center gap-3">
        <span className="shrink-0 font-display text-base text-ink-500">Lesson progress</span>
        <span className="h-4 flex-1 overflow-hidden rounded-full border-[3px] border-ink-900/25 bg-white/70">
          <span
            className={`relative block h-full rounded-full bg-gradient-to-r ${t.gradient} transition-[width] duration-500`}
            style={{ width: `${Math.round(progress * 100)}%` }}
          >
            <span className="bar-stripes absolute inset-0 rounded-full opacity-70" />
          </span>
        </span>
      </div>

      {/* pause menu */}
      <Modal open={paused} onClose={() => setPaused(false)} title="Paused">
        <div className="flex flex-col gap-3">
          <Btn tone="grass" size="lg" full icon={<Icon name="play" size={28} color="currentColor" />} onClick={() => setPaused(false)}>
            Keep playing
          </Btn>
          <Btn
            tone="sky"
            size="lg"
            full
            icon={<Icon name="speaker" size={28} color="currentColor" />}
            silent
            onClick={() => speak(promptText, { rate: 0.86 })}
          >
            Read the question again
          </Btn>
          <Btn
            tone="coral"
            size="lg"
            full
            icon={<Icon name="door" size={28} />}
            onClick={() => {
              stopSpeaking()
              onExit()
            }}
          >
            Leave lesson
          </Btn>
          <p className="text-center text-sm text-ink-400">
            Leaving now means this lesson will not count towards your stars yet.
          </p>
        </div>
      </Modal>
    </div>
  )
}
