import { createPage } from "../../../utils";
import { logServerInfo } from "../../../services";
import { notFound } from "next/navigation";

/**
 * Server info handler
 * @param _req - Request
 * @param res - Response
 */
const Page = createPage("/server-info", () => {
  logServerInfo();

  return notFound();
});

export default Page;
