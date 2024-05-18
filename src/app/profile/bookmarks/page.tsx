"use client";

import { Loading, ProfileLayout } from "../../../components";
import React from "react";
import { createClientPage } from "../../../utils";
import { useJwtUser } from "../../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add bookmarks contents
const Page = createClientPage("/bookmarks", () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add bookmarks contents</>}
    </ProfileLayout>
  );
});

export default Page;
