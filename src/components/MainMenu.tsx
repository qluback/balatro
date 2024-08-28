import useGameStore from "../stores/GameStore";
import { initializeGame } from "../services/GameInitializer";
import { getNextBlind } from "../services/BlindService";
import { shuffleCards } from "../services/Card/CardService";
import { sortCards } from "../services/Card/CardSorter";
import { CardSortingEnum } from "../enums/CardSortingEnum";

export default function MainMenu() {
  function handleStartGame() {
    const newGame = initializeGame();
    useGameStore.getState().setGame(newGame);
    
    const roundDeck = shuffleCards(newGame.deck);
    const cardSelectable = sortCards(roundDeck.splice(0, 8), CardSortingEnum.SORTING_ORDER);
    useGameStore.getState().setCurrentRound({
      blind: getNextBlind(newGame.antes),
      deck: roundDeck,
      // deck: newGame.deck,
      cardsSelectable: cardSelectable,
      hands: newGame.maxHands,
      discards: newGame.maxDiscards,
      score: 0,
      success: false
    });
  }

  return (
    <section>
      <button onClick={handleStartGame}>Jouer</button>
    </section>
  );
}
