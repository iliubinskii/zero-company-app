import "./globals.css";
import { AppProps } from "next/app";
import Head from "next/head";
import React from "react";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { lang } from "../langs";

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>{lang.app.title}</title>
        <meta content={lang.app.description} name="description" />
      </Head>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>
  );
};

export default App;

export interface Props {
  readonly children: React.ReactNode;
}
