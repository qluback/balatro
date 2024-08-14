import { create } from "zustand";
import { CardType } from "../types/CardType";
import { GameType } from "../types/GameType";
import { PokerHandType } from "../types/PokerHandType";
import { initializeGame } from "../services/GameInitializer";

type Store = {
  game: GameType;
  cardsSelected: CardType[];
  forecastPokerHand: PokerHandType | null;
  setCardsSelected: (cards: CardType[]) => void;
  setForecastPokerHand: (card: PokerHandType | null) => void;
};

const useGameStore = create<Store>((set) => ({
  game: initializeGame(),
  cardsSelected: [],
  forecastPokerHand: null,
  setCardsSelected: (cards: CardType[]) =>
    set(() => ({ cardsSelected: cards })),
  setForecastPokerHand: (card: PokerHandType | null) =>
    set(() => ({ forecastPokerHand: card })),
}));

export default useGameStore;
