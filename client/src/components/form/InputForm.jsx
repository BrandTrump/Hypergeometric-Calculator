import styles from "../../styles/form/InputForm.module.css";
import { useState } from "react";

const InputForm = () => {
  const [handSize, setHandSize] = useState(0);
  const [minimum, setMin] = useState(0);
  const [maximum, setMax] = useState(0);

  const handleSubmit = (e, handSize, minimum, maximum) => {
    e.preventDefault();
    function hypergeometricCalculator(
      numOfTargetCardInDeck,
      handSize,
      minimum,
      maximum,
      totalDeckSize
    ) {
      let prob = 0;
      const min = Math.min(minimum, numOfTargetCardInDeck);
      const max = Math.min(maximum, numOfTargetCardInDeck);
      for (let i = minimum; i <= max; i++) {
        prob +=
          (binomialCoefficient(numOfTargetCardInDeck, i) *
            binomialCoefficient(
              totalDeckSize - numOfTargetCardInDeck,
              handSize - i
            )) /
          binomialCoefficient(totalDeckSize, handSize);
      }
      return prob;
    }
    function binomialCoefficient(handSize, numOfTargetCardInDeck) {
      if (numOfTargetCardInDeck > handSize) {
        return 0;
      }
      let result = 1;
      for (let i = 1; i <= numOfTargetCardInDeck; i++) {
        result *= (handSize - numOfTargetCardInDeck + i) / i;
      }
      return result;
    }

    console.log(hypergeometricCalculator(17, handSize, minimum, maximum, 40));
  };

  return (
    <>
      <form
        className={styles.input_form}
        onSubmit={(e) => handleSubmit(e, handSize, minimum, maximum)}
      >
        <label>Hand Size:</label>
        <input
          type="number"
          id="handSize"
          min="1"
          required
          onChange={(e) => setHandSize(e.target.value)}
          value={handSize}
        />
        <label>Min:</label>
        <input
          type="number"
          id="handSize"
          min="1"
          required
          onChange={(e) => setMin(e.target.value)}
          value={minimum}
        />
        <label>Max:</label>
        <input
          type="number"
          id="handSize"
          min="1"
          required
          onChange={(e) => setMax(e.target.value)}
          value={maximum}
        />

        <button id="calculate">Calculate</button>
      </form>
    </>
  );
};

export default InputForm;
