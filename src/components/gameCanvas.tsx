import styles from "../assets/styles/components/gameCanvas.module.scss";
import { useContext, useState, useRef } from "react";
import { GameContext } from "../context/gameContext";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";

const GameCanvas = () => {
  const { state, dispatch } = useContext(GameContext);
  const [disabled, setDisabled] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const flipCard = (card: { id: string; value: number }) => () => {
    if (!disabled) {
      if (
        !state.selectedCards.includes(card) &&
        !state.matchedCards.includes(card)
      ) {
        if (state.selectedCards.length > 0) {
          setDisabled(true);
          timeoutRef.current = window.setTimeout(() => {
            dispatch({ type: "CLEAR_SELECTED_CARDS" });
            dispatch({ type: "NEXT_PLAYER" });
            setDisabled(false);
          }, 500);
        }
        dispatch({ type: "FLIP_CARD", payload: card });
      }
    } else {
      if (
        !state.selectedCards.includes(card) &&
        !state.matchedCards.includes(card)
      ) {
        clearTimeout(timeoutRef.current);
        setDisabled(false);
        dispatch({ type: "CLEAR_SELECTED_CARDS" });
        dispatch({ type: "NEXT_PLAYER" });
        dispatch({ type: "FLIP_CARD", payload: card });
      }
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.grid} ${
          state.gridSize === 4 ? styles.four : styles.six
        }`}
      >
        {state.cards.map((card: { id: string; value: number }) => (
          <div
            onClick={flipCard(card)}
            key={uuidv4()}
            className={`${styles.card} ${
              state.selectedCards.includes(card) ? styles.selected : ""
            } ${state.matchedCards.includes(card) ? styles.matched : ""}`}
          >
            <span>
              {state.theme === "numbers" ? (
                card.value
              ) : (
                <FontAwesomeIcon icon={["fas", card.value as IconName]} />
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GameCanvas;
