import { getPokerHand } from "../services/PokerHandChecker";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import { PokerHandType } from "../types/PokerHandType";
import Card from "./Card";
import HandActionsMenu from "./HandActionsMenu";
import Sidebar from "./Sidebar";

export default function Game() {
  const game = useGameStore((state) => state.game);
//   const deck = useGameStore((state) => state.game.deck);
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

    const forecastPokerHandId = getPokerHand(cardsSelected);
    const forecastPokerHandFound: PokerHandType | undefined =
      game?.pokerHands.find(
        (pokerHand: PokerHandType) => pokerHand.id === forecastPokerHandId
      );
    useGameStore
      .getState()
      .setForecastPokerHand(
        forecastPokerHandFound !== undefined ? forecastPokerHandFound : null
      );

    return true;
  }

  return (
    <section>
      <Sidebar />
      <section className="grid grid-cols-8 gap-4">
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
    </section>
  );
}