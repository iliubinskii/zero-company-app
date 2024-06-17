"use client";

import { AuthGuard, BigSpinner } from "../../../components";
import {
  logError,
  selectAuthUser,
  selectCompanyCategory,
  selectCompanyCountry,
  selectLoaded,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { PageLayout } from "../../../layouts";
import React, { useEffect, useRef } from "react";
import { api } from "../../../api";
import { callAsync } from "../../../utils";
import { lang } from "../../../langs";
import { useRouter } from "next/navigation";

const Page: NextPage = () => {
  const authUser = useAppSelector(selectAuthUser);

  const category = useAppSelector(selectCompanyCategory);

  const country = useAppSelector(selectCompanyCountry);

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectLoaded);

  const posted = useRef(false);

  const router = useRouter();

  useEffect(() => {
    if (loaded && authUser)
      if (category && typeof country === "string")
        if (posted.current) {
          // Already posted, do nothing
        } else {
          posted.current = true;
          callAsync(async () => {
            const company = await api.postCompany({
              categories: [category._id],
              country
            });

            if ("error" in company)
              dispatch(
                logError({
                  error: company,
                  message: company.errorMessage
                })
              );
            else router.push(`/profile/drafts/${company._id}`);
          });
        }
      else router.push("/create-company");
  }, [authUser, category, country, dispatch, loaded, router]);

  useEffect(() => {
    posted.current = false;
  }, [category, country]);

  return (
    <AuthGuard>
      <PageLayout>
        <div className="py-24 flex flex-col items-center gap-3">
          <BigSpinner />
          <div className="text-gray-700">{lang.MakingThingsDone}</div>
        </div>
      </PageLayout>
    </AuthGuard>
  );
};

export default Page;
