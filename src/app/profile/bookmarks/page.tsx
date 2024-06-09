"use client";

import { AuthGuard } from "../../../components";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add bookmarks contents
const Page: NextPage = () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add bookmarks contents</ProfileLayout>
  </AuthGuard>
);

export default Page;
