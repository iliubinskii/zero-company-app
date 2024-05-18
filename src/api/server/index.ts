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
 * @param requestOptions - Request options.
 * @param requestOptions.onlyPinned - Whether to only retrieve pinned categories.
 * @param options - Options.
 * @param options.client - Client request.
 * @returns The categories.
 */
export async function getCategories(
  { onlyPinned = false }: GetCategoriesOptions = {},
  { client = false }: Options = {}
): Promise<MultipleDocsResponse<ExistingCategory>> {
  if (!client) console.info("API request /categories");

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
 * @param requestOptions - Request options.
 * @param requestOptions.cursor - The cursor.
 * @param requestOptions.limit - The limit.
 * @param requestOptions.offset - The offset.
 * @param options - Options.
 * @param options.client - Client request.
 * @returns The companies.
 */
export async function getCompanies(
  { cursor, limit, offset }: GetCompaniesOptions = {},
  { client = false }: Options = {}
): Promise<MultipleDocsResponse<ExistingCompany>> {
  if (!client) console.info("API request /companies");

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
 * @param requestOptions - Request options.
 * @param requestOptions.cursor - The cursor.
 * @param requestOptions.limit - The limit.
 * @param requestOptions.offset - The offset.
 * @param options - Options.
 * @param options.client - Client request.
 * @returns The companies.
 */
export async function getCompaniesByCategory(
  id: string,
  { cursor, limit, offset }: GetCompaniesOptions = {},
  { client = false }: Options = {}
): Promise<MultipleDocsResponse<ExistingCompany>> {
  if (!client) console.info(`API request /categories/${id}/companies`);

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
 * @param options - Options.
 * @param options.client - Client request.
 * @returns The category.
 */
export async function getCategory(
  id: string,
  { client = false }: Options = {}
): Promise<ExistingCategory> {
  if (!client) console.info(`API request /category/${id}`);

  const category = await get<RoutesOld["/categories"]["/:id"]["GET"]["OK"]>(
    `categories/${id}`
  );

  if ("error" in category)
    throw new Error(`${category.error}: ${category.errorMessage}`);

  return category;
}

export interface Options {
  readonly client?: boolean;
}
