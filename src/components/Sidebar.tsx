import useGameStore from "../stores/GameStore";
import ForecastPokerHand from "./ForecastPokerHand";

export default function Sidebar() {
  const currentRound = useGameStore((state) => state.currentRound);
  console.log(currentRound);
  return (
    <header>
      <p>
        {currentRound?.blind?.name} en cours : {currentRound?.blind?.tokenObjective}
      </p>
      <p>Manche score : {currentRound?.score}</p>
      <ForecastPokerHand />
    </header>
  );
}
