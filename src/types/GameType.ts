import { AnteType } from "./AnteType"

export type GameType = {
  antes: AnteType[]
  maxHands: number,
  maxDiscards: number,
  money: number,
  currentAnte: number
}