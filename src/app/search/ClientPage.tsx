"use client";

import { BigSpinner, CompanyCard, CompanyCards } from "../../components/";
import type { ExistingCategory, ExistingCompanies } from "../../schema";
import { logError, useAppDispatch } from "../../store";
import { COMPANY_LIMIT } from "../../consts";
import type { FC } from "react";
import { PageLayout } from "../../layouts/";
import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useAsyncCallback } from "../../hooks";
import { useSearchParams } from "next/navigation";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: Infinite loading pagination
export const ClientPage: FC<Props> = ({ categories }) => {
  const [companies, setCompanies] = React.useState<ExistingCompanies>({
    count: 0,
    docs: [],
    total: 0
  });

  const [initialized, setInitialized] = useState(false);

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const { callback: loadCompanies } = useAsyncCallback(async () => {
    const nextCompanies = await api.getCompanies({
      limit: COMPANY_LIMIT,
      q,
      sortBy: "foundedAt",
      sortOrder: "asc"
    });

    if ("error" in nextCompanies)
      dispatch(
        logError({ error: nextCompanies, message: nextCompanies.errorMessage })
      );
    else setCompanies(nextCompanies);

    setInitialized(true);
  }, [dispatch, q]);

  useEffect(loadCompanies, [loadCompanies]);

  return initialized ? (
    <PageLayout size="xl">
      <CompanyCards>
        {companies.docs.map(company => (
          <CompanyCard
            categories={categories}
            company={company}
            key={company._id}
          />
        ))}
      </CompanyCards>
    </PageLayout>
  ) : (
    <div className="py-40 flex justify-center items-center">
      <BigSpinner />
    </div>
  );
};

interface Props {
  readonly categories: readonly ExistingCategory[];
}
