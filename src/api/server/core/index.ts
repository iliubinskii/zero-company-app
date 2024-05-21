import type {
  ErrorCode,
  ErrorResponse,
  ErrorResponseWithData
} from "../../../schema";
import type { Query } from "../../../utils";
import { SERVER_API_URL } from "../../../config";
import { buildQuery } from "../../../utils";

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

  const response = await fetch(`${SERVER_API_URL}${endpoint}${queryStr}`);

  const json = (await response.json()) as unknown;

  return json;
}
