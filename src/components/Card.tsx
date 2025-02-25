import { useRef, useState } from "react";
import { CardType } from "../types/CardType";
import { getSuitIcon } from "../services/Card/CardService";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

interface CardProps {
  card: CardType;
  onSelectCard: (card: CardType) => boolean;
}

export default function Card({ card, onSelectCard }: CardProps) {
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const container = useRef<HTMLButtonElement>(null);
  const { contextSafe } = useGSAP(
    () => {
      // use selectors...
      // gsap.to(".box", { rotation: "+=360", duration: 3 });
      // or refs...
    },
    { scope: container }
  );

  let cssClasses =
    "container border h-36 flex flex-col justify-center items-center h-full p-2 rounded-lg border-2 border-[#BDC6D5] transition-card";

  if (isSelected) {
    cssClasses += " bg-neutral-500 card-selected";
  } else {
    cssClasses += " bg-white";
  }

  function handleClick(card: CardType) {
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

  const onHover = contextSafe(() => {
    gsap.fromTo(
      container.current,
      {
        scale: 1.2,
      },
      {
        duration: 0.3,
        scale: 1,
        ease: "bounce.out",
      }
    );
  });

  return (
    <button
      ref={container}
      className={cssClasses}
      onClick={() => handleClick(card)}
      onMouseEnter={onHover}
    >
      <img src={getSuitIcon(card.suit)} alt="" />
      <p>{card.suit}</p>
      <p>{card.label}</p>
    </button>
  );
}
