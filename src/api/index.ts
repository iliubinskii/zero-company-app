import { GetCategoriesResponse, GetCompaniesResponse } from "../schema";
import { get } from "./core";

/**
 * Retrieves the categories from the API.
 * @returns The categories.
 */
export async function getCategories(): Promise<GetCategoriesResponse> {
  const categories = await get("categories");

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return categories as GetCategoriesResponse;
}

/**
 * Retrieves the companies from the API.
 * @param options - Options.
 * @param options.offset - The offset.
 * @param options.limit - The limit.
 * @returns The companies.
 */
export async function getCompanies({
  limit,
  offset
}: Pagination = {}): Promise<GetCompaniesResponse> {
  const companies = await get("companies", {
    limit,
    offset
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return companies as GetCompaniesResponse;
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
): Promise<GetCompaniesResponse> {
  const companies = await get(`categories/${category}/companies`, {
    limit,
    offset
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
  return companies as GetCompaniesResponse;
}

export interface Pagination {
  readonly limit?: number;
  readonly offset?: number;
}
