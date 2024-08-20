import { create } from "zustand";
import { CardType } from "../types/CardType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";
import { initializeGame } from "../services/GameInitializer";
// import { produce } from "immer";
import { RoundType } from "../types/RoundType";

type Store = {
  game: GameType | null;
  cardsSelected: CardType[];
  forecastPokerHand: PokerHandType | null;
  currentRound: RoundType | null;
  setGame: (game: GameType) => void;
  setCardsSelected: (cards: CardType[]) => void;
  setForecastPokerHand: (card: PokerHandType | null) => void;
  setCurrentRound: (round: RoundType) => void;
  handlePlayHand: (score: number) => void;
  handleDiscardHand: (deck: CardType[], cardsAvailable: CardType[]) => void;
  updateRoundDeck: (deck: CardType[]) => void;
};

const useGameStore = create<Store>((set) => ({
  game: null,
  cardsSelected: [],
  forecastPokerHand: null,
  currentRound: null,
  setGame: (game: GameType) => set(() => ({ game: game })),
  setCardsSelected: (cards: CardType[]) =>
    set(() => ({ cardsSelected: cards })),
  setForecastPokerHand: (card: PokerHandType | null) =>
    set(() => ({ forecastPokerHand: card })),
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
                    state.currentRound.blind.scoreObjective
                  : false,
            }
          : null,
    })),
  handleDiscardHand: (deck: CardType[], cardsAvailable: CardType[]) =>
    set((state) => ({
      currentRound:
        state.currentRound !== null
          ? {
              ...state.currentRound,
              deck: deck,
              cardsAvailable: cardsAvailable,
              discards: state.currentRound.discards - 1,
            }
          : null,
    })),
  updateRoundDeck: (deckUpdated: CardType[]) =>
    set((state) => ({
      currentRound:
        state.currentRound !== null
          ? { ...state.currentRound, deck: deckUpdated }
          : null,
    })),
}));

// function isCardSelected (card: CardType) {
//   console.log(state.cardsSelected.map(a => a.foo));
// }

export default useGameStore;
