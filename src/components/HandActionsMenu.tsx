import { CardSortingEnum } from "../enums/CardSortingEnum";
import { refillCardsSelectable } from "../services/Card/CardService";
import { sortCards } from "../services/Card/CardSorter";
import useGameStore from "../stores/GameStore";

export default function HandActionsMenu() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);
  const cardsSelected = useGameStore((state) => state.cardsSelected);
  const currentRound = useGameStore((state) => state.currentRound);

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
        cardsSelectable: sortCards(
          currentRound!.cardsSelectable,
          CardSortingEnum.SORTING_ORDER
        ),
      });

      return;
    }

    useGameStore.getState().setCurrentRound({
      ...currentRound!,
      cardsSelectable: sortCards(
        currentRound!.cardsSelectable,
        CardSortingEnum.SORTING_SUIT
      ),
    });
  }

  return (
    <section className="flex gap-8 text-white">
      <button
        className="bg-[#0091FF] flex-1 rounded-lg text-2xl"
        onClick={handlePlayHand}
      >
        Play Hand
      </button>
      <div className="flex flex-col gap-2 border-4 p-4 pt-2">
        <span className="text-center text-lg">Sort hand</span>
        <div className="flex gap-4">
          <button
            className="bg-[#FF9700] rounded-lg p-4 w-20"
            onClick={() => handleSortCards("value")}
          >
            Rank
          </button>
          <button
            className="bg-[#FF9700] rounded-lg p-4 w-20"
            onClick={() => handleSortCards("suit")}
          >
            Suit
          </button>
        </div>
      </div>
      <button
        className="bg-[#FF4C3F] flex-1 rounded-lg text-2xl"
        onClick={handleDiscardHand}
      >
        Discard
      </button>
    </section>
  );
}
