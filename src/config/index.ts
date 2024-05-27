/* eslint-disable no-process-env -- Ok */

import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_API_URL: str()
});

export const { NEXT_PUBLIC_API_URL: API_URL } = env;
