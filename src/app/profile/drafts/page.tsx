"use client";

import { AuthGuard, DraftCard, DraftCards } from "../../../components";
import {
  selectDrafts,
  selectDraftsLoading,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";

const Page: NextPage = () => {
  const drafts = useAppSelector(selectDrafts);

  const draftsLoading = useAppSelector(selectDraftsLoading);

  return (
    <AuthGuard customLoading={draftsLoading}>
      <ProfileLayout>
        <DraftCards>
          {drafts.map(company => (
            <DraftCard company={company} key={company._id} />
          ))}
        </DraftCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
