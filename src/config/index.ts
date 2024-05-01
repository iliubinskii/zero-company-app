/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";

export const CLIENT_API_URL = assertDefined(
  process.env["NEXT_PUBLIC_CLIENT_API_URL"]
);

export const SERVER_API_URL = assertDefined(
  process.env["NEXT_PUBLIC_SERVER_API_URL"]
);
