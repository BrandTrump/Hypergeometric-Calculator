import { useState } from "react";
import styles from "../../styles/card-list/CardList.module.css";
import TargetList from "../TargetList";

const CardList = ({ cardList, deckSize }) => {
  const [targetList, setTargetList] = useState("");

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

  const handleTargetCard = (e) => {
    setTargetList(e.target.value);
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
                      value={card.name}
                      onClick={(e) => handleTargetCard(e, "value")}
                    >
                      {card.name} x {card.count}
                    </button>
                  </div>
                ) : (
                  <div className={styles.card_buttons}>
                    <button
                      value={card.name}
                      onClick={(e) => handleTargetCard(e, "value")}
                    >
                      {card.name}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
      </div>

      <TargetList targetList={targetList} />
    </div>
  );
};

export default CardList;
