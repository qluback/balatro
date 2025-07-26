import Button from "./Button";
import casinoChip from "../assets/casino-chip.png";
import { RoundType } from "../types/RoundType";

interface RoundEndingRecapProps {
  round: RoundType;
  onCollect: () => void;
}

export default function RoundEndingRecap({ round, onCollect }: RoundEndingRecapProps) {
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
      <span key={i}>$</span>
    ));

    return <>{dollars}</>;
  };

  return (
    <div className="bg-blueGrayDark rounded-t-3xl p-2 mx-4 border-yellowDark border-4 w-full max-w-[1100px] h-3/4 z-10 m-auto absolute -bottom-2 left-1/2  -translate-x-1/2 slide-up">
      <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-8 flex-1 rounded-3xl p-4 shadow-blackDark">
        <Button bgColor="bg-orange" handleClick={onCollect}>
          <span className="inline-block text-6xl px-8 py-3">Encaisser: $6</span>
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
                  {round.blind?.scoreObjective}
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
            <span className="text-blue text-5xl">{round.hands}</span> hands
            remaining (1 $ each)
          </p>
          <span className="text-orange text-4xl">
            <DollarDisplay hands={round.hands} />
          </span>
        </div>
      </div>
    </div>
  );
}
