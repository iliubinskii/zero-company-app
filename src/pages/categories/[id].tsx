import {
  BlocksLayout,
  CompanyCard,
  CompanyCards,
  DarkButton,
  Fallback,
  Header2,
  Overview,
  Paragraphs
} from "../../components";
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
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [autoMode, setAutoMode] = useState(false);

  const [companies, setCompanies] = useState(initialCompanies);

  const loadMoreButtonRef = useRef<HTMLButtonElement>(null);

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const router = useRouter();

  const fetchMoreData = React.useCallback(() => {
    callAsync(async () => {
      setAutoMode(true);
      setLoading(true);

      try {
        const response = await serverAPI.getCompaniesByCategory(
          category._id,
          filterUndefinedProperties({
            cursor: nextCursor,
            limit: COMPANY_LIMIT
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

  if (router.isFallback) return <Fallback />;

  return (
    <>
      <Head>
        <title>{`${category.name} - ${lang.app.title}`}</title>
        <meta content={category.tagline} name="description" />
      </Head>
      <BlocksLayout wide>
        {/* Overview */}
        <Overview>
          <Header2>{category.name}</Header2>
          <Paragraphs>
            <p>{category.description}</p>
          </Paragraphs>
        </Overview>
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
            <DarkButton
              disabled={loading}
              onClick={fetchMoreData}
              ref={loadMoreButtonRef}
            >
              {loading ? <BeatLoader color="#ffffff" /> : lang.LoadMore}
            </DarkButton>
          </div>
        ) : undefined}
        {/* More button or spinner END */}
      </BlocksLayout>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const params = assertDefined(context.params);

  const id = assertString(params["id"]);

  const [category, companies] = await Promise.all([
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id, { limit: COMPANY_LIMIT })
  ]);

  return category && companies
    ? { props: { category, companies } }
    : { notFound: true };
};

export interface Props {
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
