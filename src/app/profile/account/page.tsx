"use client";

import { Loading, ProfileLayout } from "../../../components";
import React from "react";
import { createClientPage } from "../../../utils";
import { useJwtUser } from "../../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add account contents
const Page = createClientPage("/profile/account", () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add account contents</>}
    </ProfileLayout>
  );
});

export default Page;
