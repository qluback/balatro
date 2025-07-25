import useGameStore from "../stores/GameStore";

export default function ForecastPokerHand() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);

  const visibilityClass = forecastPokerHand !== null ? "visible" : "invisible";
  
  return (
    <>
      <div className="bg-blueGrayDarker flex flex-col items-center gap-4 p-4 rounded-xl shadow-blackDark">
        <p className={visibilityClass}>
          <span className="text-5xl">{forecastPokerHand?.pokerHand.name}</span>{" "}
          lvl.{forecastPokerHand?.pokerHand.level}
        </p>
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="bg-blue flex-1 text-right rounded-xl px-2 py-4 text-5xl shadow-shBlue">
            <span className="animate-forecast-score inline-block">{forecastPokerHand?.pokerHand.points ?? 0}</span>
          </div>
          <span className="text-redDark text-5xl">X</span>
          <div className="bg-red flex-1 rounded-xl px-2 py-4 text-5xl shadow-shRedDark">
          <span className="animate-forecast-score inline-block">{forecastPokerHand?.pokerHand.multiplier ?? 0}</span>
          </div>
        </div>
      </div>
    </>
  );
}
