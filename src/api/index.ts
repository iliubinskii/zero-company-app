import { GetCategoriesResponse, GetCompaniesResponse } from "../schema";
import { API_URL } from "../config";
import { filterUndefinedProperties } from "../utils";

/**
 * Retrieves the categories from the API.
 * @returns The categories.
 */
export async function getCategories(): Promise<GetCategoriesResponse> {
  const response = await fetch(`${API_URL}categories`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Validate the response.
  const categories = await response.json();

  return categories;
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
  const queryParams = new URLSearchParams(
    filterUndefinedProperties({
      limit: limit?.toString(),
      offset: offset?.toString()
    })
  );

  const queryStr = queryParams.toString();

  const response = await fetch(
    queryStr.length > 0
      ? `${API_URL}companies?${queryStr}`
      : `${API_URL}companies`
  );

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Validate the response.
  const companies = await response.json();

  return companies;
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
  const queryParams = new URLSearchParams(
    filterUndefinedProperties({
      limit: limit?.toString(),
      offset: offset?.toString()
    })
  );

  const queryStr = queryParams.toString();

  const response = await fetch(
    queryStr.length > 0
      ? `${API_URL}categories/${category}/companies?${queryStr}`
      : `${API_URL}categories/${category}/companies`
  );

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Validate the response.
  const companies = await response.json();

  return companies;
}

export interface Pagination {
  readonly limit?: number;
  readonly offset?: number;
}
