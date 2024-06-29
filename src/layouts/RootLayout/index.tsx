"use client";

import type { FC, ReactNode } from "react";
import type { ExistingCategory } from "../../schema";
import { Footer } from "./Footer";
import { Header } from "./Header";
import React from "react";

export const RootLayout: FC<Props> = ({ categories, children }) => (
  <div className="flex flex-col">
    <Header categories={categories} />
    <main>{children}</main>
    {/* Contents END */}
    <Footer categories={categories} />
  </div>
);

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly children: ReactNode;
}
