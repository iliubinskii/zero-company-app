import { assertDefined, createPage } from "../../../utils";
import { COMPANY_LIMIT } from "../../../consts";
import React from "react";
import { SuccessPage } from "./SuccessPage";
import { notFound } from "next/navigation";
import { serverAPI } from "../../../api";

const Page = createPage("/categories/[id]", async ({ params }) => {
  const id = assertDefined(params["id"]);

  const [category, companies] = await Promise.all([
    serverAPI.getCategory(id),
    serverAPI.getCompaniesByCategory(id, {
      limit: COMPANY_LIMIT,
      sortBy: "foundedAt",
      sortOrder: "desc"
    })
  ]);

  return category && companies ? (
    <SuccessPage category={category} companies={companies} />
  ) : (
    notFound()
  );
});

export default Page;
