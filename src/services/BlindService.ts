import { AnteType } from "../types/AnteType";
import { BlindType } from "../types/BlindType";

export function getNextBlind(antes: AnteType[]): BlindType | null {
  let currentBlind: BlindType | null = null;
  antes.map((ante) => {
    if (currentBlind !== null) {
      return false;
    }

    ante.blinds.some((blind: BlindType) => {
      console.log(blind);
      currentBlind = blind;
      return blind.success === false;
    });

    return true;
  });

  return currentBlind;
}
