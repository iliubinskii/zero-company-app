"use client";

import { CompanyCard, CompanyCards, LoadMoreButton } from "../../../components";
import type {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../../schema";
import { logError, useAppDispatch } from "../../../store";
import { COMPANY_LIMIT } from "../../../consts";
import type { FC } from "react";
import Head from "next/head";
import { PageLayout } from "../../../layouts";
import React, { useCallback, useEffect, useState } from "react";
import { api } from "../../../api";
import { callAsync } from "../../../utils";
import { lang } from "../../../langs";
import { logger } from "../../../services";

export const ClientPage: FC<Props> = ({
  categories,
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [autoMode, setAutoMode] = useState(false);

  const [companies, setCompanies] = useState(initialCompanies);

  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const fetchMoreData = useCallback(() => {
    callAsync(async () => {
      setAutoMode(true);
      setLoading(true);

      try {
        const response = await api.getCompaniesByCategory(category._id, {
          cursor: nextCursor ?? undefined,
          limit: COMPANY_LIMIT,
          sortBy: "foundedAt",
          sortOrder: "desc"
        });

        if ("error" in response) {
          setAutoMode(false);
          dispatch(
            logError({ error: response, message: response.errorMessage })
          );
        } else {
          setCompanies([...companies, ...response.docs]);
          setNextCursor(response.nextCursor);
        }
      } catch (err) {
        setAutoMode(false);
        logger.error(err);
      } finally {
        setLoading(false);
      }
    });
  }, [category, companies, dispatch, nextCursor]);

  useEffect(() => {
    setAutoMode(false);
    setCompanies(initialCompanies);
    setLoading(false);
    setNextCursor(initialNextCursor);
  }, [initialCompanies, initialNextCursor]);

  return (
    <>
      <Head>
        <title>{`${category.name} - ${lang.meta.title}`}</title>
        <meta content={category.tagline} name="description" />
      </Head>
      <PageLayout size="xl">
        {/* Overview */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-gray-500">{category.name}</h2>
          <p>{category.description}</p>
        </div>
        {/* Overview END */}

        {/* Company cards */}
        <CompanyCards>
          {companies.map(company => (
            <CompanyCard
              categories={categories}
              company={company}
              key={company._id}
            />
          ))}
        </CompanyCards>
        {/* Company cards END */}

        {/* More button or spinner */}
        {nextCursor && (
          <LoadMoreButton
            autoMode={autoMode}
            fetchMoreData={fetchMoreData}
            loading={loading}
          />
        )}
        {/* More button or spinner END */}
      </PageLayout>
    </>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
