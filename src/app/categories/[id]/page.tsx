import { COMPANY_LIMIT, ERROR } from "../../../consts";
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
  const categories = await api.getCategoriesSrv({ onlyPinned: true });

  return categories.docs.map(category => {
    return { id: category._id };
  });
}

const Page: NextPage<NextPageProps> = async ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_CATEGORY_ID_PARAM);

  const [categories, category, companies] = await Promise.all([
    api.getCategoriesSrv(),
    api.getCategorySrv(id),
    api.getCompaniesByCategorySrv(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc",
      status: CompanyStatus.founded
    })
  ]);

  return (
    <ClientPage
      categories={categories.docs}
      category={category}
      companies={companies}
    />
  );
};

export default Page;
