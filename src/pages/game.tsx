import { useContext, useState, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import { Navigate } from "react-router-dom";
import TopBar from "../components/topBar";
import styles from "../assets/styles/pages/game.module.scss";
import Score from "../components/score";
import GameCanvas from "../components/gameCanvas";

const Game = () => {
  const { state } = useContext(GameContext);
  const [seconds, setSeconds] = useState(0);
  const [finalTime, setFinalTime] = useState(0);
  const [ended, setEnded] = useState(false);
  useEffect(() => {
    if (state.matchedCards.length === state.gridSize * state.gridSize) {
      setFinalTime(seconds);
      setEnded(true);
    }
  }, [state.matchedCards]);

  if (!state.playing) {
    return <Navigate to="/start" replace />;
  }

  return (
    <div className={styles.container}>
      <TopBar setSeconds={setSeconds} />
      <GameCanvas />

      {ended ? (
        <div className={styles.popup}>
          <div>done {finalTime}</div>
        </div>
      ) : (
        <Score setSeconds={setSeconds} seconds={seconds} />
      )}
    </div>
  );
};

export default Game;
