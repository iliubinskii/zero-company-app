import { ClientPage } from "./ClientPage";
import { CompanyStatus } from "../schema";
import type { NextPage } from "next";
import React from "react";
import { api } from "../api";

const Page: NextPage = async () => {
  const [categories, companies] = await Promise.all([
    api.getCategoriesSrv(),
    api.getCompaniesSrv({
      limit: 4,
      onlyRecommended: true,
      sortBy: "foundedAt",
      sortOrder: "desc",
      status: CompanyStatus.founded
    })
  ]);

  return <ClientPage categories={categories.docs} companies={companies.docs} />;
};

export default Page;
