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
  callAsync,
  filterUndefinedProperties
} from "../../utils";
import { BeatLoader } from "react-spinners";
import { COMPANY_LIMIT } from "../../consts";
import Head from "next/head";
import React, { useState } from "react";
import { lang } from "../../langs";
import { serverAPI } from "../../api";
import { useRouter } from "next/router";

// eslint-disable-next-line no-warning-comments -- Assigned
// TODO: Infinite scroll for companies
// Phase 1: Load on clicking more button +
// Phase 2: Load on scrolling to the bottom
// Add tailwind spinner +
// Remove temp footer when implemented
const Page: NextPage<Props> = ({
  category,
  companies: { docs: initialCompanies, nextCursor: initialNextCursor }
}) => {
  const [companies, setCompanies] = React.useState(initialCompanies);

  const [loading, setLoading] = useState(false);

  const [nextCursor, setNextCursor] = React.useState(initialNextCursor);

  const router = useRouter();

  const fetchMoreData = (): void => {
    setLoading(true);
    callAsync(async () => {
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
  };

  React.useEffect(() => {
    setCompanies(initialCompanies);
    setNextCursor(initialNextCursor);
  }, [initialCompanies, initialNextCursor]);

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
          loading ? (
            <BeatLoader className="block mx-auto" color="#000000" />
          ) : (
            <button
              className="self-start rounded px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-opacity-50 block mx-auto"
              onClick={fetchMoreData}
            >
              See more
            </button>
          )
        ) : undefined}
        {/* More button or spinner END */}

        {/* Temp footer */}
        <div className="bg-gray-50" style={{ height: "400px" }} />
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
