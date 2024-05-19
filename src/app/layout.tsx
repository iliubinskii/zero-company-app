/* eslint-disable @next/next/no-page-custom-font -- Ok */

import "./globals.css";
import {
  AppLoadingProvider,
  JwtUserProvider,
  ReduxStoreProvider
} from "../contexts";
import Layout from "../Layout";
import React from "react";
import { lang } from "../langs";
import { serverAPI } from "../api";

/**
 * Root layout.
 * @param props - Props.
 * @param props.children - Children.
 * @returns The root layout.
 */
export default async function RootLayout({
  children
}: Props): Promise<React.ReactElement> {
  const t1 = performance.now();

  const categories = await serverAPI.getCategories({ onlyPinned: true });

  const element = (
    <html lang="en">
      <head>
        <title>{lang.app.title}</title>
        <meta content={lang.app.description} name="description" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ReduxStoreProvider>
          <AppLoadingProvider>
            <JwtUserProvider>
              <Layout categories={categories}>{children}</Layout>
            </JwtUserProvider>
          </AppLoadingProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );

  const t2 = performance.now();

  console.info(`Render /layout in ${Math.round(t2 - t1)} ms`);

  return element;
}

export interface Props {
  children?: React.ReactNode | undefined;
}
