"use client";

import { selectAuthUser, useAppSelector } from "../../store";
import { AuthGuard } from "../../components";
import { DocusealForm } from "@docuseal/react";
import type { NextPage } from "next";
import { PageLayout } from "../../layouts";
import React from "react";

const Signature: NextPage = () => {
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
};

export default Signature;
