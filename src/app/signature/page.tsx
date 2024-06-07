"use client";

import { Loading, PageLayout } from "../../components";
import { selectAuthUser, selectLoaded, useAppSelector } from "../../store";
import { DocusealForm } from "@docuseal/react";
import React, { useEffect } from "react";
import { createPage } from "../../utils";
import { useRouter } from "next/navigation";

// eslint-disable-next-line no-warning-comments -- Assigned to Daniel
// TODO
// Verify authUser.email (only document signatories can sign document)
const Signature = createPage("/signature", () => {
  const authUser = useAppSelector(selectAuthUser);

  const loaded = useAppSelector(selectLoaded);

  const [docLoaded, setDocLoaded] = React.useState(false);

  const router = useRouter();

  useEffect(() => {
    if (loaded && !authUser) router.push("/");
  }, [authUser, loaded, router]);

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
