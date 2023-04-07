import { useContext, useState } from "react";
import { deckContext } from "../context/DeckContext";
import styles from "../styles/card-list/CardList.module.css";
import TargetCard from "./TargetCard";

const CardList = ({ cardList }) => {
  const [targetCards, setTargetCards] = useState([]);
  const { deckSize, setTargetCount } = useContext(deckContext);

  const nameCount = cardList.reduce((acc, obj) => {
    if (acc[obj.name]) {
      acc[obj.name]++;
    } else {
      acc[obj.name] = 1;
    }

    return acc;
  }, {});

  const duplicates = Object.entries(nameCount).map(([name, count]) => {
    return { name, count };
  });

  const handleTargetCard = (name, count) => {
    const cardIndex = targetCards.findIndex((card) => card.name === name);

    if (cardIndex === -1) {
      // If the card doesn't exist, add it to the array
      setTargetCards([...targetCards, { name: name, count: count }]);
    } else {
      // If the card exists, remove it from the array
      setTargetCards(targetCards.filter((card) => card.name !== name));
    }
    setTargetCount(count);
  };

  const updateMinMax = (name, min, max) => {
    setTargetCards(
      targetCards.map((card) =>
        card.name === name ? { ...card, min, max } : card
      )
    );
  };

  console.log(targetCards);

  return (
    <div className={styles.card_container}>
      <div>
        <h1 className={styles.deck_size}>Deck Size: {deckSize}</h1>
        {duplicates &&
          duplicates.map((card, id) => {
            return (
              <div className={styles.card_list} key={id}>
                {card.count > 1 ? (
                  <div className={styles.card_buttons}>
                    <button
                      onClick={() => handleTargetCard(card.name, card.count)}
                    >
                      {card.name} x {card.count}
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

      <TargetCard targetCards={targetCards} updateMinMax={updateMinMax} />
    </div>
  );
};

export default CardList;
