import { Fallback, ProfileLayout, Unauthorized } from "../../components";
import { NextPage } from "next";
import React from "react";
import { useJwtUser } from "../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add companies contents
const Page: NextPage = () => {
  const { isLoading, jwtUser } = useJwtUser();

  if (isLoading) return <Fallback />;

  if (jwtUser === undefined) return <Unauthorized />;

  return (
    <ProfileLayout jwtUser={jwtUser}>
      TODO: Add companies contents
    </ProfileLayout>
  );
};

export default Page;
