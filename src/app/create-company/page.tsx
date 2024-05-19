import React from "react";
import { SyncPage } from "./SyncPage";
import { createAsyncPage } from "../../utils";
import { serverAPI } from "../../api";

const Page = createAsyncPage("/create-company", async () => {
  const categories = await serverAPI.getCategories();

  return <SyncPage categories={categories} />;
});

export default Page;
