import useGameStore from "../stores/GameStore";

export default function HandActionsMenu() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);
  const cardsSelected = useGameStore((state) => state.cardsSelected);
  let currentRound = useGameStore((state) => state.currentRound);
  function handlePlayHand() {
    if (forecastPokerHand === null || currentRound === null) return;

    // console.log(forecastPokerHand.points * forecastPokerHand.multiplier);
    // game.currentBlind.score +=
    //   forecastPokerHand.points * forecastPokerHand.multiplier;
    //   console.log(game);
    console.log(forecastPokerHand.points * forecastPokerHand.multiplier);
    useGameStore
      .getState()
      .handlePlayHand(forecastPokerHand.points * forecastPokerHand.multiplier);
  }

  function handleDiscardHand() {
    if (currentRound === null) return;

    useGameStore
      .getState()
      .handleDiscardHand();
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
