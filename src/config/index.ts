/* eslint-disable no-process-env -- Ok */

import { ERROR } from "../consts";
import { assertDefined } from "../utils";

export const API_URL = assertDefined(
  process.env["NEXT_PUBLIC_API_URL"],
  ERROR.EXPECTING_API_URL_ENV
);
