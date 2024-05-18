import { assertDefined, createPage } from "../../../utils";
import { COMPANY_LIMIT } from "../../../consts";
import React from "react";
import { SuccessPage } from "./SuccessPage";
import { serverAPI } from "../../../api";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await serverAPI.getCategories(true);

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page = createPage("/categories/[id]", async ({ params = {} }) => {
  const id = assertDefined(params["id"]);

  const [category, companies] = await Promise.all([
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc"
    })
  ]);

  return <SuccessPage category={category} companies={companies} />;
});

export default Page;
