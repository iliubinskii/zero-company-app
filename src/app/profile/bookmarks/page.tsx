"use client";

import { AuthGuard, ProfileLayout } from "../../../components";
import React from "react";
import { createPage } from "../../../utils";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add bookmarks contents
const Page = createPage("/profile/bookmarks", () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add bookmarks contents</ProfileLayout>
  </AuthGuard>
));

export default Page;
