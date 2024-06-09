"use client";

import { resetCompanyRegistration, useAppDispatch } from "../../store";
import { AnimatedLink } from "../../components";
import { PageLayout } from "../../layouts";
import React from "react";
import { createPage } from "../../utils";
import { lang } from "../../langs";

const Page = createPage("/create-company", () => {
  const dispatch = useAppDispatch();

  return (
    <PageLayout>
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
    </PageLayout>
  );
});

export default Page;
