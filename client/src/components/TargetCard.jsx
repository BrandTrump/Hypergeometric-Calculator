import { useContext } from "react";
import { deckContext } from "../context/DeckContext";
import styles from "../styles/card-list/CardList.module.css";

const TargetCard = ({ targetCard }) => {
  const { targetCount } = useContext(deckContext);
  return (
    <div className={styles.target_container}>
      <div className={styles.target_card}>
        <h1>Target Card:</h1>
        <p>{targetCard}</p>
      </div>
      <div className={styles.target_card}>
        <h1>Amount:</h1>
        <p>{targetCount}</p>
      </div>
    </div>
  );
};

export default TargetCard;
