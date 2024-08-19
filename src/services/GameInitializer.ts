import { BASE_BLINDS, BASE_POKER_HANDS_VALUES, CARDS_DECK_DATA } from "../balatro_data";
import { BlindName } from "../enums/BlindName";
import { AnteType } from "../types/AnteType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";
import { getNextBlind } from "./BlindService";

export function initializeGame(): GameType {
  const antes = buildAntes();
  return {
    antes: antes,
    maxHands: 4,
    maxDiscards: 4,
    money: 4,
    currentAnte: 1,
    deck: CARDS_DECK_DATA,
    pokerHands: buildPokerHands(),
  };
}

function buildAntes(): AnteType[] {
  let antes: AnteType[] = [];
  BASE_BLINDS.forEach((baseBlind) => {
    const ante: AnteType = {
      blinds: [
        { name: BlindName.SmallBlind, tokenObjective: baseBlind, success: false },
        { name: BlindName.BigBlind, tokenObjective: baseBlind * 1.5, success: false },
        { name: BlindName.BossBlind, tokenObjective: baseBlind * 2, success: false },
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
