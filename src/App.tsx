import logo from "./logo.svg";
import "./App.css";
import { CARDS_DECK_DATA } from "./cards_deck_data";
import { useState } from "react";
import { BASE_BLINDS } from "./base_blinds";
import { BlindName } from "./enums/BlindName";
import { GameType } from "./types/GameType";
import { AnteType } from "./types/AnteType";
import { CardType } from "./types/CardType";
import Card from "./components/Card";
import { getPokerHand } from "./services/PokerHandChecker";

function App() {
  const [game, setGame] = useState<GameType>(initializeGame());
  const [cardsSelected, setCardsSelected] = useState<CardType[]>([]);
  const [forecastPokerHand, setForecastPokerHand] = useState<string>("");

  function handleSelectCard(cardSelected: CardType) {
    const cardsSelectedUpdated: CardType[] = cardsSelected;
    const existingCardSelected = cardsSelectedUpdated.findIndex(
      (card: CardType) =>
        card.suit === cardSelected.suit && card.label === cardSelected.label
    );

    if (existingCardSelected !== -1) {
      cardsSelectedUpdated.splice(existingCardSelected, 1);
    } else {
      cardsSelectedUpdated.push(cardSelected);
    }

    setCardsSelected(cardsSelectedUpdated);

    setForecastPokerHand(getPokerHand(cardsSelected));
  }

  function initializeGame(): GameType {
    let newGame: GameType = {
      antes: [],
      maxHands: 4,
      maxDiscards: 4,
      money: 4,
      currentAnte: 1,
    };

    BASE_BLINDS.forEach((baseBlind) => {
      const ante: AnteType = {
        blinds: [
          { name: BlindName.SmallBlind, tokenObjective: baseBlind },
          { name: BlindName.BigBlind, tokenObjective: baseBlind * 1.5 },
          { name: BlindName.BossBlind, tokenObjective: baseBlind * 2 },
        ],
      };
      newGame.antes.push(ante);
    });

    return newGame;
  }

  function shuffleArray(deck: Array<CardType>): Array<CardType> {
    // for (let i = deck.length - 1; i > 0; i--) {
    //   const j = Math.floor(Math.random() * (i + 1));
    //   const temp = deck[i];
    //   deck[i] = deck[j];
    //   deck[j] = temp;
    // }

    return deck;
  }

  let deck = shuffleArray(CARDS_DECK_DATA);
  let board = deck.slice(0, 52);
  console.log(game);
  return (
    <div className="App">
      <section><p>{forecastPokerHand}</p></section>
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
