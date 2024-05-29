import React from "react";
import { SyncPage } from "./SyncPage";
import { createAsyncPage } from "../../utils";
import { getCategories } from "../../api";

const Page = createAsyncPage("/create-company-single-page", async () => {
  const categories = await getCategories();

  return <SyncPage categories={categories} />;
});

export default Page;
