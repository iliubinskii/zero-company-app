import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import React from "react";
import { initLangs } from "../langs";
import { t } from "i18next";

initLangs();

const inter = Inter({ subsets: ["latin"] });

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
export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

export interface Props {
  readonly children: React.ReactNode;
}
