import "./globals.css";
import { AppLoadingProvider, JwtUserProvider } from "../contexts";
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
  console.info("Rendered /layout");

  const categories = await serverAPI.getCategories(true);

  return (
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
          <JwtUserProvider>
            <Layout categories={categories}>{children}</Layout>
          </JwtUserProvider>
        </AppLoadingProvider>
      </body>
    </html>
  );
}

export interface Props {
  children?: React.ReactNode | undefined;
}
