import type {
  AuthUser,
  CompanyCreate,
  CompanyUpdate,
  DeleteResponse,
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCategories,
  ExistingCategory,
  ExistingCompanies,
  ExistingCompany,
  ExistingDocument,
  ExistingDocuments,
  ExistingUser,
  GetCategoriesOptions,
  GetCompaniesOptions,
  GetDocumentsOptions,
  Routes,
  UserUpdate
} from "../schema";
import {
  deleteReq,
  getReq,
  postReq,
  putReq,
  restoreCategories,
  restoreCompanies,
  restoreCompany,
  restoreDocument,
  restoreDocuments
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
  generateFoundingAgreement: async (
    id: string
  ): Promise<
    | ExistingDocument
    | ErrorResponse<ErrorCode>
    | ErrorResponseWithData<ErrorCode>
  > => {
    const document = await postReq<Routes["/companies/{id}/found"]["post"]>(
      `companies/${id}/found`,
      {}
    );

    return "error" in document ? document : restoreDocument(document);
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
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getDocumentsByMe: async (
    options: GetDocumentsOptions = {}
  ): Promise<ExistingDocuments | ErrorResponse<ErrorCode>> => {
    const documents = await getReq<Routes["/me/documents"]["get"]>(
      "me/documents",
      { ...options }
    );

    return "error" in documents ? documents : restoreDocuments(documents);
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getFavoriteCompaniesByMe: async (
    options: GetCompaniesOptions = {}
  ): Promise<ExistingCompanies | ErrorResponse<ErrorCode>> => {
    const companies = await getReq<Routes["/me/favorite-companies"]["get"]>(
      "me/favorite-companies",
      { ...options }
    );

    return "error" in companies ? companies : restoreCompanies(companies);
  },
  getMe: async (): Promise<ExistingUser | ErrorResponse<ErrorCode>> => {
    const user = await getReq<Routes["/me"]["get"]>("me");

    return user;
  },
  /**
   * Sends a company to the API.
   * @param body - The company.
   * @returns The response.
   */
  postCompany: async (
    body: FormData | CompanyCreate
  ): Promise<
    | ExistingCompany
    | ErrorResponse<ErrorCode>
    | ErrorResponseWithData<ErrorCode>
  > => {
    const company = await postReq<Routes["/companies"]["post"]>(
      "companies",
      body
    );

    return "error" in company ? company : restoreCompany(company);
  },
  putCompany: async (
    id: string,
    body: FormData | CompanyUpdate
  ): Promise<
    | ExistingCompany
    | ErrorResponse<ErrorCode>
    | ErrorResponseWithData<ErrorCode>
  > => {
    const company = await putReq<Routes["/companies/{id}"]["put"]>(
      `companies/${id}`,
      body
    );
    return "error" in company ? company : restoreCompany(company);
  },
  putMe: async (
    body: FormData | UserUpdate
  ): Promise<
    ExistingUser | ErrorResponse<ErrorCode> | ErrorResponseWithData<ErrorCode>
  > => {
    const user = await putReq<Routes["/me"]["put"]>("me", body);

    return user;
  }
};
