import "./globals.css";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import { GetCategoriesResponse } from "../schema";
import Head from "next/head";
import Layout from "../Layout";
import React from "react";
import { getCategories } from "../api";
import { lang } from "../langs";

/**
 * Custom App component
 * @param Props - Properties.
 * @param Props.Component - Page component.
 * @param Props.pageProps - Page properties.
 * @param Props.categories - Categories.
 * @returns Application component.
 */
function CustomApp({ Component, categories, pageProps }: CustomAppProps) {
  return (
    <>
      <Head>
        <title>{lang.app.title}</title>
        <meta content={lang.app.description} name="description" />
      </Head>
      <Layout categories={categories}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<CustomAppInitialProps> => {
  const [categories, props] = await Promise.all([
    getCategories(),
    App.getInitialProps(context)
  ]);

  return { ...props, categories };
};

export default CustomApp;

export interface CustomAppInitialProps extends AppInitialProps {
  readonly categories: GetCategoriesResponse;
}

export interface CustomAppProps extends AppProps {
  readonly categories: GetCategoriesResponse;
}
