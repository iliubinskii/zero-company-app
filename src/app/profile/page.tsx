"use client";

import { AuthGuard } from "../../components";
import { ProfileLayout } from "../../layouts";
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
