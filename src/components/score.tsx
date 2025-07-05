import { useContext, useEffect } from "react";
import { GameContext } from "../context/gameContext";
import styles from "../assets/styles/components/score.module.scss";
import ScoreCard from "./scoreCard";

const Score = ({ setSeconds, seconds }) => {
  const { state } = useContext(GameContext);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secs).padStart(
      2,
      "0"
    )}`;
  };
  return (
    <div className={styles.container}>
      {state.players === 1 ? (
        <>
          <ScoreCard name={"Time"} value={formatTime(seconds)} />
          <ScoreCard name={"Moves"} value={state.moves} />
        </>
      ) : (
        <>
          {Array.from({ length: state.players }, (_, index) => (
            <ScoreCard
              key={index}
              name={`Player ${index + 1}`}
              value={state.scores[index + 1]}
              selected={state.currentPlayer === index + 1}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default Score;
