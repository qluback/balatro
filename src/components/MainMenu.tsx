import { useCallback } from "react";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import { initializeGame } from "../services/GameInitializer";
import { getNextBlind } from "../services/BlindService";

export default function MainMenu() {
  const shuffleCards = useCallback((deck: CardType[]): CardType[] => {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }

    return deck;
  }, []);

  function handleStartGame() {
    const newGame = initializeGame();
    useGameStore.getState().setGame(newGame);
    let roundDeck = shuffleCards(newGame.deck);
    useGameStore.getState().setCurrentRound({
      blind: getNextBlind(newGame.antes),
      deck: roundDeck,
      cardsAvailable: roundDeck.slice(0, 8),
      hands: newGame.maxHands,
      discards: newGame.maxDiscards,
      score: 0,
    });
  }

  return (
    <section>
      <button onClick={handleStartGame}>Jouer</button>
    </section>
  );
}
