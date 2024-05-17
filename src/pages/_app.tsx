import "./globals.css";
import { ExistingCategory, MultipleDocsResponse } from "../schema";
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import Head from "next/head";
import { JwtUserProvider } from "../contexts";
import Layout from "../Layout";
import React from "react";
import { lang } from "../langs";
import { serverAPI } from "../api";
import { useLoadingCursor } from "../effects";

/**
 * Custom App component
 * @param Props - Properties.
 * @param Props.Component - Page component.
 * @param Props.pageProps - Page properties.
 * @param Props.categories - Categories.
 * @returns Application component.
 */
function CustomApp({
  Component,
  categories,
  pageProps
}: CustomAppProps): React.ReactElement {
  useLoadingCursor();

  return (
    <>
      <Head>
        <title>{lang.app.title}</title>
        <meta content={lang.app.description} name="description" />
      </Head>
      <JwtUserProvider>
        <Layout categories={categories}>
          <Component {...pageProps} />
        </Layout>
      </JwtUserProvider>
    </>
  );
}

CustomApp.getInitialProps = async (
  context: AppContext
): Promise<CustomAppInitialProps> => {
  const [categories, props] = await Promise.all([
    serverAPI.getCategories(true),
    App.getInitialProps(context)
  ]);

  return { ...props, categories };
};

export default CustomApp;

export interface CustomAppInitialProps extends AppInitialProps {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}

export interface CustomAppProps extends AppProps {
  readonly categories: MultipleDocsResponse<ExistingCategory>;
}
