import useGameStore from "../stores/GameStore";
import ForecastPokerHand from "./ForecastPokerHand";

export default function Sidebar() {
  const currentRound = useGameStore((state) => state.currentRound);
  
  return (
    <header>
      <p>
        {currentRound?.blind?.name} en cours : {currentRound?.blind?.scoreObjective}
      </p>
      <p>Mains : {currentRound?.hands} / Défausses : {currentRound?.discards}</p>
      <p>Manche score : {currentRound?.score}</p>
      <ForecastPokerHand />
      <p>Manche gagnée ? {currentRound?.success ? "Oui" : "Non"}</p>
    </header>
  );
}
