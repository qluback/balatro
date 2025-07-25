import useGameStore from "../../stores/GameStore";
import ForecastPokerHand from "../ForecastPokerHand";
import casinoChip from "../../assets/casino-chip.png";
import Button from "../Button";
import SidebarInfoCard from "./SidebarInfoCard";

export default function Sidebar() {
  const currentRound = useGameStore((state) => state.currentRound);

  return (
    <header className="bg-blueGrayDark w-1/3 max-w-md min-h-screen flex flex-col justify-center gap-4 text-white p-2 border-x-4 border-yellowDark">
      <div className="bg-blueGrayDarker shadow-blackDark p-1 rounded-xl flex flex-col gap-3">
        <h1 className="bg-yellowDark font-bold text-5xl text-center p-4 rounded-xl shadow-shYellowDark flex justify-center gap-0.5">
          {currentRound?.blind?.name?.split("").map((char, index) => (
            <span
              key={index}
              className="wave-letter"
              style={{
                animationDelay: `${index * 0.3}s`,
                display: "inline-block",
                whiteSpace: char === " " ? "pre" : undefined, // preserves space width
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>
        <div className="bg-yellowDarker flex items-center gap-4 px-4 py-16 rounded-xl">
          <div className="bg-orange text-blueGrayDarker font-bold flex justify-center items-center w-36 aspect-square rounded-full shadow-blackTransparent">
            <span className="text-center text-2xl uppercase">
              Big <br /> Blind
            </span>
          </div>
          <div className="bg-blueGrayDarker flex flex-col justify-center items-center gap-2 w-full px-4 py-1 rounded-xl shadow-blackDark">
            <span>Score at least</span>
            <div className="flex items-center gap-2 m-auto">
              <img src={casinoChip} alt="" className="w-10 invert" />
              <span className="text-red text-6xl">
                {currentRound?.blind?.scoreObjective}
              </span>
            </div>
            <p className="flex justify-center items-start gap-2">
              to earn{" "}
              <span className="text-orange text-lg">
                <span
                  className="animate-dollar-blind delay-[0ms] inline-block"
                  style={{ animationDelay: "0ms" }}
                >
                  $
                </span>
                <span
                  className="animate-dollar-blind delay-[2000ms] inline-block"
                  style={{ animationDelay: "400ms" }}
                >
                  $
                </span>
                <span
                  className="animate-dollar-blind delay-[4000ms] inline-block"
                  style={{ animationDelay: "800ms" }}
                >
                  $
                </span>
                <span
                  className="animate-dollar-blind delay-[6000ms] inline-block"
                  style={{ animationDelay: "1200ms" }}
                >
                  $
                </span>
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-blueGrayDarker flex items-center gap-4 px-4 py-2 rounded-xl shadow-blackDark">
        <span className="text-lg">
          Round <br /> score
        </span>
        <div className="bg-blueGrayDark flex justify-center items-center gap-2 flex-1 p-2 rounded-xl">
          <img src={casinoChip} alt="" className="w-10 invert" />
          <span className="text-5xl">{currentRound?.score}</span>
        </div>
      </div>
      <ForecastPokerHand />
      <div className="flex gap-4">
        <div className="w-1/3 flex flex-col gap-4 py-2">
          <Button bgColor="bg-red" size="small">
            Run
            <br />
            Infos
          </Button>
          <Button bgColor="bg-orange" size="small">Options</Button>
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
            <span className="text-orangeLight text-6xl">
              <span
                className="animate-dollar-blind delay-[0ms] inline-block"
                style={{ animationDelay: "0ms" }}
              >
                $
              </span>
              <span
                className="animate-dollar-blind delay-[0ms] inline-block"
                style={{ animationDelay: "400ms" }}
              >
                2
              </span>
              <span
                className="animate-dollar-blind delay-[0ms] inline-block"
                style={{ animationDelay: "800ms" }}
              >
                2
              </span>
            </span>
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
