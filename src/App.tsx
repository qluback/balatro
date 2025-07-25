import "./App.scss";
import useGameStore from "./stores/GameStore";
import MainMenu from "./components/MainMenu";
import Game from "./components/Game";
import Balatro from "./components/Balatro";
import { useEffect, useRef, useState } from "react";
import iconVolumeMute from "./assets/mute.png";
import iconVolumeUp from "./assets/volume.png";

function App() {
  const game = useGameStore((state) => state.game);
  const [showTransition, setShowTransition] = useState(false);
  const [gameVisible, setGameVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(1); // Default to full volume

  const handleStartGame = () => {
    setShowTransition(true);

    setTimeout(() => {
      setGameVisible(true);
    }, 1000); // Duration matches CSS animation
    // Wait for animation to complete before showing the Game
    setTimeout(() => {
      setShowTransition(false);
    }, 2000); // Duration matches CSS animation
  };
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleUnmute = () => {
    const audio = audioRef.current;
    if (audio) {
      const newMuteState = !audio.muted;
      audio.muted = newMuteState;
      audio.volume = volume;
      console.log(audio.muted, audio.volume);
      audio
        .play()
        .then()
        .catch((err) => {
          console.warn("Playback failed:", err);
        });
      setIsMuted(newMuteState); // Only set this here!
    }
  };

  return (
    // <div className="flex w-full">
    //   {game === null ? <MainMenu /> : <Game />}
    // </div>
    <div className="app-root">
      {showTransition && <div className="screen-transition" />}

      {!gameVisible && <MainMenu onStart={handleStartGame} />}

      {(game || gameVisible) && <Game />}

      <div className="fixed top-8 right-8 flex flex-col justify-center volume-container">
        <audio autoPlay muted className="absolute top-0 left-0" ref={audioRef}>
          <source src="./balatro.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <button onClick={handleUnmute} className="flex m-auto">
          <img src={isMuted ? iconVolumeMute : iconVolumeUp} alt="" />
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => {
            const newVolume = parseFloat(e.target.value);
            setVolume(newVolume);
            audioRef?.current
              ?.play()
              .then()
              .catch((err) => {
                console.warn("Playback failed:", err);
              });
            if (audioRef.current) {
              audioRef.current.volume = newVolume;
              if (newVolume === 0) {
                audioRef.current.muted = true;
                setIsMuted(true);
              } else {
                audioRef.current.muted = false;
                setIsMuted(false);
              }
            }
          }}
          className="volume-slider"
        />
      </div>
    </div>
  );
}

export default App;
