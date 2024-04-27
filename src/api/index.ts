import { ExistingCategories, ExistingCompanies } from "../schema";
import { API_URL } from "../config";

/**
 * Retrieves the categories from the API.
 * @returns The categories.
 */
export async function getCategories(): Promise<ExistingCategories> {
  const response = await fetch(`${API_URL}categories`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  /**
   * TODO: Validate the response.
   */
  const categories = await response.json();

  return categories;
}

/**
 * Retrieves the companies from the API.
 * @returns The companies.
 */
export async function getCompanies(): Promise<ExistingCompanies> {
  const response = await fetch(`${API_URL}companies`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  /**
   * TODO: Validate the response.
   */
  const companies = await response.json();

  return companies;
}

/**
 * Retrieves the companies from the API.
 * @param category - The category to filter the companies by.
 * @returns The companies.
 */
export async function getCompaniesByCategory(
  category: string
): Promise<ExistingCompanies> {
  const response = await fetch(`${API_URL}categories/${category}/companies`);

  // eslint-disable-next-line no-warning-comments -- Postponed
  /**
   * TODO: Validate the response.
   */
  const companies = await response.json();

  return companies;
}
