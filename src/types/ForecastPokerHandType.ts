import { CardType } from "./CardType"
import { PokerHandType } from "./PokerHandType"

export type ForecastPokerHandType = {
  pokerHand: PokerHandType,
  cardsScorable: CardType[]
}