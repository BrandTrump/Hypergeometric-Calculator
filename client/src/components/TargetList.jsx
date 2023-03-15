import styles from "../styles/card-list/CardList.module.css";

const TargetList = ({ targetList }) => {
  return (
    <div className={styles.target_card}>
      <h1>Target Card:</h1>
      <p>{targetList}</p>
    </div>
  );
};

export default TargetList;
