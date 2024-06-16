import type { ExistingCategory, ExistingCompany } from "../schema";

/**
 * Returns the category of the company.
 * @param company - The company to get the category from.
 * @param categories - The categories to get the category from.
 * @param index - The index of the category to get.
 * @returns The category of the company.
 */
export function useCompanyCategory(
  company: ExistingCompany | null | undefined,
  categories: readonly ExistingCategory[],
  index = 0
): ExistingCategory | undefined {
  if (company) {
    const categoryId = company.categories[index];

    if (typeof categoryId === "string")
      return categories.find(category => category._id === categoryId);
  }

  return undefined;
}
