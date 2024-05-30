"use client";

import { selectAuthUser, useAppSelector } from "../../services";
import { DocusealForm } from "@docuseal/react";
import { Navigate } from "../../components";
import React from "react";
import { createPage } from "../../utils";

// eslint-disable-next-line no-warning-comments -- Assigned to Daniel
// TODO
// Verify authUser.email (only document signatories can sign document)
const Signature = createPage("/signature", () => {
  const authUser = useAppSelector(selectAuthUser);

  return authUser ? (
    <div className="blocks-layout-lg">
      <DocusealForm
        email={authUser.email}
        src="https://docuseal.co/d/jrJKKG9T8NKhGo"
      />
    </div>
  ) : (
    <Navigate to="/" />
  );
});

export default Signature;
