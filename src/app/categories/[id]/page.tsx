import { COMPANY_LIMIT, ERROR } from "../../../consts";
import {
  getCategoriesSrv,
  getPinnedCategoriesSrv
} from "../../../server-cache";
import { ClientPage } from "./ClientPage";
import { CompanyStatus } from "../../../schema";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../types";
import React from "react";
import { api } from "../../../api";
import { assertDefined } from "../../../utils";

/**
 * Generates static parameters.
 * @returns Static parameters.
 */
export async function generateStaticParams(): Promise<unknown[]> {
  const categories = await getPinnedCategoriesSrv();

  return categories.map(category => {
    return { id: category._id };
  });
}

const Page: NextPage<NextPageProps> = async ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_CATEGORY_ID_PARAM);

  const categories = await getCategoriesSrv();

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

  return (
    <ClientPage
      categories={categories}
      category={category}
      companies={companies}
    />
  );
};

export default Page;
