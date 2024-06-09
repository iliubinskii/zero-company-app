"use client";

import { AuthGuard } from "../../../components";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { createPage } from "../../../utils";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add settings contents
const Page = createPage("/profile/settings", () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add settings contents</ProfileLayout>
  </AuthGuard>
));

export default Page;
