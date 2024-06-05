"use client";

import { Loading, Navigate, PageLayout } from "../../components";
import { selectAuthUser, selectLoaded, useAppSelector } from "../../store";
import { DocusealForm } from "@docuseal/react";
import React from "react";
import { createPage } from "../../utils";

// eslint-disable-next-line no-warning-comments -- Assigned to Daniel
// TODO
// Verify authUser.email (only document signatories can sign document)
const Signature = createPage("/signature", () => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const [docLoaded, setDocLoaded] = React.useState(false);

  if (loaded && !authUser) return <Navigate to="/" />;

  return (
    <PageLayout size="lg">
      {loaded && docLoaded ? undefined : (
        <div className="min-h-80 flex justify-center items-center">
          <Loading />
        </div>
      )}
      <div
        className={loaded && docLoaded ? undefined : "w-0 h-0 overflow-hidden"}
      >
        {authUser && (
          <DocusealForm
            email={authUser.email}
            onLoad={() => {
              setDocLoaded(true);
            }}
            src="https://docuseal.co/d/jrJKKG9T8NKhGo"
          />
        )}
      </div>
    </PageLayout>
  );
});

export default Signature;
