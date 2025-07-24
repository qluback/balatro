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
    "container border h-36 flex flex-col justify-center items-center h-full p-2 rounded-lg border-2 border-[#BDC6D5] card";

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
      translateY: isSelected ? -20 : 0
      // duration: 0.3,
      // ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    const cardEl = container.current;
    if (!cardEl) return;

    gsap.to(cardEl, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      translateY: isSelected ? -20 : 0
      // duration: 0.5,
      // ease: "power2.out",
    });
  };

  return (
    <button
      ref={container}
      className={cssClasses}
      onClick={() => handleClick(card)}
      // onMouseEnter={onHover}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      <img src={getSuitIcon(card.suit)} alt="" />
      <p>{card.suit}</p>
      <p>{card.label}</p>
    </button>
  );
}
