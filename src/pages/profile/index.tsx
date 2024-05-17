import { Loading, ProfileLayout } from "../../components";
import { NextPage } from "next";
import React from "react";
import { useJwtUser } from "../../contexts";

// eslint-disable-next-line no-warning-comments -- Postponed
// TODO: Add dashboard contents
const Page: NextPage = () => {
  const { isLoading } = useJwtUser();

  return (
    <ProfileLayout>
      {isLoading ? <Loading /> : <> TODO: Add dashboard contents</>}
    </ProfileLayout>
  );
};

export default Page;
