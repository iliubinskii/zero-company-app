"use client";

import { AuthGuard, DraftCard, DraftCards } from "../../../components";
import {
  requireDrafts,
  selectDrafts,
  selectDraftsLoaded,
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

  const draftsLoaded = useAppSelector(selectDraftsLoaded);

  useEffect(() => {
    callAsync(async () => {
      await dispatch(requireDrafts());
    });
  }, [dispatch]);

  return (
    <AuthGuard customLoaded={draftsLoaded}>
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
