import useGameStore from "../../stores/GameStore";
import { CardType } from "../../types/CardType";

function shuffleCards(deck: CardType[]): CardType[] {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }

  return deck;
}

function refillCardsSelectable(
  deck: CardType[],
  cardsSelectable: CardType[],
  cardsSelected: CardType[]
) {
  cardsSelected.map((cardSelected: CardType) => {
    const existingCardAvailableIndex = cardsSelectable.findIndex(
      (card: CardType) =>
        card.label === cardSelected.label && card.suit === cardSelected.suit
    );

    if (existingCardAvailableIndex !== -1) {
      cardsSelectable.splice(existingCardAvailableIndex, 1);
    }

    cardsSelectable = cardsSelectable.concat(deck.splice(0, 1));

    useGameStore.getState().refillCardsSelectable(deck, cardsSelectable);

    return true;
  });
}

export { shuffleCards, refillCardsSelectable };
