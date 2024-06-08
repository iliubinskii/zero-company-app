import { COMPANY_LIMIT, ERROR } from "../../../consts";
import { assertDefined, createAsyncPage } from "../../../utils";
import { ClientPage } from "./ClientPage";
import { CompanyStatus } from "../../../schema";
import React from "react";
import { api } from "../../../api";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await api.getCategoriesSrv({ onlyPinned: true });

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page = createAsyncPage("/categories/[id]", async ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_CATEGORY_ID_PARAM);

  const [category, companies] = await Promise.all([
    api.getCategory(id),
    api.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc",
      status: CompanyStatus.founded
    })
  ]);

  if ("error" in category)
    throw new Error(`${category.error}: ${category.errorMessage}`);

  if ("error" in companies)
    throw new Error(`${companies.error}: ${companies.errorMessage}`);

  return <ClientPage category={category} companies={companies} />;
});

export default Page;
