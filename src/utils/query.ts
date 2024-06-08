/**
 * Builds a query.
 * @param query - Query object.
 * @returns The query string with question mark.
 */
export function buildQuery(query: Query): string {
  const queryObject = Object.fromEntries(
    (function* yieldEntries(): Generator<[string, string]> {
      for (const [key, value] of Object.entries(query))
        switch (typeof value) {
          case "boolean": {
            yield [key, value ? "yes" : "no"];

            break;
          }

          case "number": {
            yield [key, value.toString()];

            break;
          }

          case "string": {
            yield [key, value];

            break;
          }

          case "object": {
            for (const [i, v] of value.entries())
              yield [`${key}[${i}]`, v.toString()];

            break;
          }

          default:
        }
    })()
  );

  const queryParams = new URLSearchParams(queryObject);

  const queryStr = queryParams.toString();

  return queryStr.length > 0 ? `?${queryStr}` : "";
}

export interface Query {
  readonly [key: string]:
    | boolean
    | number
    | string
    | undefined
    | readonly string[];
}
