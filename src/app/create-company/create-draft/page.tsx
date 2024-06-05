"use client";

import { BlocksLayout, Loading, Navigate } from "../../../components";

import { callAsync, createPage } from "../../../utils";
import {
  selectAuthUser,
  selectCompanyCategory,
  selectCompanyCountry,
  selectLoaded,
  useAppSelector
} from "../../../store";
import React, { useEffect } from "react";
import { lang } from "../../../langs";
import { postCompany } from "../../../api";
import { useRouter } from "next/navigation";

const Page = createPage("/create-company/create-draft", () => {
  const authUser = useAppSelector(selectAuthUser);

  const category = useAppSelector(selectCompanyCategory);

  const country = useAppSelector(selectCompanyCountry);

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  useEffect(() => {
    callAsync(async () => {
      if (loaded)
        if (authUser && category && typeof country === "string") {
          const company = await postCompany({
            categories: [category._id],
            country
          });

          router.push(`/profile/drafts/${company._id}`);
        } else router.push("/");
    });
  }, [authUser, category, country, loaded, router]);

  if (loaded && !authUser) return <Navigate to="/" />;

  return (
    <BlocksLayout>
      <div className="py-24 flex flex-col items-center gap-3">
        <Loading />
        <div className="text-gray-700">{lang.MakingThingsDone}</div>
      </div>
    </BlocksLayout>
  );
});

export default Page;
