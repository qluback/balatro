import { create, State } from "zustand";
import { CardType } from "../types/CardType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";
import { initializeGame } from "../services/GameInitializer";
import { produce } from "immer";
import { BlindType } from "../types/BlindType";
import { getNextBlind } from "../services/BlindService";

type Store = {
  game: GameType;
  cardsSelected: CardType[];
  forecastPokerHand: PokerHandType | null;
  currentBlind: BlindType | null;
  setCardsSelected: (cards: CardType[]) => void;
  setForecastPokerHand: (card: PokerHandType | null) => void;
  setCurrentBlind: (blind: BlindType | null) => void;
  updateCurrentBlindScore: (score: number) => void;
};

const useGameStore = create<Store>((set) => ({
  game: initializeGame(),
  cardsSelected: [],
  forecastPokerHand: null,
  currentBlind: null,
  setCardsSelected: (cards: CardType[]) =>
    set(() => ({ cardsSelected: cards })),
  setForecastPokerHand: (card: PokerHandType | null) =>
    set(() => ({ forecastPokerHand: card })),
  setGame: (game: GameType) => set(() => ({ game: game })),
  setCurrentBlind: (blind: BlindType | null) =>
    set(() => ({ currentBlind: blind })),
  updateCurrentBlindScore: (score: number) =>
    set((state) => ({
      currentBlind:
        state.currentBlind !== null
          ? {
              ...state.currentBlind,
              score: state.currentBlind.score + score,
              success:
                state.currentBlind.score + score >=
                state.currentBlind.tokenObjective,
            }
          : null,
    })),
}));

export default useGameStore;
