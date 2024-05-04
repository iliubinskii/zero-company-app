// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Pagination or infinite scroll for companies

import {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../schema";
import { GetServerSideProps, NextPage } from "next";
import { assertDefined, assertString } from "../../utils";
import { getCategory, getCompaniesByCategory } from "../../api";
import Head from "next/head";
import { Header2 } from "../../components";
import React from "react";
import { lang } from "../../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ category, companies }) => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

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
        <div className="-mx-1 carousel">
          {companies.docs.map(company => {
            const { height, secureUrl, width } = assertDefined(
              company.images[0]
            );

            return (
              <div
                className="carousel-item w-1/4 min-w-1/4 px-1 flex-col"
                key={company._id}
              >
                <img
                  alt={company.name}
                  className="w-full"
                  height={height}
                  src={secureUrl}
                  width={width}
                />
                {company.name}
              </div>
            );
          })}
        </div>
        {/* Companies END */}
      </div>
    </>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const params = assertDefined(context.params);

  const id = assertString(params["id"]);

  const [category, companies] = await Promise.all([
    getCategory(id),
    getCompaniesByCategory(id)
  ]);

  return { props: { category, companies } };
};

export interface Props {
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
