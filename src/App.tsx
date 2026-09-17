import { useCallback, useEffect, useRef, useState } from 'react'
import { AuthProvider, useAuth } from './lib/auth'
import { SettingsProvider, useSettings } from './lib/settings'
import { ProgressProvider, useProgress } from './lib/progress'
import type { LessonOutcome } from './lib/progress'
import { Scenery } from './components/Confetti'
import { TopBar } from './components/TopBar'
import { SettingsPanel } from './components/SettingsPanel'
import { MenuModal } from './components/MenuModal'
import Mascot from './components/Mascot'
import { BouncyText } from './components/BouncyText'
import { TapRipple } from './components/TapRipple'
import { ProfileScreen } from './screens/ProfileScreen'
import { HomeScreen } from './screens/HomeScreen'
import { SubjectScreen } from './screens/SubjectScreen'
import { LessonScreen } from './screens/LessonScreen'
import { ResultsScreen } from './screens/ResultsScreen'
import { RewardsScreen } from './screens/RewardsScreen'
import { ParentScreen } from './screens/ParentScreen'
import { findLessonContext, nextLessonAfter, subjectById, SUBJECTS } from './content'
import type { SubjectId } from './types'

type View =
  | { name: 'home' }
  | { name: 'subject'; subjectId: SubjectId }
  | { name: 'lesson'; lessonId: string; from: 'home' | 'subject' | 'results' }
  | { name: 'results'; outcome: LessonOutcome; lessonId: string }
  | { name: 'rewards' }
  | { name: 'grownups' }

/* ------------------------------------------------------------
   Tiny hash router
   Gives the browser Back button real behaviour and means a
   refresh keeps a kid exactly where they were.
   ------------------------------------------------------------ */
function viewToHash(view: View): string {
  switch (view.name) {
    case 'home':
      return '#/'
    case 'subject':
      return `#/subject/${view.subjectId}`
    case 'lesson':
      return `#/lesson/${view.lessonId}`
    /* results are transient — the hash points back at the lesson */
    case 'results':
      return `#/lesson/${view.lessonId}`
    case 'rewards':
      return '#/rewards'
    case 'grownups':
      return '#/grownups'
    default:
      return '#/'
  }
}

function isSubjectId(value: string): value is SubjectId {
  return SUBJECTS.some((s) => s.id === value)
}

function hashToView(hash: string): View {
  const path = hash.replace(/^#\/?/, '')
  if (!path) return { name: 'home' }
  const [head, param] = path.split('/')
  if (head === 'subject' && param && isSubjectId(param)) return { name: 'subject', subjectId: param }
  if (head === 'lesson' && param && findLessonContext(param)) {
    return { name: 'lesson', lessonId: param, from: 'home' }
  }
  if (head === 'rewards') return { name: 'rewards' }
  if (head === 'grownups') return { name: 'grownups' }
  return { name: 'home' }
}

function Splash() {
  return (
    <div className="grid min-h-screen place-items-center">
      <div className="flex flex-col items-center gap-3">
        <Mascot size={160} mood="happy" wave />
        <BouncyText as="h1" text="Poli" rainbow className="font-party text-6xl text-pop-sm" />
        <p className="font-display text-xl text-ink-500">Waking up the panda…</p>
      </div>
    </div>
  )
}

/** The sky behind every screen — day, or cozy night. */
function World() {
  const { settings } = useSettings()
  return <Scenery variant={settings.nightMode ? 'night' : 'day'} />
}

function Shell() {
  const { user, ready } = useAuth()
  const { settings } = useSettings()
  const { recordLesson, totalStars } = useProgress()
  const [view, setViewState] = useState<View>(() => hashToView(window.location.hash))
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastUserRef = useRef<string | null>(null)
  const calm = settings.calmMotion

  const setView = useCallback(
    (next: View) => {
      setViewState(next)
      const hash = viewToHash(next)
      if (window.location.hash !== hash) {
        window.history.pushState(null, '', hash)
      }
      /* a new screen should always start at the top */
      window.scrollTo({ top: 0, behavior: calm ? 'auto' : 'smooth' })
    },
    [calm],
  )

  /* browser Back / Forward */
  useEffect(() => {
    const sync = () => setViewState(hashToView(window.location.hash))
    window.addEventListener('popstate', sync)
    window.addEventListener('hashchange', sync)
    return () => {
      window.removeEventListener('popstate', sync)
      window.removeEventListener('hashchange', sync)
    }
  }, [])

  /* go home when a different kid signs in (but keep deep links on first load) */
  useEffect(() => {
    if (!user) {
      lastUserRef.current = null
      return
    }
    if (lastUserRef.current !== null && lastUserRef.current !== user.id) {
      setView({ name: 'home' })
    }
    lastUserRef.current = user.id
  }, [user, setView])

  if (!ready) return <Splash />

  /* ---------------- signed out ---------------- */
  if (!user) {
    if (view.name === 'grownups') {
      return (
        <div className="min-h-screen pb-10">
          <TopBar title="Grown-ups" icon="family" onBack={() => setView({ name: 'home' })} hideStats />
          <ParentScreen />
        </div>
      )
    }
    return (
      <div className="min-h-screen pb-10">
        <ProfileScreen onGrownUps={() => setView({ name: 'grownups' })} />
      </div>
    )
  }

  /* ---------------- signed in ---------------- */
  const resultCtx = view.name === 'results' ? findLessonContext(view.lessonId) : undefined

  const header = () => {
    switch (view.name) {
      case 'home':
        return <TopBar onOpenSettings={() => setSettingsOpen(true)} onOpenMenu={() => setMenuOpen(true)} />
      case 'subject': {
        const s = subjectById(view.subjectId)
        return (
          <TopBar
            title={s?.name}
            icon={s?.icon}
            onBack={() => setView({ name: 'home' })}
            onOpenSettings={() => setSettingsOpen(true)}
            onOpenMenu={() => setMenuOpen(true)}
          />
        )
      }
      case 'lesson':
        return null
      case 'results':
        return null
      case 'rewards':
        return <TopBar title="My collection" icon="medal" onBack={() => setView({ name: 'home' })} />
      case 'grownups':
        return (
          <TopBar title="Grown-ups" icon="family" onBack={() => setView({ name: 'home' })} hideStats />
        )
      default:
        return null
    }
  }

  const body = () => {
    switch (view.name) {
      case 'home':
        return (
          <HomeScreen
            onOpenSubject={(id) => setView({ name: 'subject', subjectId: id })}
            onPlayLesson={(lessonId) => setView({ name: 'lesson', lessonId, from: 'home' })}
            onOpenRewards={() => setView({ name: 'rewards' })}
            onOpenGrownUps={() => setView({ name: 'grownups' })}
            onOpenMenu={() => setMenuOpen(true)}
          />
        )
      case 'subject': {
        const s = subjectById(view.subjectId)
        if (!s) return null
        return <SubjectScreen subject={s} onPlayLesson={(id) => setView({ name: 'lesson', lessonId: id, from: 'subject' })} />
      }
      case 'lesson': {
        const ctx = findLessonContext(view.lessonId)
        if (!ctx) return null
        return (
          <LessonScreen
            lesson={ctx.lesson}
            onExit={() => setView(view.from === 'subject' ? { name: 'subject', subjectId: ctx.subject.id } : { name: 'home' })}
            onFinish={({ correct, total, minutes }) => {
              const outcome = recordLesson({ lesson: ctx.lesson, correct, total, minutes, usedHint: false })
              setView({ name: 'results', outcome, lessonId: ctx.lesson.id })
            }}
          />
        )
      }
      case 'results': {
        const ctx = resultCtx
        if (!ctx) return null
        const nxt = nextLessonAfter(ctx.lesson.id)
        return (
          <ResultsScreen
            outcome={view.outcome}
            lesson={ctx.lesson}
            nextLesson={nxt?.lesson ?? null}
            onHome={() => setView({ name: 'home' })}
            onReplay={() => setView({ name: 'lesson', lessonId: ctx.lesson.id, from: 'results' })}
            onNext={() => {
              if (nxt) setView({ name: 'lesson', lessonId: nxt.lesson.id, from: 'results' })
              else setView({ name: 'home' })
            }}
          />
        )
      }
      case 'rewards':
        return <RewardsScreen />
      case 'grownups':
        return <ParentScreen />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen pb-10">
      {header()}
      {body()}

      <SettingsPanel open={settingsOpen} onClose={() => setSettingsOpen(false)} />
      <MenuModal
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onRewards={() => {
          setMenuOpen(false)
          setView({ name: 'rewards' })
        }}
        onGrownUps={() => {
          setMenuOpen(false)
          setView({ name: 'grownups' })
        }}
        onSettings={() => {
          setMenuOpen(false)
          setSettingsOpen(true)
        }}
      />

      <TitleSync totalStars={totalStars} />
    </div>
  )
}

/** Keeps the browser tab title playful — and shows the star count. */
function TitleSync({ totalStars }: { totalStars: number }) {
  useEffect(() => {
    document.title = totalStars > 0 ? `Poli · ${totalStars} stars` : 'Poli · 1st Grade Learning Games'
  }, [totalStars])
  return null
}

export default function App() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <ProgressProvider>
          <World />
          <TapRipple />
          <Shell />
        </ProgressProvider>
      </SettingsProvider>
    </AuthProvider>
  )
}
