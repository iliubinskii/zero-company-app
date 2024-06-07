import type {
  ErrorCode,
  ErrorResponse,
  SchemaItem,
  SchemaResponse
} from "../../schema";
import { API_URL } from "../../config";
import type { Query } from "../../utils";
import { buildQuery } from "../../utils";

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @returns The data.
 */
export async function deleteReq<T extends SchemaItem = never>(
  endpoint: string
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    credentials: "include",
    method: "DELETE"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as SchemaResponse<T>;

  return json;
}

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @param query - The query.
 * @returns The data.
 */
export async function getReq<T extends SchemaItem = never>(
  endpoint: string,
  query: Query = {}
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const queryStr = buildQuery(query);

  const response = await fetch(`${API_URL}${endpoint}${queryStr}`, {
    credentials: "include"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as SchemaResponse<T>;

  return json;
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @returns The response.
 */
export async function postFormDataReq<T extends SchemaItem = never>(
  endpoint: string,
  body: FormData
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body,
    credentials: "include",
    method: "POST"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as SchemaResponse<T>;

  return json;
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @returns The response.
 */
export async function postJsonReq<T extends SchemaItem = never>(
  endpoint: string,
  body: unknown
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body: JSON.stringify(body),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "POST"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as SchemaResponse<T>;

  return json;
}
