import useGameStore from "../stores/GameStore";
import { initializeGame } from "../services/GameInitializer";
import { getNextBlind } from "../services/BlindService";
import { shuffleCards } from "../services/Card/CardService";
import { sortCards } from "../services/Card/CardSorter";
import { CardSortingEnum } from "../enums/CardSortingEnum";
import homeLogo from "../assets/home-logo.png";
import HomeMenuCard from "./Home/HomeMenuCard";
import Button from "./Button";

export default function MainMenu({ onStart }: {onStart: () => void}) {
  function handleStartGame() {
    const newGame = initializeGame();
    useGameStore.getState().setGame(newGame);

    const roundDeck = shuffleCards(newGame.deck);
    const cardSelectable = sortCards(
      roundDeck.splice(0, 8),
      CardSortingEnum.SORTING_ORDER
    );
    useGameStore.getState().setCurrentRound({
      blind: getNextBlind(newGame.antes),
      deck: roundDeck,
      // deck: newGame.deck,
      cardsSelectable: cardSelectable,
      hands: newGame.maxHands,
      discards: newGame.maxDiscards,
      score: 0,
      success: false,
    });

    onStart();
  }

  return (
    <section className="home-bg p-16 flex flex-col items-center gap-16">
            <iframe
        src="https://www.youtube.com/embed/7GutRIhmTwQ?autoplay=1&mute=1&controls=0&loop=1&playlist=7GutRIhmTwQ&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3"
        title="YouTube video player"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-[-1]"
      ></iframe>
      <img src={homeLogo} alt="" className="mx-auto h-[700px]" />
      {/* <button onClick={handleStartGame}>Jouer</button> */}
      <div className="flex gap-12 w-full max-w-[1200px] h-[200px]">
        <HomeMenuCard>
          <div className="flex flex-col gap-8 w-full">
            <span className="text-center text-2xl">Profile</span>
            <Button bgColor="bg-blueGrayLight" size="small">
              P1
            </Button>
          </div>
        </HomeMenuCard>
        <HomeMenuCard className="flex-[2_2_0%]">
          <div className="flex gap-8 h-full w-full">
            <Button bgColor="bg-blue" handleClick={handleStartGame}>
              PLAY
            </Button>
            <Button bgColor="bg-green">COLLECTION</Button>
          </div>
        </HomeMenuCard>
        <HomeMenuCard>
          <div className="flex flex-col gap-4 w-full">
            <Button bgColor="bg-orange" size="small">
              OPTIONS
            </Button>
            <Button bgColor="bg-red" size="small">
              QUIT
            </Button>
          </div>
        </HomeMenuCard>
      </div>
    </section>
  );
}
