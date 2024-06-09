"use client";

import { AuthGuard } from "../../../components";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { createPage } from "../../../utils";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add documents contents
const Page = createPage("/profile/documents", () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add documents contents</ProfileLayout>
  </AuthGuard>
));

export default Page;
