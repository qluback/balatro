import { getPokerHand } from "../services/PokerHandChecker";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import Card from "./Card";
import HandActionsMenu from "./HandActionsMenu";
import Sidebar from "./Sidebar";

export default function Game() {
  const currentRound = useGameStore((state) => state.currentRound);
  const cardsSelected = useGameStore((state) => state.cardsSelected);

  function handleSelectCard(cardSelected: CardType): boolean {
    const cardsSelectedUpdated: CardType[] = cardsSelected;
    const existingCardSelected = cardsSelectedUpdated.findIndex(
      (card: CardType) =>
        card.suit === cardSelected.suit && card.label === cardSelected.label
    );

    if (existingCardSelected !== -1) {
      cardsSelectedUpdated.splice(existingCardSelected, 1);
    } else if (cardsSelectedUpdated.length === 5) {
      return false;
    } else {
      cardsSelectedUpdated.push(cardSelected);
    }

    
    useGameStore.getState().setCardsSelected(cardsSelectedUpdated);
    // if (cardsSelectedUpdated.length === 0) return false;

    const forecastPokerHand = getPokerHand(cardsSelected);
    console.log(forecastPokerHand);
    useGameStore.getState().setForecastPokerHand(forecastPokerHand);

    return true;
  }

  return (
    <section className="flex items-center">
      <Sidebar />
      <div className="w-2/3 flex flex-col gap-8 px-4 py-16">
        <section className="grid grid-cols-8 gap-4 bg-black bg-opacity-20 rounded-lg p-4">
          {currentRound?.cardsSelectable.map((card: CardType, index: number) => {
            return (
              <Card
                key={card.suit + card.label}
                card={card}
                onSelectCard={handleSelectCard}
              />
            );
          })}
        </section>
        <HandActionsMenu />
      </div>
    </section>
  );
}
