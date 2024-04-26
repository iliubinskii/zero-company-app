import "./globals.css";
import type { Metadata } from "next";
import React from "react";
import { Roboto } from "next/font/google";
import { lang } from "../langs";

export const metadata: Metadata = {
  description: lang.app.description,
  title: lang.app.title
};

export interface Props {
  readonly children: React.ReactNode;
}

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

const roboto = Roboto({ subsets: ["latin"], weight: "400" });
