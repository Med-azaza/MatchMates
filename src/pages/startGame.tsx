import GameSettings from "../components/gameSettings";
import styles from "../assets/styles/pages/startGame.module.scss";

const StartGame = () => {
  return (
    <div className={styles.container}>
      <h1>MatchMates</h1>
      <GameSettings />
    </div>
  );
};

export default StartGame;
