import type {
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData,
  SchemaItem,
  SchemaResponse
} from "../../schema";
import { API_URL } from "../../config";
import { buildQuery } from "../../utils";
import { logger } from "../../services";

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @param options - The options.
 * @param options.logQuery - Whether to log the query.
 * @returns The data.
 */
export async function deleteReq<T extends SchemaItem = never>(
  endpoint: string,
  { logQuery = false }: Options = {}
): Promise<
  | SchemaResponse<T>
  | ErrorResponse<ErrorCode>
  | ErrorResponseWithData<ErrorCode>
> {
  const url = `${API_URL}${endpoint}`;

  if (logQuery) logger.info(`GET: ${url}`);

  const response = await fetch(url, {
    credentials: "include",
    method: "DELETE"
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Ok
  return response.json();
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
  { logQuery = false }: Options = {}
): Promise<
  | SchemaResponse<T>
  | ErrorResponse<ErrorCode>
  | ErrorResponseWithData<ErrorCode>
> {
  const queryStr = buildQuery(data);

  const url = `${API_URL}${endpoint}${queryStr}`;

  if (logQuery) logger.info(`GET: ${url}`);

  const response = await fetch(url, { credentials: "include" });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Ok
  return response.json();
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @param options - The options.
 * @param options.logQuery - Whether to log the query.
 * @returns The response.
 */
export async function postReq<T extends SchemaItem = never>(
  endpoint: string,
  body: FormData | object,
  { logQuery = false }: Options = {}
): Promise<
  | SchemaResponse<T>
  | ErrorResponse<ErrorCode>
  | ErrorResponseWithData<ErrorCode>
> {
  const url = `${API_URL}${endpoint}`;

  if (logQuery) logger.info(`GET: ${url}`);

  const init: RequestInit =
    body instanceof FormData
      ? {
          body,
          credentials: "include",
          method: "POST"
        }
      : {
          body: JSON.stringify(body),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "POST"
        };

  const response = await fetch(url, init);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Ok
  return response.json();
}

/**
 * Sends data to the API.
 * @param endpoint - The endpoint.
 * @param body - The body.
 * @param options - The options.
 * @param options.logQuery - Whether to log the query.
 * @returns The response.
 */
export async function putReq<T extends SchemaItem = never>(
  endpoint: string,
  body: FormData | object,
  { logQuery = false }: Options = {}
): Promise<SchemaResponse<T> | ErrorResponse<ErrorCode>> {
  const url = `${API_URL}${endpoint}`;

  if (logQuery) logger.info(`GET: ${url}`);

  const init: RequestInit =
    body instanceof FormData
      ? {
          body,
          credentials: "include",
          method: "PUT"
        }
      : {
          body: JSON.stringify(body),
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          method: "PUT"
        };

  const response = await fetch(url, init);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- Ok
  return response.json();
}

export interface Options {
  readonly logQuery?: boolean | undefined;
}
