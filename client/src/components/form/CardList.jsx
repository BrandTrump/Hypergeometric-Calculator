import styles from "../../styles/card-list/CardList.module.css";

const CardList = ({ cardList, deckSize }) => {
  return (
    <div className={styles.card_container}>
      <h1 className={styles.deck_size}>Deck Size: {deckSize}</h1>
      {cardList &&
        cardList.map((card) => {
          return (
            <div className={styles.card_list} key={card.id}>
              <p>{card.name}</p>
            </div>
          );
        })}
    </div>
  );
};

export default CardList;
