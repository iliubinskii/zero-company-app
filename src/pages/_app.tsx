import "./globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { lang } from "../langs";

export interface Props {
  readonly children: React.ReactNode;
}

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{lang.app.title}</title>
        <meta content={lang.app.description} name="description" />
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default App;
