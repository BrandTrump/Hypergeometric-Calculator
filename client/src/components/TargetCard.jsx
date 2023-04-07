import styles from "../styles/card-list/CardList.module.css";

const TargetCard = ({ desiredHand, updateMinMax }) => {
  const handleMinChange = (name, value) => {
    const card = desiredHand.find((card) => card.name === name);
    updateMinMax(name, value, Math.max(value, card.max));
  };

  const handleMaxChange = (name, value) => {
    const card = desiredHand.find((card) => card.name === name);
    updateMinMax(name, Math.min(value, card.min), value);
  };
  return (
    <div className={styles.target_container}>
      {desiredHand &&
        desiredHand.map((card, id) => {
          return (
            <>
              <div key={id} className={styles.card_name_container}>
                <div className={styles.target_card}>
                  <h1>Card Name:</h1>
                  <p>{card.name}</p>
                </div>
                <form>
                  <input
                    type="number"
                    min={1}
                    max={3}
                    required
                    onChange={(e) =>
                      handleMinChange(card.name, parseInt(e.target.value))
                    }
                    placeholder={"min"}
                  />

                  <input
                    type="number"
                    min={1}
                    max={3}
                    required
                    onChange={(e) =>
                      handleMaxChange(card.name, parseInt(e.target.value))
                    }
                    placeholder={"max"}
                  />
                </form>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default TargetCard;
