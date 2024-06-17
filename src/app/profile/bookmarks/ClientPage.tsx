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
import type { ExistingCategory } from "../../../schema";
import type { FC } from "react";
import { MOTION } from "../../../consts";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";
import { useSortedFavoriteCompanies } from "../../../hooks";

export const ClientPage: FC<Props> = ({ categories }) => {
  const favoriteCompanies = useSortedFavoriteCompanies();

  const favoriteCompaniesLoading = useAppSelector(
    selectFavoriteCompaniesLoading
  );

  return (
    <AuthGuard
      customLoading={favoriteCompaniesLoading}
      customRefreshThunk={refreshFavoriteCompanies}
    >
      <ProfileLayout loading={favoriteCompaniesLoading} noInfo>
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
                  <CompanyCard categories={categories} company={company} />
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

export interface Props {
  readonly categories: readonly ExistingCategory[];
}
