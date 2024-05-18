import { COMPANY_LIMIT } from "../../../consts";
import { NextPage } from "next";
import React from "react";
import { SuccessPage } from "./SuccessPage";
import { notFound } from "next/navigation";
import { serverAPI } from "../../../api";

const Page: NextPage<Props> = async ({ params }) => {
  const { id } = params;

  if (typeof id === "string") {
    const [category, companies] = await Promise.all([
      serverAPI.getCategory(id),
      serverAPI.getCompaniesByCategory(id, {
        limit: COMPANY_LIMIT,
        sortBy: "foundedAt",
        sortOrder: "desc"
      })
    ]);

    if (category && companies)
      return <SuccessPage category={category} companies={companies} />;
  }

  return notFound();
};

export default Page;

export interface Props {
  readonly params: { readonly id: unknown };
}
