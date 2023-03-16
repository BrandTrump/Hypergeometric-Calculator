import styles from "../styles/CalculationDisplay.module.css";

const CalculationDisplay = ({ calculation }) => {
  return (
    <div>
      <div className={styles.calculation_container}>
        <h2>Calculation:</h2>
        <p>You have a {calculation}% chance to open this hand.</p>
      </div>
    </div>
  );
};

export default CalculationDisplay;
