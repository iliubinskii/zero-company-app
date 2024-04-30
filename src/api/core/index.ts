import { Query, buildQuery } from "../../utils";
import { API_URL } from "../../config";

/**
 * Retrieves data from the API.
 * @param endpoint - The endpoint.
 * @param query - The query.
 * @returns The data.
 */
export async function get(
  endpoint: string,
  query: Query = {}
): Promise<unknown> {
  const queryStr = buildQuery(query);

  const response = await fetch(`${API_URL}${endpoint}${queryStr}`);

  const json = await response.json();

  return json;
}
