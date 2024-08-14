import useGameStore from "../stores/GameStore";

export default function ForecastPokerHand() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);

  return (
    <>
      {forecastPokerHand !== null && (
        <>
          <p>
            {forecastPokerHand.name} - niv.{forecastPokerHand.level}
          </p>
          <p>
            {forecastPokerHand.points}X{forecastPokerHand.multiplier}
          </p>
        </>
      )}
    </>
  );
}
