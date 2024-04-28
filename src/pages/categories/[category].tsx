import { GetCategoriesResponse, GetCompaniesResponse } from "../../schema";
import { GetServerSideProps, NextPage } from "next";
import { assertDefined, assertString } from "../../utils";
import { getCategories, getCompaniesByCategory } from "../../api";
import Layout from "../../Layout";
import React from "react";
import { lang } from "../../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ categories, companies }) => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

  return (
    <Layout categories={categories}>
      <div className="self-center m-9 max-w-screen-lg flex flex-col gap-9">
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
    </Layout>
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const params = assertDefined(context.params);

  const category = assertString(params["category"]);

  const [categories, companies] = await Promise.all([
    getCategories(),
    getCompaniesByCategory(category)
  ]);

  return { props: { categories, companies } };
};

export interface Props {
  readonly categories: GetCategoriesResponse;
  readonly companies: GetCompaniesResponse;
}
