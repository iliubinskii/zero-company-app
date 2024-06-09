"use client";

import { AuthGuard, Loading } from "../../../components";
import { callAsync, createPage } from "../../../utils";
import {
  selectAuthUser,
  selectCompanyCategory,
  selectCompanyCountry,
  selectLoaded,
  showSnackbar,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import { PageLayout } from "../../../layouts";
import React, { useEffect } from "react";
import { api } from "../../../api";
import { lang } from "../../../langs";
import { useRouter } from "next/navigation";

const Page = createPage("/create-company/create-draft", () => {
  const authUser = useAppSelector(selectAuthUser);

  const category = useAppSelector(selectCompanyCategory);

  const country = useAppSelector(selectCompanyCountry);

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  useEffect(() => {
    if (loaded && authUser)
      if (category && typeof country === "string")
        callAsync(async () => {
          const company = await api.postCompany({
            categories: [category._id],
            country
          });

          if ("error" in company)
            dispatch(
              showSnackbar({
                message: company.errorMessage,
                variant: "error"
              })
            );
          else router.push(`/profile/drafts/${company._id}`);
        });
      else router.push("/create-company");
  }, [authUser, category, country, dispatch, loaded, router]);

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
