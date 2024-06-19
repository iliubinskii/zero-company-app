import { ClientPage } from "./ClientPage";
import { ERROR } from "../../../../consts";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import React from "react";
import { assertDefined } from "../../../../utils";
import { getCategoriesSrv } from "../../../../server-cache";

const Page: NextPage<NextPageProps> = async ({ params = {} }) => {
  const categories = await getCategoriesSrv();

  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  return <ClientPage categories={categories} id={id} />;
};

export default Page;
