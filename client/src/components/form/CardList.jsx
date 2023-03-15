import styles from "../../styles/card-list/CardList.module.css";

const CardList = ({ cardList, deckSize }) => {
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

  return (
    <div className={styles.card_container}>
      <h1 className={styles.deck_size}>Deck Size: {deckSize}</h1>
      {duplicates &&
        duplicates.map((card, id) => {
          return (
            <div className={styles.card_list} key={id}>
              {card.count > 1 ? (
                <p>
                  {card.name} x {card.count}
                </p>
              ) : (
                <p>{card.name}</p>
              )}
            </div>
          );
        })}
    </div>
  );
};

export default CardList;
