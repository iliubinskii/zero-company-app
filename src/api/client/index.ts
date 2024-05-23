import type {
  AuthUser,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCompany,
  RoutesOld
} from "../../schema";
import { get, post } from "./core";
import { ErrorCode } from "../../schema";

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
