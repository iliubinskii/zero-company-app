"use client";

import { AuthGuard, NoContent } from "../../../components";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add companies contents
const Page: NextPage = () => (
  <AuthGuard>
    <ProfileLayout>
      <NoContent
        buttonText={lang.app.profile.companies.NoContent.buttonText}
        href="/create-company"
        text={lang.app.profile.companies.NoContent.text}
        title={lang.app.profile.companies.NoContent.title}
      />
    </ProfileLayout>
  </AuthGuard>
);

export default Page;
