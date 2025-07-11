import styles from "../assets/styles/components/scoreCard.module.scss";

const ScoreCard = ({ name, value, selected = false }) => {
  return (
    <div className={`${styles.container} ${selected ? styles.selected : ""}`}>
      {name === "Time" || name === "Moves" ? (
        <>
          <span>{name}</span>
          <span>{name}</span>
        </>
      ) : (
        <>
          <span>{`Player ${name}`}</span>
          <span>{`P${name}`}</span>
        </>
      )}

      <span>{value}</span>
      {selected && (
        <>
          <div className={styles.triangle}></div>
          <div className={styles.label}>CURRENT TURN</div>
        </>
      )}
    </div>
  );
};

export default ScoreCard;
