import useGameStore from "../stores/GameStore";

export default function ForecastPokerHand() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);

  const visibilityClass = forecastPokerHand !== null ? "visible" : "invisible";
  
  return (
    <>
      <div className="bg-blueGrayDarker flex flex-col items-center gap-4 p-4 rounded-lg">
        <p className={visibilityClass}>
          <span className="text-5xl">{forecastPokerHand?.pokerHand.name}</span>{" "}
          lvl.{forecastPokerHand?.pokerHand.level}
        </p>
        <div className="flex justify-between items-center gap-2 w-full">
          <div className="bg-blue flex-1 text-right rounded-lg px-2 py-4 text-5xl">
            <span className={visibilityClass}>{forecastPokerHand?.pokerHand.points ?? 0}</span>
          </div>
          <span className="text-redDark text-5xl">X</span>
          <div className="bg-red flex-1 rounded-lg px-2 py-4 text-5xl">
          <span className={visibilityClass}>{forecastPokerHand?.pokerHand.multiplier ?? 0}</span>
          </div>
        </div>
      </div>
    </>
  );
}
