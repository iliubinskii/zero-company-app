import { Routes } from "../schema";
import { get } from "./core";

/**
 * Retrieves the categories from the API.
 * @returns The categories.
 */
export async function getCategories(): Promise<
  Routes["/categories"]["/"]["GET"][1]
> {
  const categories = await get("categories");

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return categories as Routes["/categories"]["/"]["GET"][1];
}

/**
 * Retrieves the companies from the API.
 * @param options - Options.
 * @param options.offset - The offset.
 * @param options.limit - The limit.
 * @returns The companies.
 */
export async function getCompanies({ limit, offset }: Pagination = {}): Promise<
  Routes["/companies"]["/"]["GET"][1]
> {
  const companies = await get("companies", {
    limit,
    offset
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return companies as Routes["/companies"]["/"]["GET"][1];
}

/**
 * Retrieves the companies from the API.
 * @param category - The category to filter the companies by.
 * @param option - Options.
 * @param option.limit - The limit.
 * @param option.offset - The offset.
 * @returns The companies.
 */
export async function getCompaniesByCategory(
  category: string,
  { limit, offset }: Pagination = {}
): Promise<Routes["/categories"]["/:id/companies"]["GET"][1]> {
  const companies = await get(`categories/${category}/companies`, {
    limit,
    offset
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return companies as Routes["/categories"]["/:id/companies"]["GET"][1];
}

export interface Pagination {
  readonly limit?: number;
  readonly offset?: number;
}
