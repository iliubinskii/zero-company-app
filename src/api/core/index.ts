import { API_URL, JWT_SECRET } from "../../config";
import { JWT_EXPIRES_IN } from "../../consts";
import jwt from "jsonwebtoken";

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
  const queryObject = Object.fromEntries(
    (function* yieldEntries() {
      for (const [key, value] of Object.entries(query)) {
        // eslint-disable-next-line no-warning-comments -- Postponed
        // TODO: ESLint should check for exhaustive switch cases
        switch (typeof value) {
          case "number": {
            yield [key, value.toString()];

            break;
          }

          case "string": {
            yield [key, value];

            break;
          }
        }
      }
    })()
  );

  const queryParams = new URLSearchParams(queryObject);

  const queryStr = queryParams.toString();

  const token = jwt.sign(queryObject, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN
  });

  const response = await fetch(
    queryStr.length > 0
      ? `${API_URL}${endpoint}?${queryStr}`
      : `${API_URL}${endpoint}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  const json = await response.json();

  return json;
}

export interface Query {
  readonly [key: string]: number | string | undefined;
}
