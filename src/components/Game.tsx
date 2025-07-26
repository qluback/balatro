import { getPokerHand } from "../services/PokerHandChecker";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import Card from "./Card";
import HandActionsMenu from "./HandActionsMenu";
import Sidebar from "./Sidebar/Sidebar";
import RoundEndingRecap from "./RoundEndingRecap";

export default function Game({ onClose }: {onClose: () => void}) {
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

  // function handleCollect() {
  //   game
  // }

  return (
    <>
      <iframe
        src="https://www.youtube.com/embed/RQ_lf3LwURE?autoplay=1&mute=1&controls=0&loop=1&playlist=RQ_lf3LwURE&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3"
        title="YouTube video player"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-[-1]"
      ></iframe>
      <section className="flex items-center px-8">
        <Sidebar />
        <div className="w-full h-screen relative flex flex-col justify-center gap-8 px-4 py-16">
          {currentRound?.success && (
            <RoundEndingRecap round={currentRound} onCollect={onClose} />
          )}
          {/* <section className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-black bg-opacity-20 rounded-lg p-4"></div>
            <div className="bg-black bg-opacity-20 rounded-lg p-4"></div>
          </section>
          <section className="grid grid-cols-8 gap-4 bg-black bg-opacity-20 rounded-lg p-4"></section> */}
          <section
            className="grid grid-cols-8 rounded-lg py-4 max-w-[1000px] mx-auto"
            style={{ perspective: "1000px" }}
          >
            {currentRound?.cardsSelectable.map((card: CardType) => {
              return (
                <Card
                  key={card.suit + card.label}
                  card={card}
                  animationDelay={`${Math.random()}s`}
                  onSelectCard={handleSelectCard}
                />
              );
            })}
          </section>
          <HandActionsMenu />
        </div>
      </section>
    </>
  );
}
