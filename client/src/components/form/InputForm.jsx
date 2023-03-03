import styles from "../../styles/form/InputForm.module.css";
import { useState } from "react";

const InputForm = () => {
  const [targetCards, setTargetCards] = useState([]);
  const [targetCounts, setTargetCounts] = useState([]);
  const [handSize, setHandSize] = useState(0);
  const [drawSize, setDrawSize] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className={styles.form_container}>
      <form className={styles.input_form} onSubmit={handleSubmit}>
        <label>Deck File:</label>
        <input type="file" id="filename" accept=".txt" />

        <label>Target Cards:</label>
        <input
          type="text"
          id="targetCards"
          required
          onChange={(e) => setTargetCards([e.target.value])}
          value={targetCards}
        />

        <label>Target Counts:</label>
        <input
          type="text"
          id="targetCounts"
          required
          onChange={(e) => setTargetCounts([e.target.value])}
          value={targetCounts}
        />

        <label>Hand Size:</label>
        <input
          type="number"
          id="handSize"
          min="1"
          required
          onChange={(e) => setHandSize(e.target.value)}
          value={handSize}
        />

        <label>Draw Size:</label>
        <input
          type="number"
          id="drawSize"
          min="1"
          required
          onChange={(e) => setDrawSize(e.target.value)}
          value={drawSize}
        />

        <button id="calculate">Calculate</button>
      </form>
    </div>
  );
};

export default InputForm;
