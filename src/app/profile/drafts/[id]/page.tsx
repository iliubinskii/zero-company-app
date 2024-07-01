import { ClientPage } from "./ClientPage";
import { ERROR } from "../../../../consts";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import React from "react";
import { api } from "../../../../api";
import { assertDefined } from "../../../../utils";

const Page: NextPage<NextPageProps> = async ({ params = {} }) => {
  const categories = await api.getCategoriesSrv();

  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  return <ClientPage categories={categories.docs} id={id} />;
};

export default Page;
