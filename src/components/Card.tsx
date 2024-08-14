import { useState } from "react";
import { CardType } from "../types/CardType";
import useGameStore from "../stores/GameStore";
import { getPokerHand } from "../services/PokerHandChecker";
import { PokerHandType } from "../types/PokerHandType";

interface CardProps {
  card: CardType;
}

export default function Card({ card }: CardProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const game = useGameStore((state) => state.game);
  const cardsSelected = useGameStore((state) => state.cardsSelected);

  let cssClasses = "border h-36 flex flex-col justify-center items-center";

  if (isSelected) {
    cssClasses += " bg-red-200";
  }

  function handleSelectCard(cardSelected: CardType) {
    const cardsSelectedUpdated: CardType[] = cardsSelected;
    const existingCardSelected = cardsSelectedUpdated.findIndex(
      (card: CardType) =>
        card.suit === cardSelected.suit && card.label === cardSelected.label
    );

    if (existingCardSelected !== -1) {
      cardsSelectedUpdated.splice(existingCardSelected, 1);
    } else if (cardsSelectedUpdated.length === 5) {
      return;
    } else {
      cardsSelectedUpdated.push(cardSelected);
    }

    useGameStore.getState().setCardsSelected(cardsSelectedUpdated);

    const forecastPokerHandId = getPokerHand(cardsSelected);
    const forecastPokerHandFound: PokerHandType | undefined =
      game.pokerHands.find(
        (pokerHand: PokerHandType) => pokerHand.id === forecastPokerHandId
      );
    useGameStore
      .getState()
      .setForecastPokerHand(
        forecastPokerHandFound !== undefined ? forecastPokerHandFound : null
      );

    setIsSelected((prevState) => !prevState);
  }

  return (
    <button className={cssClasses} onClick={() => handleSelectCard(card)}>
      <p>{card.suit}</p>
      <p>{card.label}</p>
    </button>
  );
}
