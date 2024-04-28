/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";

export const API_URL = assertDefined(process.env["NEXT_PUBLIC_API_URL"]);

export const AUTH0_CLIENT_ID = assertDefined(
  process.env["NEXT_PUBLIC_AUTH0_CLIENT_ID"]
);

export const AUTH0_DOMAIN = assertDefined(
  process.env["NEXT_PUBLIC_AUTH0_DOMAIN"]
);

export const AUTH0_REDIRECT_URI = assertDefined(
  process.env["NEXT_PUBLIC_AUTH0_REDIRECT_URI"]
);

export const JWT_SECRET = assertDefined(process.env["JWT_SECRET"]);
