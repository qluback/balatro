import "./App.scss";
import useGameStore from "./stores/GameStore";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";

function App() {
  const game = useGameStore((state) => state.game);

  return (
    <div className="flex w-full">
      <div id="linear-overlay"></div>
      {game === null ? <MainMenu /> : <Game />}
    </div>
  );
}

export default App;