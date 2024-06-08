"use client";

import { AuthGuard, ProfileLayout } from "../../components";
import React from "react";
import { createPage } from "../../utils";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add dashboard contents
const Page = createPage("/profile", () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add dashboard contents</ProfileLayout>
  </AuthGuard>
));

export default Page;
