/**
 * Build form data
 * @param data - Form object.
 * @returns Form data.
 */
export function buildFormData(data: RequestData): FormData {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data))
    switch (typeof value) {
      case "boolean": {
        formData.append(key, value ? "yes" : "no");

        break;
      }

      case "number": {
        formData.append(key, value.toString());

        break;
      }

      case "string": {
        formData.append(key, value);

        break;
      }

      case "object": {
        if (value === null) formData.append(key, "");
        else
          for (const [i, v] of value.entries())
            formData.append(`${key}[${i}]`, v.toString());

        break;
      }

      default:
      // Not reachable
    }

  return formData;
}

/**
 * Build query string
 * @param data - Query object.
 * @returns Query string.
 */
export function buildQuery(data: RequestData): string {
  const queryObject: Record<string, string> = {};

  for (const [key, value] of Object.entries(data))
    switch (typeof value) {
      case "boolean": {
        queryObject[key] = value ? "yes" : "no";

        break;
      }

      case "number": {
        queryObject[key] = value.toString();

        break;
      }

      case "string": {
        queryObject[key] = value;

        break;
      }

      case "object": {
        if (value === null) queryObject[key] = "";
        else
          for (const [i, v] of value.entries())
            queryObject[`${key}[${i}]`] = v.toString();

        break;
      }

      default:
      // Not reachable
    }

  const queryParams = new URLSearchParams(queryObject);

  const queryStr = queryParams.toString();

  return queryStr.length > 0 ? `?${queryStr}` : "";
}

export interface RequestData {
  readonly [key: string]:
    | boolean
    | number
    | string
    | null
    | undefined
    | readonly string[];
}
