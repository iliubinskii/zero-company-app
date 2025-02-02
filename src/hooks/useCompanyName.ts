import type { ExistingCategory, ExistingCompany } from "../schema";
import { lang } from "../langs";
import { useCompanyCategory } from "./useCompanyCategory";

/**
 * Returns the name of the company.
 * @param company - The company to get the name from.
 * @param categories - The categories to get the name from.
 * @returns The name of the company.
 */
export function useCompanyName(
  company: ExistingCompany | null | undefined,
  categories: readonly ExistingCategory[]
): string {
  const category = useCompanyCategory(company, categories);

  if (company) {
    if (typeof company.name === "string") return company.name;

    if (category) return `${category.name} ${lang.company}`;
  }

  return lang.ZeroCompany;
}
