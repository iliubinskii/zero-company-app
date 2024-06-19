import { ClientPage } from "./ClientPage";
import { ERROR } from "../../../../consts";
import type { NextPage } from "next";
import type { NextPageProps } from "../../../../types";
import React from "react";
import { assertDefined } from "../../../../utils";

const Page: NextPage<NextPageProps> = ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_DOCUMENT_ID_PARAM);

  return <ClientPage id={id} />;
};

export default Page;
