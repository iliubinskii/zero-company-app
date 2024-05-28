/* eslint-disable no-process-env -- Ok */

import { assertDefined } from "../utils";

export const API_URL = assertDefined(process.env["NEXT_PUBLIC_API_URL"]);
