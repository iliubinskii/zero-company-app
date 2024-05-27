import { API_URL } from "../config";
import { lang } from "../langs";
import { schema } from "../schema";

/**
 * Log server info
 */
export function logServerInfo(): void {
  console.info(`${lang.ZeroAppServer} ${schema.info.version}`);
  console.info(`${lang.ApiUrl}: ${API_URL}`);
}
