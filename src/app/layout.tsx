/* eslint-disable @next/next/no-page-custom-font -- Ok */

import "./globals.css";
import {
  AppLoadingProvider,
  ReduxPersistor,
  ReduxStoreProvider,
  SnackbarProvider
} from "../contexts";
import type { ReactElement, ReactNode } from "react";
import Layout from "../Layout";
import React, { Suspense } from "react";
import { api } from "../api";
import { lang } from "../langs";
import { logger } from "../services";

/**
 * Root layout.
 * @param props - Props.
 * @param props.children - Children.
 * @returns The root layout.
 */
export default async function RootLayout({
  children
}: Props): Promise<ReactElement> {
  const t1 = performance.now();

  const categories = await api.getCategories({ onlyPinned: true });

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
        <AppLoadingProvider>
          <ReduxStoreProvider>
            <SnackbarProvider>
              <Suspense>
                <ReduxPersistor />
              </Suspense>
              <Layout categories={categories}>{children}</Layout>
            </SnackbarProvider>
          </ReduxStoreProvider>
        </AppLoadingProvider>
      </body>
    </html>
  );

  const t2 = performance.now();

  // eslint-disable-next-line i18n-text/no-en -- Ok
  logger.info(`Render '/layout' in ${Math.round(t2 - t1)} ms`);

  return element;
}

export interface Props {
  children?: ReactNode | undefined;
}
