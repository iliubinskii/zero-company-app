"use client";

import { AuthGuard, BigSpinner } from "../../../components";
import {
  createDraft,
  selectAuthUser,
  selectLoaded,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { PageLayout } from "../../../layouts";
import React, { useEffect } from "react";
import { callAsync } from "../../../utils";
import { lang } from "../../../langs";
import { useRouter } from "next/navigation";

const Page: NextPage = () => {
  const authUser = useAppSelector(selectAuthUser);

  const dispatch = useAppDispatch();

  const loaded = useAppSelector(selectLoaded);

  const router = useRouter();

  useEffect(() => {
    if (loaded && authUser)
      callAsync(async () => {
        await dispatch(
          createDraft(url => {
            router.push(url);
          })
        );
      });
  }, [authUser, dispatch, loaded, router]);

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
