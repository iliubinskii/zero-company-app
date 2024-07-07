import { ArticleLayout } from "../../../layouts";
import { DummyArticle } from "../../../components";
import type { NextPage } from "next";
import React from "react";
import { lang } from "../../../langs";

// eslint-disable-next-line no-warning-comments -- Ok
// TODO: Add real content
const Page: NextPage = () => (
  <ArticleLayout>
    <DummyArticle title={lang.Blog} />
  </ArticleLayout>
);

export default Page;
