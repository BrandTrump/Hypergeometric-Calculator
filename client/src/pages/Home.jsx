import DeckUpload from "../components/DeckUpload";
import InputForm from "../components/form/InputForm";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import { deckContext } from "../context/DeckContext";

const Home = () => {
  const [deckSize, setDeckSize] = useState(0);
  const [targetCount, setTargetCount] = useState(0);
  const [desiredHand, setDesiredHand] = useState([]);

  return (
    <div className={styles.form_container}>
      <div className={styles.content}>
        <deckContext.Provider
          value={{
            deckSize,
            setDeckSize,
            targetCount,
            setTargetCount,
            desiredHand,
            setDesiredHand,
          }}
        >
          <DeckUpload />
          {deckSize > 0 ? <InputForm /> : <></>}
        </deckContext.Provider>
      </div>
    </div>
  );
};

export default Home;
