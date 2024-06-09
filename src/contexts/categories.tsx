"use client";

import type { ExistingCategories, ExistingCategory } from "../schema";
import type { FC, ReactNode } from "react";
import React, { createContext, useContext, useMemo } from "react";

export const CategoriesProvider: FC<Props> = ({
  categories: { docs: categories },
  children
}) => {
  const context = useMemo(() => {
    const pinnedCategories = categories.filter(category => category.pinned);

    return { categories, pinnedCategories };
  }, [categories]);

  return <Context.Provider value={context}>{children}</Context.Provider>;
};

export const useCategories = (): readonly ExistingCategory[] =>
  useContext(Context).categories;

export const usePinnedCategories = (): readonly ExistingCategory[] =>
  useContext(Context).pinnedCategories;

export interface Props {
  readonly categories: ExistingCategories;
  readonly children?: ReactNode | undefined;
}

const Context = createContext<Context>({
  categories: [],
  pinnedCategories: []
});

interface Context {
  readonly categories: readonly ExistingCategory[];
  readonly pinnedCategories: readonly ExistingCategory[];
}
