import { CompanyCard, CompanyCards } from "../../components";
import {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../schema";
import { GetServerSideProps, NextPage } from "next";
import {
  assertDefined,
  assertString,
  callAsync,
  filterUndefinedProperties
} from "../../utils";
import { BeatLoader } from "react-spinners";
import { COMPANY_LIMIT } from "../../consts";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { lang } from "../../langs";
import { serverAPI } from "../../api";

const Page: NextPage<Props> = ({
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [autoMode, setAutoMode] = useState(false);

  const [companies, setCompanies] = useState(initialCompanies);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const fetchMoreData = React.useCallback(() => {
    callAsync(async () => {
      setAutoMode(true);
      setLoading(true);

      try {
        const response = await serverAPI.getCompaniesByCategory(
          category._id,
          filterUndefinedProperties({
            cursor: nextCursor,
            limit: COMPANY_LIMIT,
            sortBy: "foundedAt",
            sortOrder: "desc"
          })
        );

        if (response) {
          setCompanies([...companies, ...response.docs]);
          setNextCursor(response.nextCursor);
        }
      } finally {
        setLoading(false);
      }
    });
  }, [category, companies, nextCursor]);

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
      <div className="blocks-layout-lg">
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
        {nextCursor ? (
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
        ) : undefined}
        {/* More button or spinner END */}
      </div>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const params = assertDefined(context.params);

  const id = assertString(params["id"]);

  const [category, companies] = await Promise.all([
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc"
    })
  ]);

  return category && companies
    ? { props: { category, companies } }
    : { notFound: true };
};

export interface Props {
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
