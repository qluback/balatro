import useGameStore from "../stores/GameStore";
import { initializeGame } from "../services/GameInitializer";
import { getNextBlind } from "../services/BlindService";
import { shuffleCards } from "../services/CardService";

export default function MainMenu() {
  function handleStartGame() {
    const newGame = initializeGame();
    useGameStore.getState().setGame(newGame);
    
    let roundDeck = shuffleCards(newGame.deck);
    const cardsSelectable = roundDeck.splice(0, 8);
    useGameStore.getState().setCurrentRound({
      blind: getNextBlind(newGame.antes),
      deck: roundDeck,
      cardsSelectable: cardsSelectable,
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
