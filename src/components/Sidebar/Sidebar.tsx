import useGameStore from "../../stores/GameStore";
import ForecastPokerHand from "../ForecastPokerHand";
import casinoChip from "../../assets/casino-chip.png";
import Button from "../Button";
import SidebarInfoCard from "./SidebarInfoCard";

export default function Sidebar() {
  const currentRound = useGameStore((state) => state.currentRound);

  return (
    <header className="bg-blueGrayDark w-1/3 max-w-md min-h-screen flex flex-col justify-center gap-2 text-white p-2">
      <h1 className="bg-yellowDark font-bold text-3xl text-center p-1 rounded-lg">
        {currentRound?.blind?.name}
      </h1>
      <div className="bg-yellowDarker flex items-center gap-4 p-4 rounded-lg">
        <div className="bg-orange text-blueGrayDarker font-bold flex justify-center items-center w-36 aspect-square rounded-full">
          <span className="text-center text-2xl uppercase">
            Big <br /> Blind
          </span>
        </div>
        <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-2 w-full px-4 py-1 rounded-lg">
          <span>Score at least</span>
          <div className="flex items-center gap-2 m-auto">
            <img src={casinoChip} alt="" className="w-10 invert" />
            <span className="text-red text-6xl">
              {currentRound?.blind?.scoreObjective}
            </span>
          </div>
          <p className="flex justify-center items-start gap-2">
            to earn <span className="text-orange text-lg">$$$$</span>
          </p>
        </div>
      </div>
      <div className="bg-blueGrayDarker flex items-center gap-4 px-4 py-2 rounded-lg">
        <span className="text-lg">
          Round <br /> score
        </span>
        <div className="bg-blueGrayDark flex justify-center items-center gap-2 flex-1 p-2 rounded-lg">
          <img src={casinoChip} alt="" className="w-10 invert" />
          <span className="text-5xl">{currentRound?.score}</span>
        </div>
      </div>
      <ForecastPokerHand />
      <div className="flex gap-4">
        <div className="w-1/3 flex flex-col gap-4">
          <Button bgColor="bg-red">
            Run
            <br />
            Info
          </Button>
          <Button bgColor="bg-orange">Options</Button>
        </div>
        <div className="w-2/3 flex flex-col gap-y-4">
          <div className="flex gap-2">
            <SidebarInfoCard title="Hands">
              <span className="text-blue text-5xl">{currentRound?.hands}</span>
            </SidebarInfoCard>
            <SidebarInfoCard title="Discards">
              <span className="text-red text-5xl">
                {currentRound?.discards}
              </span>
            </SidebarInfoCard>
          </div>
          <SidebarInfoCard>
            <span className="text-orangeLight text-6xl">$22</span>
          </SidebarInfoCard>
          <div className="flex gap-2">
            <SidebarInfoCard title="Ante">
              <p className="flex items-center">
                <span className="text-orangeDark text-5xl">1</span>
                <span>/</span>
                <span className="text-2xl ml-2">8</span>
              </p>
            </SidebarInfoCard>
            <SidebarInfoCard title="Round">
              <span className="text-orangeDark text-5xl">
                {currentRound?.discards}
              </span>
            </SidebarInfoCard>
          </div>
        </div>
      </div>
      <p>Manche gagnée ? {currentRound?.success ? "Oui" : "Non"}</p>
    </header>
  );
}
