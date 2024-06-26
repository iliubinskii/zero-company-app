import { ClientPage } from "./ClientPage";
import type { NextPage } from "next";
import React from "react";
import { api } from "../../../api";

const Page: NextPage = async () => {
  const categories = await api.getCategoriesSrv();

  return <ClientPage categories={categories.docs} />;
};

export default Page;
