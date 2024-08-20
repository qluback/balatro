import "./App.css";
import useGameStore from "./stores/GameStore";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";

function App() {
  const game = useGameStore((state) => state.game);

  return (
    <div className="App flex w-full px-8">
      {game === null ? <MainMenu /> : <Game />}
    </div>
  );
}

export default App;
