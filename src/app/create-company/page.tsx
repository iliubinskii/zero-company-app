"use client";

import { AnimatedLink, BlocksLayout } from "../../components";
import { resetCompanyRegistration, useAppDispatch } from "../../store";
import React from "react";
import { createPage } from "../../utils";
import { lang } from "../../langs";

const Page = createPage("/create-company", () => {
  const dispatch = useAppDispatch();

  return (
    <BlocksLayout>
      <div className="py-24 flex flex-col items-center">
        <AnimatedLink
          className="dark-button"
          href="/create-company/steps"
          onBeforeClick={() => {
            dispatch(resetCompanyRegistration());
          }}
        >
          {lang.CreateCompany}
        </AnimatedLink>
      </div>
    </BlocksLayout>
  );
});

export default Page;
