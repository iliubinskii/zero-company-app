import { ClientPage } from "./ClientPage";
import React from "react";
import { api } from "../../../api";
import { createAsyncPage } from "../../../utils";

const Page = createAsyncPage("/create-company/steps", async () => {
  const categories = await api.getCategoriesSrv();

  return <ClientPage categories={categories} />;
});

export default Page;
