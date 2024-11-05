import useGameStore from "../stores/GameStore";

export default function ForecastPokerHand() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);

  return (
    <>
      {forecastPokerHand !== null && (
        <div className="bg-[#1B2628] flex flex-col items-center gap-4 p-4 rounded-lg">
          <p>
            <span className="text-5xl">{forecastPokerHand.pokerHand.name}</span>{" "}
            lvl.{forecastPokerHand.pokerHand.level}
          </p>
          <div className="flex justify-between items-center gap-2 w-full">
            <span className="bg-[#0092FF] flex-1 text-right rounded-lg px-2 py-4 text-5xl">
              {forecastPokerHand.pokerHand.points}
            </span>
            <span className="text-[#FB4C3D] text-5xl">X</span>
            <span className="bg-[#FF4C3F] flex-1 rounded-lg px-2 py-4 text-5xl">
              {forecastPokerHand.pokerHand.multiplier}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
