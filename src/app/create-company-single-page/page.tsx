import { ClientPage } from "./ClientPage";
import React from "react";
import { createAsyncPage } from "../../utils";
import { getCategories } from "../../api";

const Page = createAsyncPage("/create-company-single-page", async () => {
  const categories = await getCategories();

  return <ClientPage categories={categories} />;
});

export default Page;
