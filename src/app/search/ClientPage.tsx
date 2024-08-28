"use client";

import {
  BigSpinner,
  CompanyCard,
  CompanyCards,
  LoadMoreButton
} from "../../components/";
import type { ExistingCategory, ExistingCompanies } from "../../schema";
import { logError, useAppDispatch } from "../../store";
import { COMPANY_LIMIT } from "../../consts";
import type { FC } from "react";
import { PageLayout } from "../../layouts/";
import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../api";
import { callAsync } from "../../utils";
import { logger } from "../../services";
import { useAsyncCallback } from "../../hooks";
import { useSearchParams } from "next/navigation";

export const ClientPage: FC<Props> = ({ categories }) => {
  const [companies, setCompanies] = useState<ExistingCompanies>({
    count: 0,
    docs: [],
    nextCursor: undefined,
    total: 0
  });

  const [autoMode, setAutoMode] = useState(false);

  const [loading, setLoading] = useState(false);

  const [initialized, setInitialized] = useState(false);

  const dispatch = useAppDispatch();

  const searchParams = useSearchParams();

  const q = searchParams.get("q");

  const fetchMoreData = useCallback(() => {
    callAsync(async () => {
      setAutoMode(true);
      setLoading(true);

      try {
        const response = await api.getCompanies({
          cursor: companies.nextCursor ?? undefined,
          limit: COMPANY_LIMIT,
          q,
          sortBy: "foundedAt",
          sortOrder: "desc"
        });

        if ("error" in response) {
          setAutoMode(false);
          dispatch(
            logError({ error: response, message: response.errorMessage })
          );
        } else
          setCompanies({
            ...companies,
            docs: [...companies.docs, ...response.docs],
            nextCursor: response.nextCursor
          });
      } catch (err) {
        setAutoMode(false);
        logger.error(err);
      } finally {
        setLoading(false);
      }
    });
  }, [companies, dispatch, q]);

  const { callback: loadCompanies } = useAsyncCallback(async () => {
    const nextCompanies = await api.getCompanies({
      limit: COMPANY_LIMIT,
      q,
      sortBy: "foundedAt",
      sortOrder: "desc"
    });

    if ("error" in nextCompanies)
      dispatch(
        logError({ error: nextCompanies, message: nextCompanies.errorMessage })
      );
    else setCompanies({ ...nextCompanies });

    setInitialized(true);
  }, [dispatch, q]);

  useEffect(() => {
    loadCompanies();
    setAutoMode(false);
    setLoading(false);
  }, [loadCompanies]);

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
      {companies.nextCursor && (
        <LoadMoreButton
          autoMode={autoMode}
          fetchMoreData={fetchMoreData}
          loading={loading}
        />
      )}
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
