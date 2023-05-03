import Image from "next/image";
import Link from "next/link";
import cls from "classnames";
import styles from "../styles/components/Card.module.css";

interface ICard {
  name: string;
  imgUrl: string;
  href: string;
}

const Card = ({ name, imgUrl, href }: ICard) => {
  return (
    <Link href={href} legacyBehavior>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{name}</h2>
          </div>
          <div className={styles.cardImageWrapper}>
            <Image
              className={styles.cardImage}
              src={imgUrl}
              alt={"Card Image"}
              width={260}
              height={160}
            />
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
