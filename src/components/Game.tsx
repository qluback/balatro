import { getPokerHand } from "../services/PokerHandChecker";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import Button from "./Button";
import Card from "./Card";
import HandActionsMenu from "./HandActionsMenu";
import Sidebar from "./Sidebar/Sidebar";

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
        {currentRound?.hands === 4 && (
          <div className="bg-blueGrayDark rounded-lg p-2">
            <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-2 flex-1 rounded-lg p-4">
              <Button bgColor="bg-orange">Encaisser: $6</Button>
            </div>
          </div>
        )}
        <section className="grid grid-cols-3 gap-4">
          <div className="col-span-2 bg-black bg-opacity-20 rounded-lg p-4"></div>
          <div className="bg-black bg-opacity-20 rounded-lg p-4"></div>
        </section>
        <section className="grid grid-cols-8 gap-4 bg-black bg-opacity-20 rounded-lg p-4"></section>
        <section className="grid grid-cols-8 gap-4 bg-black bg-opacity-20 rounded-lg p-4">
          {currentRound?.cardsSelectable.map((card: CardType) => {
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
