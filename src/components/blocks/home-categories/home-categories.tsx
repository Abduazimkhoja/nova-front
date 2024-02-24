import { FC } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import cn from "classnames";

import { HomeCategoriesProps } from "./home-categories.props";

import { CategoryCard, Button } from "@/components";

import styles from "./home-categories.module.scss";

export const HomeCategories: FC<HomeCategoriesProps> = ({ className, categories, ...props }) => {
  const { t } = useTranslation();

  return (
    <div className={cn(styles.wrapper, className)} {...props}>
      <h2>{t("products")}</h2>

      <ul className={cn(styles.list)}>
        {categories.length &&
          categories.map((category) => (
            <li className={cn(styles.item)} key={category.id}>
              <CategoryCard category={category} />
            </li>
          ))}
      </ul>

      <div className={cn(styles.button)}>
        <Link href="/category">
          <Button>{t("show-more")}</Button>
        </Link>
      </div>
    </div>
  );
};

export default HomeCategories;