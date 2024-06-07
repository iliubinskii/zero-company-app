"use client";

import { CompanyCard, CompanyCards, PageLayout } from "../../../components";
import type {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../../schema";
import { showSnackbar, useAppDispatch } from "../../../store";
import { BeatLoader } from "react-spinners";
import { COMPANY_LIMIT } from "../../../consts";
import type { FC } from "react";
import Head from "next/head";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { api } from "../../../api";
import { callAsync } from "../../../utils";
import { lang } from "../../../langs";
import { logger } from "../../../services";

export const ClientPage: FC<Props> = ({
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [autoMode, setAutoMode] = useState(false);

  const [companies, setCompanies] = useState(initialCompanies);

  const dispatch = useAppDispatch();

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const fetchMoreData = useCallback(() => {
    callAsync(async () => {
      setAutoMode(true);
      setLoading(true);

      try {
        const response = await api.getCompaniesByCategory(category._id, {
          cursor: nextCursor,
          limit: COMPANY_LIMIT,
          sortBy: "foundedAt",
          sortOrder: "desc"
        });

        if ("error" in response) {
          logger.error(`${response.error}: ${response.errorMessage}`);
          dispatch(
            showSnackbar({ message: response.errorMessage, variant: "error" })
          );
          setAutoMode(false);
        } else {
          setCompanies([...companies, ...response.docs]);
          setNextCursor(response.nextCursor);
        }
      } catch (err) {
        setAutoMode(false);
        throw err;
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

  useEffect(() => {
    const target = loadMoreButtonRef.current;

    if (autoMode && nextCursor && target && !loading) {
      const observer = new IntersectionObserver(
        entries => {
          if (entries.some(entry => entry.isIntersecting)) fetchMoreData();
        },
        {
          root: null,
          rootMargin: "0px",
          threshold: 1
        }
      );

      observer.observe(target);

      return () => {
        observer.unobserve(target);
      };
    }

    return undefined;
  }, [autoMode, fetchMoreData, loading, nextCursor]);

  return (
    <>
      <Head>
        <title>{`${category.name} - ${lang.app.title}`}</title>
        <meta content={category.tagline} name="description" />
      </Head>
      <PageLayout size="lg">
        {/* Overview */}
        <div className="overview">
          <div className="header2">{category.name}</div>
          <div className="paragraphs">
            <p>{category.description}</p>
          </div>
        </div>
        {/* Overview END */}

        {/* Company cards */}
        <CompanyCards>
          {companies.map(company => (
            <CompanyCard company={company} key={company._id} />
          ))}
        </CompanyCards>
        {/* Company cards END */}

        {/* More button or spinner */}
        {nextCursor && (
          <div className="flex justify-center">
            <button
              className="dark-button relative"
              disabled={loading}
              onClick={fetchMoreData}
              ref={loadMoreButtonRef}
            >
              {loading ? (
                <>
                  <div className="opacity-0">{lang.LoadMore}</div>
                  <div className="absolute inset-0 flex justify-center items-center">
                    <BeatLoader color="#ffffff" />
                  </div>
                </>
              ) : (
                <div>{lang.LoadMore}</div>
              )}
            </button>
          </div>
        )}
        {/* More button or spinner END */}
      </PageLayout>
    </>
  );
};

export interface Props {
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
