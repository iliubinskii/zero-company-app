import { ClientPage } from "./ClientPage";
import React from "react";
import { api } from "../../api";
import { createAsyncPage } from "../../utils";

const Page = createAsyncPage("/create-company-single-page", async () => {
  const categories = await api.getCategories();

  if ("error" in categories)
    throw new Error(`${categories.error}: ${categories.errorMessage}`);

  return <ClientPage categories={categories} />;
});

export default Page;
