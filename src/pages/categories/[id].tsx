// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Pagination or infinite scroll for companies

import { CompanyCard, Fallback, Header2 } from "../../components";
import {
  ExistingCategory,
  ExistingCompany,
  MultipleDocsResponse
} from "../../schema";
import { GetServerSideProps, NextPage } from "next";
import { assertDefined, assertString } from "../../utils";
import Head from "next/head";
import React from "react";
import { lang } from "../../langs";
import { serverAPI } from "../../api";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ category, companies }) => {
  const router = useRouter();

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
          {companies.docs.map(company => (
            <CompanyCard company={company} key={company._id} />
          ))}
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
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id)
  ]);

  return category && companies
    ? { props: { category, companies } }
    : { notFound: true };
};

export interface Props {
  readonly category: ExistingCategory;
  readonly companies: MultipleDocsResponse<ExistingCompany>;
}
