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
  const companies = useSortedDrafts();

  const companiesLoading = useAppSelector(selectCompaniesLoading);

  return (
    <AuthGuard
      customLoading={companiesLoading}
      customRefreshThunk={refreshCompanies}
    >
      <ProfileLayout loading={companiesLoading}>
        {companies.length > 0 ? (
          <DraftCards>
            {companies.map(company => (
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
