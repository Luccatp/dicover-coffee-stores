import styles from "../styles/components/Banner.module.css";

interface IBanner {
  buttonText: string;
  handleClick: () => void;
}

const Banner = ({ buttonText, handleClick }: IBanner) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <span className={styles.title1}>Carrosel</span>{" "}
        <span className={styles.title2}>De Cafés</span>
      </h1>
      <p className={styles.subTitle}>Descubra cafeterias proximas!</p>
      <div className={styles.buttonWrapper}>
        <button className={styles.button} onClick={handleClick}>
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Banner;
