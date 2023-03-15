import DeckUpload from "../components/DeckUpload";
import InputForm from "../components/form/InputForm";
import styles from "../styles/Home.module.css";

const Home = () => {
  return (
    <div className={styles.form_container}>
      <div className={styles.content}>
        <DeckUpload />
        <InputForm />
      </div>
    </div>
  );
};

export default Home;
