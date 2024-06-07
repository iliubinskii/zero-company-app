"use client";

import { DraftCard, DraftCards } from "../../../components";
import type { ExistingCompany, MultipleDocsResponse } from "../../../schema";
import { callAsync, createPage } from "../../../utils";
import { selectAuthUser, selectLoaded, useAppSelector } from "../../../store";
import { CompanyStatus } from "../../../schema";
import React, { useEffect } from "react";
import { api } from "../../../api";

const Page = createPage("/drafts", () => {
  const authUser = useAppSelector(selectAuthUser);

  const [companies, setCompanies] = React.useState<
    MultipleDocsResponse<ExistingCompany>
  >({
    count: 0,
    docs: [],
    total: 0
  });

  const loaded = useAppSelector(selectLoaded);

  useEffect(() => {
    if (loaded && authUser)
      callAsync(async () => {
        const nextCompanies = await api.getCompanies({
          sortBy: "createdAt",
          sortOrder: "desc",
          status: CompanyStatus.draft
        });

        setCompanies(nextCompanies);
      });
  }, [loaded, authUser]);

  return (
    <DraftCards>
      {companies.docs.map(company => (
        <DraftCard company={company} key={company._id} />
      ))}
    </DraftCards>
  );
});

export default Page;
