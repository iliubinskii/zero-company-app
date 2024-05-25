import { API_URL } from "../../../config";
import { createPage } from "../../../utils";
import { lang } from "../../../langs";
import { notFound } from "next/navigation";
import { schemaVersion } from "../../../schema";

/**
 * Server info handler
 * @param _req - Request
 * @param res - Response
 */
const Page = createPage("/server-info", () => {
  console.info(`${lang.ZeroAppServer} ${schemaVersion}`);
  console.info(`${lang.ApiUrl}: ${API_URL}`);

  return notFound();
});

export default Page;
