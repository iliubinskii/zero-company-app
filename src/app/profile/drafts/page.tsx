"use client";

import { AuthGuard, DraftCard, DraftCards } from "../../../components";
import {
  refreshDrafts,
  selectDrafts,
  selectDraftsLoading,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import type { NextPage } from "next";
import { ProfileLayout } from "../../../layouts";
import React, { useEffect } from "react";
import { callAsync } from "../../../utils";

const Page: NextPage = () => {
  const dispatch = useAppDispatch();

  const drafts = useAppSelector(selectDrafts);

  const draftsLoading = useAppSelector(selectDraftsLoading);

  useEffect(() => {
    callAsync(async () => {
      await dispatch(refreshDrafts());
    });
  }, [dispatch]);

  return (
    <AuthGuard customLoading={draftsLoading}>
      <ProfileLayout>
        <DraftCards>
          {drafts.map(company => (
            <DraftCard company={company} key={company._id} />
          ))}
        </DraftCards>
      </ProfileLayout>
    </AuthGuard>
  );
};

export default Page;
