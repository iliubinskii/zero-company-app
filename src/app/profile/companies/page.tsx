"use client";

import { AuthGuard } from "../../../components";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { createPage } from "../../../utils";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add companies contents
const Page = createPage("/profile/companies", () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add companies contents</ProfileLayout>
  </AuthGuard>
));

export default Page;
