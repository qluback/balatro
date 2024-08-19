import "./App.css";
import { CardType } from "./types/CardType";
import Card from "./components/Card";
import { getPokerHand } from "./services/PokerHandChecker";
import { PokerHandType } from "./types/PokerHandType";
import useGameStore from "./stores/GameStore";
import { useCallback } from "react";
import Sidebar from "./components/Sidebar";
import HandActionsMenu from "./components/HandActionsMenu";
import { getNextBlind } from "./services/BlindService";

function App() {
  const game = useGameStore((state) => state.game);
  const deck = useGameStore((state) => state.game.deck);
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
      game.pokerHands.find(
        (pokerHand: PokerHandType) => pokerHand.id === forecastPokerHandId
      );
    useGameStore
      .getState()
      .setForecastPokerHand(
        forecastPokerHandFound !== undefined ? forecastPokerHandFound : null
      );

    return true;
  }

  const shuffleArray = useCallback((deck: Array<CardType>): Array<CardType> => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  }, []);

  useGameStore.getState().setCurrentRound({
    blind: getNextBlind(game.antes),
    deck: game.deck,
    hands: game.maxHands,
    discards: game.maxDiscards,
    score: 0
  });
  let roundDeck = shuffleArray(deck);
  let board = roundDeck.slice(0, 8);
  console.log(game);

  return (
    <div className="App flex w-full px-8">
      <Sidebar />
      <main>
        <section className="grid grid-cols-7 gap-4">
          {board.map((card: CardType) => {
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
      </main>
    </div>
  );
}

export default App;
