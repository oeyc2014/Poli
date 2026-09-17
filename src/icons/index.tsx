/* ============================================================
   Poli icon registry.

   Every picture in the app comes from here — no emoji anywhere.
   The keys are listed explicitly (rather than spread) on purpose:
   TypeScript then refuses to compile if two icon files ever claim
   the same name, instead of one silently winning.
   ============================================================ */
import type { ReactNode } from 'react'
import * as A from './animals'
import * as F from './food'
import * as N from './nature'
import * as T from './things'
import * as M from './misc'
import * as C from './clothing'
import * as U from './ui'
import * as W from './wearables'

type Draw = (props: { color?: string }) => ReactNode

export const ICONS = {
  /* animals */
  cat: A.cat,
  dog: A.dog,
  fox: A.fox,
  bear: A.bear,
  panda: A.panda,
  koala: A.koala,
  lion: A.lion,
  tiger: A.tiger,
  cow: A.cow,
  pig: A.pig,
  monkey: A.monkey,
  squirrel: A.squirrel,
  mouse: A.mouse,
  rabbit: A.rabbit,
  unicorn: A.unicorn,
  dragon: A.dragon,
  bird: A.bird,
  hen: A.hen,
  rooster: A.rooster,
  chick: A.chick,
  duck: A.duck,
  eagle: A.eagle,
  penguin: A.penguin,
  owl: A.owl,
  bee: A.bee,
  ladybug: A.ladybug,
  butterfly: A.butterfly,
  ant: A.ant,
  worm: A.worm,
  caterpillar: A.caterpillar,
  fish: A.fish,
  shark: A.shark,
  whale: A.whale,
  dolphin: A.dolphin,
  frog: A.frog,
  elephant: A.elephant,
  turtle: A.turtle,
  octopus: A.octopus,
  tRex: A.tRex,
  longneck: A.longneck,
  pawPrints: A.pawPrints,
  bone: A.bone,
  horn: A.horn,
  egg: A.egg,
  spider: A.spider,
  fly: A.fly,
  horse: A.horse,

  /* food */
  apple: F.apple,
  greenApple: F.greenApple,
  cookie: F.cookie,
  strawberry: F.strawberry,
  banana: F.banana,
  grapes: F.grapes,
  blueberry: F.blueberry,
  donut: F.donut,
  pizza: F.pizza,
  carrot: F.carrot,
  cheese: F.cheese,
  honey: F.honey,
  bamboo: F.bamboo,
  milk: F.milk,
  soda: F.soda,
  lollipop: F.lollipop,
  iceCream: F.iceCream,
  cupcake: F.cupcake,
  mushroom: F.mushroom,
  cake: F.cake,
  seed: F.seed,
  leaf: F.leaf,
  berry: F.berry,
  popcorn: F.popcorn,
  lemon: F.lemon,
  pepper: F.pepper,
  olive: F.olive,
  pineapple: F.pineapple,
  basil: F.basil,
  happyFace: F.SmileFace,

  /* clothes and warm food */
  coat: C.coat,
  shorts: C.shorts,
  swimsuit: C.swimsuit,
  sunglasses: C.sunglasses,
  mitten: C.mitten,
  scarf: C.scarf,
  hotDrink: C.hotDrink,
  soup: C.soup,

  /* nature + sky */
  sun: N.sun,
  sunHappy: N.sunHappy,
  moon: N.moon,
  moonSleep: N.moonSleep,
  star: N.star,
  starGlow: N.starGlow,
  sparkle: N.sparkle,
  sparkleSwirl: N.sparkleSwirl,
  cloud: N.cloud,
  cloudRain: N.cloudRain,
  cloudSnow: N.cloudSnow,
  snowflake: N.snowflake,
  snowman: N.snowman,
  rainbow: N.rainbow,
  sunrise: N.sunrise,
  sunset: N.sunset,
  earth: N.earth,
  weather: N.weather,
  thermometer: N.thermometer,
  waterDrop: N.waterDrop,
  wave: N.wave,
  fire: N.fire,
  iceCube: N.iceCube,
  rock: N.rock,
  log: N.log,
  tree: N.tree,
  sprout: N.sprout,
  leaves: N.leaves,
  leafSingle: N.leafSingle,
  sunflower: N.sunflower,
  blossom: N.blossom,
  tulip: N.tulip,
  mapleLeaf: N.mapleLeaf,
  hills: N.hills,
  beach: N.beach,
  planet: N.planet,
  hole: N.hole,
  nest: N.nest,
  fullMoon: N.fullMoon,
  wind: N.wind,
  nose: N.nose,
  ear: N.ear,

  /* everyday things */
  balloon: T.balloon,
  rocket: T.rocket,
  car: T.car,
  bus: T.bus,
  bicycle: T.bicycle,
  chair: T.chair,
  house: T.house,
  bed: T.bed,
  bowl: T.bowl,
  backpack: T.backpack,
  tv: T.tv,
  book: T.book,
  notebook: T.notebook,
  map: T.map,
  pencil: T.pencil,
  shield: T.shield,
  ball: T.ball,
  basketball: T.basketball,
  volleyball: T.volleyball,
  key: T.key,
  spoon: T.spoon,
  boat: T.boat,
  hammer: T.hammer,
  lifeRing: T.lifeRing,
  magnifier: T.magnifier,
  brick: T.brick,
  abacus: T.abacus,
  puzzle: T.puzzle,
  kite: T.kite,
  clock: T.clock,
  basket: T.basket,
  gem: T.gem,
  trophy: T.trophy,
  medal: T.medal,
  crown: T.crown,
  target: T.target,
  compass: T.compass,
  chart: T.chart,
  lightbulb: T.lightbulb,
  flashlight: T.flashlight,
  candle: T.candle,
  phone: T.phone,
  musicNote: T.musicNote,
  headphones: T.headphones,
  mic: T.mic,
  lock: T.lock,
  hat: T.hat,
  candy: T.candy,
  cube: T.cube,

  /* symbols, subjects and coloured counters */
  party: M.party,
  gift: M.gift,
  hundred: M.hundred,
  one: M.one,
  numbers: M.numbers,
  ten: M.ten,
  abc: M.abc,
  capitalAbc: M.capitalAbc,
  minus: M.minus,
  plusBadge: M.plusBadge,
  diamond: M.diamond,
  downTriangle: M.downTriangle,
  microscope: M.microscope,
  skip: M.skip,
  scale: M.scale,
  endsWith: M.endsWith,
  eyes: M.eyes,
  family: M.family,
  clap: M.clap,
  bathtub: M.bathtub,
  picture: M.picture,
  muscle: M.muscle,
  school: M.school,
  door: M.door,
  teddy: M.teddy,
  pumpkin: M.pumpkin,
  baby: M.baby,
  cocoon: M.cocoon,
  fireworks: M.fireworks,
  scissors: M.scissors,
  gamepad: M.gamepad,
  paint: M.paint,
  question: M.question,
  redBall: M.redBall,
  blueBall: M.blueBall,
  yellowBall: M.yellowBall,
  greenBall: M.greenBall,
  orangeBall: M.orangeBall,
  purpleBall: M.purpleBall,
  blueSquare: M.blueSquare,
  purpleSquare: M.purpleSquare,
  greenSquare: M.greenSquare,
  blueStar: M.diamondStar,
  pinkStar: M.pinkStar,
  purpleStar: M.purpleStar,
  greenStar: M.greenStar,

  /* shop wearables + currency */
  coin: W.coin,
  bow: W.bow,
  bubbles: W.bubbles,
  crownTiny: W.crownTiny,
  partyTiny: W.partyTiny,
  capTiny: W.capTiny,
  scarfTiny: W.scarfTiny,
  glassesTiny: W.glassesTiny,

  /* interface */
  gear: U.gear,
  bell: U.bell,
  bellOff: U.bellOff,
  speaker: U.speaker,
  speakerOff: U.speakerOff,
  bulb: U.bulb,
  check: U.check,
  cross: U.cross,
  play: U.play,
  pause: U.pause,
  back: U.back,
  next: U.next,
  up: U.up,
  close: U.close,
  plus: U.plus,
  flame: U.flame,
  hand: U.hand,
  heart: U.heart,
  calendar: U.calendar,
  trash: U.trash,
  refresh: U.refresh,
  person: U.person,
  smiley: U.smiley,
  search: U.search,
  dots: U.dots,
} satisfies Record<string, Draw>

export type IconName = keyof typeof ICONS

/** Names that are safe to feed to <Icon name=... /> from data. */
export function hasIcon(name: string): name is IconName {
  return Object.prototype.hasOwnProperty.call(ICONS, name)
}

const HALO = '#ffffff'

/** The sticker backing behind every picture. */
function Sticker({ children }: { children: ReactNode }) {
  return (
    <g>
      <circle cx="50" cy="50" r="49" fill={HALO} />
      {children}
    </g>
  )
}

function Fallback() {
  return (
    <g>
      <circle cx="50" cy="50" r="49" fill={HALO} />
      <circle cx="50" cy="52" r="34" fill="#e7e2f0" stroke="#413364" strokeWidth="4" />
      <text x="50" y="70" textAnchor="middle" fontSize="42" fontWeight="700" fill="#7c6d99" fontFamily="Baloo 2, Trebuchet MS, sans-serif">
        ?
      </text>
    </g>
  )
}

/**
 * Draws one icon. `color` only affects the interface icons, which
 * are drawn in currentColor; the picture icons carry their own colours.
 */
export function Icon({
  name,
  size = 64,
  className = '',
  color,
  title,
}: {
  name: IconName | string
  size?: number | string
  className?: string
  color?: string
  title?: string
}) {
  const key = hasIcon(name) ? name : null
  const draw = key ? ICONS[key] : Fallback
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`shrink-0 ${className}`}
      role="img"
      aria-label={title ?? (key ? key : 'picture')}
    >
      {/* interface icons are drawn in currentColor — no sticker halo there */}
      {key && color ? draw({ color }) : <Sticker>{draw({ color })}</Sticker>}
    </svg>
  )
}

export function iconNames(): IconName[] {
  return Object.keys(ICONS) as IconName[]
}

/**
 * Draws a picture when the value names a known icon, and otherwise shows
 * the value as text. Plenty of content mixes the two on purpose — a tile
 * can hold a letter ("B") or a picture (the bear).
 */
export function AutoIcon({ value, size = 48 }: { value: string; size?: number }) {
  if (hasIcon(value)) return <Icon name={value} size={size} />
  return (
    <span className="font-display font-bold leading-none" style={{ fontSize: size * 0.82 }}>
      {value}
    </span>
  )
}
