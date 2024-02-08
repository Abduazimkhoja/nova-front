import { Map } from "@/components";
import cn from "classnames";
import Link from "next/link";
import { FC } from "react";
import styles from "./contacts-map.module.scss";
import { ContactsMapProps } from "./contacts-map.props";

export const ContactsMap: FC<ContactsMapProps> = (props) => {
  const {
    orient,
    title,
    className,
    // , address, map, phone, mail,
    ...rest
  } = props;

  // Стиль ориентации блока
  const orientStyle = orient === "row" ? styles.cardOrientRow : styles.cardColumn;

  return (
    <div className={cn(styles.card, orientStyle, className)} {...rest}>
      <div className={styles.map}>
        <Map latitude={0} longitude={0} />
      </div>

      <div className={styles.content}>
        <h2 className="color-accent">Центральный офис</h2>
        <div className={styles.info}>
          <p className="text-lg fw-bold">Адрес :</p>
          <p className="text-lg">Istanbul Tower Kat:10 No:48 Uluyol Cad. Bayrampasa, Istanbul / Turkey</p>
          <p className="text-lg fw-bold">Телефон :</p>
          <Link href={`tel:${""}`} className="color-accent text-lg">
            
            +90 212 612 42 43
          </Link>
          <p className="text-lg fw-bold">Электронная почта :</p>
          <Link href={`mailto:${""}`} className="color-accent text-lg">
            info@novaplastik.com
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ContactsMap;