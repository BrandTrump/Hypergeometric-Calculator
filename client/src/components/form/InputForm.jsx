import styles from "../../styles/form/InputForm.module.css";
import { useEffect, useState } from "react";

const InputForm = () => {
  // const [targetCards, setTargetCards] = useState([]);
  // const [targetCounts, setTargetCounts] = useState([]);
  // const [handSize, setHandSize] = useState(0);
  // const [drawSize, setDrawSize] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  function fetchCardData(cardIds) {
    const promises = cardIds.map((cardId) =>
      fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`)
        .then((response) => response.json())
        .then((card) => ({
          id: cardId,
          name: card.data[0].name,
        }))
    );
    return Promise.all(promises);
  }

  function handleFileRead(event) {
    const content = event.target.result;
    const mainDeck = parseYDK(content);
    fetchCardData(mainDeck)
      .then((cardData) => {
        console.log(cardData); // Display the card data
      })
      .catch((error) => {
        console.error(error); // Log any errors
      });
  }

  function handleFileInputChange(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  }

  function handleFileRead(event) {
    const content = event.target.result;
    const deckList = parseYDK(content);
    fetchCardData(deckList)
      .then((cardData) => {
        console.log(cardData);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function parseYDK(content) {
    const lines = content.split("\n");
    const mainDeck = [];
    let isExtraDeck = false;
    let isSideDeck = false;
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line === "#extra") {
        isExtraDeck = true;
        isSideDeck = false;
      } else if (line === "!side") {
        isExtraDeck = false;
        isSideDeck = true;
      } else if (line.length > 0 && !line.startsWith("#")) {
        const cardId = parseInt(line);
        if (!isNaN(cardId) && !isExtraDeck && !isSideDeck) {
          mainDeck.push(cardId);
        }
      }
    }
    return mainDeck;
  }

  return (
    <div className={styles.form_container}>
      <form className={styles.input_form} onSubmit={handleSubmit}>
        <label>Deck File:</label>
        <input type="file" accept=".ydk" onChange={handleFileInputChange} />

        {/* <label>Target Cards:</label>
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
        /> */}

        <button id="calculate">Calculate</button>
      </form>
    </div>
  );
};

export default InputForm;
