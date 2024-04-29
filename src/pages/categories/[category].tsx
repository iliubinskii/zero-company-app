import { GetServerSideProps, NextPage } from "next";
import { assertDefined, assertString } from "../../utils";
import { GetCompaniesResponse } from "../../schema";
import React from "react";
import { getCompaniesByCategory } from "../../api";
import { lang } from "../../langs";
import { useRouter } from "next/router";

const Page: NextPage<Props> = ({ companies }) => {
  const router = useRouter();

  // eslint-disable-next-line no-warning-comments -- Postponed
  // TODO: Style this
  if (router.isFallback) return <div>{lang.Loading}</div>;

  return (
    <div className="flex flex-col gap-9">
      {/* Companies */}
      <div className="-mx-1 carousel">
        {companies.docs.map(company => {
          const { height, secureUrl, width } = assertDefined(company.images[0]);

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
  );
};

export default Page;

export const getServerSideProps: GetServerSideProps<Props> = async context => {
  const params = assertDefined(context.params);

  const category = assertString(params["category"]);

  const companies = await getCompaniesByCategory(category);

  return { props: { companies } };
};

export interface Props {
  readonly companies: GetCompaniesResponse;
}
