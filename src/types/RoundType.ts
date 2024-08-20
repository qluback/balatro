import { BlindType } from "./BlindType"
import { CardType } from "./CardType"

export type RoundType = {
  blind: BlindType|null
  deck: CardType[],
  cardsSelectable: CardType[],
  hands: number,
  discards: number,
  score: number
}