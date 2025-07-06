import { useContext } from "react";
import styles from "../assets/styles/components/topBar.module.scss";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/gameContext";

const TopBar = ({ setSeconds }) => {
  const navigate = useNavigate();
  const { dispatch } = useContext(GameContext);

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="./logo-brand.png" alt="logo" height={50} width={50} />
        <h1>MatchMates</h1>
      </div>
      <div className={styles.buttons}>
        <Button
          size={"small"}
          type={"primary"}
          onClick={() => {
            setSeconds(0);
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
          New Game
        </Button>
      </div>
    </div>
  );
};

export default TopBar;
