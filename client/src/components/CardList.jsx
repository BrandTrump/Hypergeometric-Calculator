import { useState } from "react";
import styles from "../styles/card-list/CardList.module.css";
import TargetList from "./TargetCard";

const CardList = ({ cardList, deckSize }) => {
  const [targetCard, setTargetCard] = useState();
  const [targetCount, setTargetCount] = useState();

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
    setTargetCard(name);
    setTargetCount(count);
  };

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

      <TargetList targetCard={targetCard} targetCount={targetCount} />
    </div>
  );
};

export default CardList;
