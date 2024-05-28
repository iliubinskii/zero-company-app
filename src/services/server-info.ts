import { API_URL } from "../config";
import { lang } from "../langs";
import { logger } from "./logger";
import { schema } from "../schema";

/**
 * Log server info
 */
export function logServerInfo(): void {
  logger.info(`${lang.ZeroAppServer} ${schema.info.version}`);
  logger.info(`${lang.ApiUrl}: ${API_URL}`);
}
