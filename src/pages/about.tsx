import { FC } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import { IAbout } from "@/types/about.interface";

import { getAll } from "@/api/about.api";

import { withLayout } from "@/layout/layout";

import { AboutView } from "@/views";

const AboutPage: FC<AboutPageProps> = ({ abouts }) => {
  return (
    <div>
      <Head>
        <title>About</title>
      </Head>

      <AboutView />
    </div>
  );
};

export const getStaticProps: GetStaticProps<AboutPageProps> = async ({ locale }) => {
  try {
    const {
      data: { data: abouts },
    } = await getAll({ language: locale });

    return {
      props: {
        abouts,
        ...(await serverSideTranslations(String(locale))),
      },
      revalidate: 10,
    };
  } catch {
    return {
      notFound: true,
    };
  }
};

export default withLayout(AboutPage);

export interface AboutPageProps extends Record<string, unknown> {
  abouts: IAbout[];
}
