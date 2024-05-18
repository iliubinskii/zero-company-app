"use client";

import { Loading, ProfileLayout } from "../../../components";
import React from "react";
import { createPage } from "../../../utils";
import { useJwtUser } from "../../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add companies contents
const Page = createPage("/companies", () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add companies contents</>}
    </ProfileLayout>
  );
});

export default Page;
