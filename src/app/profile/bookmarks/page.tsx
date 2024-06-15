"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AuthGuard,
  CompanyCard,
  CompanyCards,
  NoContent
} from "../../../components";
import {
  refreshFavoriteCompanies,
  selectFavoriteCompaniesLoading,
  useAppSelector
} from "../../../store";
import { MOTION } from "../../../consts";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";
import { useSortedFavoriteCompanies } from "../../../hooks";

const Page: NextPage = () => {
  const favoriteCompanies = useSortedFavoriteCompanies();

  const favoriteCompaniesLoading = useAppSelector(
    selectFavoriteCompaniesLoading
  );

  return (
    <AuthGuard
      customLoading={favoriteCompaniesLoading}
      customRefreshThunk={refreshFavoriteCompanies}
    >
      <ProfileLayout loading={favoriteCompaniesLoading}>
        {favoriteCompanies.length > 0 ? (
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
        ) : (
          <NoContent
            buttonText={lang.app.profile.bookmarks.NoContent.buttonText}
            href="/"
            text={lang.app.profile.bookmarks.NoContent.text}
            title={lang.app.profile.bookmarks.NoContent.title}
          />
        )}
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
