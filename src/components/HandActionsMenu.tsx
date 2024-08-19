import useGameStore from "../stores/GameStore";

export default function HandActionsMenu() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);
  const cardsSelected = useGameStore((state) => state.cardsSelected);
  let currentRound = useGameStore((state) => state.currentRound);
  function handlePlayHand() {
    if (forecastPokerHand === null || currentRound === null) return;

    // console.log(cardsSelected.map(card => card.label));
    const initialValue = 0;
    const sumCardsPoints = cardsSelected.reduce((accumulator: number, currentValue) => accumulator + currentValue.points, initialValue);
    // console.log((forecastPokerHand.points + sumCardsPoints) * forecastPokerHand.multiplier);
    useGameStore
      .getState()
      .handlePlayHand((forecastPokerHand.points + sumCardsPoints) * forecastPokerHand.multiplier);
  }

  function handleDiscardHand() {
    if (currentRound === null) return;

    let currentDeck = currentRound.deck;
    const existingCardIndex = currentDeck.findIndex((card) => card.label === cardsSelected[0].label && card.suit === cardsSelected[0].suit);
    if (existingCardIndex !== -1) {
      currentDeck.splice(existingCardIndex, 1);
    }

    console.log(currentDeck);

    useGameStore
      .getState()
      .handleDiscardHand();

    useGameStore.getState().updateRoundDeck(currentDeck);
  }

  function handleSortCards(
  ) {}

  return (
    <section className="flex gap-8">
      <button
        className="border"
        onClick={cardsSelected.length > 0 ? handlePlayHand : undefined}
      >
        Jouer la main
      </button>
      <div className="flex flex-col gap-4 border">
        <span>Trier la main</span>
        <div className="flex gap-4">
          <button className="border border-yellow-600">Valeur</button>
          <button className="border border-yellow-600">Couleur</button>
        </div>
      </div>
      <button
        className="border"
        onClick={cardsSelected.length > 0 ? handleDiscardHand : undefined}
      >
        Défausser
      </button>
    </section>
  );
}
