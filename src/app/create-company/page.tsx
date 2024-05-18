import React from "react";
import { SuccessPage } from "./SuccessPage";
import { createPage } from "../../utils";
import { serverAPI } from "../../api";

const Page = createPage("/create-company", async () => {
  const categories = await serverAPI.getCategories();

  return <SuccessPage categories={categories} />;
});

export default Page;
