import { AnteType } from "./AnteType"
import { PokerHandType } from "./PokerHandType"

export type GameType = {
  antes: AnteType[]
  maxHands: number,
  maxDiscards: number,
  money: number,
  currentAnte: number,
  pokerHands: PokerHandType[]
}