import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GameContext } from "../context/gameContext";
import styles from "../assets/styles/components/gameSettings.module.scss";
import Button from "./button";

const GameSettings = () => {
  const { state, dispatch } = useContext(GameContext);
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h3>Select Theme</h3>
      <div className={styles.buttonsContainer}>
        <Button
          selected={state.theme === "numbers"}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_THEME", payload: "numbers" })}
        >
          Numbers
        </Button>
        <Button
          selected={state.theme === "icons"}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_THEME", payload: "icons" })}
        >
          Icons
        </Button>
      </div>
      <h3>Number of Players</h3>
      <div className={styles.buttonsContainer}>
        <Button
          selected={state.players === 1}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_PLAYERS", payload: 1 })}
        >
          1
        </Button>
        <Button
          selected={state.players === 2}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_PLAYERS", payload: 2 })}
        >
          2
        </Button>
        <Button
          selected={state.players === 3}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_PLAYERS", payload: 3 })}
        >
          3
        </Button>
        <Button
          selected={state.players === 4}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_PLAYERS", payload: 4 })}
        >
          4
        </Button>
      </div>
      <h3>grid Size</h3>
      <div className={styles.buttonsContainer}>
        <Button
          selected={state.gridSize === 4}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_GRID_SIZE", payload: 4 })}
        >
          4x4
        </Button>
        <Button
          selected={state.gridSize === 6}
          size={"medium"}
          type={"secondary"}
          onClick={() => dispatch({ type: "SET_GRID_SIZE", payload: 6 })}
        >
          6x6
        </Button>
      </div>
      <Button
        size={"big"}
        type={"primary"}
        onClick={() => {
          dispatch({ type: "START_GAME" });
          navigate("/game");
        }}
      >
        Start Game
      </Button>
    </div>
  );
};

export default GameSettings;
