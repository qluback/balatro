import "./App.css";
import { CardType } from "./types/CardType";
import Card from "./components/Card";
import { CARDS_DECK_DATA } from "./balatro_data";
import useGameStore from "./stores/GameStore";
import { useCallback } from "react";
import ForecastPokerHand from "./components/ForecastPokerHand";

function App() {
  const game = useGameStore((state) => state.game);

  const shuffleArray = useCallback((deck: Array<CardType>): Array<CardType> => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  }, []);

  let deck = shuffleArray(CARDS_DECK_DATA);
  let board = deck.slice(0, 8);
  console.log(game);
  return (
    <div className="App">
      <section>
        <ForecastPokerHand />
      </section>
      <section className="grid grid-cols-7 gap-4">
        {board.map((card: CardType) => {
          return (
            <Card
              key={card.suit + card.label}
              card={card}
            />
          );
        })}
      </section>
      <section className="flex gap-8">
        <button className="border">Jouer la main</button>
        <div className="flex flex-col gap-4 border">
          <span>Trier la main</span>
          <div className="flex gap-4">
            <button className="border border-yellow-600">Valeur</button>
            <button className="border border-yellow-600">Couleur</button>
          </div>
        </div>
        <button className="border">Défausser</button>
      </section>
    </div>
  );
}

export default App;
