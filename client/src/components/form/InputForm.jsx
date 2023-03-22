import styles from "../../styles/form/InputForm.module.css";
import { useContext, useState } from "react";
import { deckContext } from "../../context/DeckContext";
import CalculationDisplay from "../CalculationDisplay";

const InputForm = () => {
  const { deckSize, targetCount } = useContext(deckContext);
  const [handSize, setHandSize] = useState(0);
  const [minimum, setMin] = useState(0);
  const [maximum, setMax] = useState(0);
  const [calculation, setCalculation] = useState(0);

  const handleSubmit = (
    e,
    targetCount,
    handSize,
    minimum,
    maximum,
    deckSize
  ) => {
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

    setCalculation(
      (
        hypergeometricCalculator(
          targetCount,
          handSize,
          minimum,
          maximum,
          deckSize
        ) * 100
      ).toFixed(2)
    );
  };

  return (
    <>
      <form
        className={styles.input_form}
        onSubmit={(e) =>
          handleSubmit(e, targetCount, handSize, minimum, maximum, deckSize)
        }
      >
        <label>Hand Size:</label>
        <input
          type="number"
          min={1}
          max={10}
          required
          onChange={(e) => setHandSize(e.target.value)}
          placeholder={5}
        />

        <div className={styles.error_message}>
          Hand size must be between 1 and 10
        </div>
        <label>Min:</label>
        <input
          type="number"
          min="1"
          max={maximum}
          required
          onChange={(e) => setMin(e.target.value)}
          placeholder={1}
        />

        <div className={styles.error_message}>
          Minimum must not be greater than your maximum {maximum}
        </div>
        <label>Max:</label>
        <input
          type="number"
          min="1"
          max={targetCount}
          required
          onChange={(e) => setMax(e.target.value)}
          placeholder={targetCount}
        />
        <div className={styles.error_message}>
          Maximum must not be greater than your target card amount {targetCount}
        </div>

        <button id="calculate">Calculate</button>
      </form>

      <CalculationDisplay calculation={calculation} />
    </>
  );
};

export default InputForm;
