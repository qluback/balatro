import { CardSortingEnum } from "../enums/CardSortingEnum";
import { refillCardsSelectable } from "../services/Card/CardService";
import { sortCards } from "../services/Card/CardSorter";
import useGameStore from "../stores/GameStore";
import Button from "./Button";

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
      <Button bgColor="bg-[#0091FF]" handleClick={handlePlayHand}>
        Play Hand
      </Button>
      <div className="flex flex-col flex-1 gap-2 border-4 p-4 pt-2">
        <span className="text-center text-lg">Sort hand</span>
        <div className="flex gap-4">
          <Button
            size="small"
            bgColor="bg-[#FF9700]"
            handleClick={() => handleSortCards("value")}
          >
            Rank
          </Button>
          <Button
            size="small"
            bgColor="bg-[#FF9700]"
            handleClick={() => handleSortCards("suit")}
          >
            Suit
          </Button>
        </div>
      </div>
      <Button bgColor="bg-[#FF4C3F]" handleClick={handleDiscardHand}>
        Discard
      </Button>
    </section>
  );
}
