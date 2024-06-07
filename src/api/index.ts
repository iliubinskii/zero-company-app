import type {
  AuthUser,
  CompanyCreate,
  DeleteResponse,
  ErrorCode,
  ErrorResponse,
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
  deleteCompany: async (id: string): Promise<DeleteResponse> => {
    const result = await deleteReq<Routes["/companies/{id}"]["delete"]>(
      `companies/${id}`
    );

    if ("error" in result)
      throw new Error(`${result.error}: ${result.errorMessage}`);

    return result;
  },
  /**
   * Retrieves the authenticated user from the API.
   * @returns The authenticated user.
   */
  getAuthUser: async (): Promise<AuthUser | undefined> => {
    // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
    const user = (await getReq("auth/me")) as
      | AuthUser
      | ErrorResponse<ErrorCode>
      | null;

    if (user === null) return;

    if ("error" in user) throw new Error(`${user.error}: ${user.errorMessage}`);

    return user;
  },
  /**
   * Retrieves the categories from the API.
   * @param options - Request options.
   * @returns The categories.
   */
  getCategories: async (
    options: GetCategoriesOptions = {}
  ): Promise<MultipleDocsResponse<ExistingCategory>> => {
    const categories = await getReq<Routes["/categories"]["get"]>(
      "categories",
      {
        ...options
      }
    );

    if ("error" in categories)
      throw new Error(`${categories.error}: ${categories.errorMessage}`);

    const { nextCursor, ...rest } = categories;

    return {
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
      nextCursor: nextCursor as [string, string] | undefined,
      ...rest
    };
  },
  /**
   * Retrieves the category from the API.
   * @param id - The category id.
   * @returns The category.
   */
  getCategory: async (id: string): Promise<ExistingCategory> => {
    const category = await getReq<Routes["/categories/{id}"]["get"]>(
      `categories/${id}`
    );

    if ("error" in category)
      throw new Error(`${category.error}: ${category.errorMessage}`);

    return category;
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompanies: async (
    options: GetCompaniesOptions = {}
  ): Promise<MultipleDocsResponse<ExistingCompany>> => {
    const companies = await getReq<Routes["/companies"]["get"]>("companies", {
      ...options
    });

    if ("error" in companies)
      throw new Error(`${companies.error}: ${companies.errorMessage}`);

    const { nextCursor, ...rest } = companies;

    return {
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
      nextCursor: nextCursor as [string, string] | undefined,
      ...rest
    };
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
  ): Promise<MultipleDocsResponse<ExistingCompany>> => {
    const companies = await getReq<Routes["/categories/{id}/companies"]["get"]>(
      `categories/${id}/companies`,
      { ...options }
    );

    if ("error" in companies)
      throw new Error(`${companies.error}: ${companies.errorMessage}`);

    const { nextCursor, ...rest } = companies;

    return {
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
      nextCursor: nextCursor as [string, string] | undefined,
      ...rest
    };
  },
  /**
   * Retrieves the companies from the API.
   * @param options - Request options.
   * @returns The companies.
   */
  getCompaniesByMe: async (
    options: GetCompaniesOptions = {}
  ): Promise<MultipleDocsResponse<ExistingCompany>> => {
    const companies = await getReq<Routes["/me/companies"]["get"]>(
      "me/companies",
      {
        ...options
      }
    );

    if ("error" in companies)
      throw new Error(`${companies.error}: ${companies.errorMessage}`);

    const { nextCursor, ...rest } = companies;

    return {
      // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
      nextCursor: nextCursor as [string, string] | undefined,
      ...rest
    };
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
  postCompany: async (body: CompanyCreate): Promise<ExistingCompany> => {
    const company = await postJsonReq<Routes["/companies"]["post"]>(
      "companies",
      body
    );

    if ("error" in company)
      throw new Error(`${company.error}: ${company.errorMessage}`);

    return company;
  }
};
