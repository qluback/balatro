import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";

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
    let cardsAvailable = currentRound.cardsAvailable;
    cardsSelected.map((cardSelected: CardType) => {
      const existingCardIndex = currentDeck.findIndex((card) => card.label === cardSelected.label && card.suit === cardSelected.suit);
      if (existingCardIndex !== -1) {
        currentDeck.splice(existingCardIndex, 1);
      }
      
      const existingCardAvailableIndex = cardsAvailable.findIndex((card) => card.label === cardSelected.label && card.suit === cardSelected.suit);
      console.log(existingCardAvailableIndex);
      if (existingCardAvailableIndex !== -1) {
        cardsAvailable.splice(existingCardAvailableIndex, 1);
      }

      useGameStore
      .getState()
      .handleDiscardHand(currentDeck, cardsAvailable);
    })
    // console.log(currentDeck, cardsAvailable);
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
