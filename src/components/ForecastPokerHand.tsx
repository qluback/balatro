import useGameStore from "../stores/GameStore";

export default function ForecastPokerHand() {
  const forecastPokerHand = useGameStore((state) => state.forecastPokerHand);

  return (
    <>
      {forecastPokerHand !== null && (
        <>
          <p>
            {forecastPokerHand.pokerHand.name} - niv.{forecastPokerHand.pokerHand.level}
          </p>
          <p>
            {forecastPokerHand.pokerHand.points}X{forecastPokerHand.pokerHand.multiplier}
          </p>
        </>
      )}
    </>
  );
}
