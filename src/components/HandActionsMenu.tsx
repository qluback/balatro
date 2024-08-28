import { CardSortingEnum } from "../enums/CardSortingEnum";
import {
  refillCardsSelectable,
} from "../services/Card/CardService";
import { sortCards } from "../services/Card/CardSorter";
import useGameStore from "../stores/GameStore";

export default function HandActionsMenu() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);
  const cardsSelected = useGameStore((state) => state.cardsSelected);
  let currentRound = useGameStore((state) => state.currentRound);

  function handlePlayHand() {
    if (
      forecastPokerHand === null ||
      currentRound === null ||
      cardsSelected.length === 0
    )
      return;

    const initialValue = 0;
    const sumCardsPoints = forecastPokerHand.cardsScorable.reduce(
      (accumulator: number, currentValue) => accumulator + currentValue.points,
      initialValue
    );
    useGameStore
      .getState()
      .handlePlayHand(
        (forecastPokerHand.pokerHand.points + sumCardsPoints) *
          forecastPokerHand.pokerHand.multiplier
      );

    refillCardsSelectable(
      currentRound.deck,
      currentRound.cardsSelectable,
      cardsSelected
    );
  }

  function handleDiscardHand() {
    if (currentRound === null || cardsSelected.length === 0) return;

    useGameStore.getState().handleDiscardHand();
    refillCardsSelectable(
      currentRound.deck,
      currentRound.cardsSelectable,
      cardsSelected
    );
    console.log(currentRound.deck);
  }

  function handleSortCards(type: string) {
    if (type === "value") {
      useGameStore.getState().setCurrentRound({
        ...currentRound!,
        cardsSelectable:
          sortCards(currentRound!.cardsSelectable, CardSortingEnum.SORTING_ORDER),
      });

      return;
    }

    useGameStore.getState().setCurrentRound({
      ...currentRound!,
      cardsSelectable:
      sortCards(currentRound!.cardsSelectable, CardSortingEnum.SORTING_SUIT),
    });
  }

  return (
    <section className="flex gap-8">
      <button className="border" onClick={handlePlayHand}>
        Jouer la main
      </button>
      <div className="flex flex-col gap-4 border">
        <span>Trier la main</span>
        <div className="flex gap-4">
          <button
            className="border border-yellow-600"
            onClick={() => handleSortCards("value")}
          >
            Valeur
          </button>
          <button
            className="border border-yellow-600"
            onClick={() => handleSortCards("suit")}
          >
            Couleur
          </button>
        </div>
      </div>
      <button className="border" onClick={handleDiscardHand}>
        Défausser
      </button>
    </section>
  );
}
