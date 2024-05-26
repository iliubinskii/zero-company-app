import type {
  AuthUser,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCategory,
  ExistingCompany,
  GetCategoriesOptions,
  GetCompaniesOptions,
  MultipleDocsResponse,
  RoutesOld
} from "../schema";
import { get, post } from "./core";
import { ErrorCode } from "../schema";

/**
 * Retrieves the authenticated user from the API.
 * @returns The authenticated user.
 */
export async function getAuthUser(): Promise<AuthUser | undefined> {
  const user = await get<RoutesOld["/auth"]["/me"]["GET"]>("auth/me");

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
  const categories = await get<RoutesOld["/categories"]["/"]["GET"]>(
    "categories",
    { onlyPinned: onlyPinned ? "yes" : "no" }
  );

  if ("error" in categories)
    throw new Error(`${categories.error}: ${categories.errorMessage}`);

  return categories;
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
 * Sends a company to the API.
 * @param body - The company.
 * @returns The response.
 */
export async function postCompany(
  body: FormData
): Promise<
  ExistingCompany | ErrorResponse<ErrorCode> | ErrorResponseWithData<ErrorCode>
> {
  const company = await post<RoutesOld["/companies"]["/"]["POST"]>(
    "companies",
    body
  );

  if ("error" in company)
    if (company.error === ErrorCode.InvalidCompanyData) return company;
    else throw new Error(`${company.error}: ${company.errorMessage}`);

  return company;
}
