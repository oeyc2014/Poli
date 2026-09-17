import { Btn, Modal, Stars } from './Ui'
import Mascot from './Mascot'
import { AvatarBubble } from './AvatarBubble'
import { Icon } from '../icons'
import { useAuth } from '../lib/auth'
import { useProgress } from '../lib/progress'
import { useSettings } from '../lib/settings'
import { sfx } from '../lib/sound'

export function MenuModal({
  open,
  onClose,
  onRewards,
  onGrownUps,
  onSettings,
}: {
  open: boolean
  onClose: () => void
  onRewards: () => void
  onGrownUps: () => void
  onSettings: () => void
}) {
  const { user, users, login, logout } = useAuth()
  const { level, levelName, totalStars, maxStars, progress } = useProgress()
  const { settings } = useSettings()

  return (
    <Modal open={open} onClose={onClose} title="My stuff">
      <div className="flex items-center gap-4 rounded-3xl border-[2.5px] border-ink-900/15 bg-cream-50 p-4">
        <AvatarBubble
          icon={user?.avatar.icon ?? 'smiley'}
          color={user?.avatar.color ?? '#fff'}
          accessories={settings.accessories}
          size={80}
          className="anim-float"
        />
        <div className="min-w-0">
          <p className="font-display text-2xl font-bold text-ink-900">{user?.name ?? 'Friend'}</p>
          <p className="font-display text-base text-ink-500">
            Level {level} · {levelName}
          </p>
          <p className="flex items-center gap-1.5 font-display text-base text-ink-500">
            <Icon name="star" size={20} /> {totalStars}/{maxStars}
            <Icon name="coin" size={20} /> {progress.gems}
          </p>
        </div>
        <Mascot size={70} mood="happy" className="ml-auto hidden sm:block" />
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Btn tone="sun" size="lg" full icon={<Icon name="medal" size={28} />} onClick={onRewards}>
          My collection
        </Btn>
        <Btn tone="sky" size="lg" full icon={<Icon name="family" size={28} />} onClick={onGrownUps}>
          Grown-ups
        </Btn>
        <Btn tone="white" variant="outline" size="lg" full icon={<Icon name="gear" size={28} color="currentColor" />} onClick={onSettings}>
          Settings
        </Btn>
        <Btn
          tone="white"
          variant="outline"
          size="lg"
          full
          icon={<Icon name="door" size={28} />}
          onClick={() => {
            sfx.whoosh()
            logout()
            onClose()
          }}
        >
          Switch player
        </Btn>
      </div>

      {users.length > 1 && (
        <div className="mt-4">
          <p className="font-display text-lg text-ink-900">Jump to another player</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {users
              .filter((u) => u.id !== user?.id)
              .map((u) => (
                <button
                  key={u.id}
                  onClick={() => {
                    sfx.pop()
                    if (u.pin) {
                      logout()
                    } else {
                      login(u.id)
                    }
                    onClose()
                  }}
                  className="flex items-center gap-2 rounded-2xl border-[2.5px] border-ink-900/20 bg-white px-3 py-2 font-display text-lg hover:-translate-y-0.5"
                >
                  <Icon name={u.avatar.icon} size={30} />
                  {u.name}
                  {u.pin && <Icon name="lock" size={18} />}
                </button>
              ))}
          </div>
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 rounded-2xl bg-cream-50 p-3">
        <span className="font-display text-base text-ink-500">{progress.badges.length} badges earned</span>
        <Stars value={Math.min(3, progress.streak)} size={22} />
      </div>
    </Modal>
  )
}
