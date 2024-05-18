import { NextPage } from "next";
import React from "react";
import { SuccessPage } from "./SuccessPage";
import { serverAPI } from "../../api";

const Page: NextPage = async () => {
  const categories = await serverAPI.getCategories();

  return <SuccessPage categories={categories} />;
};

export default Page;
