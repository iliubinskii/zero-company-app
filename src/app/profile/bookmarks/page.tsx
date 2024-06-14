"use client";

import { AnimatePresence, motion } from "framer-motion";
import { AuthGuard, CompanyCard, CompanyCards } from "../../../components";
import {
  refreshFavoriteCompanies,
  selectFavoriteCompanies,
  selectFavoriteCompaniesLoading,
  useAppSelector
} from "../../../store";
import { MOTION } from "../../../consts";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";

const Page: NextPage = () => {
  const favoriteCompanies = useAppSelector(selectFavoriteCompanies);

  const favoriteCompaniesLoading = useAppSelector(
    selectFavoriteCompaniesLoading
  );

  return (
    <AuthGuard
      customLoading={favoriteCompaniesLoading}
      customRefreshThunk={refreshFavoriteCompanies}
    >
      <ProfileLayout>
        <CompanyCards>
          <AnimatePresence>
            {favoriteCompanies.map(company => (
              <motion.div
                animate={MOTION.ANIMATE}
                exit={MOTION.EXIT}
                initial={false}
                key={company._id}
                layout
              >
                <CompanyCard company={company} />
              </motion.div>
            ))}
          </AnimatePresence>
        </CompanyCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
