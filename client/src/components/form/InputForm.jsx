import styles from "../../styles/form/InputForm.module.css";
import { useContext, useState } from "react";
import { deckContext } from "../../context/DeckContext";
import CalculationDisplay from "../CalculationDisplay";

const InputForm = () => {
  const { deckSize, desiredHand } = useContext(deckContext);
  const [handSize, setHandSize] = useState(0);
  const [calculation, setCalculation] = useState(0);

  const handleSubmit = (e, desiredHand, handSize, deckSize) => {
    e.preventDefault();

    function hypergeometricCalculator(desiredHand, handSize, deckSize) {
      let cardIndex = 0;
      if (cardIndex >= desiredHand.length) {
        return 1;
      }

      const { min, max, amountInDeck } = desiredHand[cardIndex];
      console.log(desiredHand[0]);
      let probability = 0;

      for (let i = min; i <= max; i++) {
        if (i <= handSize) {
          const numWays =
            nCr(amountInDeck, i) * nCr(deckSize - amountInDeck, handSize - i);
          const numHands = nCr(deckSize, handSize);
          const conditionalProbability = numWays / numHands;

          const remainingHandSize = handSize - i;
          const remainingDeckSize = deckSize - amountInDeck;

          probability +=
            conditionalProbability *
            hypergeometricCalculator(
              remainingHandSize,
              remainingDeckSize,
              desiredHand,
              cardIndex + 1
            );
        }
      }

      return probability;
    }

    // Helper function to calculate combinations
    function nCr(n, r) {
      if (n < r) {
        return 0;
      }
      let num = 1;
      for (let i = n; i > n - r; i--) {
        num *= i;
      }
      let den = 1;
      for (let i = r; i > 1; i--) {
        den *= i;
      }
      return num / den;
    }

    setCalculation(
      (hypergeometricCalculator(desiredHand, handSize, deckSize) * 100).toFixed(
        2
      )
    );
  };

  return (
    <>
      <form
        className={styles.input_form}
        onSubmit={(e) => handleSubmit(e, desiredHand, handSize, deckSize)}
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

        <button id="calculate">Calculate</button>
      </form>

      <CalculationDisplay calculation={calculation} />
    </>
  );
};

export default InputForm;
