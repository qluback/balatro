import { create } from "zustand";
import { CardType } from "../types/CardType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";
import { initializeGame } from "../services/GameInitializer";
// import { produce } from "immer";
import { RoundType } from "../types/RoundType";

type Store = {
  game: GameType;
  cardsSelected: CardType[];
  forecastPokerHand: PokerHandType | null;
  currentRound: RoundType | null;
  setCardsSelected: (cards: CardType[]) => void;
  setForecastPokerHand: (card: PokerHandType | null) => void;
  setCurrentRound: (round: RoundType) => void;
  handlePlayHand: (score: number) => void;
  handleDiscardHand: () => void;
};

const useGameStore = create<Store>((set) => ({
  game: initializeGame(),
  cardsSelected: [],
  forecastPokerHand: null,
  currentRound: null,
  setCardsSelected: (cards: CardType[]) =>
    set(() => ({ cardsSelected: cards })),
  setForecastPokerHand: (card: PokerHandType | null) =>
    set(() => ({ forecastPokerHand: card })),
  setGame: (game: GameType) => set(() => ({ game: game })),
  setCurrentRound: (round: RoundType) => set(() => ({ currentRound: round })),
  handlePlayHand: (score: number) =>
    set((state) => ({
      currentRound:
        state.currentRound !== null
          ? {
              ...state.currentRound,
              hands: state.currentRound.hands - 1,
              score: state.currentRound.score + score,
              success:
                state.currentRound.blind !== null
                  ? state.currentRound.score + score >=
                    state.currentRound.blind.tokenObjective
                  : false,
            }
          : null,
    })),
  handleDiscardHand: () =>
    set((state) => ({
      currentRound:
        state.currentRound !== null
          ? { ...state.currentRound, discards: state.currentRound.discards - 1 }
          : null,
    })),
}));

export default useGameStore;
