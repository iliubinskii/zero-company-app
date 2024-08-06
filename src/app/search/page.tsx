import { ClientPage } from "./ClientPage";
import type { NextPage } from "next";
import React, { Suspense } from "react";
import { api } from "../../api";

const Page: NextPage = async () => {
  const categories = await api.getCategoriesSrv();

  return (
    <Suspense>
      <ClientPage categories={categories.docs} />
    </Suspense>
  );
};

export default Page;
