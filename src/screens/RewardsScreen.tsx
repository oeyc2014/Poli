import { useState } from 'react'
import { Btn, Panel } from '../components/Ui'
import { AvatarBubble } from '../components/AvatarBubble'
import Mascot from '../components/Mascot'
import { Icon } from '../icons'
import { BADGES } from '../content/badges'
import { STICKERS } from '../content/stickers'
import { ACCESSORIES, THEMES } from '../content/shop'
import { useProgress } from '../lib/progress'
import { useAuth } from '../lib/auth'
import { useSettings } from '../lib/settings'
import { sfx } from '../lib/sound'

type Tab = 'badges' | 'stickers' | 'gear' | 'colours'

export function RewardsScreen() {
  const { user } = useAuth()
  const { progress, buySticker, buyShopItem, ownedItems, totalStars, completedLessons, perfectLessons, level } =
    useProgress()
  const { settings, set, toggleAccessory } = useSettings()
  const [tab, setTab] = useState<Tab>('badges')
  const [justBought, setJustBought] = useState<string | null>(null)

  const earned = new Set(progress.badges)
  const owned = new Set(progress.unlockedStickers)
  const ownedShop = new Set(ownedItems)

  const buy = (id: string, price: number) => {
    if (buyShopItem(id)) {
      setJustBought(id)
      sfx.badge()
      window.setTimeout(() => setJustBought(null), 1200)
    } else {
      sfx.wrong()
    }
    void price
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-4 pb-20">
      <div className="flex flex-col items-center gap-2">
        <Mascot size={110} mood="cheer" wave />
        <h1 className="font-display text-4xl font-bold text-ink-900">My Collection</h1>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full border-[2.5px] border-ink-900/70 bg-sun-200 px-3 py-1 font-display text-lg font-bold">
            <Icon name="star" size={22} /> {totalStars} stars
          </span>
          <span className="flex items-center gap-1.5 rounded-full border-[2.5px] border-ink-900/70 bg-sun-100 px-3 py-1 font-display text-lg font-bold">
            <Icon name="coin" size={22} /> {progress.gems} coins
          </span>
          <span className="flex items-center gap-1.5 rounded-full border-[2.5px] border-ink-900/70 bg-grape-100 px-3 py-1 font-display text-lg font-bold">
            <Icon name="medal" size={22} /> Level {level}
          </span>
        </div>
      </div>

      {/* buddy preview — shows the gear as you shop */}
      <Panel pad="sm" className="mt-4 flex items-center justify-center gap-4">
        <AvatarBubble
          icon={user?.avatar.icon ?? 'smiley'}
          color={user?.avatar.color ?? '#fff'}
          accessories={settings.accessories}
          size={72}
          className="anim-bob"
        />
        <div>
          <p className="font-display text-lg font-bold text-ink-900">{user?.name ?? 'Friend'}&apos;s buddy</p>
          <p className="text-sm text-ink-500">Gear you buy shows up here and everywhere in the app.</p>
        </div>
      </Panel>

      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {(
          [
            ['badges', 'Badges', 'medal'],
            ['stickers', 'Stickers', 'sparkle'],
            ['gear', 'Accessories', 'partyTiny'],
            ['colours', 'Colours', 'paint'],
          ] as const
        ).map(([id, label, icon]) => (
          <Btn
            key={id}
            tone={tab === id ? 'grass' : 'white'}
            variant={tab === id ? 'solid' : 'outline'}
            size="md"
            icon={<Icon name={icon} size={24} />}
            onClick={() => setTab(id)}
          >
            {label}
          </Btn>
        ))}
      </div>

      {tab === 'badges' && (
        <>
          <p className="mt-4 text-center font-display text-lg text-ink-600">
            {completedLessons} lessons finished · {perfectLessons} perfect lessons
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {BADGES.map((b, i) => {
              const got = earned.has(b.id)
              return (
                <div
                  key={b.id}
                  className={`card3d flex flex-col items-center gap-1 p-4 text-center transition-transform ${
                    got ? 'bg-gradient-to-b from-sun-100 to-sun-300' : 'bg-white/70'
                  }`}
                  style={{ animation: `poli-pop 0.45s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.04}s both` }}
                >
                  <span className={got ? 'anim-bob' : ''} style={{ filter: got ? 'none' : 'grayscale(1) opacity(0.35)' }}>
                    <Icon name={b.icon} size={66} />
                  </span>
                  <p className="font-display text-lg font-bold text-ink-900">{got ? b.name : '???'}</p>
                  <p className="text-xs text-ink-500">{b.blurb}</p>
                  {got && (
                    <span className="mt-1 rounded-full border-[2.5px] border-ink-900/70 bg-grass-300 px-2 py-0.5 font-display text-xs font-bold text-ink-900">
                      EARNED!
                    </span>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'stickers' && (
        <>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center font-display text-lg text-ink-600">
            Spend your <Icon name="coin" size={22} /> coins on stickers. You earn coins by finishing
            lessons!
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {STICKERS.map((s, i) => {
              const has = owned.has(s.id)
              const canAfford = progress.gems >= s.price
              return (
                <div
                  key={s.id}
                  className={`card3d flex flex-col items-center gap-2 p-4 text-center ${
                    has ? 'bg-gradient-to-b from-grass-100 to-grass-300' : 'bg-white'
                  } ${justBought === s.id ? 'anim-tada' : ''}`}
                  style={{ animation: `poli-pop 0.45s ease ${i * 0.05}s both` }}
                >
                  <span className={has ? 'anim-float' : ''} style={{ filter: has ? 'none' : 'grayscale(0.5)' }}>
                    <Icon name={s.icon} size={66} />
                  </span>
                  <p className="font-display text-base font-bold text-ink-900">{s.name}</p>
                  {has ? (
                    <span className="flex items-center gap-1 rounded-full border-[2.5px] border-ink-900/70 bg-grass-300 px-2 py-0.5 font-display text-xs font-bold">
                      <Icon name="check" size={14} color="#3e6e53" /> MINE
                    </span>
                  ) : (
                    <Btn
                      tone={canAfford ? 'grass' : 'white'}
                      variant={canAfford ? 'solid' : 'outline'}
                      size="sm"
                      disabled={!canAfford}
                      onClick={() => {
                        if (buySticker(s.id)) {
                          setJustBought(s.id)
                          sfx.badge()
                          window.setTimeout(() => setJustBought(null), 1200)
                        } else {
                          sfx.wrong()
                        }
                      }}
                    >
                      <Icon name="coin" size={20} /> {s.price}
                    </Btn>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'gear' && (
        <>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center font-display text-lg text-ink-600">
            Dress up your buddy! Tap <Icon name="coin" size={22} /> to buy, then wear it from your
            Profile settings.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACCESSORIES.map((a, i) => {
              const has = ownedShop.has(a.id)
              const worn = settings.accessories.includes(a.id)
              const canAfford = progress.gems >= a.price
              return (
                <div
                  key={a.id}
                  className={`card3d flex flex-col items-center gap-2 p-4 text-center ${
                    has && worn ? 'bg-gradient-to-b from-mint-100 to-mint-300' : 'bg-white'
                  } ${justBought === a.id ? 'anim-tada' : ''}`}
                  style={{ animation: `poli-pop 0.45s ease ${i * 0.05}s both` }}
                >
                  <span className={has ? 'anim-float' : ''} style={{ filter: has ? 'none' : 'grayscale(0.6) opacity(0.7)' }}>
                    <Icon name={a.icon} size={62} />
                  </span>
                  <p className="font-display text-base font-bold text-ink-900">{a.name}</p>
                  {has ? (
                    <Btn tone={worn ? 'grass' : 'white'} variant={worn ? 'solid' : 'outline'} size="sm" onClick={() => { toggleAccessory(a.id); sfx.tap() }}>
                      {worn ? 'Wearing it' : 'Wear it'}
                    </Btn>
                  ) : (
                    <Btn tone={canAfford ? 'sun' : 'white'} variant={canAfford ? 'solid' : 'outline'} size="sm" disabled={!canAfford} onClick={() => buy(a.id, a.price)}>
                      <Icon name="coin" size={20} /> {a.price}
                    </Btn>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      {tab === 'colours' && (
        <>
          <p className="mt-4 flex flex-wrap items-center justify-center gap-1.5 text-center font-display text-lg text-ink-600">
            Make the whole app yours! A new colour for every corner of Poli.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {THEMES.map((t, i) => {
              const isDefault = t.id === 'classic'
              const has = isDefault || ownedShop.has(t.id)
              const active = settings.themeId === t.id
              const canAfford = progress.gems >= t.price
              return (
                <div
                  key={t.id}
                  className={`card3d flex flex-col items-center gap-2 p-4 text-center ${active ? 'ring-2 ring-mint-400' : ''} ${
                    justBought === t.id ? 'anim-tada' : ''
                  }`}
                  style={{ animation: `poli-pop 0.45s ease ${i * 0.05}s both` }}
                >
                  <span
                    className="grid h-16 w-16 place-items-center rounded-full border-[3px] border-ink-900"
                    style={{ background: t.swatch }}
                  >
                    <Icon name={t.icon} size={40} />
                  </span>
                  <p className="font-display text-base font-bold text-ink-900">{t.name}</p>
                  {active ? (
                    <span className="flex items-center gap-1 rounded-full border-[2.5px] border-ink-900/70 bg-grass-300 px-2 py-0.5 font-display text-xs font-bold">
                      <Icon name="check" size={14} color="#3e6e53" /> IN USE
                    </span>
                  ) : has ? (
                    <Btn
                      tone="grass"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        set('themeId', t.id)
                        sfx.pop()
                      }}
                    >
                      Use it
                    </Btn>
                  ) : (
                    <Btn tone={canAfford ? 'sun' : 'white'} variant={canAfford ? 'solid' : 'outline'} size="sm" disabled={!canAfford} onClick={() => buy(t.id, t.price)}>
                      <Icon name="coin" size={20} /> {t.price}
                    </Btn>
                  )}
                </div>
              )
            })}
          </div>
        </>
      )}

      <Panel pad="md" className="mt-6 text-center">
        <p className="flex items-center justify-center gap-2 font-display text-lg text-ink-600">
          <Icon name="target" size={26} />
          Accuracy so far and lesson counts are on your Grown-ups page.
        </p>
      </Panel>
    </div>
  )
}
