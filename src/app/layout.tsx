import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Roboto } from "next/font/google";
import { initLangs } from "../langs";
import { t } from "i18next";

initLangs();

export const metadata: Metadata = {
  description: t("appDescription"),
  title: t("appTitle")
};

/**
 * The root layout component.
 * @param props - The component properties.
 * @param props.children - The children nodes.
 * @returns The rendered component.
 */
export default function RootLayout({ children }: Props): React.ReactElement {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}

export interface Props {
  readonly children: React.ReactNode;
}

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
