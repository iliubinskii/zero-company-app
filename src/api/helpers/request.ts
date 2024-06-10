import type {
  ErrorCode,
  ErrorResponse,
  SchemaItem,
  SchemaResponse
} from "../../schema";
import { API_URL } from "../../config";
import { buildQuery } from "../../utils";
import { logger } from "../../services";

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
 * @param data - The data.
 * @param options - The options.
 * @param options.logQuery - Whether to log the query.
 * @returns The data.
 */
export async function getReq<T extends SchemaItem = never>(
  endpoint: string,
  data: object = {},
  { logQuery = false }: GetOptions = {}
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const queryStr = buildQuery(data);

  const url = `${API_URL}${endpoint}${queryStr}`;

  if (logQuery) logger.info(`GET: ${url}`);

  const response = await fetch(url, { credentials: "include" });

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

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @returns The response.
 */
export async function putFormDataReq<T extends SchemaItem = never>(
  endpoint: string,
  body: FormData
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body,
    credentials: "include",
    method: "PUT"
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
export async function putJsonReq<T extends SchemaItem = never>(
  endpoint: string,
  body: unknown
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
    body: JSON.stringify(body),
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    method: "PUT"
  });

  // eslint-disable-next-line no-type-assertion/no-type-assertion -- Ok
  const json = (await response.json()) as SchemaResponse<T>;

  return json;
}

export interface GetOptions {
  readonly logQuery?: boolean | undefined;
}
