import type { ExistingCategory } from "../schema";
import { api } from "../api";

/**
 * Get cached categories.
 * @returns The cached categories.
 */
export async function getCategoriesSrv(): Promise<readonly ExistingCategory[]> {
  const { categories } = await getCategoriesCache();

  return categories;
}

/**
 * Get cached categories.
 * @returns The cached categories.
 */
export async function getPinnedCategoriesSrv(): Promise<
  readonly ExistingCategory[]
> {
  const { pinnedCategories } = await getCategoriesCache();

  return pinnedCategories;
}

export interface CategoriesCache {
  readonly categories: readonly ExistingCategory[];
  readonly pinnedCategories: readonly ExistingCategory[];
}

/**
 * Get cached categories.
 * @returns The cached categories.
 */
async function getCategoriesCache(): Promise<CategoriesCache> {
  if (categoriesCache) return categoriesCache;

  const { docs } = await api.getCategoriesSrv();

  categoriesCache = {
    categories: docs,
    pinnedCategories: docs.filter(category => category.pinned)
  };

  return categoriesCache;
}

let categoriesCache: CategoriesCache | undefined;
