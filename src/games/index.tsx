import type { Step } from '../types'
import { ChoiceGame } from './ChoiceGame'
import { TapCountGame } from './TapCountGame'
import { NumberLineGame } from './NumberLineGame'
import { MatchGame } from './MatchGame'
import { OrderGame } from './OrderGame'
import { BuildWordGame } from './BuildWordGame'
import { SortGame } from './SortGame'
import { BalloonPopGame } from './BalloonPopGame'
import { PizzaMakerGame } from './PizzaMakerGame'
import { CarRaceGame } from './CarRaceGame'

export function GameHost({
  step,
  onAnswer,
  mistakes,
  reveal,
  hideCaptions,
}: {
  step: Step
  onAnswer: (correct: boolean) => void
  mistakes: number
  reveal: boolean
  hideCaptions: boolean
}) {
  switch (step.kind) {
    case 'choice':
      return (
        <ChoiceGame step={step} onAnswer={onAnswer} mistakes={mistakes} reveal={reveal} hideCaptions={hideCaptions} />
      )
    case 'tapCount':
      return <TapCountGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'numberLine':
      return <NumberLineGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'match':
      return <MatchGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'order':
      return <OrderGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'buildWord':
      return <BuildWordGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'sort':
      return <SortGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'balloonPop':
      return <BalloonPopGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'pizza':
      return <PizzaMakerGame step={step} onAnswer={onAnswer} reveal={reveal} />
    case 'race':
      return <CarRaceGame step={step} onAnswer={onAnswer} reveal={reveal} />
    default:
      return null
  }
}
