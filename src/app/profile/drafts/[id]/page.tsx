"use client";

import { assertDefined, createPage } from "../../../../utils";
import { ERROR } from "../../../../consts";
import React from "react";
import { api } from "../../../../api";
import { useAuthGuardedLoader } from "../../../../hooks";

const Page = createPage("/profile/drafts/[id]", ({ params = {} }) => {
  const id = assertDefined(params["id"], ERROR.EXPECTING_DRAFT_ID_PARAM);

  const company = useAuthGuardedLoader(() => api.getCompany(id), [], {
    redirectOnNotFound: "/profile/drafts"
  });

  return <>{JSON.stringify(company)}</>;
});

export default Page;
