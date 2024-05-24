import type {
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData
} from "../../schema";
import { API_URL } from "../../config";
import type { Query } from "../../utils";
import { buildQuery } from "../../utils";

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @param query - The query.
 * @returns The data.
 */
export async function get<T extends [unknown, unknown]>(
  endpoint: string,
  query: Query = {}
): Promise<T[1] | ErrorResponse<ErrorCode> | ErrorResponseWithData<ErrorCode>> {
  const queryStr = buildQuery(query);

  const response = await fetch(`${API_URL}${endpoint}${queryStr}`, {
    credentials: "include"
  });

  const json = (await response.json()) as unknown;

  return json;
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @returns The response.
 */
export async function post<T extends [unknown, unknown]>(
  endpoint: string,
  body: FormData
): Promise<T[1] | ErrorResponse<ErrorCode> | ErrorResponseWithData<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body,
    credentials: "include",
    method: "POST"
  });

  const json = (await response.json()) as unknown;

  return json;
}