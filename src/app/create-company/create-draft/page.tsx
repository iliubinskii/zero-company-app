"use client";

import { AuthGuard, Loading, PageLayout } from "../../../components";
import { callAsync, createPage } from "../../../utils";
import {
  selectAuthUser,
  selectCompanyCategory,
  selectCompanyCountry,
  selectLoaded,
  useAppSelector
} from "../../../store";
import React, { useEffect } from "react";
import { api } from "../../../api";
import { lang } from "../../../langs";
import { useRouter } from "next/navigation";
import { useSnackbar } from "../../../contexts";

const Page = createPage("/create-company/create-draft", () => {
  const authUser = useAppSelector(selectAuthUser);

  const category = useAppSelector(selectCompanyCategory);

  const country = useAppSelector(selectCompanyCountry);

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  const { showSnackbar } = useSnackbar();

  useEffect(() => {
    callAsync(async () => {
      if (loaded && authUser)
        if (category && typeof country === "string") {
          const company = await api.postCompany({
            categories: [category._id],
            country
          });

          if ("error" in company) showSnackbar(company.error, "error");
          else router.push(`/profile/drafts/${company._id}`);
        } else router.push("/create-company");
    });
  }, [authUser, category, country, loaded, router, showSnackbar]);

  return (
    <AuthGuard>
      <PageLayout>
        <div className="py-24 flex flex-col items-center gap-3">
          <Loading />
          <div className="text-gray-700">{lang.MakingThingsDone}</div>
        </div>
      </PageLayout>
    </AuthGuard>
  );
});

export default Page;
