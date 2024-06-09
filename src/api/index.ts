import type {
  AuthUser,
  CompanyCreate,
  DeleteResponse,
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCategories,
  ExistingCategory,
  ExistingCompanies,
  ExistingCompany,
  GetCategoriesOptions,
  GetCompaniesOptions,
  Routes
} from "../schema";
import {
  deleteReq,
  getReq,
  postJsonReq,
  putFormDataReq,
  restoreCategories,
  restoreCompanies,
  restoreCompany
} from "./helpers";

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
  ): Promise<ExistingCategories | ErrorResponse<ErrorCode>> => {
    const categories = await getReq<Routes["/categories"]["get"]>(
      "categories",
      { ...options }
    );

    return "error" in categories ? categories : restoreCategories(categories);
  },
  /**
   * Retrieves the categories from the API.
   * @param options - Request options.
   * @returns The categories.
   */
  getCategoriesSrv: async (
    options: GetCategoriesOptions = {}
  ): Promise<ExistingCategories> => {
    const categories = await getReq<Routes["/categories"]["get"]>(
      "categories",
      { ...options },
      { logQuery: true }
    );

    if ("error" in categories)
      throw new Error(`${categories.error}: ${categories.errorMessage}`);

    return restoreCategories(categories);
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
  ): Promise<ExistingCompanies | ErrorResponse<ErrorCode>> => {
    const companies = await getReq<Routes["/companies"]["get"]>("companies", {
      ...options
    });

    return "error" in companies ? companies : restoreCompanies(companies);
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
  ): Promise<ExistingCompanies | ErrorResponse<ErrorCode>> => {
    const companies = await getReq<Routes["/categories/{id}/companies"]["get"]>(
      `categories/${id}/companies`,
      { ...options }
    );

    return "error" in companies ? companies : restoreCompanies(companies);
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesByMe: async (
    options: GetCompaniesOptions = {}
  ): Promise<ExistingCompanies | ErrorResponse<ErrorCode>> => {
    const companies = await getReq<Routes["/me/companies"]["get"]>(
      "me/companies",
      { ...options }
    );

    return "error" in companies ? companies : restoreCompanies(companies);
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesSrv: async (
    options: GetCompaniesOptions = {}
  ): Promise<ExistingCompanies> => {
    const companies = await getReq<Routes["/companies"]["get"]>(
      "companies",
      { ...options },
      { logQuery: true }
    );

    if ("error" in companies)
      throw new Error(`${companies.error}: ${companies.errorMessage}`);

    return restoreCompanies(companies);
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

    return "error" in company ? company : restoreCompany(company);
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

    return "error" in company ? company : restoreCompany(company);
  },
  putCompany: async (
    id: string,
    body: FormData
  ): Promise<
    | ExistingCompany
    | ErrorResponse<ErrorCode>
    | ErrorResponseWithData<ErrorCode>
  > => {
    const company = await putFormDataReq<Routes["/companies/{id}"]["put"]>(
      `companies/${id}`,
      body
    );
    return "error" in company ? company : restoreCompany(company);
  }
};
