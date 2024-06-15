"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  AuthGuard,
  CompanyCard,
  CompanyCards,
  NoContent
} from "../../../components";
import {
  refreshCompanies,
  selectCompanies,
  selectCompaniesLoading,
  useAppSelector
} from "../../../store";
import { MOTION } from "../../../consts";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React from "react";
import { lang } from "../../../langs";

const Page: NextPage = () => {
  const companies = useAppSelector(selectCompanies);

  const companiesLoading = useAppSelector(selectCompaniesLoading);

  return (
    <AuthGuard
      customLoading={companiesLoading}
      customRefreshThunk={refreshCompanies}
    >
      <ProfileLayout loading={companiesLoading}>
        {companies.length > 0 ? (
          <CompanyCards>
            <AnimatePresence>
              {companies.map(company => (
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

export default Page;
