import { useContext } from "react";
import { deckContext } from "../context/DeckContext";
import styles from "../styles/card-list/CardList.module.css";
import TargetCard from "./TargetCard";

const CardList = ({ cardList }) => {
  const { desiredHand, setDesiredHand } = useContext(deckContext);
  const { deckSize, setTargetCount } = useContext(deckContext);

  const nameCount = cardList.reduce((acc, obj) => {
    if (acc[obj.name]) {
      acc[obj.name]++;
    } else {
      acc[obj.name] = 1;
    }

    return acc;
  }, {});

  const duplicates = Object.entries(nameCount).map(([name, amountInDeck]) => {
    return { name, amountInDeck };
  });

  const handleTargetCard = (name, amountInDeck) => {
    const cardIndex = desiredHand.findIndex((card) => card.name === name);

    if (cardIndex === -1) {
      // If the card doesn't exist, add it to the array
      setDesiredHand([
        ...desiredHand,
        { name: name, amountInDeck: amountInDeck, min: 1, max: 3 },
      ]);
    } else {
      // If the card exists, remove it from the array
      setDesiredHand(desiredHand.filter((card) => card.name !== name));
    }
    setTargetCount(amountInDeck);
  };

  const updateMinMax = (name, min, max) => {
    setDesiredHand(
      desiredHand.map((card) =>
        card.name === name ? { ...card, min, max } : card
      )
    );
  };

  return (
    <div className={styles.card_container}>
      <div>
        <h1 className={styles.deck_size}>Deck Size: {deckSize}</h1>
        {duplicates &&
          duplicates.map((card, id) => {
            return (
              <div className={styles.card_list} key={id}>
                {card.amountInDeck > 1 ? (
                  <div className={styles.card_buttons}>
                    <button
                      onClick={() =>
                        handleTargetCard(card.name, card.amountInDeck)
                      }
                    >
                      {card.name} x {card.amountInDeck}
                    </button>
                  </div>
                ) : (
                  <div className={styles.card_buttons}>
                    <button
                      onClick={() => handleTargetCard(card.name, card.count)}
                    >
                      {card.name}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <TargetCard desiredHand={desiredHand} updateMinMax={updateMinMax} />
    </div>
  );
};

export default CardList;
