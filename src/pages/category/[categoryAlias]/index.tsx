import { FC } from "react";
import { GetStaticPaths, GetStaticPathsContext, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ParsedUrlQuery } from "querystring";

import { ICategory } from "@/types/category.interface";

import { getAll, getByAlias } from "@/api/category.api";

import { withLayout } from "@/layout/Layout";
import Link from "next/link";

const Category: FC<CategoryProps> = ({ category }) => {
  return (
    <>
      <Head>
        <title>Category</title>
      </Head>

      <div className="container main-margin">
        <div>{category.title}</div>

        {category.subcategories?.length &&
          category.subcategories.map((subcategory) => (
            <div key={subcategory.id}>
              <Link href={`/category/${category.alias}/${subcategory.alias}`}>{subcategory.title}</Link>
            </div>
          ))}
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async ({ locales }: GetStaticPathsContext) => {
  let paths: string[] = [];

  for (let locale of locales as string[]) {
    const {
      data: { data: categories },
    } = await getAll({ limit: 100000000, language: locale });

    paths = paths.concat(categories.map((category) => `/${locale}/category/${category.alias}`));
  }

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps<CategoryProps> = async ({
  locale,
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const alias = params.categoryAlias as string;

  const { data: category } = await getByAlias(alias);

  return {
    props: {
      category,
      ...(await serverSideTranslations(String(locale))),
    },
    revalidate: 300,
  };
};

export default withLayout(Category);

interface CategoryProps extends Record<string, unknown> {
  category: ICategory;
}