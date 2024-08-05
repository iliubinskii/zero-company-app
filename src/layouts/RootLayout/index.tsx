"use client";

import type { FC, ReactNode } from "react";
import type { ExistingCategory } from "../../schema";
import { Footer } from "./Footer";
import { Header } from "./Header";
import React from "react";

export const RootLayout: FC<Props> = ({ children, pinnedCategories }) => (
  <div className="flex flex-col">
    <Header pinnedCategories={pinnedCategories} />
    <main>{children}</main>
    <Footer pinnedCategories={pinnedCategories} />
  </div>
);

export interface Props {
  readonly children?: ReactNode;
  readonly pinnedCategories: readonly ExistingCategory[];
}
