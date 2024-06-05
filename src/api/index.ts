import type {
  AuthUser,
  CompanyCreate,
  ErrorCode,
  ErrorResponse,
  ExistingCategory,
  ExistingCompany,
  GetCategoriesOptions,
  GetCompaniesOptions,
  MultipleDocsResponse,
  Routes
} from "../schema";
import { get, postJson } from "./core";
import { filterUndefinedProperties } from "../utils";

/**
 * Retrieves the authenticated user from the API.
 * @returns The authenticated user.
 */
export async function getAuthUser(): Promise<AuthUser | undefined> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const user = (await get("auth/me")) as
    | AuthUser
    | ErrorResponse<ErrorCode>
    | null;

  if (user === null) return;

  if ("error" in user) throw new Error(`${user.error}: ${user.errorMessage}`);

  return user;
}

/**
 * Retrieves the categories from the API.
 * @param options - Request options.
 * @param options.onlyPinned - Whether to only retrieve pinned categories.
 * @returns The categories.
 */
export async function getCategories({
  onlyPinned = false
}: GetCategoriesOptions = {}): Promise<MultipleDocsResponse<ExistingCategory>> {
  const categories = await get<Routes["/categories"]["get"]>("categories", {
    onlyPinned: onlyPinned ? "yes" : "no"
  });

  if ("error" in categories)
    throw new Error(`${categories.error}: ${categories.errorMessage}`);

  const { count, docs, nextCursor, total } = categories;

  return filterUndefinedProperties({
    count,
    docs,
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Auto-generated schema has string[] instead of [string, string]
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
    nextCursor: nextCursor as [string, string] | undefined,
    total
  });
}

/**
 * Retrieves the category from the API.
 * @param id - The category id.
 * @returns The category.
 */
export async function getCategory(id: string): Promise<ExistingCategory> {
  const category = await get<Routes["/categories/{id}"]["get"]>(
    `categories/${id}`
  );

  if ("error" in category)
    throw new Error(`${category.error}: ${category.errorMessage}`);

  return category;
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
  const companies = await get<Routes["/companies"]["get"]>("companies", {
    "cursor[0]": cursor ? cursor[0] : undefined,
    "cursor[1]": cursor ? cursor[1] : undefined,
    limit,
    offset
  });

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  const { count, docs, nextCursor, total } = companies;

  return filterUndefinedProperties({
    count,
    docs,
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Auto-generated schema has string[] instead of [string, string]
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
    nextCursor: nextCursor as [string, string] | undefined,
    total
  });
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
  const companies = await get<Routes["/categories/{id}/companies"]["get"]>(
    `categories/${id}/companies`,
    {
      "cursor[0]": cursor ? cursor[0] : undefined,
      "cursor[1]": cursor ? cursor[1] : undefined,
      limit,
      offset
    }
  );

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  const { count, docs, nextCursor, total } = companies;

  return filterUndefinedProperties({
    count,
    docs,
    // eslint-disable-next-line no-warning-comments -- Postponed
    // TODO: Auto-generated schema has string[] instead of [string, string]
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Postponed
    nextCursor: nextCursor as [string, string] | undefined,
    total
  });
}

/**
 * Sends a company to the API.
 * @param body - The company.
 * @returns The response.
 */
export async function postCompany(
  body: CompanyCreate
): Promise<ExistingCompany> {
  const company = await postJson<Routes["/companies"]["post"]>(
    "companies",
    body
  );

  if ("error" in company)
    throw new Error(`${company.error}: ${company.errorMessage}`);

  return company;
}
