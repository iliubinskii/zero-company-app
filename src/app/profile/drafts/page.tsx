"use client";

import {
  AuthGuard,
  DraftCard,
  DraftCards,
  NoContent
} from "../../../components";
import {
  refreshCompanies,
  selectCompaniesLoading,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";
import { useSortedDrafts } from "../../../hooks";

const Page: NextPage = () => {
  const drafts = useSortedDrafts();

  const draftsLoading = useAppSelector(selectCompaniesLoading);

  return (
    <AuthGuard
      customLoading={draftsLoading}
      customRefreshThunk={refreshCompanies}
    >
      <ProfileLayout loading={draftsLoading}>
        {drafts.length > 0 ? (
          <DraftCards>
            {drafts.map(draft => (
              <DraftCard draft={draft} key={draft._id} />
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
