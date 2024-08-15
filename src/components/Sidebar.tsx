import useGameStore from "../stores/GameStore";
import ForecastPokerHand from "./ForecastPokerHand";

export default function Sidebar() {
  const currentBlind = useGameStore((state) => state.currentBlind);
  console.log(currentBlind);
  return (
    <header>
      <p>
        {currentBlind?.name} en cours : {currentBlind?.tokenObjective}
      </p>
      <p>Manche score : {currentBlind?.score}</p>
      <ForecastPokerHand />
    </header>
  );
}
