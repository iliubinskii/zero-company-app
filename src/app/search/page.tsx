"use client";

import { BigSpinner, CompanyCard, CompanyCards } from "../../components/";
import type { ExistingCategory, ExistingCompanies } from "../../schema";
import { logError, showSnackbar, useAppDispatch } from "../../store";
import { COMPANY_LIMIT } from "../../consts";
import type { NextPage } from "next";
import { PageLayout } from "../../layouts/";
import React, { useEffect, useState } from "react";
import { api } from "../../api";
import { useAsyncCallback } from "../../hooks";
import { useSearchParams } from "next/navigation";

const Page: NextPage = () => {
  const [companies, setCompanies] = React.useState<ExistingCompanies>({
    count: 0,
    docs: [],
    total: 0
  });

  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState<ExistingCategory[]>([]);

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const { callback: loadCompanies, isLoading } = useAsyncCallback(async () => {
    const [nextCompanies, nextCategories] = await Promise.all([
      api.getCompanies({
        limit: COMPANY_LIMIT,
        q,
        sortBy: "foundedAt",
        sortOrder: "asc"
      }),
      api.getCategories()
    ]);
    if ("error" in nextCompanies)
      dispatch(
        logError({ error: nextCompanies, message: nextCompanies.errorMessage })
      );
    else if ("error" in nextCategories)
      dispatch(
        showSnackbar({
          message: nextCategories.errorMessage,
          variant: "error"
        })
      );
    else {
      setCompanies(nextCompanies);
      setLoading(isLoading);
      setCategories([...nextCategories.docs]);
    }
  }, [dispatch, q]);

  useEffect(() => {
    loadCompanies();
  }, [loadCompanies]);

  return (
    <>
      {loading ? (
        <div className="py-24 flex justify-center items-center">
          <BigSpinner />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default Page;
