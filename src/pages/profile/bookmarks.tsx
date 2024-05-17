import { Loading, ProfileLayout } from "../../components";
import { NextPage } from "next";
import React from "react";
import { useJwtUser } from "../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add bookmarks contents
const Page: NextPage = () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add bookmarks contents</>}
    </ProfileLayout>
  );
};

export default Page;
