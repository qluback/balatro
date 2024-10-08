import { AnteType } from "./AnteType"
import { CardType } from "./CardType"
import { PokerHandType } from "./PokerHandType"

export type GameType = {
  antes: AnteType[]
  maxHands: number,
  maxDiscards: number,
  money: number,
  currentAnte: number,
  deck: CardType[],
  pokerHands: PokerHandType[]
}