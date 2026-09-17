import type { ReactNode } from 'react'
import { IconBtn } from './Ui'
import Mascot from './Mascot'
import { BouncyText } from './BouncyText'
import { AvatarBubble } from './AvatarBubble'
import { Icon } from '../icons'
import { useProgress } from '../lib/progress'
import { useAuth } from '../lib/auth'
import { useSettings } from '../lib/settings'
import { sfx } from '../lib/sound'

/** A single stat pill, e.g. (star) 12 */
export function StatPill({
  icon,
  value,
  label,
  tone = 'bg-white',
}: {
  icon: string
  value: ReactNode
  label: string
  tone?: string
}) {
  return (
    <span
      title={label}
      className={`flex items-center gap-1.5 rounded-full border-[3px] border-ink-900 px-2.5 py-1 font-display text-lg font-bold text-ink-900 ${tone}`}
      style={{ boxShadow: '0 3px 0 0 rgba(43,34,68,0.85)' }}
    >
      <Icon name={icon} size={22} />
      {/* re-keying the number makes it squash-pop every time it changes */}
      <span key={String(value)} className="anim-rubber leading-none">
        {value}
      </span>
    </span>
  )
}

export function TopBar({
  onBack,
  title,
  icon,
  onOpenSettings,
  onOpenMenu,
  right,
  hideStats,
}: {
  onBack?: () => void
  title?: string
  icon?: string
  onOpenSettings?: () => void
  onOpenMenu?: () => void
  right?: ReactNode
  hideStats?: boolean
}) {
  const { totalStars, progress, level, levelName } = useProgress()
  const { user } = useAuth()
  const { settings, toggle } = useSettings()

  return (
    <header className="sticky top-0 z-30 mb-4 border-b-[4px] border-ink-900/15 glass">
      {/* the candy stripe — instantly recognizable */}
      <div className="h-2 w-full bg-[linear-gradient(90deg,#ff7a50_0_10%,#ffd166_10%_20%,#3ddc84_20%_30%,#2ec9f5_30%_40%,#8b46f0_40%_50%,#f9409a_50%_60%,#ff7a50_60%_70%,#ffd166_70%_80%,#3ddc84_80%_90%,#2ec9f5_90%_100%)]" />
      <div className="mx-auto flex max-w-6xl flex-wrap items-center gap-2 px-3 py-2.5 sm:gap-3 sm:px-5">
        {onBack && (
          <IconBtn label="Go back" tone="white" size={48} onClick={onBack}>
            <Icon name="back" size={24} color="currentColor" />
          </IconBtn>
        )}

        {title ? (
          <h1 className="flex min-w-0 items-center gap-2 font-display text-2xl font-bold text-ink-900 sm:text-3xl">
            {icon && <Icon name={icon} size={40} />}
            <span className="truncate">{title}</span>
          </h1>
        ) : (
          <div className="flex items-center gap-1.5">
            <Mascot size={50} mood="happy" wave />
            <BouncyText as="span" text="Poli" rainbow className="font-party text-3xl text-pop-sm sm:text-4xl" />
          </div>
        )}

        <div className="ml-auto flex flex-wrap items-center gap-2">
          {!hideStats && (
            <>
              <StatPill icon="star" label="Stars collected" value={totalStars} tone="bg-sun-300" />
              <StatPill icon="coin" label="Coins" value={progress.gems} tone="bg-cream-100" />
              {progress.streak > 0 && (
                <StatPill icon="fire" label={`${progress.streak} day streak`} value={progress.streak} tone="bg-coral-300" />
              )}
              <StatPill
                icon="medal"
                label={`Level ${level} — ${levelName}`}
                value={`Lv ${level}`}
                tone="bg-grape-200"
              />
            </>
          )}
          {right}
          <IconBtn
            label={settings.sound ? 'Turn sounds off' : 'Turn sounds on'}
            tone={settings.sound ? 'sun' : 'white'}
            size={46}
            onClick={() => {
              toggle('sound')
              if (!settings.sound) sfx.pop()
            }}
          >
            <Icon name={settings.sound ? 'bell' : 'bellOff'} size={24} color="currentColor" />
          </IconBtn>
          {onOpenSettings && (
            <IconBtn label="Settings" tone="white" size={46} onClick={onOpenSettings}>
              <Icon name="gear" size={24} color="currentColor" />
            </IconBtn>
          )}
          {onOpenMenu && (
            <button
              onClick={onOpenMenu}
              aria-label={`${user?.name ?? 'Player'} menu`}
              className="rounded-full transition-transform hover:-translate-y-0.5"
            >
              <AvatarBubble
                icon={user?.avatar.icon ?? 'smiley'}
                color={user?.avatar.color ?? '#fff'}
                accessories={settings.accessories}
                size={50}
              />
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
