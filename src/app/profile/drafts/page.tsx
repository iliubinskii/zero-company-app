"use client";

import { DraftCard, DraftCards } from "../../../components";
import type { ExistingCompany, MultipleDocsResponse } from "../../../schema";
import { CompanyStatus } from "../../../schema";
import React from "react";
import { api } from "../../../api";
import { createPage } from "../../../utils";
import { useAuthGuardedLoader } from "../../../hooks";

const Page = createPage("/profile/drafts", () => {
  const { resource: companies = defaultCompanies } = useAuthGuardedLoader(
    () =>
      api.getCompaniesByMe({
        sortBy: "createdAt",
        sortOrder: "desc",
        status: CompanyStatus.draft
      }),
    []
  );

  return (
    <DraftCards>
      {companies.docs.map(company => (
        <DraftCard company={company} key={company._id} />
      ))}
    </DraftCards>
  );
});

export default Page;

const defaultCompanies: MultipleDocsResponse<ExistingCompany> = {
  count: 0,
  docs: [],
  total: 0
};
