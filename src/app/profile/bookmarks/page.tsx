"use client";

import { AuthGuard } from "../../../components";
import { ProfileLayout } from "../../../layouts";
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
