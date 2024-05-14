import { Head, Html, Main, NextScript } from "next/document";
import React from "react";

/**
 * Custom Document component.
 * @returns The Document component.
 */
export default function Document(): React.ReactElement {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
