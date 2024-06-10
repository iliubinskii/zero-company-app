"use client";

import { AuthGuard } from "../../components";
import type { NextPage } from "next";
import { ProfileLayout } from "../../layouts";
import React from "react";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add dashboard contents
const Page: NextPage = () => (
  <AuthGuard>
    <ProfileLayout>TODO: Add dashboard contents</ProfileLayout>
  </AuthGuard>
);

export default Page;
