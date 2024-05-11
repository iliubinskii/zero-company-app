import {
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  ExistingCompany,
  JwtUser,
  RoutesOld
} from "../../schema";
import { get, post } from "./core";

/**
 * Retrieves the authenticated user from the API.
 * @returns The authenticated user.
 */
export async function getAuthMe(): Promise<JwtUser | undefined> {
  const jwtUser = await get<RoutesOld["/auth"]["/me"]["GET"]>("auth/me");

  if (jwtUser === null) return;

  if ("error" in jwtUser)
    throw new Error(`${jwtUser.error}: ${jwtUser.errorMessage}`);

  return jwtUser;
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
