import { AnimatedLink, BlocksLayout } from "../components";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import React from "react";
import { createPage } from "../utils";
import { lang } from "../langs";

const Page = createPage("/not-found", () => (
  <BlocksLayout>
    <div className="mx-auto my-12 w-full max-w-md p-8 bg-red-100 border border-red-400 rounded-lg text-center">
      <div className="flex flex-col items-center">
        <AiOutlineExclamationCircle className="text-red-700 text-6xl mb-4" />
        <h1 className="text-2xl font-bold text-red-700 mb-4">
          {lang.NotFound}
        </h1>
        <p className="text-red-700 mb-8">{lang.PageDoesNotExist}</p>
        <AnimatedLink
          className="px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800"
          href="/"
        >
          {lang.GoToHomepage}
        </AnimatedLink>
      </div>
    </div>
  </BlocksLayout>
));

export default Page;
