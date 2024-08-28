import { create } from "zustand";
import { CardType } from "../types/CardType";
import { GameType } from "../types/GameType";
import { RoundType } from "../types/RoundType";
import { ForecastPokerHandType } from "../types/ForecastPokerHandType";
import { CardSortingEnum } from "../enums/CardSortingEnum";

type Store = {
  game: GameType | null;
  cardsSelected: CardType[];
  forecastPokerHand: ForecastPokerHandType | null;
  currentRound: RoundType | null;
  sorting: CardSortingEnum;
  setGame: (game: GameType) => void;
  setCardsSelected: (cards: CardType[]) => void;
  setForecastPokerHand: (forecastPokerHand: ForecastPokerHandType | null) => void;
  setCurrentRound: (round: RoundType) => void;
  handlePlayHand: (score: number) => void;
  handleDiscardHand: () => void;
  refillCardsSelectable: (deck: CardType[], cardsSelectable: CardType[]) => void;
  updateRoundDeck: (deck: CardType[]) => void;
};

const useGameStore = create<Store>((set) => ({
  game: null,
  cardsSelected: [],
  forecastPokerHand: null,
  currentRound: null,
  sorting: CardSortingEnum.SORTING_ORDER,
  setGame: (game: GameType) => set(() => ({ game: game })),
  setCardsSelected: (cards: CardType[]) =>
    set(() => ({ cardsSelected: cards })),
  setForecastPokerHand: (forecastPokerHand: ForecastPokerHandType | null) =>
    set(() => ({ forecastPokerHand: forecastPokerHand })),
  setCurrentRound: (round: RoundType) => set(() => ({ currentRound: round })),
  handlePlayHand: (score: number) =>
    set((state) => ({
      forecastPokerHand: null,
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
  handleDiscardHand: () =>
    set((state) => ({
      currentRound:
        state.currentRound !== null
          ? {
              ...state.currentRound,
              discards: state.currentRound.discards - 1,
            }
          : null,
    })),
    refillCardsSelectable: (deck: CardType[], cardsSelectable: CardType[]) => set((state) => ({
      cardsSelected: [],
      currentRound:
        state.currentRound !== null
          ? {
              ...state.currentRound,
              deck: deck,
              cardsSelectable: cardsSelectable,
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
