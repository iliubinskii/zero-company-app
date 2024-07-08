/* eslint-disable @next/next/no-page-custom-font -- Ok */

import "./globals.css";
import { AppLoadingProvider, SnackbarProvider } from "../contexts";
import type { ReactElement, ReactNode } from "react";
import { ReduxPersistor, ReduxStoreProvider } from "../store";
import React, { Suspense } from "react";
import { RootLayout } from "../layouts";
import { api } from "../api";
import { lang } from "../langs";

/**
 * Root layout.
 * @param props - Props.
 * @param props.children - Children.
 * @returns The root layout.
 */
export default async function App({ children }: Props): Promise<ReactElement> {
  const pinnedCategories = await api.getCategoriesSrv({ onlyPinned: true });

  return (
    <html lang="en">
      <head>
        <title>{lang.meta.title}</title>
        <meta content={lang.meta.description} name="description" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
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
              <RootLayout pinnedCategories={pinnedCategories.docs}>
                {children}
              </RootLayout>
            </SnackbarProvider>
          </ReduxStoreProvider>
        </AppLoadingProvider>
      </body>
    </html>
  );
}

export interface Props {
  readonly children?: ReactNode;
}
