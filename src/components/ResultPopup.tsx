import { useContext } from "react";
import styles from "../assets/styles/components/resultPopup.module.scss";
import { GameContext } from "../context/gameContext";
import Button from "./button";
import { useNavigate } from "react-router-dom";

type Props = {
  time: number;
  setSeconds: React.Dispatch<React.SetStateAction<number>>;
  setEnded: React.Dispatch<React.SetStateAction<boolean>>;
};

const ResultPopup = ({ time, setSeconds, setEnded }: Props) => {
  const { state, dispatch } = useContext(GameContext);
  const navigate = useNavigate();

  const sortedPlayers = Array.from({ length: state.players }, (_, i) => ({
    playerId: i + 1,
    score: state.scores[i + 1] || 0,
  })).sort((a, b) => b.score - a.score);

  const highestScore = sortedPlayers[0]?.score || 0;
  const winners = sortedPlayers.filter(
    (player) => player.score === highestScore
  );
  const isTie = winners.length > 1;

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
      <div>
        {state.players === 1 ? (
          <>
            <p className={styles.title}>You did it!</p>
            <p className={styles.subtitle}>Game over! Here’s how you got on…</p>
            <div className={styles.card}>
              <span>Time Elapsed</span>
              <span>{formatTime(time)}</span>
            </div>
            <div className={styles.card}>
              <span>Moves Taken</span>
              <span>{state.moves} Moves</span>
            </div>
            <div className={styles.buttons}>
              <Button
                size="small"
                type={"primary"}
                onClick={() => {
                  setSeconds(0);
                  setEnded(false);
                  dispatch({ type: "RESTART_GAME" });
                }}
              >
                Restart
              </Button>
              <Button
                size={"small"}
                type={"secondary"}
                onClick={() => {
                  dispatch({ type: "RESTART_GAME" });
                  navigate("/start");
                }}
              >
                Setup New Game
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className={styles.title}>
              {isTie ? "It’s a tie!" : `Player ${winners[0].playerId} Wins!`}
            </p>
            <p className={styles.subtitle}>Game over! Here are the results…</p>
            {sortedPlayers.map((player) => {
              const isWinner = player.score === highestScore;

              return (
                <div
                  className={`${styles.card} ${isWinner && styles.winner}`}
                  key={player.playerId}
                >
                  <span>
                    Player {player.playerId}
                    {isWinner ? " (Winner!)" : ""}
                  </span>
                  <span>
                    {player.score} Pair{player.score !== 1 ? "s" : ""}
                  </span>
                </div>
              );
            })}
            <div className={styles.buttons}>
              <Button
                size="small"
                type={"primary"}
                onClick={() => {
                  setSeconds(0);
                  setEnded(false);
                  dispatch({ type: "RESTART_GAME" });
                }}
              >
                Restart
              </Button>
              <Button
                size={"small"}
                type={"secondary"}
                onClick={() => {
                  dispatch({ type: "RESTART_GAME" });
                  navigate("/start");
                }}
              >
                Setup New Game
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ResultPopup;
