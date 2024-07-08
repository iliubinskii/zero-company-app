import { bool, cleanEnv, str } from "envalid";
import { config } from "dotenv";

config({ path: ".env.e2e" });

export const { BASE_URL, CI } =
  // eslint-disable-next-line no-process-env -- Ok
  cleanEnv(process.env, {
    BASE_URL: str(),
    CI: bool({ default: false })
  });
