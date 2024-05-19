import { assertDefined, createAsyncPage } from "../../../utils";
import { COMPANY_LIMIT } from "../../../consts";
import React from "react";
import { SyncPage } from "./SyncPage";
import { serverAPI } from "../../../api";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await serverAPI.getCategories({ onlyPinned: true });

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page = createAsyncPage("/categories/[id]", async ({ params = {} }) => {
  const id = assertDefined(params["id"]);

  const [category, companies] = await Promise.all([
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc"
    })
  ]);

  return <SyncPage category={category} companies={companies} />;
});

export default Page;
