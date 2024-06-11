"use client";

import {
  AuthGuard,
  CompanyCard,
  CompanyCards,
  MotionDiv
} from "../../../components";
import {
  selectFavoriteCompanies,
  selectFavoriteCompaniesLoading,
  useAppSelector
} from "../../../store";
import { AnimatePresence } from "framer-motion";
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
          <AnimatePresence>
            {favoriteCompanies.map(company => (
              <MotionDiv key={company._id}>
                <CompanyCard company={company} />
              </MotionDiv>
            ))}
          </AnimatePresence>
        </CompanyCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
