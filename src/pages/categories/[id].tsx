// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Pagination or infinite scroll for companies

import { CompanyCard, Fallback, Header2 } from "../../components";
import {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../schema";
import { GetServerSideProps, NextPage } from "next";
import {
  assertDefined,
  assertString,
  filterUndefinedProperties
} from "../../utils";
import { BeatLoader } from "react-spinners";
import { COMPANY_LIMIT } from "../../consts";
import Footer from "../../components/Footer";
import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import { lang } from "../../langs";
import { serverAPI } from "../../api";
import { useRouter } from "next/router";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: Infinite scroll for companies -- done
const Page: NextPage<Props> = ({
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [buttonClicked, setButtonClicked] = useState(false);

  const [companies, setCompanies] = useState(initialCompanies);

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = useState(initialNextCursor);

  const router = useRouter();

  const targetRef = useRef(null);

  useEffect(() => {
    setCompanies(initialCompanies);
    setNextCursor(initialNextCursor);
    setButtonClicked(false);
  }, [initialCompanies, initialNextCursor]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries)
          if (entry.isIntersecting && !loading && nextCursor && buttonClicked) {
            // eslint-disable-next-line @typescript-eslint/no-floating-promises -- No need to wait
            fetchMoreData();
            break;
          }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 1
      }
    );

    const target = targetRef.current;
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Necessary for SSR
    if (target) observer.observe(target);

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition, spellcheck/spell-checker -- Necessary for SSR
      if (target) observer.unobserve(target);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- fetchMoreData is a constant function
  }, [loading, nextCursor, buttonClicked, targetRef]);

  const fetchMoreData = async (): Promise<void> => {
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
  };

  const handleClick = async (): Promise<void> => {
    setLoading(true);
    setButtonClicked(true);
    await fetchMoreData();
  };

  if (router.isFallback) return <Fallback />;

  return (
    <>
      <Head>
        <title>{`${category.name} - ${lang.app.title}`}</title>
        <meta content={category.tagline} name="description" />
      </Head>
      <div className="flex flex-col gap-9">
        {/* Category */}
        <div className="flex flex-col gap-4">
          <Header2>{category.name}</Header2>
          <p>{category.description}</p>
        </div>
        {/* Category END */}

        {/* Companies */}
        <div className="grid grid-cols-4 gap-4">
          {companies.map(company => (
            <CompanyCard company={company} key={company._id} />
          ))}
        </div>
        {/* Companies END */}

        {/* More button or spinner */}
        {nextCursor ? (
          <button
            className="self-start rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 block mx-auto relative"
            disabled={loading}
            // eslint-disable-next-line @typescript-eslint/no-misused-promises -- No need to pass event
            onClick={handleClick}
            ref={targetRef}
          >
            {loading ? <BeatLoader color="#ffffff" /> : "Load more"}
          </button>
        ) : null}
        {/* More button or spinner END */}

        {/* Temp footer */}
        <Footer />
        {/* Temp footer END */}
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
