import { getPokerHand } from "../services/PokerHandChecker";
import useGameStore from "../stores/GameStore";
import { CardType } from "../types/CardType";
import Button from "./Button";
import Card from "./Card";
import HandActionsMenu from "./HandActionsMenu";
import Sidebar from "./Sidebar/Sidebar";
import casinoChip from "../assets/casino-chip.png";

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
    <>
      <iframe
        src="https://www.youtube.com/embed/RQ_lf3LwURE?autoplay=1&mute=1&controls=0&loop=1&playlist=RQ_lf3LwURE&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3"
        title="YouTube video player"
        allow="autoplay; fullscreen"
        allowFullScreen
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-[-1]"
      ></iframe>
      <section className="flex items-center px-8 lg:scale-[0.9] 2xl:scale-100">
        <Sidebar />
        <div className="w-full flex flex-col gap-8 px-4 py-16">
          {currentRound?.hands === 4 && (
            <div className="bg-blueGrayDark rounded-lg p-2 border-yellowDark border-4 w-full max-w-[1000px] m-auto">
              <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-2 flex-1 rounded-lg p-4">
                <Button bgColor="bg-orange">
                  <span className="inline-block text-5xl px-8 py-3">
                    Encaisser: $6
                  </span>
                </Button>

                <div className="flex justify-between items-center gap-2 w-full px-4 py-1">
                  <div className="flex gap-8">
                    <div className="bg-orange text-blueGrayDarker font-bold flex justify-center items-center w-24 aspect-square rounded-full shadow-blackTransparent">
                      <span className="text-center text-2xl uppercase">
                        Big <br /> Blind
                      </span>
                    </div>
                    <div className="flex flex-col items-center text-white">
                      <span>Score at least</span>
                      <div className="flex items-center gap-2 m-auto">
                        <img src={casinoChip} alt="" className="w-10 invert" />
                        <span className="text-red text-6xl">
                          {currentRound?.blind?.scoreObjective}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="flex justify-center items-start gap-2">
                    <span className="text-orange text-4xl">
                      <span
                        className="animate-dollar-blind delay-[0ms] inline-block"
                        style={{ animationDelay: "0ms" }}
                      >
                        $
                      </span>
                      <span
                        className="animate-dollar-blind delay-[2000ms] inline-block"
                        style={{ animationDelay: "400ms" }}
                      >
                        $
                      </span>
                      <span
                        className="animate-dollar-blind delay-[4000ms] inline-block"
                        style={{ animationDelay: "800ms" }}
                      >
                        $
                      </span>
                      <span
                        className="animate-dollar-blind delay-[6000ms] inline-block"
                        style={{ animationDelay: "1200ms" }}
                      >
                        $
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* <section className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-black bg-opacity-20 rounded-lg p-4"></div>
            <div className="bg-black bg-opacity-20 rounded-lg p-4"></div>
          </section>
          <section className="grid grid-cols-8 gap-4 bg-black bg-opacity-20 rounded-lg p-4"></section> */}
          <section
            className="grid grid-cols-8 rounded-lg py-4 max-w-[1000px] m-auto"
            style={{ perspective: "1000px" }}
          >
            {currentRound?.cardsSelectable.map((card: CardType, index) => {
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
