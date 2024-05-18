import React from "react";
import { SuccessPage } from "./SuccessPage";
import { createAsyncPage } from "../../utils";
import { serverAPI } from "../../api";

const Page = createAsyncPage("/create-company", async () => {
  const categories = await serverAPI.getCategories();

  return <SuccessPage categories={categories} />;
});

export default Page;
