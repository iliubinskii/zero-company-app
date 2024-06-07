"use client";

import { DraftCard, DraftCards } from "../../../components";
import { callAsync, createPage } from "../../../utils";
import {
  requireDrafts,
  selectDrafts,
  useAppDispatch,
  useAppSelector
} from "../../../store";
import React, { useEffect } from "react";

const Page = createPage("/profile/drafts", () => {
  const dispatch = useAppDispatch();

  const drafts = useAppSelector(selectDrafts);

  useEffect(() => {
    callAsync(async () => {
      await dispatch(requireDrafts());
    });
  }, [dispatch]);

  return (
    <DraftCards>
      {drafts.map(company => (
        <DraftCard company={company} key={company._id} />
      ))}
    </DraftCards>
  );
});

export default Page;
