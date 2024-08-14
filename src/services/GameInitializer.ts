import { BASE_BLINDS, BASE_POKER_HANDS_VALUES } from "../balatro_data";
import { BlindName } from "../enums/BlindName";
import { AnteType } from "../types/AnteType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";

export function initializeGame(): GameType {
  return {
    antes: buildAntes(),
    maxHands: 4,
    maxDiscards: 4,
    money: 4,
    currentAnte: 1,
    pokerHands: buildPokerHands(),
  };
}

function buildAntes(): AnteType[] {
  let antes: AnteType[] = [];
  BASE_BLINDS.forEach((baseBlind) => {
    const ante: AnteType = {
      blinds: [
        { name: BlindName.SmallBlind, tokenObjective: baseBlind },
        { name: BlindName.BigBlind, tokenObjective: baseBlind * 1.5 },
        { name: BlindName.BossBlind, tokenObjective: baseBlind * 2 },
      ],
    };
    antes.push(ante);
  });

  return antes;
}

function buildPokerHands(): PokerHandType[] {
  let pokerHands: PokerHandType[] = [];
  BASE_POKER_HANDS_VALUES.forEach((pokerHand) => {
    pokerHands.push({ ...pokerHand, level: 1 });
  });

  return pokerHands;
}
