import useGameStore from "../stores/GameStore";
import ForecastPokerHand from "./ForecastPokerHand";
import casinoChip from "../assets/casino-chip.png";

export default function Sidebar() {
  const currentRound = useGameStore((state) => state.currentRound);

  return (
    <header className="bg-neutral-800 w-1/3 flex flex-col gap-2 text-white p-2">
      <h1 className="bg-[#A56D00] font-bold text-3xl text-center p-1 rounded-lg">
        {currentRound?.blind?.name}
      </h1>
      <div className="bg-[#54451A] flex items-center gap-4 p-4 rounded-lg">
        <div className="bg-[#DF9822] text-[#1D2B2C] font-bold flex justify-center items-center w-36 aspect-square rounded-full">
          <span className="text-center text-2xl uppercase">
            Big <br /> Blind
          </span>
        </div>
        <div className="bg-[#1D2B2C] flex flex-col justify-center items-center gap-2 w-full px-4 py-1 rounded-lg">
          <span>Score at least</span>
          <div className="flex items-center gap-2 m-auto">
            <img src={casinoChip} alt="" className="w-10" />
            <span className="text-[#FF4C3F] text-6xl">
              {currentRound?.blind?.scoreObjective}
            </span>
          </div>
          <p className="flex justify-center items-start gap-2">
            to earn <span className="text-[#DF9822] text-lg">$$$$</span>
          </p>
        </div>
      </div>
      <div className="bg-[#1B2628] flex items-center gap-4 px-4 py-2 rounded-lg">
        <span className="text-lg">
          Round <br /> score
        </span>
        <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
          <img src={casinoChip} alt="" className="w-10" />
          <span className="text-5xl">{currentRound?.score}</span>
        </div>
      </div>
      <div className="bg-[#1B2628] flex flex-col items-center gap-4 p-4 rounded-lg">
        <p>
          <span className="text-5xl">Two Pair</span> lvl.1
        </p>
        <div className="flex justify-between items-center gap-2 w-full">
          <span className="bg-[#0092FF] flex-1 text-right rounded-lg px-2 py-4 text-5xl">
            40
          </span>
          <span className="text-[#FB4C3D] text-5xl">X</span>
          <span className="bg-[#FF4C3F] flex-1 rounded-lg px-2 py-4 text-5xl">
            2
          </span>
        </div>
      </div>
      <div className="flex">
        <div className="w-1/3">
          <button>Run Info</button>
          <button>Options</button>
        </div>
        <div className="w-2/3">
          <div className="flex gap-2">
            <div className="bg-[#1B2628] flex flex-col justify-center items-center gap-2 flex-1 rounded-lg p-2">
              <span className="text-lg">Hands</span>
              <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg w-full">
                <span className="text-[#0091FF] text-5xl">{currentRound?.score}</span>
              </div>
            </div>
            <div className="bg-[#1B2628] flex flex-col justify-center items-center flex-1">
              <span>Discards</span>
              <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
                <span className="text-5xl">{currentRound?.score}</span>
              </div>
            </div>
          </div>
          <div className="bg-[#1B2628] flex flex-col justify-center items-center flex-1">
            <span>Discards</span>
            <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
              <span className="text-5xl">{currentRound?.score}</span>
            </div>
          </div>
          <div className="flex">
            <div>
              <span>Hands</span>
              <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
                <span className="text-5xl">{currentRound?.score}</span>
              </div>
            </div>
            <div>
              <span>Discards</span>
              <div className="bg-[#2F3A3C] flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
                <span className="text-5xl">{currentRound?.score}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p>
        Mains : {currentRound?.hands} / Défausses : {currentRound?.discards}
      </p>
      <p>Manche score : {currentRound?.score}</p>
      <ForecastPokerHand />
      <p>Manche gagnée ? {currentRound?.success ? "Oui" : "Non"}</p>
    </header>
  );
}
