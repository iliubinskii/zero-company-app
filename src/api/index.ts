import type {
  AuthUser,
  CompanyCreate,
  DeleteResponse,
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCategory,
  ExistingCompany,
  GetCategoriesOptions,
  GetCompaniesOptions,
  MultipleDocsResponse,
  Routes
} from "../schema";
import { deleteReq, getReq, postJsonReq } from "./core";

export const api = {
  /**
   * Deletes a company from the API.
   * @param id - The company id.
   * @returns The response.
   */
  deleteCompany: async (
    id: string
  ): Promise<DeleteResponse | ErrorResponse<ErrorCode>> => {
    const result = await deleteReq<Routes["/companies/{id}"]["delete"]>(
      `companies/${id}`
    );

    return result;
  },
  /**
   * Retrieves the authenticated user from the API.
   * @returns The authenticated user.
   */
  getAuthUser: async (): Promise<
    AuthUser | null | ErrorResponse<ErrorCode>
  > => {
    const user = await getReq("auth/me");

    return user;
  },
  /**
   * Retrieves the categories from the API.
   * @param options - Request options.
   * @returns The categories.
   */
  getCategories: async (
    options: GetCategoriesOptions = {}
  ): Promise<
    MultipleDocsResponse<ExistingCategory> | ErrorResponse<ErrorCode>
  > => {
    const categories = await getReq<Routes["/categories"]["get"]>(
      "categories",
      { ...options }
    );

    return multipleDocsResponse(categories);
  },
  /**
   * Retrieves the categories from the API.
   * @param options - Request options.
   * @returns The categories.
   */
  getCategoriesSrv: async (
    options: GetCategoriesOptions = {}
  ): Promise<MultipleDocsResponse<ExistingCategory>> => {
    const categories = await getReq<Routes["/categories"]["get"]>(
      "categories",
      { ...options },
      { logQuery: true }
    );

    if ("error" in categories)
      throw new Error(`${categories.error}: ${categories.errorMessage}`);

    return multipleDocsResponseSrv(categories);
  },
  /**
   * Retrieves the category from the API.
   * @param id - The category id.
   * @returns The category.
   */
  getCategory: async (
    id: string
  ): Promise<ExistingCategory | ErrorResponse<ErrorCode>> => {
    const category = await getReq<Routes["/categories/{id}"]["get"]>(
      `categories/${id}`
    );

    return category;
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompanies: async (
    options: GetCompaniesOptions = {}
  ): Promise<
    MultipleDocsResponse<ExistingCompany> | ErrorResponse<ErrorCode>
  > => {
    const companies = await getReq<Routes["/companies"]["get"]>("companies", {
      ...options
    });

    return multipleDocsResponse(companies);
  },
  /**
   * Retrieves the companies from the API.
   * @param id - The category id.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesByCategory: async (
    id: string,
    options: GetCompaniesOptions = {}
  ): Promise<
    MultipleDocsResponse<ExistingCompany> | ErrorResponse<ErrorCode>
  > => {
    const companies = await getReq<Routes["/categories/{id}/companies"]["get"]>(
      `categories/${id}/companies`,
      { ...options }
    );

    return multipleDocsResponse(companies);
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesByMe: async (
    options: GetCompaniesOptions = {}
  ): Promise<
    MultipleDocsResponse<ExistingCompany> | ErrorResponse<ErrorCode>
  > => {
    const companies = await getReq<Routes["/me/companies"]["get"]>(
      "me/companies",
      { ...options }
    );

    return multipleDocsResponse(companies);
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesSrv: async (
    options: GetCompaniesOptions = {}
  ): Promise<MultipleDocsResponse<ExistingCompany>> => {
    const companies = await getReq<Routes["/companies"]["get"]>(
      "companies",
      { ...options },
      { logQuery: true }
    );

    if ("error" in companies)
      throw new Error(`${companies.error}: ${companies.errorMessage}`);

    return multipleDocsResponseSrv(companies);
  },
  /**
   * Retrieves the company from the API.
   * @param id - The company id.
   * @returns The company.
   */
  getCompany: async (
    id: string
  ): Promise<ExistingCompany | ErrorResponse<ErrorCode>> => {
    const company = await getReq<Routes["/companies/{id}"]["get"]>(
      `companies/${id}`
    );

    return company;
  },
  /**
   * Sends a company to the API.
   * @param body - The company.
   * @returns The response.
   */
  postCompany: async (
    body: CompanyCreate
  ): Promise<
    | ExistingCompany
    | ErrorResponse<ErrorCode>
    | ErrorResponseWithData<ErrorCode>
  > => {
    const company = await postJsonReq<Routes["/companies"]["post"]>(
      "companies",
      body
    );

    return company;
  }
};

/**
 * Fixes the type of the nextCursor property.
 * @param response - The response.
 * @returns The fixed response.
 */
function multipleDocsResponse<T>(
  response: MultipleDocsResponseFromRoutes<T> | ErrorResponse<ErrorCode>
): MultipleDocsResponse<T> | ErrorResponse<ErrorCode> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return response as MultipleDocsResponse<T> | ErrorResponse<ErrorCode>;
}

/**
 * Fixes the type of the nextCursor property.
 * @param response - The response.
 * @returns The fixed response.
 */
function multipleDocsResponseSrv<T>(
  response: MultipleDocsResponseFromRoutes<T>
): MultipleDocsResponse<T> {
  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  return response as MultipleDocsResponse<T>;
}

interface MultipleDocsResponseFromRoutes<T>
  extends Omit<MultipleDocsResponse<T>, "nextCursor"> {
  readonly nextCursor?: readonly string[] | undefined;
}
