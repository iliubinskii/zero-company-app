import { ClientPage } from "./ClientPage";
import { CompanyStatus } from "../schema";
import type { NextPage } from "next";
import React from "react";
import { api } from "../api";

const Page: NextPage = async () => {
  const categories = await api.getCategoriesSrv();

  const companies = await api.getCompaniesSrv({
    limit: 4,
    sortBy: "foundedAt",
    sortOrder: "desc",
    status: CompanyStatus.founded
  });

  return <ClientPage categories={categories.docs} companies={companies.docs} />;
};

export default Page;
