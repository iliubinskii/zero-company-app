"use client";

import {
  AuthGuard,
  DraftCard,
  DraftCards,
  NoContent
} from "../../../components";
import {
  refreshDrafts,
  selectDrafts,
  selectDraftsLoading,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";

const Page: NextPage = () => {
  const drafts = useAppSelector(selectDrafts);

  const draftsLoading = useAppSelector(selectDraftsLoading);

  return (
    <AuthGuard customLoading={draftsLoading} customRefreshThunk={refreshDrafts}>
      <ProfileLayout loading={draftsLoading}>
        {drafts.length > 0 ? (
          <DraftCards>
            {drafts.map(company => (
              <DraftCard company={company} key={company._id} />
            ))}
          </DraftCards>
        ) : (
          <NoContent
            buttonText={lang.app.profile.drafts.NoContent.buttonText}
            href="/create-company"
            text={lang.app.profile.drafts.NoContent.text}
            title={lang.app.profile.drafts.NoContent.title}
          />
        )}
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
