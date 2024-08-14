import { useState } from "react";
import { CardType } from "../types/CardType";

interface CardProps {
  card: CardType;
  onSelectCard: (card: CardType) => boolean;
}

export default function Card({card, onSelectCard}: CardProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  let cssClasses = "border h-36 flex flex-col justify-center items-center";

  if (isSelected) {
    cssClasses += " bg-red-200";
  }

  function handleClick(card: CardType) {
    const result = onSelectCard({suit: card.suit, label: card.label, order: card.order, points: card.points});
    console.log(result)
    if (result) {
      setIsSelected(prevState => !prevState);
    }
  } 

  return (
    <button
      className={cssClasses}
      onClick={() => handleClick(card)}
    >
      <p>{card.suit}</p>
      <p>
        {card.label}
      </p>
    </button>
  );
}
