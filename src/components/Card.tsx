import { useRef, useState } from "react";
import { CardType } from "../types/CardType";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface CardProps {
  card: CardType;
  animationDelay: string;
  onSelectCard: (card: CardType) => boolean;
}

export default function Card({
  card,
  animationDelay,
  onSelectCard,
}: CardProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const container = useRef<HTMLButtonElement>(null);

  let cssClasses =
    "h-[150px] w-[120px] 2xl:h-[200px] 2xl:w-[150px] bg-white flex flex-col justify-center items-center rounded-lg border-2 border-[#BDC6D5] shadow-blackTransparent card";

  if (isSelected) {
    cssClasses += " card-selected";
  }

  function handleClick(card: CardType) {
    console.log("handle");
    const result = onSelectCard({
      suit: card.suit,
      label: card.label,
      order: card.order,
      points: card.points,
    });
    if (result) {
      setIsSelected((prevState) => !prevState);
    }
  }

  const handleMouseMove = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const cardEl = container.current;
    if (!cardEl) return;

    const rect = cardEl.getBoundingClientRect();
    const x = e.clientX - rect.left; // cursor X inside card
    const y = e.clientY - rect.top; // cursor Y inside card

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation:
    // rotateY positive means tilt right, so when cursor is right of center, rotateY should be positive
    // rotateX positive means tilt forward, so when cursor is above center, rotateX should be positive

    const rotateY = ((x - centerX) / centerX) * 10; // positive when cursor right of center
    const rotateX = -((y - centerY) / centerY) * 10; // positive when cursor above center

    gsap.to(cardEl, {
      rotateX: rotateX,
      rotateY: rotateY,
      scale: 1.1,
      translateY: isSelected ? -40 : 0,
    });
  };

  const handleMouseLeave = () => {
    const cardEl = container.current;
    if (!cardEl) return;

    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateY: isSelected ? -40 : 0,
    });
  };

  const Image = () => {
    const image = require(`../assets/${card.suit}/${card.suit}_${card.label}.png`);

    return (
      <img
        className="w-full rounded-lg"
        src={image}
        alt={`${card.suit}_${card.label}`}
      />
    );
  };

  return (
    <button
      ref={container}
      className={cssClasses}
      onClick={() => handleClick(card)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        animationDelay: animationDelay,
      }}
    >
      <Image />
    </button>
  );
}
