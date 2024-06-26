import { FC } from "react";

import { IconWhatsApp } from "@/assets/icons";

import styles from "./fixed-icon.module.scss";
import Link from "next/link";

export const FixedIcon: FC<{ url?: string }> = ({ url = "https://api.whatsapp.com/send?phone=998933883042" }) => {
  return (
    <div className={styles.wrapper}>
      <Link href={url} target="_blank" title="WhatsApp" className={styles.icon}>
        <IconWhatsApp />
      </Link>
    </div>
  );
};

export default FixedIcon;
