"use client";

import {
  AuthGuard,
  FoundedCompanyCard,
  FoundedCompanyCards,
  NoContent
} from "../../../components";
import {
  refreshCompanies,
  selectCompaniesLoading,
  useAppSelector
} from "../../../store";
import type { ExistingCategory } from "../../../schema";
import type { FC } from "react";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";
import { useSortedCompanies } from "../../../hooks";

export const ClientPage: FC<Props> = ({ categories }) => {
  const companies = useSortedCompanies();

  const companiesLoading = useAppSelector(selectCompaniesLoading);

  return (
    <AuthGuard
      customLoading={companiesLoading}
      customRefreshThunk={refreshCompanies}
    >
      <ProfileLayout loading={companiesLoading}>
        {companies.length > 0 ? (
          <FoundedCompanyCards>
            {companies.map(company => (
              <FoundedCompanyCard
                categories={categories}
                company={company}
                key={company._id}
              />
            ))}
          </FoundedCompanyCards>
        ) : (
          <NoContent
            buttonText={lang.app.profile.companies.NoContent.buttonText}
            href="/"
            text={lang.app.profile.companies.NoContent.text}
            title={lang.app.profile.companies.NoContent.title}
          />
        )}
      </ProfileLayout>
    </AuthGuard>
  );
};

export interface Props {
  readonly categories: readonly ExistingCategory[];
}
