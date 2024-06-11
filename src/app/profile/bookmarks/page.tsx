"use client";

import { AuthGuard, CompanyCard, CompanyCards } from "../../../components";
import {
  selectFavoriteCompanies,
  selectFavoriteCompaniesLoading,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";

const Page: NextPage = () => {
  const favoriteCompanies = useAppSelector(selectFavoriteCompanies);

  const favoriteCompaniesLoading = useAppSelector(
    selectFavoriteCompaniesLoading
  );

  return (
    <AuthGuard customLoading={favoriteCompaniesLoading}>
      <ProfileLayout>
        <CompanyCards>
          {favoriteCompanies.map(company => (
            <CompanyCard company={company} key={company._id} />
          ))}
        </CompanyCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
