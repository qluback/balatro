import { BASE_BLINDS, BASE_POKER_HANDS_VALUES, CARDS_DECK_DATA } from "../balatro_data";
import { BlindNameEnum } from "../enums/BlindNameEnum";
import { AnteType } from "../types/AnteType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";

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
  const antes: AnteType[] = [];
  BASE_BLINDS.forEach((baseBlind) => {
    const ante: AnteType = {
      blinds: [
        { name: BlindNameEnum.SMALL_BLIND, scoreObjective: baseBlind, success: false },
        { name: BlindNameEnum.BIG_BLIND, scoreObjective: baseBlind * 1.5, success: false },
        { name: BlindNameEnum.BOSS_BLIND, scoreObjective: baseBlind * 2, success: false },
      ],
    };
    antes.push(ante);
  });

  return antes;
}

function buildPokerHands(): PokerHandType[] {
  const pokerHands: PokerHandType[] = [];
  BASE_POKER_HANDS_VALUES.forEach((pokerHand) => {
    pokerHands.push({ ...pokerHand, level: 1 });
  });

  return pokerHands;
}
