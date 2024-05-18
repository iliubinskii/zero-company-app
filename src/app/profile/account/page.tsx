"use client";

import { Loading, ProfileLayout } from "../../../components";
import { NextPage } from "next";
import React from "react";
import { useJwtUser } from "../../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add account contents
const Page: NextPage = () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add account contents</>}
    </ProfileLayout>
  );
};

export default Page;
