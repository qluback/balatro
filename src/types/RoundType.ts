import { BlindType } from "./BlindType"

export type RoundType = {
  blind: BlindType|null
  hands: number,
  discards: number,
  score: number
}