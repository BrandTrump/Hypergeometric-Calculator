import styles from "../styles/form/InputForm.module.css";
import { useState } from "react";
import CardList from "./CardList";

const DeckUpload = () => {
  const [deckSize, setDeckSize] = useState(0);
  const [cardList, setCardList] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function fetchCardData(cardIds) {
    setIsLoading(true);
    const promises = cardIds.map((cardId) =>
      fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?id=${cardId}`)
        .then((response) => response.json())
        .then((card) => ({
          id: cardId,
          name: card.data[0].name,
        }))
    );
    return Promise.all(promises).finally(() => setIsLoading(false));
  }

  function handleFileRead(event) {
    const content = event.target.result;
    const mainDeck = parseYDK(content);
    fetchCardData(mainDeck)
      .then((cardData) => {
        setCardList(cardData);
        setDeckSize(cardData.length); // Display the card data
      })
      .catch((error) => {
        console.error(error); // Log any errors
      });
  }

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = handleFileRead;
    reader.readAsText(file);
  };

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
    <>
      <div className={styles.file_upload}>
        <div className={styles.file_input}>
          <label>Deck File:</label>
          <input type="file" accept=".ydk" onChange={handleFileInputChange} />
        </div>
        {isLoading && <div className={styles.sp_circle}></div>}
      </div>

      {deckSize === 0 ? (
        <></>
      ) : (
        <CardList cardList={cardList} deckSize={deckSize} loading={isLoading} />
      )}
    </>
  );
};

export default DeckUpload;
