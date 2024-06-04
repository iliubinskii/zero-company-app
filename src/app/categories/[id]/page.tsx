import { assertDefined, createAsyncPage } from "../../../utils";

import {
  getCategories,
  getCategory,
  getCompaniesByCategory
} from "../../../api";
import { COMPANY_LIMIT } from "../../../consts";
import { ClientPage } from "./ClientPage";
import React from "react";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await getCategories({ onlyPinned: true });

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page = createAsyncPage("/categories/[id]", async ({ params = {} }) => {
  const id = assertDefined(params["id"]);

  const [category, companies] = await Promise.all([
    getCategory(id),
    getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc"
    })
  ]);

  return <ClientPage category={category} companies={companies} />;
});

export default Page;
