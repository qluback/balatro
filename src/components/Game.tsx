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

  const DotGrid = () => {
    const totalDots = 36;
    const waveCount = 3;
    const waveDelayGap = 0.5; // delay between waves in seconds

    // Dots per wave (roughly even split)
    const dotsPerWave = Math.ceil(totalDots / waveCount);

    const dots = Array.from({ length: totalDots }, (_, index) => {
      // Determine which wave this dot is in
      const waveIndex = Math.floor(index / dotsPerWave);
      const dotIndexInWave = index % dotsPerWave;

      // Animation delay: base wave delay + dot position in wave
      const delay = waveIndex * waveDelayGap + dotIndexInWave * 0.1;

      return (
        <div
          key={index}
          className="bg-white w-2 aspect-square wave-letter"
          style={{ animationDelay: `${delay}s` }}
        ></div>
      );
    });

    return <div className="flex justify-around w-full">{dots}</div>;
  };

  const DollarDisplay = ({ hands }: { hands: number }) => {
    const dollars = Array.from({ length: hands }, (_, i) => (
      <span
        key={i}
      >
        $
      </span>
    ));

    return <>{dollars}</>;
  };

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
        <div className="w-full h-screen relative flex flex-col justify-center gap-8 px-4 py-16">
          {currentRound?.hands === 4 && (
            <div className="bg-blueGrayDark rounded-t-3xl p-2 border-yellowDark border-4 w-full max-w-[1100px] h-3/4 z-10 m-auto absolute -bottom-2 left-1/2 -translate-x-1/2">
              <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-8 flex-1 rounded-3xl p-4 shadow-blackDark">
                <Button bgColor="bg-orange">
                  <span className="inline-block text-6xl px-8 py-3">
                    Encaisser: $6
                  </span>
                </Button>

                <div className="flex justify-between items-center gap-2 w-full">
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
                <DotGrid />
                <div className="flex justify-between w-full">
                  <p className="flex items-center text-white gap-4">
                    <span className="text-blue text-5xl">
                      {currentRound.hands}
                    </span>{" "}
                    hands remaining (1 $ each)
                  </p>
                  <span className="text-orange text-4xl">
                    <DollarDisplay hands={currentRound.hands} />
                    {/* <span
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
                      </span> */}
                  </span>
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
            className="grid grid-cols-8 rounded-lg py-4 max-w-[1000px] mx-auto"
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
