import dot from "dot-object";

/**
 * Build form data
 * @param data - Form object.
 * @returns Form data.
 */
export function buildFormData(data: object): FormData {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
  const flat: RequestDataFlat = dot.dot(data);

  const formData = new FormData();

  for (const [key, value] of Object.entries(flat))
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

      default: {
        formData.append(key, "");
      }
    }

  return formData;
}

/**
 * Build query string
 * @param data - Query object.
 * @returns Query string.
 */
export function buildQuery(data: object): string {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment -- Ok
  const flat: RequestDataFlat = dot.dot(data);

  const queryObject: Record<string, string> = {};

  for (const [key, value] of Object.entries(flat))
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

      default: {
        queryObject[key] = "";
      }
    }

  const queryParams = new URLSearchParams(queryObject);

  const queryStr = queryParams.toString();

  return queryStr.length > 0 ? `?${queryStr}` : "";
}

type RequestDataFlat = Readonly<Record<string, unknown>>;
