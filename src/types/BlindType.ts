import { BlindNameEnum } from "../enums/BlindNameEnum"

export type BlindType = {
  name: BlindNameEnum
  scoreObjective: number,
  success: boolean
}