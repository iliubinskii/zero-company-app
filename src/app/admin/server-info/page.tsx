import type { NextApiRequest, NextApiResponse } from "next";
import { API_URL } from "../../../config";
import { StatusCodes } from "http-status-codes";
import { lang } from "../../../langs";
import { schemaVersion } from "../../../schema";

/**
 * Server info handler
 * @param _req - Request
 * @param res - Response
 */
export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse
): void {
  console.info(`${lang.ZeroAppServer} ${schemaVersion}`);
  console.info(`${lang.ApiUrl}: ${API_URL}`);

  res.status(StatusCodes.OK).send(lang.ServerInfoLogged);
}
