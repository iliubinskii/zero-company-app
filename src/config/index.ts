/* eslint-disable no-process-env -- Ok */

import { ERROR } from "../consts";
import { assertDefined } from "../utils";

export const API_URL = str(
  process.env["NEXT_PUBLIC_API_URL"],
  ERROR.EXPECTING_API_URL_ENV
);

export const LOG_ERROR_SNACKBAR = bool(
  process.env["NEXT_PUBLIC_LOG_ERROR_SNACKBAR"],
  false,
  ERROR.EXPECTING_VALID_LOG_ERROR_SNACKBAR_ENV
);

/**
 * Get the environment variable value.
 * @param value - The environment variable value.
 * @param defaultValue - The default value.
 * @param errorMessage - The error message.
 * @returns The environment variable value.
 */
function bool(
  value: string | undefined,
  defaultValue: boolean,
  errorMessage: string
): boolean {
  switch (value) {
    case "true": {
      return true;
    }

    case "false": {
      return false;
    }

    case undefined: {
      return defaultValue;
    }

    default: {
      throw new Error(errorMessage);
    }
  }
}

/**
 * Get the environment variable value.
 * @param value - The environment variable value.
 * @param errorMessage - The error message.
 * @returns The environment variable value.
 */
function str(value: string | undefined, errorMessage: string): string {
  return assertDefined(value, errorMessage);
}
