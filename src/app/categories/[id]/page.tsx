import { assertDefined, createAsyncPage } from "../../../utils";

import { COMPANY_LIMIT } from "../../../consts";
import { ClientPage } from "./ClientPage";
import { CompanyStatus } from "../../../schema";
import React from "react";
import { api } from "../../../api";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await api.getCategories({ onlyPinned: true });

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page = createAsyncPage("/categories/[id]", async ({ params = {} }) => {
  const id = assertDefined(params["id"]);

  const [category, companies] = await Promise.all([
    api.getCategory(id),
    api.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc",
      status: CompanyStatus.founded
    })
  ]);

  return <ClientPage category={category} companies={companies} />;
});

export default Page;
