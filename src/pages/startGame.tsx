import GameSettings from "../components/gameSettings";
import styles from "../assets/styles/pages/startGame.module.scss";

const StartGame = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="./logo-brand.png" alt="logo" height={50} width={50} />
        <h1>MatchMates</h1>
      </div>
      <GameSettings />
    </div>
  );
};

export default StartGame;
