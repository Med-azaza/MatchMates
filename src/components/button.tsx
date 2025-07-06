import styles from "../assets/styles/components/button.module.scss";

const Button = ({ children, size, type, selected = false, onClick }) => {
  return (
    <button
      className={`${styles.button} ${
        size === "big"
          ? styles.big
          : size === "medium"
          ? styles.medium
          : styles.small
      } ${type === "primary" ? styles.primary : styles.secondary} 
      ${selected ? styles.selected : ""}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
