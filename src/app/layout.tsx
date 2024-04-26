import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import type { Metadata } from "next";
import React from "react";
import { ThemeProvider } from "@mui/material";
import { initLangs } from "../langs";
import { t } from "i18next";
import theme from "../theme";

initLangs();

export const metadata: Metadata = {
  description: t("appDescription"),
  title: t("appTitle")
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
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
