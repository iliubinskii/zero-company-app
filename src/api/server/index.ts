import {
  ExistingCategory,
  ExistingCompany,
  GetCategoriesOptions,
  GetCompaniesOptions,
  MultipleDocsResponse,
  RoutesOld
} from "../../schema";
import { get } from "./core";

/**
 * Retrieves the categories from the API.
 * @param options - Request options.
 * @param options.onlyPinned - Whether to only retrieve pinned categories.
 * @returns The categories.
 */
export async function getCategories({
  onlyPinned = false
}: GetCategoriesOptions = {}): Promise<MultipleDocsResponse<ExistingCategory>> {
  const categories = await get<RoutesOld["/categories"]["/"]["GET"]>(
    "categories",
    { onlyPinned: onlyPinned ? "yes" : "no" }
  );

  if ("error" in categories)
    throw new Error(`${categories.error}: ${categories.errorMessage}`);

  return categories;
}

/**
 * Retrieves the companies from the API.
 * @param options - Request options.
 * @param options.cursor - The cursor.
 * @param options.limit - The limit.
 * @param options.offset - The offset.
 * @returns The companies.
 */
export async function getCompanies({
  cursor,
  limit,
  offset
}: GetCompaniesOptions = {}): Promise<MultipleDocsResponse<ExistingCompany>> {
  const companies = await get<RoutesOld["/companies"]["/"]["GET"]>(
    "companies",
    {
      "cursor[0]": cursor ? cursor[0] : undefined,
      "cursor[1]": cursor ? cursor[1] : undefined,
      limit,
      offset
    }
  );

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  return companies;
}

/**
 * Retrieves the companies from the API.
 * @param id - The category id.
 * @param options - Request options.
 * @param options.cursor - The cursor.
 * @param options.limit - The limit.
 * @param options.offset - The offset.
 * @returns The companies.
 */
export async function getCompaniesByCategory(
  id: string,
  { cursor, limit, offset }: GetCompaniesOptions = {}
): Promise<MultipleDocsResponse<ExistingCompany>> {
  const companies = await get<
    RoutesOld["/categories"]["/:id/companies"]["GET"]
  >(`categories/${id}/companies`, {
    "cursor[0]": cursor ? cursor[0] : undefined,
    "cursor[1]": cursor ? cursor[1] : undefined,
    limit,
    offset
  });

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  return companies;
}

/**
 * Retrieves the category from the API.
 * @param id - The category id.
 * @returns The category.
 */
export async function getCategory(id: string): Promise<ExistingCategory> {
  const category = await get<RoutesOld["/categories"]["/:id"]["GET"]["OK"]>(
    `categories/${id}`
  );

  if ("error" in category)
    throw new Error(`${category.error}: ${category.errorMessage}`);

  return category;
}
