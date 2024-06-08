"use client";

import { AuthGuard, PageLayout } from "../../components";
import { selectAuthUser, useAppSelector } from "../../store";
import { DocusealForm } from "@docuseal/react";
import React from "react";
import { createPage } from "../../utils";

const Signature = createPage("/signature", () => {
  const authUser = useAppSelector(selectAuthUser);

  return (
    <AuthGuard>
      <PageLayout size="lg">
        <div className="min-h-80">
          {authUser && (
            <DocusealForm
              email={authUser.email}
              src="https://docuseal.co/d/jrJKKG9T8NKhGo"
            />
          )}
        </div>
      </PageLayout>
    </AuthGuard>
  );
});

export default Signature;
