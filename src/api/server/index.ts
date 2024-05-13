import {
  ErrorCode,
  ExistingCategory,
  ExistingCompany,
  GetCompaniesOptions,
  MultipleDocsResponse,
  RoutesOld
} from "../../schema";
import { Query } from "../../utils";
import { Writable } from "ts-toolbelt/out/Object/Writable";
import { get } from "./core";

/**
 * Retrieves the categories from the API.
 * @param onlyPinned - Whether to only get pinned categories.
 * @returns The categories.
 */
export async function getCategories(
  onlyPinned = false
): Promise<MultipleDocsResponse<ExistingCategory>> {
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
 * @param options - Options.
 * @param options.offset - The offset.
 * @param options.limit - The limit.
 * @param options.cursor - The cursor.
 * @returns The companies.
 */
export async function getCompanies({
  cursor,
  limit,
  offset
}: GetCompaniesOptions = {}): Promise<MultipleDocsResponse<ExistingCompany>> {
  const query: Writable<Query> = { limit, offset };

  if (cursor) {
    query["cursor[0]"] = cursor[0];
    query["cursor[1]"] = cursor[1];
  }

  const companies = await get<RoutesOld["/companies"]["/"]["GET"]>(
    "companies",
    query
  );

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  return companies;
}

/**
 * Retrieves the companies from the API.
 * @param id - The category id.
 * @param option - Options.
 * @param option.limit - The limit.
 * @param option.offset - The offset.
 * @param option.cursor - The cursor.
 * @returns The companies.
 */
export async function getCompaniesByCategory(
  id: string,
  { cursor, limit, offset }: GetCompaniesOptions = {}
): Promise<MultipleDocsResponse<ExistingCompany> | undefined> {
  const query: Writable<Query> = { limit, offset };

  if (cursor) {
    query["cursor[0]"] = cursor[0];
    query["cursor[1]"] = cursor[1];
  }

  const companies = await get<
    RoutesOld["/categories"]["/:id/companies"]["GET"]
  >(`categories/${id}/companies`, query);

  if ("error" in companies)
    if (
      companies.error === ErrorCode.InvalidParam ||
      companies.error === ErrorCode.CategoryNotFound
    )
      return;
    else throw new Error(`${companies.error}: ${companies.errorMessage}`);

  return companies;
}

/**
 * Retrieves the category from the API.
 * @param id - The category id.
 * @returns The category.
 */
export async function getCategory(
  id: string
): Promise<ExistingCategory | undefined> {
  const category = await get<RoutesOld["/categories"]["/:id"]["GET"]["OK"]>(
    `categories/${id}`
  );

  if ("error" in category)
    if (
      category.error === ErrorCode.InvalidParam ||
      category.error === ErrorCode.CategoryNotFound
    )
      return;
    else throw new Error(`${category.error}: ${category.errorMessage}`);

  return category;
}
