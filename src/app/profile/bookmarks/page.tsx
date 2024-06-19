import { ClientPage } from "./ClientPage";
import type { NextPage } from "next";
import React from "react";
import { getCategoriesSrv } from "../../../server-cache";

const Page: NextPage = async () => {
  const categories = await getCategoriesSrv();

  return <ClientPage categories={categories} />;
};

export default Page;
